import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

function HomePage() {
  return (
    <div className='p-8 text-center'>
     {/*Título de bienvenida con el nombre del alumno */}
      <h1 >
        Bienvenido a IncidTech - Web realizada por Francisco Cano
      </h1>

     
      {/* Enlace para navegar a la lista de incidencias */}
      <Link 
        to='/incidents' 
        className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded inline-block mt-4'
      >
        Ir a la lista de incidencias
      </Link>
    </div>
  );
}

export default HomePage;
