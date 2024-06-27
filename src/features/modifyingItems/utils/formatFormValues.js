const formatFormValues = (values) => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value === undefined ? null : value,
    ])
  );
};

export { formatFormValues };