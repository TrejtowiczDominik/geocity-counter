import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3000,
  geonamesUsername: process.env.GEONAMES_USERNAME ?? "",
  geonamesBaseUrl:
    process.env.GEONAMES_BASE_URL ?? "http://api.geonames.org/searchJSON",
  cacheTtlMs: Number(process.env.CACHE_TTL_MS) ?? 60 * 60 * 1000,
};

if (!config.geonamesUsername) {
  throw new Error("GEONAMES_USERNAME env variable is required");
}
