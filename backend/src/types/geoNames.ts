export type GeoNamesCity = {
  name: string;
};

export type GeoNamesSuccessResponse = {
  geonames: Array<GeoNamesCity>;
};

export type GeoNamesErrorResponse = {
  status: {
    message: string;
    value: number;
  };
};

export type GeoNamesResponse = GeoNamesSuccessResponse | GeoNamesErrorResponse;
