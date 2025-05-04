<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Animal } from '~/types';
import useCalculateAgeInYears from '../utils/useCalculateAgeInYears';
import AnimalDetailModal from './AnimalDetails.vue';
import useFoodCalculation from '~/composables/useFoodCalculation'
const calculateAge = useCalculateAgeInYears;
const selectedAnimal = ref<Animal | null>(null);
const calculateDailyFood = useFoodCalculation;

const calculateMonthlyFood = (animal: Animal) => {
  const daily = calculateDailyFood(animal);
  return Math.round(daily * 30 * 100) / 100; // 30-day month
};

const props = defineProps<{
  animals: Animal[];
}>();

const animalsSortedByName = computed(() =>
  props.animals
    .slice()
    .sort((animalA, animalB) => animalA.name.localeCompare(animalB.name))
);

const selectAnimal = (animal: Animal) => {
  selectedAnimal.value = animal;
};
</script>

<template>
  <div class="mb-4 p-4 bg-blue-50 rounded-lg">
    <h3 class="font-bold text-lg mb-2">Monthly Food Summary</h3>
    <p>
      Total food required:
      <span class="font-bold">
        {{
          animals
            .reduce((sum, animal) => sum + calculateMonthlyFood(animal), 0)
            .toFixed(2)
        }}
        kg
      </span>
    </p>
    <p class="text-sm text-gray-600 mt-1">
      Calculation: (Height + Weight) / 250, adjusted by age, fruit preference
      and gender
    </p>
  </div>

  <table>
    <thead>
      <tr>
        <th class="px-4 py-2 text-left">Index</th>
        <th class="px-4 py-2 text-left">Species</th>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">Gender</th>
        <th class="px-4 py-2 text-left">Age (yrs)</th>
        <th class="px-4 py-2 text-left">Weight (kg)</th>
        <th class="px-4 py-2 text-left">Food (kg)</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(animal, animalIndex) in animalsSortedByName"
        :key="animalIndex"
        @click="selectAnimal(animal)"
        class="cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <td class="px-4 py-2">{{ animalIndex + 1 }}</td>
        <td class="px-4 py-2">{{ animal.species }}</td>
        <td class="px-4 py-2">
          <span
            @click="selectAnimal(animal)"
            class="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
          >
            {{ animal.name }}
          </span>
        </td>
        <td class="px-4 py-2">{{ animal.gender }}</td>
        <td class="px-4 py-2">{{ calculateAge(animal.birthdate) }}</td>
        <td class="px-4 py-2">{{ animal.weight }}</td>
        <td class="px-4 py-2">{{ calculateMonthlyFood(animal) }}</td>
      </tr>
    </tbody>
  </table>
  <AnimalDetailModal
    v-if="selectedAnimal"
    :animal="selectedAnimal"
    @close="selectedAnimal = null"
  />
</template>

<style scoped>
table {
  @apply table-auto w-full text-left;
}
td {
  @apply w-40;
}
tr {
  @apply border-b-2;
}
tbody tr {
  @apply hover:bg-gray-200;
}
</style>
