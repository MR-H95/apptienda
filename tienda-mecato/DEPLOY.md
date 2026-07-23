# 🚀 Guía de despliegue – Tienda Mecato Angular 18

## Paso 1 — Build de producción (siempre primero)

```bash
ng build --configuration production
```

Esto genera la carpeta: `dist/tienda-mecato/browser/`
Esa carpeta es lo que se sube a cualquier plataforma.

---

## Opción A — Netlify Drop (sin cuenta, listo en 2 min)

1. Corre el build:
```bash
ng build --configuration production
```

2. Abre https://app.netlify.com/drop en tu navegador

3. Arrastra la carpeta `dist/tienda-mecato/browser/` al área de la página

4. Netlify te da un link como: https://random-name-123.netlify.app

5. Comparte ese link con quien quieras ✅

> El link dura 1 hora sin cuenta. Con cuenta gratis dura para siempre.

---

## Opción B — Netlify con cuenta (link permanente gratis)

```bash
# Instalar CLI de Netlify
npm install -g netlify-cli

# Build
ng build --configuration production

# Login (abre el navegador)
netlify login

# Desplegar
netlify deploy --prod --dir dist/tienda-mecato/browser

# Te da: https://tu-proyecto.netlify.app
```

---

## Opción C — Vercel (link permanente, actualizaciones fáciles)

```bash
# Instalar CLI de Vercel
npm install -g vercel

# Build
ng build --configuration production

# Desplegar (la primera vez pide crear cuenta gratis)
vercel dist/tienda-mecato/browser --yes

# Para actualizar después:
ng build --configuration production
vercel dist/tienda-mecato/browser --prod
```

---

## Opción D — StackBlitz (comparte el código en vivo)

1. Abre https://stackblitz.com
2. Clic en "Import from ZIP" o "Upload"
3. Sube el archivo `tienda-mecato-angular.zip`
4. StackBlitz abre el proyecto y te da un link para compartir
5. Cualquiera puede verlo y editarlo sin instalar nada

> Ideal para mostrarle el código al instructor o trabajar en equipo.

---

## ⚠️ Problemas comunes

### Error: "Page not found" al refrescar la página
Solución: Ya está configurado. Los archivos `netlify.toml` y `vercel.json`
en la raíz del proyecto redirigen todas las rutas a `index.html`.

### Los estilos no cargan bien en producción
Solución: Asegúrate de usar siempre:
```bash
ng build --configuration production
```
NO uses `ng build` sin `--configuration production`.

### Error de CORS al conectar con el backend
Solución: En `NestJS`, agrega en `main.ts`:
```typescript
app.enableCors({ origin: 'https://tu-url.netlify.app' });
```

---

## Estructura del build generado

```
dist/tienda-mecato/browser/
├── index.html          ← archivo principal
├── main-[hash].js      ← código Angular compilado
├── polyfills-[hash].js ← compatibilidad con navegadores
├── styles-[hash].css   ← todos los estilos en un solo archivo
└── assets/             ← imágenes y recursos estáticos
```
