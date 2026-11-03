import './App.css'
import logoDarkMode from './assets/dark.png'
import logoBusesQuito from './assets/Buses-Quito.png'
import { Formulario } from './components/Formulario'
import Listar from './components/Listar'
import { useState } from 'react'
import ParadasCorredor from './components/ParadasCorredor'

const ParadaBus = ({ nombre, troncal }) => {
  return (
    <div className="bg-sky-100 p-3 rounded-lg dark:bg-slate-700 dark:text-white my-2">
      <h3 className="font-bold">Parada: {nombre}</h3>
      <p>Línea / Troncal: {troncal}</p>
    </div>
  );
};


const ControlOcupacion = ({ troncal }) => {
  const [pasajeros, setPasajeros] = useState(0);
  const capacidad = 50;
  const llena = pasajeros >= capacidad;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md dark:bg-slate-800 dark:text-white mt-4 border-2 border-sky-600">
      <h4 className="font-bold text-lg mb-2">Aforo de la Unidad ({troncal})</h4>
      <p className="mb-2">Pasajeros a bordo: <span className="text-2xl font-bold text-sky-700 dark:text-sky-300">{pasajeros}</span> / {capacidad}</p>

      {llena
        ? <p className="mb-4 font-bold text-red-600">Unidad Llena</p>
        : <p className="mb-4 font-bold text-green-600">Espacio Disponible</p>
      }

      <div className="flex gap-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => setPasajeros(pasajeros + 1)} disabled={llena}>+ Ingreso</button>
        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => setPasajeros(pasajeros > 0 ? pasajeros - 1 : 0)}>- Salida</button>
        <button className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700" onClick={() => setPasajeros(0)}>Vaciar</button>
      </div>
    </div>
  );
};

function App() {
  const [darkMode, setdarkMode] = useState(false)
  const [estado, setEstado] = useState(false)
  const [idMetro, setIdmetro] = useState(0) 
  const [troncalActiva, setTroncalActiva] = useState("Ecovía")

  return (
    <div className={darkMode ? "dark" : ""}>

      <nav className='bg-white h-20 flex justify-around items-center dark:bg-slate-800'>
        <img className='cursor-pointer' src={logoBusesQuito} alt="logo" width={50} height={50} />
        <ul className='flex items-center'>
          <li><img className='cursor-pointer' src={logoDarkMode} alt="logo" width={40} height={40} onClick={() => setdarkMode(!darkMode)} /></li>
          <li><a className='bg-sky-800 text-white px-6 py-2 rounded-full ml-8 hover:bg-red-700 hover:text-white' href="#">Salir</a></li>
        </ul>
      </nav>

      <div className="container mx-auto p-3 mt-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
               <h2 className="text-xl font-bold dark:text-white mb-2">Ruta Activa </h2>
               <ParadaBus nombre="Estadio Olímpico" troncal="Ecovía" />
               <ParadaBus nombre="Marín Central" troncal="Corredor Sur Oriental" />
                             <select
                  value={troncalActiva}
                  onChange={(e) => setTroncalActiva(e.target.value)}
                  className="border-2 rounded-md p-2 my-3 dark:bg-slate-700 dark:text-white"
               >
                  <option value="Ecovía">Ecovía</option>
                  <option value="Corredor Sur Oriental">Corredor Sur Oriental</option>
               </select>
               <ParadasCorredor troncal={troncalActiva} />
            </div>
            <div>
              <ControlOcupacion troncal={troncalActiva} />
            </div>
         </div>
      </div>

      <main className='container mx-auto flex gap-5 flex-wrap justify-center p-3 lg:flex-nowrap '>
        
        <div className='bg-slate-50 w-full m-3 p-5 shadow-lg rounded-lg lg:w-1/2 dark:border-2 border-sky-900 dark:bg-slate-800'>
          <div className="flex items-center space-x-10">
            <hr className="w-80 border border-gray-400" />
            <div className="sm:w-40 font-semibold text-gray-600 dark:text-gray-300 w-full text-center">Gestión de Buses</div>
            <hr className="w-80 border border-gray-400" />
          </div>
          <div className='mt-10'>
              <Formulario setEstado={setEstado} idMetro={idMetro}/>
          </div>
        </div>
        
        <div className='bg-slate-50 w-full m-3 p-5 shadow-lg rounded-lg lg:w-1/2 dark:border-2 border-sky-900 dark:bg-slate-800'>
          <div className="flex items-center space-x-10">
            <hr className="w-80 border border-gray-400" />
            <div className="sm:w-40 font-semibold text-gray-600 dark:text-gray-300 w-full text-center">Unidades Registradas</div>
            <hr className="w-80 border border-gray-400" />
          </div>
          <div className='mt-10 h-[675px] overflow-y-auto'>
              <Listar estado={estado} setIdmetro={setIdmetro}/>
          </div>
        </div>
      </main>

    </div>
  )
}

export default App