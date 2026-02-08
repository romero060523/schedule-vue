<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="modal fade show"
      tabindex="-1"
      style="display: block;"
      @click.self="closeModal"
    >
      <div :class="['modal-dialog', sizeClass]">
        <div class="modal-content">
          <!-- Cabecera del modal -->
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>

          <!-- Cuerpo del modal (contenido dinámico) -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Pie del modal (botones de acción) -->
          <div class="modal-footer" v-if="showFooter">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"
            >
              {{ cancelText }}
            </button>
            <button
              v-if="showConfirm"
              type="button"
              :class="['btn', confirmButtonClass]"
              @click="$emit('confirm')"
              :disabled="confirmDisabled"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop (fondo oscuro) -->
    <div
      v-if="show"
      class="modal-backdrop fade show"
      @click="closeModal"
    ></div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

// Props del componente
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  },
  size: {
    type: String,
    default: 'md', // 'sm', 'md', 'lg', 'xl'
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showConfirm: {
    type: Boolean,
    default: true
  },
  confirmText: {
    type: String,
    default: 'Confirmar'
  },
  cancelText: {
    type: String,
    default: 'Cancelar'
  },
  confirmVariant: {
    type: String,
    default: 'primary' // 'primary', 'success', 'danger'
  },
  confirmDisabled: {
    type: Boolean,
    default: false
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
})

// Eventos que emite
const emit = defineEmits(['close', 'confirm'])

// Computed properties
const sizeClass = computed(() => {
  if (props.size === 'sm') return 'modal-sm'
  if (props.size === 'lg') return 'modal-lg'
  if (props.size === 'xl') return 'modal-xl'
  return ''
})

const confirmButtonClass = computed(() => {
  return `btn-${props.confirmVariant}`
})

// Métodos
function closeModal() {
  if (props.closeOnBackdrop) {
    emit('close')
  }
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  z-index: 1050;
}
</style>