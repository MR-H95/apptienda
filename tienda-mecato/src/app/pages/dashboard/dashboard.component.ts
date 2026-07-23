import { Component, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Venta } from '../../models';

const MOCK_VENTAS: Venta[] = [
  { id:'V-0042', hora:'09:15', items:3, total:11600, metodoPago:'efectivo', cajero:'Juan' },
  { id:'V-0043', hora:'10:32', items:5, total:8900,  metodoPago:'efectivo', cajero:'Juan' },
  { id:'V-0044', hora:'11:45', items:2, total:23400, metodoPago:'fiado',    cajero:'Juan', cliente:'Doña Rosa' },
  { id:'V-0045', hora:'13:20', items:7, total:15200, metodoPago:'efectivo', cajero:'María' },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ventas = MOCK_VENTAS;
  alertasStock = 3;
  clientesConSaldo = 3;

  totalHoy = computed(() => this.ventas.reduce((a, v) => a + v.total, 0));
  fiadosPendientes = 67500;
  comprasMes = 250000;

  constructor(public auth: AuthService) {}

  formatCurrency(v: number): string {
    return '$' + v.toLocaleString('es-CO');
  }
}