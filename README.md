# Kosta Brava — Sitio Web Corporativo

Sitio web B2B de **Kosta Brava**, marca de dotaciones empresariales de Kosta Azul S.A.S. Desarrollado en Angular 21 con Bootstrap 5, PrimeNG 21 y ng-bootstrap 20.

---

## Tabla de contenido

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura de componentes](#arquitectura-de-componentes)
- [Sistema de diseño](#sistema-de-diseño)
- [Directiva de animación](#directiva-de-animación-kbreveal)
- [Rutas](#rutas)
- [Servicios e integración API](#servicios-e-integración-api)
- [Assets](#assets)
- [SEO](#seo)
- [Build y despliegue](#build-y-despliegue)

---

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21.2 | Framework principal (NgModule + nuevo `@angular/build` con esbuild) |
| TypeScript | 5.9 | Lenguaje |
| Bootstrap | 5.3 | Layout y grid responsivo |
| PrimeNG | 21.1 | Carousel, Galleria, Toast (con `@primeuix/themes` — preset Aura) |
| ng-bootstrap | 20.0 | Modales |
| HttpClient | — | Envío de formulario de contacto (vía `provideHttpClient`) |
| Google Fonts | — | Lexend + Source Sans 3 |

---

## Requisitos previos

- Node.js **^20.19.0** o **^22.12.0** o **>=24.0.0**
- npm **>=8**
- Angular CLI **21**

```bash
npm install -g @angular/cli@21
```

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd kostabrava

# 2. Instalar dependencias
npm install

# 3. Levantar servidor de desarrollo
npm start
# → http://localhost:4200
```

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor de desarrollo en `localhost:4200` |
| `npm run build` | Build de producción en `dist/kostabrava/` |
| `npm run watch` | Build de desarrollo con hot-reload |
| `npm test` | Ejecutar pruebas unitarias con Karma |

---

## Estructura del proyecto

```
kostabrava/
├── src/
│   ├── index.html               # Punto de entrada, meta tags SEO, carga de fuentes
│   ├── styles.css               # Estilos globales, design tokens, animaciones
│   ├── main.ts                  # Bootstrap del AppModule
│   └── app/
│       ├── app.module.ts        # Módulo raíz, providers modernos (provideHttpClient, providePrimeNG)
│       ├── app-routing.module.ts
│       ├── app.component.*
│       ├── reveal.directive.ts  # Directiva scroll-reveal (kbReveal)
│       ├── inicio/              # Página de inicio (home)
│       ├── catalogo/            # Catálogo de productos con filtros
│       ├── galeria/             # Modal de galería de imágenes
│       ├── formulario/          # Formulario de contacto
│       ├── menu/                # Barra de navegación
│       ├── footer/              # Pie de página
│       └── services/
│           ├── login.service.ts       # Autenticación JWT con la intranet
│           └── send-correos.service.ts # Envío de correo via API interna
├── src/assets/
│   ├── asesores/     # Fotos del equipo de asesores
│   ├── banners/      # Imágenes del hero y banners parallax
│   ├── catalogo/     # Imágenes de productos del catálogo
│   └── logos/        # Logos de clientes corporativos
├── angular.json      # Configuración del builder @angular/build:application
├── package.json
└── tsconfig.json     # TS 5.9 con module: "preserve"
```

> Todos los componentes están declarados en `AppModule` con `standalone: false`. Si en el futuro se migra a arquitectura standalone, ejecutar el schematic `ng generate @angular/core:standalone`.

---

## Arquitectura de componentes

### `MenuComponent` — Barra de navegación

**Selector:** `app-menu`

Navbar fijo (sticky) con fondo rojo corporativo. Detecta el scroll para agregar sombra elevada al superar 50px.

```typescript
scrolled = false;

@HostListener('window:scroll', [])
onScroll(): void {
  this.scrolled = window.pageYOffset > 50;
}
```

- Logo con `filter: brightness(0) invert(1)` para mostrarse en blanco sobre rojo
- Botón CTA "Contáctanos" con fondo blanco e ícono rojo (contraste invertido)
- Indicador de subrayado blanco animado en links al hover (`::after scaleX`)
- Hamburger menu responsivo para móvil (Bootstrap collapse)

---

### `InicioComponent` — Página de inicio

**Selector:** `app-inicio`
**Ruta:** `/`

Página principal con 6 secciones, cada una precedida por una **banda de título parallax**.

#### Parallax del hero

El hero usa `requestAnimationFrame` para mover el fondo según el scroll, sin bloquear el hilo principal:

```typescript
scrollY = 0;
private rafPending = false;

@HostListener('window:scroll', [])
onWindowScroll(): void {
  if (!this.rafPending) {
    window.requestAnimationFrame(() => {
      this.scrollY = window.pageYOffset;
      this.rafPending = false;
    });
    this.rafPending = true;
  }
}

get heroParallax(): string {
  const shift = Math.min(this.scrollY * 0.28, 160);
  return `translateY(${shift}px)`;
}
```

#### Secciones de la página

| Sección | Descripción |
|---|---|
| Hero | Banner principal con efecto parallax JS |
| Quiénes Somos | Video corporativo + texto + estadísticas |
| Catálogo | 4 tarjetas de categoría con links al catálogo |
| Nuestros Clientes | Carousel automático con logos de clientes (PrimeNG) |
| Equipo de Asesores | Grid de tarjetas con foto, email y teléfono |
| Banda CTA | Sección parallax CSS con fondo rojo fijo y botón de cotización |
| Por qué Elegirnos | Lista de ventajas + imagen |
| Contacto | Formulario de contacto embebido |

#### Agregar o modificar un asesor

Editar el array `empleados` en `inicio.component.ts`:

```typescript
empleados: Empleado[] = [
  {
    nombre: 'Luis Fernando Ladino',
    telefono: '3168968248',
    correo: 'luisfernando.ladino@kostazul.com',
    url: 'assets/asesores/FERNANDO-LADINO-01-01-2048x2048.jpg'
  },
  // añadir aquí...
];
```

#### Agregar un logo de cliente

Editar el array `items` en `inicio.component.ts`:

```typescript
items: Item[] = [
  { url: 'assets/logos/frisby-1.png', title: 'Frisby' },
  // añadir aquí...
];
```

---

### `CatalogoComponent` — Catálogo de productos

**Selector:** `app-catalogo`
**Ruta:** `/catalogo/:id`

El parámetro `:id` acepta: `masculino`, `femenino`, `operativo`, `calzado`.

#### Interfaces de datos

```typescript
interface Image {
  url: string;
  alt: string;
}

interface Categoria {
  nombre: string;
  imagenes: Image[];
}

interface Catalogo {
  nombre: string;
  categorias: Categoria[];
}
```

#### Métodos principales

| Método | Descripción |
|---|---|
| `ngOnInit()` | Lee el parámetro de ruta y carga el catálogo correspondiente |
| `filtrar(texto: string)` | Filtra las categorías visibles por nombre |
| `abrir_imagenes(lista: Image[])` | Abre el modal `GaleriaComponent` con las imágenes de la categoría |

#### Apertura del modal de galería

```typescript
abrir_imagenes(lista: Image[]): void {
  const modalRef = this.modal.open(GaleriaComponent, {
    size: 'xl',
    windowClass: 'kb-gallery-window',
    backdropClass: 'kb-gallery-backdrop',
    centered: true
  });
  modalRef.componentInstance.imagenes = lista;
}
```

---

### `GaleriaComponent` — Modal de galería

**Selector:** `app-galeria`
**Uso:** Solo como modal (ng-bootstrap), no tiene ruta propia.

Recibe el array de imágenes via `@Input()` desde `CatalogoComponent`.

```typescript
@Input() imagenes!: Image[];
constructor(public activeModal: NgbActiveModal) {}
```

- Usa `p-galleria` de PrimeNG con navegación y thumbnails
- Header personalizado con nombre de marca y botón de cierre
- Oculta navegación y thumbnails si solo hay 1 imagen

#### Responsive options

```typescript
responsiveOptions = [
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px',  numVisible: 3 },
  { breakpoint: '560px',  numVisible: 2 }
];
```

---

### `FormularioComponent` — Formulario de contacto

**Selector:** `app-formulario`

Formulario reactivo con validación y envío a la API interna de Kosta Azul.

#### Campos del formulario

| Campo | Tipo input | Validación |
|---|---|---|
| nombre | text | Requerido |
| correo | email | Requerido, formato email |
| telefono | tel | Requerido |
| empresa | text | Requerido |
| mensaje | textarea | Requerido |

#### Flujo de envío

```
guardarFormulario()
  └─ SendCorreosService.sendcorreos(formulario)
       └─ validarLogin()           → POST /api/auth/login/
            └─ switchMap(token)    → POST /api/correos/ con Bearer token
                 └─ tap()          → toast de éxito (PrimeNG) + reset del form
```

---

### `FooterComponent` — Pie de página

**Selector:** `app-footer`

Footer con fondo rojo oscuro degradado. El año del copyright se calcula dinámicamente:

```typescript
readonly currentYear = new Date().getFullYear();
```

Contiene:
- Logo de la marca en blanco
- Tagline y links a redes sociales (WhatsApp, Instagram, LinkedIn, Facebook)
- Menú de navegación interno
- Direcciones y teléfonos de las dos plantas (Dosquebradas y Bogotá)
- Barra inferior con copyright

> Para actualizar los links de redes sociales editar `footer.component.html` — buscar los elementos `<a class="kb-social-link">`.

---

## Sistema de diseño

Todos los tokens de diseño están definidos como variables CSS en `src/styles.css`:

```css
:root {
  --kb-red:        #A51D36;   /* Rojo corporativo principal */
  --kb-red-dark:   #7b1528;   /* Rojo oscuro — hover, scrolled navbar, footer */
  --kb-red-hover:  #8e1830;
  --kb-red-light:  #fdf2f4;   /* Fondo suave rojo */
  --kb-navy:       #1e293b;   /* Texto principal */
  --kb-gray:       #64748b;   /* Texto secundario */
  --kb-gray-light: #94a3b8;
  --kb-border:     #e2e8f0;
  --kb-bg:         #f8fafc;   /* Fondo secciones alternas */
  --kb-white:      #ffffff;

  --kb-shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05);
  --kb-shadow:    0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05);
  --kb-shadow-lg: 0 10px 30px rgba(0,0,0,0.14);

  --kb-radius:    12px;
  --kb-radius-sm: 8px;
  --kb-transition: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Tipografía

| Familia | Pesos | Uso |
|---|---|---|
| **Lexend** | 300–700 | Headings, navbar, badges, números estadísticos |
| **Source Sans 3** | 300–700 (+ italic 400) | Cuerpo de texto, párrafos, formularios |

### Clases de sección

| Clase CSS | Descripción |
|---|---|
| `.kb-section` | Sección con `padding: 5rem 0` |
| `.kb-section-alt` | Sección con fondo `var(--kb-bg)` gris claro |
| `.kb-clients-section` | Sección de clientes con bordes superior/inferior |
| `.kb-title-band` | Banda de título parallax — fondo blanco rosado + imagen fija |
| `.kb-parallax-band` | Banda CTA — fondo rojo oscuro con `background-attachment: fixed` |

### Banda de título parallax (`.kb-title-band`)

Cada sección usa esta clase para su encabezado. Combina un overlay claro sobre la imagen del banner con `background-attachment: fixed` para el efecto de profundidad al hacer scroll:

```css
.kb-title-band {
  background-image:
    linear-gradient(rgba(255, 248, 249, 0.91), rgba(253, 238, 241, 0.93)),
    url('assets/banners/BANNER_PRINCIPAL_desktop-01-2048x930.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
}
```

> En móvil (`max-width: 767px`) se usa `background-attachment: scroll` por incompatibilidad de `fixed` con iOS Safari.

---

## Directiva de animación (`kbReveal`)

**Archivo:** `src/app/reveal.directive.ts`
**Selector:** `[kbReveal]`

Utiliza `IntersectionObserver` para animar elementos al entrar al viewport. El elemento arranca invisible y aparece cuando el 12% de su área es visible.

### Uso en plantillas

```html
<span class="kb-eyebrow"      [kbReveal]="0">Etiqueta</span>
<h2   class="kb-section-title" [kbReveal]="90">Título</h2>
<p    class="kb-body"          [kbReveal]="180">Párrafo</p>
<div  class="kb-stats"         [kbReveal]="260">Estadísticas</div>
```

El valor numérico es el `transition-delay` en milisegundos — permite crear el efecto cascada (stagger).

### Comportamiento por tipo de elemento

| Clase del elemento | Animación de entrada |
|---|---|
| `.kb-eyebrow`, `.kb-title-band-eyebrow` | Desliza desde la izquierda `translateX(-18px → 0)` |
| `.kb-section-title`, `.kb-title-band-heading` | Sube con escala `translateY(36px) scale(0.97) → translateY(0) scale(1)` |
| `.kb-band-cta` | Escala desde 95% `scale(0.95) → scale(1)` |
| Cualquier otro elemento | Sube desde abajo `translateY(32px → 0)` |

Respeta `prefers-reduced-motion`: si el usuario tiene activado el modo de movimiento reducido, todas las animaciones se desactivan instantáneamente.

---

## Rutas

```typescript
const routes: Routes = [
  { path: '',             component: InicioComponent  },
  { path: 'catalogo/:id', component: CatalogoComponent },
  { path: '**',           redirectTo: ''              }
];
```

| URL | Componente | Descripción |
|---|---|---|
| `/` | `InicioComponent` | Página de inicio |
| `/catalogo/masculino` | `CatalogoComponent` | Catálogo Ejecutivo Masculino |
| `/catalogo/femenino` | `CatalogoComponent` | Catálogo Ejecutivo Femenino |
| `/catalogo/operativo` | `CatalogoComponent` | Catálogo Operativo |
| `/catalogo/calzado` | `CatalogoComponent` | Catálogo Calzado |
| `/**` | — | Redirige a `/` |

---

## Servicios e integración API

**Base URL:** `https://intranet.kostazul.com`

### `LoginService`

Obtiene un token JWT para autorizar las peticiones al API.

| | |
|---|---|
| Endpoint | `POST /api/auth/login/` |
| Payload | `{ username: string, password: string }` |
| Respuesta | `{ access: string, refresh: string }` |

### `SendCorreosService`

Envía los datos del formulario de contacto autenticándose primero via `LoginService`.

| | |
|---|---|
| Endpoint | `POST /api/correos/` |
| Auth | `Authorization: Bearer <access_token>` |
| Payload | `{ nombre, correo, telefono, empresa, mensaje }` |

El servicio gestiona el token internamente — no requiere login previo del usuario.

---

## Assets

### Imágenes clave

| Ruta | Uso |
|---|---|
| `banners/BANNER_PRINCIPAL_desktop-01-2048x930.jpg` | Hero y fondo de todas las bandas parallax |
| `banners/PORQUE-ELEGIRNOS-01-2048x1365.jpg` | Sección "¿Por qué Elegirnos?" |
| `banners/IMG_4175-2048x873.png` | Logo en el footer |
| `logos/IMG_4175-2048x873.png` | Logo en el navbar |

### Añadir un asesor

1. Colocar la foto en `src/assets/asesores/` (JPG, idealmente 2048×2048 px)
2. Añadir la entrada en `empleados[]` dentro de `inicio.component.ts`

### Añadir un logo de cliente

1. Colocar el logo en `src/assets/logos/` (PNG con fondo transparente recomendado)
2. Añadir la entrada en `items[]` dentro de `inicio.component.ts`

### Añadir productos al catálogo

1. Colocar las imágenes en `src/assets/catalogo/`
2. Editar el array del catálogo correspondiente en `catalogo.component.ts` (`catalogo_masculino`, `catalogo_femenino`, `catalogo_operativo` o `catalogo_calzado`)

---

## SEO

El archivo `src/index.html` incluye:

- `<title>` descriptivo con palabras clave
- `<meta name="description">` con resumen del negocio
- `<meta name="keywords">` con términos relevantes
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:locale`)
- Twitter Card tags
- `<link rel="apple-touch-icon">`
- `lang="es"` en el `<html>`
- `H1` semántico en el hero (visualmente oculto, indexable por crawlers con clase `sr-only`)

> Al ser una SPA sin SSR, los crawlers que no ejecutan JavaScript ven contenido limitado. Para mejorar el SEO se recomienda implementar **Angular Universal** (Server-Side Rendering).

---

## Build y despliegue

### Build de producción

```bash
npm run build
# Salida: dist/kostabrava/
```

El build de producción activa minificación, tree-shaking y output hashing para cache busting.

### Hosting

Los archivos de `dist/kostabrava/` son estáticos. Requieren que **todas las rutas redirijan a `index.html`** para que el router de Angular funcione correctamente.

#### Nginx

```nginx
# Redirigir HTTP y www a HTTPS sin www
server {
  listen 80;
  server_name kostabrava.com www.kostabrava.com;
  return 301 https://kostabrava.com$request_uri;
}

server {
  listen 80;
  server_name www.kostabrava.com;
  return 301 https://kostabrava.com$request_uri;
}

server {
  listen 443 ssl;
  server_name kostabrava.com;

  root /var/www/kostabrava;
  index index.html;

  # Routing de Angular — todas las rutas al index
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Compresión
  gzip on;
  gzip_types text/css application/javascript image/svg+xml application/json;
}
```

#### Firebase Hosting (`firebase.json`)

```json
{
  "hosting": {
    "public": "dist/kostabrava",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

#### Vercel / Netlify (`vercel.json`)

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Pendientes / Mejoras sugeridas

- [ ] Migrar componentes a arquitectura **standalone** (eliminar `AppModule`) para alinearse con la dirección oficial de Angular
- [ ] Implementar **SSR** con `@angular/ssr` (`ng add @angular/ssr`) para mejorar SEO e indexación por crawlers
- [ ] Activar **zoneless change detection** (`provideZonelessChangeDetection()`) y remover `zone.js` para reducir el bundle
- [ ] Mover las credenciales hard-codeadas del `SendCorreosService` a variables de entorno
- [ ] Configurar redirección HTTP→HTTPS y www→sin-www en el servidor
- [ ] Mover datos de asesores y clientes a una API o archivo JSON externo para facilitar la edición
- [ ] Optimizar imágenes del catálogo a formato **WebP/AVIF** para reducir tiempo de carga
- [ ] Completar los links definitivos de redes sociales en el footer
- [ ] Agregar página 404 personalizada

---

## Historial de migraciones

### Angular 16 → 21 (mayo 2026)

- **Framework**: Angular 16.2 → 21.2 (saltando 5 versiones mayores)
- **Builder**: `@angular-devkit/build-angular:browser` → **`@angular/build:application`** (basado en esbuild + Vite, 4× más rápido)
- **Providers modernos**:
  - `HttpClientModule` → `provideHttpClient(withInterceptorsFromDi())`
  - Eliminado `@angular/animations` (PrimeNG 21 y ng-bootstrap 20 usan animaciones CSS nativas)
  - Añadido `provideZoneChangeDetection({ eventCoalescing: true })` para mejor performance
- **PrimeNG 16 → 21**: nueva arquitectura de theming con `@primeuix/themes` (preset **Aura**) configurado vía `providePrimeNG()`. Eliminados los `@import` de `primeng/resources/...` (ya no existen)
- **ng-bootstrap 15 → 20**
- **TypeScript 5.1 → 5.9**, `module: "preserve"`, `moduleResolution: "bundler"`
- **Eliminadas dependencias no usadas**: `emailjs-com` (3.x deprecada, código nunca la importó)
- **Componentes**: marcados con `standalone: false` para mantener compatibilidad con `AppModule` (el default cambió a `true` en Angular 19+)
- **Código modernizado**:
  - `window.pageYOffset` (deprecado) → `window.scrollY`
  - `FormBuilder` → patrón `inject()` + `nonNullable.group()` para evitar non-null assertions
  - Cleanup de imports no usados y typos (`disosito` → mensajes claros de error)

### Resultados medibles

| Métrica | Antes | Después |
|---|---|---|
| Tiempo de build dev | 7.6 s | **1.6 s** |
| Tiempo de build prod | n/a | **2.5 s** |
| Bundle dev (raw) | 5.26 MB | **585 KB** |
| Bundle prod (transferencia gzip) | n/a | **212 KB** |
| Paquetes npm | 1014 | **554** |
| Vulnerabilidades npm | 71 (1 crítica, 38 altas) | **0** |
| Warnings de compilación | 4 (NG8107) | **0** |

---

## Licencia

Proyecto privado — © Kosta Azul S.A.S. Todos los derechos reservados.
