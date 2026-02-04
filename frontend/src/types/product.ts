export interface Product {
  id: number
  nombre: string
  descripcion: string
  unidad_medida: string
  precio: number
  stock: number
  iva: string
  descuento: string
  photo_prod: string | null
  calificacion_promedio?: number
}


