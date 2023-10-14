export const set = (
  obj: Record<string, unknown>,
  path: string | string[],
  value: unknown,
) => {
  const paths = Array.isArray(path) ? path : path.split(".");

  const key = paths[0];
  if (!key) return;
  if (paths.length === 1) obj[key] = value;
  if (!obj[key] && paths[1]) {
    const parsed = parseInt(paths[1]);
    obj[key] = isNaN(parsed) ? {} : [];
  }
  set(obj[key] as Record<string, unknown>, paths.splice(1), value);
};

export const mapFormDataToValues = <T extends object>(formData: FormData) => {
  const values = {};
  for (const [key, value] of formData.entries()) {
    set(values, key, value);
  }
  return values as T;
};
