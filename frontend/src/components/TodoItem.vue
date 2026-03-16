<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'

const store = useTodoStore()

const props = defineProps<{
  id: string
  text: string
  completed: boolean
}>()
</script>

<template>
  <li class="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:shadow-sm transition">

    <!-- Left: checkboxes + text -->
    <div class="flex items-center gap-4 flex-1 min-w-0">

      <!-- Select for bulk delete -->
      <input
        type="checkbox"
        :checked="store.selectedIds.includes(props.id)"
        @change="store.toggleSelect(props.id)"
        class="w-4 h-4 accent-red-400 cursor-pointer shrink-0"
      />

      <!-- Toggle complete -->
      <input
        type="checkbox"
        :checked="props.completed"
        @change="store.toggleTodo(props.id)"
        class="w-5 h-5 accent-indigo-500 cursor-pointer shrink-0"
      />

      <!-- Todo text — wrap if too long -->
      <span
        :class="props.completed ? 'line-through text-gray-300' : 'text-gray-700 text-sm font-medium'"
        class="break-words min-w-0"
      >
        {{ props.text }}
      </span>
    </div>

    <!-- Right: delete button -->
    <button
      @click="store.deleteTodo(props.id)"
      class="text-gray-300 hover:text-red-400 transition text-lg shrink-0 ml-4"
      title="Delete"
    >
      🗑️
    </button>

  </li>
</template>