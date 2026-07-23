export interface Usuario {
  id: number; idRol: number; nombre: string;
  email: string; activo: boolean; rol?: string;
}
export interface Producto {
  id: number; idCategoria: number; nombre: string;
  codigoBarras?: string; precioVenta: number; precioCosto: number;
  stockActual: number; stockMinimo: number; activo: boolean; categoria?: string;
}
export interface Cliente {
  id: number; nombre: string; telefono?: string;
  direccion?: string; tieneCredito: boolean; saldo: number;
}
export interface Venta {
  id: string; hora: string; items: number; total: number;
  metodoPago: string; cajero: string; cliente?: string;
}
export interface Compra {
  id: string; proveedor: string; fecha: string;
  total: number; estado: 'pendiente'|'recibida'|'cancelada';
}
export interface ItemCarrito {
  producto: Producto; cantidad: number; subtotal: number;
}