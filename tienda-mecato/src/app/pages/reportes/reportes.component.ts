import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type TipoReporte = 'ventas' | 'inventario' | 'fiados';

const VENTAS_DATA = [
  {id:'V-0042',hora:'09:15',items:3,total:11600,metodo:'Efectivo',cajero:'Juan'},
  {id:'V-0043',hora:'10:32',items:5,total:8900, metodo:'Efectivo',cajero:'Juan'},
  {id:'V-0044',hora:'11:45',items:2,total:23400,metodo:'Fiado',   cajero:'Juan',cliente:'Doña Rosa'},
  {id:'V-0045',hora:'13:20',items:7,total:15200,metodo:'Efectivo',cajero:'María'},
];
const INVENTARIO_DATA = [
  {nombre:'Chocoramo',   cat:'Dulces', stock:8, costo:900},
  {nombre:'Gatorade',    cat:'Bebidas',stock:32,costo:2000},
  {nombre:'Papas Marg.', cat:'Snacks', stock:22,costo:1100},
  {nombre:'Bom Bom Bum', cat:'Dulces', stock:3, costo:280},
  {nombre:'Chocolatina', cat:'Dulces', stock:15,costo:450},
  {nombre:'Agua 600ml',  cat:'Bebidas',stock:48,costo:800},
];
const FIADOS_DATA = [
  {nombre:'Doña Rosa García',   tel:'300-123-4567',saldo:35000},
  {nombre:'Don Carlos Pérez',   tel:'310-987-6543',saldo:10000},
  {nombre:'Luis Fernando Díaz', tel:'300-789-1234',saldo:22500},
];

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  tipo      = signal<TipoReporte>('ventas');
  desde     = signal('2025-05-01');
  hasta     = signal('2025-05-19');
  generado  = signal(false);

  ventasData     = VENTAS_DATA;
  inventarioData = INVENTARIO_DATA;
  fiadosData     = FIADOS_DATA;

  totalVentas    = computed(() => this.ventasData.reduce((a, v) => a + v.total, 0) * 3);
  totalInventario= computed(() => this.inventarioData.reduce((a, p) => a + p.costo * p.stock, 0));
  totalFiados    = computed(() => this.fiadosData.reduce((a, c) => a + c.saldo, 0));

  fmt(v: number): string { return '$' + Math.round(v).toLocaleString('es-CO'); }
  cambiarTipo(t: TipoReporte): void { this.tipo.set(t); this.generado.set(false); }
  generar(): void { this.generado.set(true); }
  exportar(tipo: 'pdf'|'excel'): void { alert('Exportando reporte en ' + tipo.toUpperCase() + '... (funcionalidad conectada al backend)'); }
}