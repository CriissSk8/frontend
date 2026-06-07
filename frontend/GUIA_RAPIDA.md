# 🚀 Guía Rápida - New Era Supermercado

## ⚡ Inicio Rápido

```bash
# 1. Navegar al proyecto
cd c:\Users\Paola\Downloads\frontend\frontend

# 2. Instalar dependencias (solo primera vez)
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

---

## 📂 Estructura del Proyecto

```
frontend/
├── app/                      # Páginas y rutas (Next.js App Router)
│   ├── auth/
│   │   ├── login/           # Página de inicio de sesión
│   │   └── register/        # Página de registro
│   ├── globals.css          # Estilos globales y animaciones
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página de inicio
│
├── components/              # Componentes reutilizables
│   ├── Logo.tsx            # ⭐ NUEVO - Logo profesional
│   ├── AuthLayout.tsx      # ⭐ NUEVO - Layout de auth
│   ├── Hero.tsx            # ⭐ Carrusel profesional
│   ├── Header.tsx          # Encabezado con búsqueda
│   ├── Footer.tsx          # Pie de página
│   ├── ProductCard.tsx     # Tarjeta de producto
│   ├── ProductsGrid.tsx    # Grid de productos
│   ├── Categories.tsx      # Categorías horizontales
│   ├── CartDrawer.tsx      # Carrito lateral
│   └── ThemeToggle.tsx     # Toggle de tema
│
├── context/                 # Context API
│   └── CartContext.tsx     # Estado del carrito
│
├── lib/                     # Utilidades
│   ├── api.ts              # Funciones de API
│   └── types.ts            # Tipos TypeScript
│
└── public/                  # Archivos estáticos
```

---

## 🎨 Componentes Principales

### 1. Logo (`components/Logo.tsx`)
```typescript
import Logo from '@/components/Logo';

// Uso básico
<Logo size="md" />

// Solo icono
<Logo size="sm" iconOnly />

// Props disponibles
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  className?: string;
}
```

### 2. Hero con Carrusel (`components/Hero.tsx`)
- 3 slides con auto-advance (6 segundos)
- Imágenes de alta calidad
- Indicadores de navegación
- Responsive completo

### 3. AuthLayout (`components/AuthLayout.tsx`)
```typescript
import AuthLayout from '@/components/AuthLayout';

<AuthLayout type="login">
  {/* Contenido del formulario */}
</AuthLayout>
```

---

## 🎯 Páginas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con carrusel y productos |
| `/auth/login` | Inicio de sesión con transición |
| `/auth/register` | Registro con transición |

---

## 🎨 Colores Corporativos

```css
--color-primary-blue: #0C447C;   /* Azul corporativo */
--color-primary-green: #2E7D32;  /* Verde corporativo */
```

**Uso en Tailwind:**
```html
<div className="bg-[#0C447C] text-white">...</div>
<button className="bg-[#2E7D32] hover:bg-[#2E7D32]/90">...</button>
```

---

## ✨ Animaciones Disponibles

```html
<!-- Slide desde abajo -->
<div className="animate-slide-up">...</div>

<!-- Slide desde derecha -->
<div className="animate-slide-right">...</div>

<!-- Slide desde izquierda -->
<div className="animate-slide-left">...</div>

<!-- Fade simple -->
<div className="animate-fade-in">...</div>

<!-- Scale in -->
<div className="animate-scale-in">...</div>

<!-- Shimmer (loading) -->
<div className="animate-shimmer">...</div>

<!-- Con delay -->
<div className="animate-slide-up delay-75">...</div>
<div className="animate-slide-up delay-150">...</div>
<div className="animate-slide-up delay-225">...</div>
<div className="animate-slide-up delay-300">...</div>
```

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor en puerto 5173

# Producción
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 🌙 Dark Mode

El proyecto usa `next-themes` para dark mode automático.

**Toggle de tema:**
```typescript
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();

// Cambiar tema
setTheme(theme === 'dark' ? 'light' : 'dark');
```

---

## 🛒 Carrito de Compras

**Uso del Context:**
```typescript
import { useCart } from '@/context/CartContext';

const { 
  items,           // Items en el carrito
  totalItems,      // Cantidad total
  totalPrice,      // Precio total
  addItem,         // Agregar producto
  updateQuantity,  // Actualizar cantidad
  removeItem,      // Eliminar item
  clearCart,       // Vaciar carrito
  isOpen,          // Estado del drawer
  setIsOpen        // Abrir/cerrar drawer
} = useCart();
```

---

## 📱 Responsive Breakpoints

```typescript
sm:   640px   // Mobile grande
md:   768px   // Tablet
lg:   1024px  // Laptop
xl:   1280px  // Desktop
2xl:  1536px  // Desktop grande
```

**Ejemplo de uso:**
```html
<div className="text-sm sm:text-base lg:text-lg">
  Texto responsive
</div>
```

---

## 🎯 Mejores Prácticas

### 1. Componentes
- Usa TypeScript para todas las props
- Documenta con JSDoc
- Mantén componentes pequeños y reutilizables

### 2. Estilos
- Usa Tailwind CSS
- Colores corporativos: `bg-[#0C447C]` y `bg-[#2E7D32]`
- Dark mode: `dark:bg-slate-900`

### 3. Animaciones
- Usa clases predefinidas (`animate-slide-up`, etc.)
- Añade delays para efectos escalonados
- Mantén transiciones suaves (300-400ms)

### 4. Imágenes
- Usa `next/image` para optimización
- Proporciona alt text descriptivo
- Considera lazy loading

---

## 🔧 Personalización

### Añadir Nueva Página
```typescript
// app/nueva-pagina/page.tsx
export default function NuevaPagina() {
  return <div>Mi nueva página</div>;
}
```

### Añadir Nuevo Componente
```typescript
// components/MiComponente.tsx
interface MiComponenteProps {
  titulo: string;
}

export default function MiComponente({ titulo }: MiComponenteProps) {
  return <h2>{titulo}</h2>;
}
```

### Añadir Nueva Animación
```css
/* app/globals.css */
@keyframes miAnimacion {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-mi-animacion {
  animation: miAnimacion 0.3s ease-out;
}
```

---

## 🐛 Troubleshooting

### El servidor no inicia
```bash
# Verificar puerto 5173 está libre
netstat -ano | findstr :5173

# Si está ocupado, cambiar puerto en package.json
"dev": "next dev --port 3000"
```

### Errores de TypeScript
```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Cambios no se reflejan
```bash
# Limpiar caché de Next.js
rm -rf .next
npm run dev
```

---

## 📚 Recursos Útiles

### Documentación
- [Next.js 16](https://nextjs.org/docs)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Componentes
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Heroicons](https://heroicons.com/)

### Imágenes
- [Unsplash](https://unsplash.com/) - Imágenes de stock

---

## 🎉 Características Destacadas

### ✅ Implementado
- [x] Logo profesional sin emojis
- [x] Carrusel hero con imágenes reales
- [x] Transición slide entre login/register
- [x] Bordes profesionales (no redondeados excesivos)
- [x] Dark mode completo
- [x] Carrito de compras funcional
- [x] Búsqueda con debounce
- [x] Filtrado por categorías
- [x] Animaciones suaves
- [x] Responsive design
- [x] Loading states
- [x] Empty states

### 🚀 Próximos Pasos
- [ ] Integración con backend
- [ ] Autenticación real
- [ ] Checkout completo
- [ ] Historial de pedidos
- [ ] Sistema de favoritos
- [ ] Notificaciones
- [ ] PWA

---

## 💡 Tips Rápidos

1. **Desarrollo rápido**: Usa hot reload - guarda y ve cambios instantáneamente
2. **Debug**: Usa React DevTools para inspeccionar componentes
3. **Performance**: Next.js optimiza automáticamente imágenes y código
4. **SEO**: Usa metadata en `layout.tsx` para cada página
5. **Accesibilidad**: Siempre incluye `aria-label` en botones sin texto

---

## 📞 Soporte

Para problemas o preguntas:
1. Revisa esta guía
2. Consulta `DISEÑO_PROFESIONAL_V2.md` para detalles técnicos
3. Revisa la documentación oficial de Next.js

---

**¡Listo para desarrollar! 🚀**
