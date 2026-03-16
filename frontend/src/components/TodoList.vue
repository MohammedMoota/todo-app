<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoItem from './TodoItem.vue'

const store = useTodoStore()

const remaining = computed(() =>
  store.todos.filter(t => !t.completed).length
)

onMounted(() => {
  store.fetchTodos()
})
</script>

<template>
  <section>

    <!-- Top bar: count + delete selected -->
    <div v-if="store.todos.length > 0" class="flex justify-between items-center mb-3">
      <p class="text-xs text-gray-400 uppercase tracking-wide font-semibold">Your Tasks</p>
      <div class="flex items-center gap-3">
        <p class="text-xs text-indigo-500 font-semibold">{{ remaining }} remaining</p>
        <button
          v-if="store.selectedIds.length > 0"
          @click="store.deleteSelected()"
          class="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg font-semibold transition"
        >
          Delete Selected ({{ store.selectedIds.length }})
        </button>
      </div>
    </div>

    <!-- Column headers -->
    <div v-if="store.todos.length > 0" class="flex items-center gap-4 px-4 mb-1">
      <span class="text-xs text-red-400 font-medium w-4">Select</span>
      <span class="text-xs text-indigo-400 font-medium w-5 ml-2">Mark</span>
      <span class="text-xs text-gray-400 font-medium ml-2">Task</span>
      <span class="text-xs text-gray-300 font-medium ml-auto">Delete</span>
    </div>

    <!-- Empty state -->
    <div v-if="store.todos.length === 0" class="text-center py-10">
      <p class="text-4xl mb-2">🎉</p>
      <p class="text-gray-400 text-sm">No todos yet. Add one above!</p>
    </div>

    <!-- Todo list -->
    <ul v-else class="space-y-2">
      <TodoItem
        v-for="todo in store.todos"
        :key="todo.id"
        :id="todo.id"
        :text="todo.text"
        :completed="todo.completed"
      />
    </ul>

    <!-- All done message -->
    <p v-if="store.todos.length > 0 && remaining === 0" class="text-center text-green-500 text-sm mt-4 font-medium">
      🎊 All tasks completed!
    </p>

  </section>
</template>