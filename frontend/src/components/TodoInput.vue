<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()
const inputText = ref('')

async function handleAdd() {
  if (!inputText.value.trim()) return
  await store.addTodo(inputText.value.trim())
  inputText.value = ''
}
</script>

<template>
  <section class="mb-6">
    <form @submit.prevent="handleAdd" class="flex gap-2">
      <input
        v-model="inputText"
        type="text"
        placeholder="What needs to be done?"
        class="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        class="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-semibold transition"
      >
        Add
      </button>
    </form>
  </section>
</template>