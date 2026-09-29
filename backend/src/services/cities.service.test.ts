import { GeoNamesCity } from "../types/geonames";
import { countCitiesByPrefix } from "./cities.service";

const sampleCities: Array<GeoNamesCity> = [
  { name: "Cairo" },
  { name: "Chongqing" },
  { name: "Chengdu" },
  { name: "Rio de Janeiro" },
  { name: "Tokyo" },
];

const fakeFetchCities = async () => sampleCities;
describe("countCitiesByPrefix", () => {
  it("should return only Rio de Janeiro when searching for 'r'", async () => {
    // given & when
    const result = await countCitiesByPrefix("r", fakeFetchCities);

    // then
    expect(result.count).toBe(1);
    expect(result.cityNames).toEqual(["Rio de Janeiro"]);
  });

  it("should return Cairo, Chongqing, and Chengdu when searching for 'c'", async () => {
    // given & when
    const result = await countCitiesByPrefix("c", fakeFetchCities);

    // then
    expect(result.count).toBe(3);
    expect(result.cityNames).toEqual(["Cairo", "Chongqing", "Chengdu"]);
  });

  it("should be case-insensitive when used uppercase letter", async () => {
    // given & when
    const result = await countCitiesByPrefix("C", fakeFetchCities);

    // then
    expect(result.count).toBe(3);
  });

  it("should support multi-character prefixes when more than one character is provided", async () => {
    // given & when
    const result = await countCitiesByPrefix("ch", fakeFetchCities);

    // then
    expect(result.count).toBe(2);
    expect(result.cityNames).toEqual(["Chongqing", "Chengdu"]);
  });

  it("should return zero matches when nothing starts with the prefix", async () => {
    // given & when
    const result = await countCitiesByPrefix("z", fakeFetchCities);

    // then
    expect(result.count).toBe(0);
    expect(result.cityNames).toEqual([]);
  });
});
