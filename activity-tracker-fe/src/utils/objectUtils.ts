/**
 * Remove undefined or null properties from an object
 * @author https://stackoverflow.com/a/38340730
 */
export const removeNullish = <T extends object | any[]>(obj: T): T => {
  if (typeof obj === "string") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj
      .filter((i) => i !== undefined && i !== null)
      .map((i) => removeNullish(i)) as T;
  }
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [
        k,
        v !== null && typeof v === "object" ? removeNullish(v) : v,
      ])
  ) as T;
};

export const removeProperty = <T extends object>(obj: T, key: keyof T) => {
  delete obj[key];
  return obj;
};
