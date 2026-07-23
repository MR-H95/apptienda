import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem { path: string; icon: string; label: string; adminOnly?: boolean; }

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly NAV_ITEMS: NavItem[] = [
    { path: '/dashboard',   icon: '🏠', label: 'Dashboard' },
    { path: '/ventas',      icon: '💰', label: 'Ventas (POS)' },
    { path: '/inventario',  icon: '📦', label: 'Inventario',   adminOnly: true },
    { path: '/fiados',      icon: '📋', label: 'Fiados' },
    { path: '/reportes',    icon: '📊', label: 'Reportes',     adminOnly: true },
  ];

  navItems = computed(() =>
    this.NAV_ITEMS.filter(n => !n.adminOnly || this.auth.isAdmin())
  );

  constructor(public auth: AuthService) {}
  logout() { this.auth.logout(); }
}