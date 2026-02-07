import { ref } from "vue";
import { employeeService } from "../services/employeeService";

// Gestion de estados
export function useEmployees() {
    const employees = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Carga de datos
    async function loadEmployees() {
        loading.value = true;
        error.value = null;

        try {
            employees.value = await employeeService.getAll();
        } catch (err) {
            error.value = err.message;
            console.error('Error cargando empleados:', err);
        } finally {
            loading.value = false
        }
    }

    // Crear empleado
    async function createEmployee(payload) {
        loading.value = true;
        error.value = null;
        
        try {
            await employeeService.create(payload);
            await loadEmployees();
        } catch (err) {
            error.value = err.message || String(err);
            console.error('Error creando empleados');
            throw err;
        } finally {
            loading.value = false;
        }
    }

    // Actualizar empleado
    async function updateEmployee(id, payload) {
        loading.value = true;
        error.value = null;

        try {
            await employeeService.update(id, payload);
            await loadEmployees();
        } catch (err) {
            error.value = err.message || String(err);
            console.error('Error actualizando empleado:', err)
            throw err;
        } finally {
            loading.value = false
        }
    }

    // Eliminar empleado
    async function deleteEmployee(id) {
        loading.value = true;
        error.value = null;

        try {
            await employeeService.delete(id);
            await loadEmployees();
        } catch (err) {
            error.value = err.message || String(err);
            console.error('Error eliminando empleado:', err);
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        employees,
        loading,
        error,
        loadEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
    };
    
}