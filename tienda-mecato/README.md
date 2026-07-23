# Tienda Mecato – Sistema de Gestión

Proyecto Angular 18+ para la evidencia **GA5-220501095-AA1-EV03** del programa ADSO del SENA.

## Requisitos previos
- Node.js 18+
- Angular CLI 18: `npm install -g @angular/cli`

## Instalación y ejecución

```bash
npm install
ng serve
```

Luego abre `http://localhost:4200`

## Estructura del proyecto

```
src/app/
├── core/
│   ├── guards/       # auth.guard, admin.guard
│   └── services/     # auth.service
├── models/           # Interfaces TypeScript
├── pages/
│   ├── login/
│   ├── dashboard/
│   ├── ventas/       # Módulo POS
│   ├── inventario/
│   ├── fiados/
│   └── reportes/
└── shared/
    └── sidebar/
```

## Credenciales de prueba
- **Admin**: admin@tienda.local / admin123 → Rol: Administrador
- **Cajero**: cualquier email / min 6 chars → Rol: Cajero

## Tecnologías
- Angular 18 (standalone components, signals)
- Angular Router (lazy loading)
- Reactive Forms
- SCSS (sin dependencias externas)