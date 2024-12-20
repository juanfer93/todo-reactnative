import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome',
        tasks: 'Tasks',
        addTask: 'Add Task',
        saveChanges: 'Save Changes',
        deleteTask: 'Delete Task',
        title: 'Title',
        description: 'Description',
        createTask: 'Create Task',
        success: 'Success',
        taskCreated: 'Task created successfully!',
        taskUpdated: 'Task updated successfully!',
        error: 'Error',
        provideBothFields: 'Please provide both title and description.',
        areYouSure: 'Are you sure?',
        deleteWarning: 'This action cannot be undone.',
        cancel: 'Cancel',
        delete: 'Delete',
        deleteFailed: 'Failed to delete the task.',
        updateFailed: 'Failed to update the task.',
        details: 'Details',
        taskDeleted: "Task deleted successfully!",
      },
    },
    es: {
      translation: {
        welcome: 'Bienvenido',
        tasks: 'Tareas',
        addTask: 'Agregar Tarea',
        saveChanges: 'Guardar Cambios',
        deleteTask: 'Eliminar Tarea',
        title: 'Título',
        description: 'Descripción',
        createTask: 'Crear Tarea',
        success: 'Éxito',
        taskCreated: '¡Tarea creada con éxito!',
        taskUpdated: '¡Tarea actualizada con éxito!',
        error: 'Error',
        provideBothFields: 'Por favor, proporcione tanto el título como la descripción.',
        areYouSure: '¿Está seguro?',
        deleteWarning: 'Esta acción no se puede deshacer.',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        deleteFailed: 'No se pudo eliminar la tarea.',
        updateFailed: 'No se pudo actualizar la tarea.',
        details: 'Detalles',
        taskDeleted: "¡Tarea eliminada con éxito!",
      },
    },
  },  
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
