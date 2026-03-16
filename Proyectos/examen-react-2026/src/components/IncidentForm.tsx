import React, { useState } from 'react';
// Importamos el hook para crear la incidencia y el tipo de datos necesario
import { useIncidents } from '../context/IncididentsContext';
import type { CreateIncidentDTO } from '../types';

function IncidentForm() {
  // 1. Extraemos addIncident preparado en el contexto
  const { addIncident } = useIncidents();

  // 2. Estado del formulario (un único objeto con todos los campos)
  const [formData, setFormData] = useState<CreateIncidentDTO>({
    title: '',
    description: '',
    priority: 'media' // Por defecto
  });
  
  // Estado extra para mostrar si hay errores (ej. campos vacíos)
  const [errorMsg, setErrorMsg] = useState<string>('');

  // 3. Manejador genérico para actualizar el estado cada vez que el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Clona el estado actual y cambia solo el campo que disparó el evento (e.target.name)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 4. Manejador de envío de formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue (comportamiento por defecto del navegador)

    // Validación básica: no pueden estar vacíos ni con solo espacios
    if (!formData.title.trim() || !formData.description.trim()) {
      setErrorMsg('El título y la descripción son obligatorios.');
      return; // "return" corta la ejecución, por lo que no hace el addIncident
    }

    try {
      setErrorMsg(''); // Limpiamos errores previos si los hubiera
      
      // Llamamos a la API a través del contexto enviando los datos del estado
      await addIncident(formData);
      
      // Tras enviarlo con éxito, limpiamos/reseteamos el formulario al estado inicial
      setFormData({
        title: '',
        description: '',
        priority: 'media'
      });

    } catch (error) {
      setErrorMsg('Error al guardar la incidencia. ¿Estás logueado?');
    }
  };

  return (
    <div className='p-6 max-w-xl mx-auto border-2 border-gray-200 mt-4 rounded'>
      <h2 className='text-2xl font-bold mb-4'>Nueva Incidencia</h2>
      
      {/* Zona de error: si "errorMsg" tiene texto, muestra este párrafo en rojo */}
      {errorMsg && <p className='text-red-500 mb-4 bg-red-100 p-2 rounded'>{errorMsg}</p>}

      {/* Relacionamos el form con nuestra función handleSubmit */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        {/* Título */}
        <div>
          <label className='block font-semibold mb-1' htmlFor='title'>Título</label>
          {/* Fíjate en el "name" para que cuadre con estado, el "value" para unirlo y el "onChange" */}
          <input 
            type='text' 
            id='title'
            name='title' 
            value={formData.title} 
            onChange={handleChange} 
            className='w-full border-2 border-slate-300 rounded p-2'
            placeholder='Ej: Pantalla rota'
          />
        </div>

        {/* Descripción */}
        <div>
          <label className='block font-semibold mb-1' htmlFor='description'>Descripción</label>
          <textarea 
            id='description'
            name='description'
            value={formData.description} 
            onChange={handleChange} 
            rows={4}
            className='w-full border-2 border-slate-300 rounded p-2'
            placeholder='Describe detalladamente el problema...'
          />
        </div>

        {/* Prioridad */}
        <div>
          <label className='block font-semibold mb-1' htmlFor='priority'>Prioridad</label>
          <select 
            id='priority'
            name='priority'
            value={formData.priority} 
            onChange={handleChange}
            className='w-full border-2 border-slate-300 rounded p-2'
          >
            {/* Opciones requeridas */}
            <option value='alta'>Alta</option>
            <option value='media'>Media</option>
            <option value='baja'>Baja</option>
          </select>
        </div>

        {/* Botón */}
        <button 
          type='submit' 
          className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
        >
          Guardar Incidencia
        </button>
      </form>
    </div>
  );
}

export default IncidentForm;
