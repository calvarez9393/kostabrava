/** Fundación de Kosta Azul: 16 de septiembre de 1964 */
export const FECHA_FUNDACION_EMPRESA = new Date(1964, 8, 16);

/** Años completos transcurridos desde la fundación hasta la fecha indicada (por defecto, hoy). */
export function aniosDesdeFundacion(fechaReferencia = new Date()): number {
  const fundacion = FECHA_FUNDACION_EMPRESA;
  let anios = fechaReferencia.getFullYear() - fundacion.getFullYear();
  const cumpleEsteAno =
    fechaReferencia.getMonth() > fundacion.getMonth() ||
    (fechaReferencia.getMonth() === fundacion.getMonth() &&
      fechaReferencia.getDate() >= fundacion.getDate());
  if (!cumpleEsteAno) {
    anios--;
  }
  return anios;
}

export function textoAniosExperiencia(fechaReferencia = new Date()): string {
  return `${aniosDesdeFundacion(fechaReferencia)} años de experiencia`;
}

export function textoMasDeAniosExperiencia(fechaReferencia = new Date()): string {
  return `Más de ${aniosDesdeFundacion(fechaReferencia)} años de experiencia`;
}
