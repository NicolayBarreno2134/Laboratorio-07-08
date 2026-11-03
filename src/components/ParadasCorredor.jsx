import { useEffect, useState } from 'react'

const ParadasCorredor = ({ troncal }) => {
  const [paradas, setParadas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarParadas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/paradas')
        const datos = await respuesta.json()
        // Filtra solo las paradas del corredor recibido por props
        setParadas(datos.filter((p) => p.troncal === troncal))
      } catch (error) {
        console.log(error)
      } finally {
        setCargando(false)
      }
    }
    cargarParadas()
  }, [troncal])

  if (cargando) return <p>Cargando paradas...</p>

  return (
    <ul className="list-disc ml-6 dark:text-white">
      {paradas.map((p) => (
        <li key={p.id}>{p.nombre}</li>
      ))}
    </ul>
  )
}

export default ParadasCorredor