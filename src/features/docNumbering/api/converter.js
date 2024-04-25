export const docNumConverter = {
  toFirestore(value) {
    return { ...value };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    const { number } = data;
    return number;
  },
};
