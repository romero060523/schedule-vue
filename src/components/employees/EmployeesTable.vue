<script setup>
// Definimos qué datos espera recibir este componente
defineProps({
  employees: {
    type: Array,
    required: true
  }
});

// Definimos qué eventos puede emitir este componente
const emit = defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <!-- Si no hay empleados, mostrar mensaje -->
        <tr v-if="employees.length === 0">
          <td colspan="4" class="text-center text-muted">
            No hay empleados registrados
          </td>
        </tr>
        
        <!-- Mostrar cada empleado -->
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>
            <span 
              class="badge" 
              :class="employee.active ? 'bg-success' : 'bg-secondary'"
            >
              {{ employee.active ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td>
            <!-- Botón Editar -->
            <button 
              class="btn btn-sm btn-warning me-2" 
              @click="emit('edit', employee)"
            >
              Editar
            </button>
            
            <!-- Botón Eliminar -->
            <button 
              class="btn btn-sm btn-danger" 
              @click="emit('delete', employee.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Estilos opcionales personalizados */
.table {
  margin-top: 1rem;
}
</style>