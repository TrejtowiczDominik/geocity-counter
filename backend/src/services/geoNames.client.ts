import { config } from "../configuration/config";
import { UpstreamError } from "../errors/upstream.error";
import { GeoNamesCity } from "../types/geonames";
import {
  isGeoNamesErrorResponse,
  isGeoNameSuccessResponse,
} from "../validation/geonames.validation";

type CitiesCache = {
  cities: Array<GeoNamesCity>;
  fetchedAt: number;
};

let citiesCache: CitiesCache | null = null;
let inFlight: Promise<Array<GeoNamesCity>> | null = null;

export const getCities = (): Promise<Array<GeoNamesCity>> => {
  const isStale =
    !citiesCache || Date.now() - citiesCache.fetchedAt > config.cacheTtlMs;

  if (!isStale && citiesCache) {
    return Promise.resolve(citiesCache.cities);
  }

  if (!inFlight) {
    inFlight = fetchFromGeoNames()
      .then((cities) => {
        citiesCache = { cities, fetchedAt: Date.now() };

        return cities;
      })
      .catch((error: unknown) => {
        throw new UpstreamError(error);
      })
      .finally(() => {
        inFlight = null;
      });
  }

  return inFlight;
};

const fetchFromGeoNames = async (): Promise<Array<GeoNamesCity>> => {
  const url = new URL(config.geonamesBaseUrl);
  url.searchParams.set("featureClass", "P");
  url.searchParams.set("maxRows", "50");
  url.searchParams.set("orderby", "population");
  url.searchParams.set("username", config.geonamesUsername);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  let response: Response;

  try {
    response = await fetch(url.toString(), { signal: controller.signal });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Geonames request timed out after 8000ms");
    }

    throw new Error(`Failed to fetch data from geonames: ${String(error)}`);
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from geonames: ${response.status} ${response.statusText}`,
    );
  }

  const resultData: unknown = await response.json();

  return parseGeonamesResponse(resultData);
};

const parseGeonamesResponse = (data: unknown): Array<GeoNamesCity> => {
  if (isGeoNamesErrorResponse(data)) {
    throw new Error(`Geonames API error: ${data.status.message}`);
  }

  if (!isGeoNameSuccessResponse(data)) {
    throw new Error("Geonames API returned an unexpected response shape");
  }

  return data.geonames;
};
