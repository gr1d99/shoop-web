const buildServerFormErrors = (errors: Record<string, string[]>) => {
  return Object.keys(errors).reduce<string[]>((acc, key) => {
    const keyErrors = errors[key];
    if (keyErrors.length > 1) {
      return [...acc, keyErrors.join(`${key} `)];
    } else {
      return [...acc, `${key} ${keyErrors[0]}`];
    }
  }, []);
};

export const errors = {
  buildServerFormErrors
};
