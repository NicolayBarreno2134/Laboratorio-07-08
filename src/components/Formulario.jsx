import Mensajes from "./Mensajes"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react'

export const Formulario = ({setEstado,idMetro}) => {

    const [error, setError] = useState(false)
    const [mensaje, setMensaje] = useState(false)
    const [errorServidor, setErrorServidor] = useState(false)
    const [form, setform] = useState({
            nombre:"",
            sector:"",
            salida:"",
            llegada:"",
            maquinista:"",
            detalles:""
        })
    
		useEffect(() => {
            if(idMetro)
            {
                (async function (idMetro) {
                    try {
                        const respuesta = await (await fetch(`http://localhost:3000/metro/${idMetro}`)).json()
                        const {id,nombre,sector,salida,llegada,maquinista,detalles} = respuesta
                        setform({
                            ...form,
                            nombre,
                            sector,
                            salida,
                            llegada,
                            maquinista,
                            detalles,
                            id
                        })
                    }
                    catch (error) {
                        console.log(error);
                    }
                })(idMetro)
            }
        }, [idMetro])


    const handleChange = (e) => { 
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formLimpio = Object.fromEntries(Object.entries(form).map(([campo, valor]) => [
            campo,
            typeof valor === 'string' ? valor.trim() : valor
        ]))

        if (Object.values(formLimpio).includes("") || Object.entries(formLimpio).length === 0)
        {
            setError(true)
            setTimeout(() => setError(false), 1000)
            return
        }

        try {
            const editando = Boolean(formLimpio.id)
            const url = editando
                ? `http://localhost:3000/metro/${formLimpio.id}`
                : 'http://localhost:3000/metro'

            if (!editando) formLimpio.id = uuidv4()

            const respuesta = await fetch(url, {
                method: editando ? 'PUT' : 'POST',
                body: JSON.stringify(formLimpio),
                headers: { 'Content-Type': 'application/json' }
            })

            if (!respuesta.ok) {
                throw new Error(`El servidor respondió ${respuesta.status}`)
            }

            setErrorServidor(false)
            setMensaje(!editando)
            setEstado(true)
            setform({})
            setTimeout(() => {
                setMensaje(false)
                setEstado(false)
                setform({})
            }, 1000)
        } catch (error) {
            console.error('No se pudo guardar la ruta:', error)
            setErrorServidor(true)
            setTimeout(() => setErrorServidor(false), 4000)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {error && <Mensajes tipo="bg-red-900">"Existen campos vacíos"</Mensajes>}
            {mensaje && <Mensajes tipo="bg-green-900">Registro exitoso</Mensajes>}
            {errorServidor && <Mensajes tipo="bg-red-900">No se pudo guardar. Verifica que el servidor local esté activo.</Mensajes>}
            <div>
                <label
                    htmlFor='nombre'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre de la ruta'
                    name='nombre'
                    value={form.nombre || ""} 
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='sector'
                    className='text-gray-700 uppercase font-bold text-sm'>Sector: </label>
                <input
                    id='sector'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='sector de la ruta'
                    name='sector'
                    value={form.sector || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='salida'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de salida: </label>
                <input
                    id='salida'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de salida'
                    name='salida'
                    value={form.salida || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='llegada'
                    className='text-gray-700 uppercase font-bold text-sm'>Punto de llegada: </label>
                <input
                    id='llegada'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='punto de llegada'
                    name='llegada'
                    value={form.llegada || ""}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label
                    htmlFor='maquinista'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del maquinista: </label>
                <input
                    id='maquinista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del maquinista'
                    name='maquinista'
                    value={form.maquinista || ""}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='detalles'
                    className='text-gray-700 uppercase font-bold text-sm'>Detalles: </label>
                <textarea
                    id='detalles'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    name='detalles'
                    value={form.detalles || ""}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-sky-900 w-full p-3 
        text-white uppercase font-bold rounded-lg 
        hover:bg-red-900 cursor-pointer transition-all'
        value={form.id ? "Actualizar ruta" : "Registrar ruta"} />

        </form>
    )
}




