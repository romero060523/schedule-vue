<template>
  <div class="min-vh-100 bg-light py-5">
    <div class="container">
      <!-- Encabezado -->
      <div class="row mb-5">
        <div class="col">
          <h1 class="display-5 fw-bold text-primary mb-2">Empleados</h1>
          <p class="text-muted fs-6">Gestión de empleados desde Supabase</p>
        </div>
      </div>

      <!-- Estado-->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="text-muted mt-3">Cargando datos...</p>
      </div>

      <!-- Tabla -->
      <div v-else class="card shadow-sm border-0">
        <div class="table-responsive">
          <table class="table table-hover table-striped mb-0">
            <thead class="table-dark">
              <tr>
                <th class="fw-600">Nombre</th>
                <th class="fw-600">Estado</th>
                <th class="fw-600">Fecha de Creación</th>
                <th class="fw-600 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuarios in users" :key="usuarios.id" class="align-middle">
                <td class="fw-500">{{ usuarios.name }}</td>
                <td>
                  <span 
                    :class="['badge', 'fs-6', usuarios.active ? 'bg-success' : 'bg-danger']"
                  >
                    {{ usuarios.active ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="text-muted">
                  {{ new Date(usuarios.created_at).toLocaleDateString('es-ES') }}
                </td>
                <td class="text-center">
                  <div class="btn-group" role="group">
                    <button class="btn btn-sm btn-outline-primary" title="Editar">
                      <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" title="Eliminar">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.min-vh-100 {
  min-height: 100vh;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.display-5 {
  font-size: 2.5rem;
  font-weight: 700;
}

.fw-600 {
  font-weight: 600;
}

.fw-500 {
  font-weight: 500;
}

.card {
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.table thead {
  border-radius: 12px 12px 0 0;
}

.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: rgba(13, 110, 253, 0.05);
}

.btn-group {
  gap: 0.25rem;
}

.badge {
  padding: 0.5rem 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.text-muted {
  color: #6c757d !important;
}

@media (max-width: 768px) {
  .display-5 {
    font-size: 1.8rem;
  }

  .col-md-4.text-end {
    text-align: left !important;
    margin-top: 1rem;
  }
}
</style>