<script setup>
import { ref, watch } from 'vue';

// Props que recibe el componente
const props = defineProps({
  employee: {
    type: Object,
    default: null // null = modo crear, objeto = modo editar
  }
});

// Eventos que emite
const emit = defineEmits(['submit', 'cancel']);

// Datos del formulario
const formData = ref({
  name: '',
  active: true
});

// Cuando recibimos un empleado para editar, llenar el formulario
watch(() => props.employee, (newEmployee) => {
  if (newEmployee) {
    formData.value = {
      name: newEmployee.name,
      active: newEmployee.active
    };
  } else {
    // Limpiar formulario
    formData.value = { name: '', active: true };
  }
}, { immediate: true });

// Enviar formulario
function handleSubmit() {
  if (!formData.value.name.trim()) {
    alert('El nombre es requerido');
    return;
  }
  
  emit('submit', { ...formData.value });
  
  // Limpiar form después de enviar (solo si es crear)
  if (!props.employee) {
    formData.value = { name: '', active: true };
  }
}

// Cancelar edición
function handleCancel() {
  emit('cancel');
  formData.value = { name: '', active: true };
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">
        {{ employee ? 'Editar Empleado' : 'Nuevo Empleado' }}
      </h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <!-- Campo Nombre -->
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input 
            id="name"
            v-model="formData.name" 
            type="text" 
            class="form-control" 
            placeholder="Ingresa el nombre del empleado"
            required
          >
        </div>

        <!-- Campo Estado -->
        <div class="mb-3 form-check">
          <input 
            id="active"
            v-model="formData.active" 
            type="checkbox" 
            class="form-check-input"
          >
          <label for="active" class="form-check-label">
            Empleado activo
          </label>
        </div>

        <!-- Botones -->
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">
            {{ employee ? 'Actualizar' : 'Crear' }}
          </button>
          
          <button 
            v-if="employee" 
            type="button" 
            class="btn btn-secondary"
            @click="handleCancel"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 2rem;
}
</style>