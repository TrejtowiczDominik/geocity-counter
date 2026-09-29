import {
  GeoNamesCity,
  GeoNamesErrorResponse,
  GeoNamesSuccessResponse,
} from "../types/geonames";

export const isGeoNamesErrorResponse = (
  data: unknown,
): data is GeoNamesErrorResponse => {
  if (typeof data !== "object" || data === null || !("status" in data)) {
    return false;
  }

  const { status } = data;

  return (
    typeof status === "object" &&
    status !== null &&
    "message" in status &&
    typeof status.message === "string"
  );
};

const isGeoNamesCity = (value: unknown): value is GeoNamesCity =>
  typeof value === "object" &&
  value !== null &&
  "name" in value &&
  typeof value.name === "string" &&
  value.name.length > 0;

export const isGeoNameSuccessResponse = (
  data: unknown,
): data is GeoNamesSuccessResponse =>
  typeof data === "object" &&
  data !== null &&
  "geonames" in data &&
  Array.isArray(data.geonames) &&
  data.geonames.length > 0 &&
  data.geonames.every(isGeoNamesCity);
