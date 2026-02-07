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

    
}