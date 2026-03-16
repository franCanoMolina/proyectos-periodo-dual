import React from 'react';
import { useIncidents } from '../context/IncididentsContext'; 
import IncidentCard from '../components/IncidentCard';

function IncidentPage() {
  // Usa el hook useIncidents() para obtener la lista y el estado de carga
  const { incidents, loading } = useIncidents();

  // Mientras loading sea true, muestra un mensaje de "Cargando incidencias..."
  if (loading) {
    return <div>Cargando incidencias...</div>;
  }

  // Si la lista está vacía muestra este mensaje
  if (incidents.length === 0) {
    return <div>No hay incidencias registradas</div>;
  }

  return (
    <div>
      <h2>Lista de Incidencias</h2>
      <div>
        {/* Renderiza un componente IncidentCard por cada incidencia de la lista */}
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}

      </div>
    </div>
  );
}

export default IncidentPage;
