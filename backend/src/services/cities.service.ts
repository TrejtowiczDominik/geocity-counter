import { GeoNamesCity } from "../types/geonames";
import { getCities } from "./geonames.client";

type CityCountResult = {
  cityNames: Array<string>;
  count: number;
  prefix: string;
};

export const countCitiesByPrefix = async (
  prefix: string,
  fetchCities: () => Promise<Array<GeoNamesCity>> = getCities,
): Promise<CityCountResult> => {
  const cities = await fetchCities();
  const normalizedPrefix = prefix.toLowerCase();

  const matches = cities
    .map(({ name }) => name)
    .filter((name) => name.toLocaleLowerCase().startsWith(normalizedPrefix));

  return {
    prefix,
    count: matches.length,
    cityNames: matches,
  };
};
