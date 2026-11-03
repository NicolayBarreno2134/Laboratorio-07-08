export const useTiempoLlegada = (distanciaKm) => {
  const distancia = Number(distanciaKm)

  if (!Number.isFinite(distancia) || distancia <= 0) {
    return 'Tiempo no disponible'
  }

  const minutos = Math.round((distancia / 40) * 60)
  return `${Math.max(1, minutos)} min aprox.`
}
