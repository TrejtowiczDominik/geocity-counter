import { ApiError } from "./api.error";

export class UpstreamError extends ApiError {
  constructor(cause: unknown) {
    super(
      502,
      "UPSTREAM_ERROR",
      "City data is temporarily unavailable. Please try again later",
      { cause },
    );

    this.name = "UpstreamError";
  }
}
