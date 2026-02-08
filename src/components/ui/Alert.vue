<script setup>
// Definición de props (datos que recibe el componente)
defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info', // 'success', 'danger', 'warning', 'info'
    validator: (value) => ['success', 'danger', 'warning', 'info'].includes(value)
  }
})

// Definición de eventos que emite
defineEmits(['close'])
</script>

<template>
    <div v-if="message" :class="['alert', `alert-${type}`, 'alert-dismissible', 'fade', 'show']" role="alert">
        {{ message }}
        <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
    </div>
</template>

