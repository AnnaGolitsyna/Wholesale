export const splitAdditionalId = (value) => {
  const regex = /\d+-[A-Za-z]+\s[A-Za-z]+\.[A-Za-z]+/;
  return regex.test(value) ? value.split('-')[0] : value;
};
