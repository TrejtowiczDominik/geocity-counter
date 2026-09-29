type PrefixValidationResult =
  | { ok: true; prefix: string }
  | { ok: false; error: string };

const PREFIX_PATTERN = /^\p{L}+$/u;
const MAX_PREFIX_LENGTH = 10;

export const validatePrefix = (value: unknown): PrefixValidationResult => {
  if (value === undefined || value === null) {
    return { ok: false, error: "Query parameter 'prefix' is required" };
  }

  if (Array.isArray(value)) {
    return {
      ok: false,
      error: "Query parameter 'prefix' must be a single value",
    };
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      error: "Query parameter 'prefix' must be a string",
    };
  }

  const prefix = value.trim();

  if (prefix.length === 0) {
    return {
      ok: false,
      error: "Query parameter 'prefix' must not be empty.",
    };
  }

  if (prefix.length > MAX_PREFIX_LENGTH) {
    return {
      ok: false,
      error: `Query parameter 'prefix' must be at most ${MAX_PREFIX_LENGTH} characters.`,
    };
  }

  if (!PREFIX_PATTERN.test(prefix)) {
    return {
      ok: false,
      error:
        "Query parameter 'prefix' must contain only letters (no digits, spaces, or symbols).",
    };
  }

  return { ok: true, prefix };
};
