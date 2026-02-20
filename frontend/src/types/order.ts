import  type {Product} from "../types/product"
import type {MeData} from "../types/auth.types"

export type OrderType = "solicitado" | "en proceso" | "en camino" | "entregado"

export interface Order{
    cliente: MeData
    fecha_vemta: Date
    fecha_pedido: Date
    estado: OrderType
    direccion: string
}

export interface Detail{
    pedido: Order
    productos: Product
    cantidad: number
    subtotal: number
    total: number
}