import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, Cliente, ItemCarrito } from '../../models';

const MOCK_PRODUCTOS: Producto[] = [
  {id:1,idCategoria:1,nombre:'Chocoramo',          codigoBarras:'CHO001',precioVenta:1500,precioCosto:900, stockActual:8, stockMinimo:10,activo:true,categoria:'Dulces'},
  {id:2,idCategoria:2,nombre:'Gatorade 500ml',      codigoBarras:'GAT001',precioVenta:3200,precioCosto:2000,stockActual:32,stockMinimo:15,activo:true,categoria:'Bebidas'},
  {id:3,idCategoria:3,nombre:'Papas Margarita',     codigoBarras:'PAP001',precioVenta:1800,precioCosto:1100,stockActual:22,stockMinimo:12,activo:true,categoria:'Snacks'},
  {id:4,idCategoria:1,nombre:'Bom Bom Bum',         codigoBarras:'BBB001',precioVenta:500, precioCosto:280, stockActual:3, stockMinimo:20,activo:true,categoria:'Dulces'},
  {id:5,idCategoria:1,nombre:'Chocolatina Jet',     codigoBarras:'JET001',precioVenta:800, precioCosto:450, stockActual:15,stockMinimo:15,activo:true,categoria:'Dulces'},
  {id:6,idCategoria:2,nombre:'Agua 600ml',          codigoBarras:'AGU001',precioVenta:1500,precioCosto:800, stockActual:48,stockMinimo:24,activo:true,categoria:'Bebidas'},
  {id:7,idCategoria:3,nombre:'Doritos',             codigoBarras:'DOR001',precioVenta:2500,precioCosto:1500,stockActual:4, stockMinimo:10,activo:true,categoria:'Snacks'},
  {id:8,idCategoria:1,nombre:'Chiclets',            codigoBarras:'CHI001',precioVenta:300, precioCosto:150, stockActual:60,stockMinimo:30,activo:true,categoria:'Dulces'},
];
const MOCK_CLIENTES: Cliente[] = [
  {id:1,nombre:'Doña Rosa García',  telefono:'300-123-4567',tieneCredito:true,saldo:35000},
  {id:2,nombre:'Don Carlos Pérez',  telefono:'310-987-6543',tieneCredito:true,saldo:10000},
  {id:3,nombre:'Luis Fernando Díaz',telefono:'300-789-1234',tieneCredito:true,saldo:22500},
];

type MetodoPago = 'efectivo' | 'transferencia' | 'fiado';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {
  busqueda = signal('');
  carrito  = signal<ItemCarrito[]>([]);
  metodo   = signal<MetodoPago>('efectivo');
  ventaOk  = signal(false);

  productosFiltrados = computed(() => {
    const q = this.busqueda().toLowerCase();
    if (!q) return [];
    return MOCK_PRODUCTOS.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      (p.codigoBarras?.toLowerCase().includes(q))
    );
  });

  total = computed(() =>
    this.carrito().reduce((a, i) => a + i.subtotal, 0)
  );

  clientes = MOCK_CLIENTES;

  fmt(v: number): string { return '$' + v.toLocaleString('es-CO'); }

  agregar(p: Producto): void {
    this.carrito.update(items => {
      const ex = items.find(i => i.producto.id === p.id);
      if (ex) return items.map(i => i.producto.id === p.id
        ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * i.producto.precioVenta }
        : i);
      return [...items, { producto: p, cantidad: 1, subtotal: p.precioVenta }];
    });
    this.busqueda.set('');
  }

  quitar(id: number): void {
    this.carrito.update(items => items.filter(i => i.producto.id !== id));
  }

  cambiarCantidad(id: number, cant: number): void {
    if (cant < 1) return;
    this.carrito.update(items => items.map(i =>
      i.producto.id === id
        ? { ...i, cantidad: cant, subtotal: cant * i.producto.precioVenta }
        : i
    ));
  }

  cobrar(): void {
    if (this.carrito().length === 0) return;
    this.ventaOk.set(true);
  }

  nuevaVenta(): void {
    this.carrito.set([]);
    this.ventaOk.set(false);
    this.busqueda.set('');
    this.metodo.set('efectivo');
  }
}