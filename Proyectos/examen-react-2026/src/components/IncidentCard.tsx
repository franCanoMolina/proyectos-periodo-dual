import React from 'react'
import type { Incident, } from '../types';
import {useAuth} from '../context/AuthContext';
import { useIncidents} from '../context/IncididentsContext';

function IncidentCard({ incident }: { incident: Incident }) {

  let contenidoCard;
  const {user} = useAuth();
  const {removeIncident} = useIncidents();
  switch (incident.priority) {

    case "alta":
      contenidoCard = <div className='text-red-500'></div>
      break;

    case "media":
      contenidoCard = <div className='text-yellow-500'></div>
      break;

    case "baja":
      contenidoCard = <div className='text-green-500'></div>
      break;
      

    
}

  return (
    <div className='border-2 border-gray-600'>
      <div>
        <h1>{incident.title}</h1>
        <p>{incident.description}</p>
      </div>
      <div>
        <p>{contenidoCard}</p>
        <p>{incident.status}</p>
      </div>
      {user && 
      <button onClick={() => removeIncident(incident.id)}>Borrar</button>
      }
    </div>
  )
}

export default IncidentCard