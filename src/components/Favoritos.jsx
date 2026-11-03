import { useEffect, useState } from 'react'

const STORAGE_KEY = 'paradasFavoritas'

export const Favoritos = () => {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = window.localStorage.getItem(STORAGE_KEY)
      if (!guardados) return []
      const datos = JSON.parse(guardados)
      return Array.isArray(datos) ? datos.filter((item) => typeof item === 'string') : []
    } catch {
      return []
    }
  })
  const [nuevoFavorito, setNuevoFavorito] = useState('')

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
    } catch {
      // Mantiene la interfaz usable si el navegador bloquea el almacenamiento.
    }
  }, [favoritos])

  const agregarFavorito = (event) => {
    event.preventDefault()
    const nombre = nuevoFavorito.trim()
    if (!nombre || favoritos.includes(nombre)) return
    setFavoritos((actuales) => [...actuales, nombre])
    setNuevoFavorito('')
  }

  const quitarFavorito = (nombre) => {
    setFavoritos((actuales) => actuales.filter((item) => item !== nombre))
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 shadow dark:border-slate-700 dark:bg-slate-800 dark:text-white">
      <h2 className="mb-2 text-lg font-bold">Rutas y paradas favoritas</h2>
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        Escribe el nombre de una ruta o parada y pulsa «Agregar».
      </p>
      <form onSubmit={agregarFavorito} className="mb-4 flex flex-wrap gap-2">
        <input
          value={nuevoFavorito}
          onChange={(event) => setNuevoFavorito(event.target.value)}
          placeholder="Ej.: Quitumbe o Ecovía"
          aria-label="Nombre de ruta o parada favorita"
          className="min-w-0 flex-1 rounded border border-slate-300 px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />
        <button type="submit" className="rounded bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800">
          Agregar favorito
        </button>
      </form>
      {favoritos.length === 0 ? (
        <p className="text-sm text-slate-600 dark:text-slate-300">Todavía no hay favoritos guardados.</p>
      ) : (
        <ul className="space-y-2">
          {favoritos.map((favorito) => (
            <li key={favorito} className="flex items-center justify-between gap-3">
              <span>⭐ {favorito}</span>
              <button
                type="button"
                onClick={() => quitarFavorito(favorito)}
                className="rounded px-2 py-1 text-sm text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-slate-700"
                aria-label={`Quitar ${favorito} de favoritos`}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
