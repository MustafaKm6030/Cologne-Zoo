<script setup lang="ts">
import type { Animal } from '~/types';

const props = defineProps<{
  animal: Animal | null;
}>();

const emit = defineEmits(['close']);

const age = computed(() => {
  if (!props.animal?.birthdate) return 'N/A';
  const today = new Date();
  const diff = today.getTime() - new Date(props.animal.birthdate).getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24 * 365)));
});
</script>

<template>
  <div
    v-if="animal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg max-w-2xl w-full">
      <div class="flex justify-between items-start">
        <h2 class="text-2xl font-bold">
          {{ animal.name }} the {{ animal.species }}
        </h2>
        <button
          @click="emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h3 class="font-semibold text-gray-700">Basic Information</h3>
          <p>Species: {{ animal.species }}</p>
          <p>Gender: {{ animal.gender }}</p>
          <p>Age: {{ age }} years</p>
        </div>

        <div>
          <h3 class="font-semibold text-gray-700">Physical Attributes</h3>
          <p>Weight: {{ animal.weight }} kg</p>
          <p>Height: {{ animal.height }} cm</p>
        </div>

        <div class="col-span-2">
          <h3 class="font-semibold text-gray-700">Preferences</h3>
          <p>Favorite Fruit: {{ animal.favouriteFruit }}</p>
          <p>
            Birthdate: {{ new Date(animal.birthdate).toLocaleDateString() }}
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="emit('close')"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
