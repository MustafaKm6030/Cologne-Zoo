export default (birthdate: string | Date) => {
  const today = new Date();
  const birth = new Date(birthdate);

  const differenceInMilliseconds = today.getTime() - birth.getTime();
  const years = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);

  return Math.max(1, Math.ceil(years));
};
