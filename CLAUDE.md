# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # dev server at http://localhost:4200
npm run build      # production build → dist/
npm test           # Karma/Jasmine unit tests (headless Chrome)
npm run watch      # build in watch mode (development config)
```

## Architecture

Single-page Angular 21 app (NgModule, not standalone) for **Kosta Brava**, a B2B workwear brand site. All components are declared in `AppModule` and use `standalone: false`.

**Routes** (`app-routing.module.ts`):
- `/` → `InicioComponent` — landing page with hero, carousel, team, and contact form
- `/catalogo/:id` → `CatalogoComponent` — product catalog; `:id` is one of `masculino | femenino | operativo | calzado`

**Key components:**
- `inicio/` — hero with JS parallax (`scrollY * 0.28`), PrimeNG Carousel for products, team section, embedded `FormularioComponent`
- `catalogo/` — catalog data is hard-coded directly in the component TypeScript (no external API); filter by `clasificacion` stored in `copia_categorias` for reset; opens `GaleriaComponent` via `NgbModal`
- `galeria/` — PrimeNG Galleria rendered inside an NgBootstrap modal
- `formulario/` — ReactiveForm that calls `SendCorreosService`
- `menu/` and `footer/` — shared layout shells
- `reveal.directive.ts` (`[kbReveal]`) — IntersectionObserver scroll-reveal animation; add `kb-reveal` class + animate to `kb-reveal-in` at 12% threshold

**Services:**
- `LoginService` — POSTs credentials to `https://intranet.kostazul.com/api/auth/login/` to get a JWT
- `SendCorreosService` — calls `LoginService` first, then POSTs the contact form to `https://intranet.kostazul.com/api/correos/` with Bearer token

**UI stack:** Bootstrap 5 + NgBootstrap 20 for layout/modals, PrimeNG 21 (Aura theme, `darkModeSelector: false`) for Carousel/Galleria/Toast. PrimeNG CSS is layered via `cssLayer` named `primeng`.

**Catalog data pattern:** Each catalog (`catalogo_masculino`, `catalogo_femenino`, etc.) is a `Catalogo` object with `titulo` and `categorias: Categoria[]`. Each `Categoria` has `clasificacion` (filter key), `url` (thumbnail), and `hijos: Image[]` (gallery images). To add a new product, push a new `Categoria` entry to the relevant catalog object in `catalogo.component.ts`.

**Assets:** Product images in `src/assets/catalogo/`, team photos in `src/assets/asesores/`, videos in `src/assets/kostabrava_video/` (`.MOV` files).
