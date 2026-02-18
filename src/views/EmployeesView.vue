<script setup>
import { ref, onMounted } from 'vue';
import { useEmployees } from '../composables/useEmployees';
import EmployeesForm from '../components/employees/EmployeesForm.vue';
import EmployeesTable from '../components/employees/EmployeesTable.vue';
import Spinner from '../components/ui/Spinner.vue';
import Alert from '../components/ui/Alert.vue';

// Usar el composable que maneja toda la lógica
const { 
  employees, 
  loading, 
  error, 
  loadEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} = useEmployees();

// Variable para saber si estamos editando
const employeeToEdit = ref(null);

// Cargar empleados cuando se monta el componente
onMounted(() => {
  loadEmployees();
});

// Manejar envío del formulario (crear o actualizar)
async function handleSubmit(formData) {
  try {
    if (employeeToEdit.value) {
      // Modo edición
      await updateEmployee(employeeToEdit.value.id, formData);
      employeeToEdit.value = null; // Limpiar edición
    } else {
      // Modo crear
      await createEmployee(formData);
    }
  } catch (err) {
    console.error('Error al guardar:', err);
  }
}

// Configurar empleado para editar
function handleEdit(employee) {
  employeeToEdit.value = employee;
}

// Cancelar edición
function handleCancel() {
  employeeToEdit.value = null;
}

// Eliminar empleado con confirmación
async function handleDelete(id) {
  if (confirm('¿Estás seguro de eliminar este empleado?')) {
    try {
      await deleteEmployee(id);
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  }
}
</script>

<template>
  <div class="container py-4">
    <h1 class="mb-4">Gestión de Empleados</h1>

    <!-- Mostrar errores si existen -->
    <Alert v-if="error" type="danger" :message="error" />

    <!-- Formulario -->
    <EmployeesForm 
      :employee="employeeToEdit"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />

    <!-- Spinner mientras carga -->
    <div v-if="loading" class="text-center my-4">
      <Spinner />
    </div>

    <!-- Tabla de empleados -->
    <EmployeesTable 
      v-else
      :employees="employees"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<style scoped>
/* Estilos opcionales */
h1 {
  color: #333;
}
</style>
