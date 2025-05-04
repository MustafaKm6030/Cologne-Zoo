import type { Animal } from '~/types';

export default (animal: Animal) => {
  // Fish get no food
  if (animal.species.toLowerCase() === 'fish') return 0;

  // Base calculation
  let food = (animal.height + animal.weight) / 250;

  // Age adjustments
  const age = useCalculateAgeInYears(animal.birthdate);
  if (age > 20) food /= 2;
  if (age < 2) food *= 2;

  // Fruit adjustment
  if (animal.favouriteFruit === 'cherry') food += 28;

  // Gender adjustment
  if (animal.gender === 'male') food *= 1.2;

  // Return daily amount rounded to 2 decimals
  return Math.round(food * 100) / 100;
};
