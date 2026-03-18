<script setup lang="ts">
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <main class="min-h-screen max-w-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-16 px-4">

    <header class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold text-indigo-600 tracking-tight">📝 Todo App</h1>
      <p class="text-gray-500 mt-2 text-sm">Stay organized, get things done!</p>
    </header>

    <div class="bg-rounded-2xl shadow-lg p-8 w-full max-w-lg">
      <TodoInput />
      <TodoList />
    </div>

  </main>
</template>