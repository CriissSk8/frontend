/**
 * Admin Layout - New Era Supermercado
 * 
 * Layout principal del dashboard de administración con sidebar profesional.
 * Sigue la estética del proyecto: limpio, sin emojis, colores corporativos.
 * 
 * @module app/admin/layout
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const navLinks = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: <DashboardIcon />,
    },
    {
      name: 'Productos',
      href: '/admin/products',
      icon: <ProductsIcon />,
    },
    {
      name: 'Categorías',
      href: '/admin/categories',
      icon: <CategoriesIcon />,
    },
    {
      name: 'Promociones',
      href: '/admin/promotions',
      icon: <PromotionsIcon />,
    },
    {
      name: 'Usuarios',
      href: '/admin/users',
      icon: <UsersIcon />,
    },
  ];

  /**
   * Cierra sesión y redirige a la landing
   */
  const handleLogout = () => {
    // TODO: Implementar con backend - limpiar tokens, etc.
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 animate-page-enter">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-slate-900 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo y toggle */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-slate-800">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <Logo size="md" />
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={isSidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
          >
            <MenuIcon />
          </button>
        </div>

        {/* Navegación */}
        <nav className="py-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 mb-1 transition-all ${
                  isActive
                    ? 'bg-[#1c6554] text-white border-l-4 border-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <span className="w-6 h-6 flex-shrink-0">{link.icon}</span>
                {isSidebarOpen && (
                  <span className="font-medium text-sm">{link.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer del sidebar */}
        {isSidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1c6554] flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Administrador</p>
                <p className="text-xs text-slate-400 truncate">admin@newera.com</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <BackIcon />
              Volver a la tienda
            </Link>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-slate-900">
            Panel de Administración
          </h1>
          <div className="flex items-center gap-4">
            {/* Botón de notificaciones */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <BellIcon />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#1c6554] rounded-full"></span>
              </button>

              {/* Dropdown de notificaciones */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 shadow-lg z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-900">Notificaciones</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <NotificationItem
                        title="Nuevo pedido"
                        message="Juan Pérez ha realizado un pedido de $85.000"
                        time="Hace 5 minutos"
                        unread
                      />
                      <NotificationItem
                        title="Stock bajo"
                        message="Leche Entera Alquería tiene menos de 10 unidades"
                        time="Hace 1 hora"
                        unread
                      />
                      <NotificationItem
                        title="Pedido completado"
                        message="El pedido ORD-001 fue entregado exitosamente"
                        time="Hace 2 horas"
                      />
                    </div>
                    <div className="px-4 py-3 border-t border-slate-200 text-center">
                      <button className="text-sm text-[#1c6554] hover:text-[#1c6554]/80 font-medium">
                        Ver todas las notificaciones
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200"></div>

            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-2"
            >
              <LogoutIcon />
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

// ==================== COMPONENTES ====================

/**
 * Item de notificación
 */
interface NotificationItemProps {
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}

function NotificationItem({ title, message, time, unread }: NotificationItemProps) {
  return (
    <div className={`px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 ${unread ? 'bg-slate-50/50' : ''}`}>
      <div className="flex items-start gap-3">
        {unread && (
          <div className="w-2 h-2 bg-[#1c6554] rounded-full mt-2 flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="text-sm text-slate-600 mt-0.5">{message}</p>
          <p className="text-xs text-slate-500 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}

// ==================== ICONOS ====================

function DashboardIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
      />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function CategoriesIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

function PromotionsIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}
