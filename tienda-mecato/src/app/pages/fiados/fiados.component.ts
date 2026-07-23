import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models';

interface ClienteConSaldo extends Cliente { saldo: number; }

const MOCK: ClienteConSaldo[] = [
  {id:1,nombre:'Doña Rosa García',   telefono:'300-123-4567',tieneCredito:true,saldo:35000},
  {id:2,nombre:'Don Carlos Pérez',   telefono:'310-987-6543',tieneCredito:true,saldo:10000},
  {id:3,nombre:'Ana Milena Torres',  telefono:'320-555-1234',tieneCredito:true,saldo:0},
  {id:4,nombre:'Luis Fernando Díaz', telefono:'300-789-1234',tieneCredito:true,saldo:22500},
];

@Component({
  selector: 'app-fiados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fiados.component.html',
  styleUrl: './fiados.component.scss'
})
export class FiadosComponent {
  clientes = signal<ClienteConSaldo[]>(MOCK);
  selected = signal<ClienteConSaldo | null>(null);
  montoAbono = signal(0);
  abonoOk    = signal(false);

  fmt(v: number): string { return '$' + v.toLocaleString('es-CO'); }

  estadoBadge(saldo: number): string {
    if (saldo === 0) return 'badge-green';
    return saldo > 20000 ? 'badge-red' : 'badge-yellow';
  }
  estadoLabel(saldo: number): string {
    if (saldo === 0) return 'Al día';
    return saldo > 20000 ? 'Vencido' : 'Pendiente';
  }

  seleccionar(c: ClienteConSaldo): void { this.selected.set(c); this.abonoOk.set(false); this.montoAbono.set(0); }
  volver(): void { this.selected.set(null); }

  registrarAbono(): void {
    const m = this.montoAbono();
    if (m <= 0) return;
    const c = this.selected()!;
    const nuevoSaldo = Math.max(0, c.saldo - m);
    const updated = { ...c, saldo: nuevoSaldo };
    this.selected.set(updated);
    this.clientes.update(list => list.map(x => x.id === c.id ? updated : x));
    this.abonoOk.set(true);
  }
}