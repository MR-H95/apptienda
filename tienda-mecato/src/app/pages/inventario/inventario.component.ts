import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models';

const MOCK: Producto[] = [
  {id:1,idCategoria:1,nombre:'Chocoramo',      codigoBarras:'CHO001',precioVenta:1500,precioCosto:900, stockActual:8, stockMinimo:10,activo:true,categoria:'Dulces'},
  {id:2,idCategoria:2,nombre:'Gatorade 500ml', codigoBarras:'GAT001',precioVenta:3200,precioCosto:2000,stockActual:32,stockMinimo:15,activo:true,categoria:'Bebidas'},
  {id:3,idCategoria:3,nombre:'Papas Margarita',codigoBarras:'PAP001',precioVenta:1800,precioCosto:1100,stockActual:22,stockMinimo:12,activo:true,categoria:'Snacks'},
  {id:4,idCategoria:1,nombre:'Bom Bom Bum',    codigoBarras:'BBB001',precioVenta:500, precioCosto:280, stockActual:3, stockMinimo:20,activo:true,categoria:'Dulces'},
  {id:5,idCategoria:1,nombre:'Chocolatina Jet',codigoBarras:'JET001',precioVenta:800, precioCosto:450, stockActual:15,stockMinimo:15,activo:true,categoria:'Dulces'},
  {id:6,idCategoria:2,nombre:'Agua 600ml',     codigoBarras:'AGU001',precioVenta:1500,precioCosto:800, stockActual:48,stockMinimo:24,activo:true,categoria:'Bebidas'},
  {id:7,idCategoria:3,nombre:'Doritos',        codigoBarras:'DOR001',precioVenta:2500,precioCosto:1500,stockActual:4, stockMinimo:10,activo:true,categoria:'Snacks'},
  {id:8,idCategoria:1,nombre:'Chiclets',       codigoBarras:'CHI001',precioVenta:300, precioCosto:150, stockActual:60,stockMinimo:30,activo:true,categoria:'Dulces'},
];

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  busqueda  = signal('');
  categoria = signal('Todas');
  productos = signal<Producto[]>(MOCK);

  categorias = ['Todas', ...new Set(MOCK.map(p => p.categoria!))];

  filtrados = computed(() => {
    const q   = this.busqueda().toLowerCase();
    const cat = this.categoria();
    return this.productos().filter(p =>
      (cat === 'Todas' || p.categoria === cat) &&
      (p.nombre.toLowerCase().includes(q) || p.codigoBarras?.includes(q))
    );
  });

  alertas = computed(() => this.productos().filter(p => p.stockActual < p.stockMinimo));
  nombresAlertas = computed(() => this.alertas().map(p => p.nombre).join(', '));

  fmt(v: number): string { return '$' + v.toLocaleString('es-CO'); }
  esAlerta(p: Producto): boolean { return p.stockActual < p.stockMinimo; }
}