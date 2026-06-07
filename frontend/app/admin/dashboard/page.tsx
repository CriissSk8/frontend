/**
 * Admin Dashboard Page - New Era Supermercado
 * 
 * Página principal del dashboard con estadísticas generales:
 * - Ventas totales
 * - Productos vendidos
 * - Usuarios registrados
 * - Pedidos activos
 * - Gráficas y métricas
 * 
 * @module app/admin/dashboard/page
 */

'use client';

import { useState } from 'react';

export default function DashboardPage() {
  // TODO: Estos datos vendrán del backend
  const stats = {
    totalSales: 15_450_000,
    totalOrders: 342,
    totalUsers: 1_289,
    activeOrders: 23,
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      total: 85_000,
      status: 'pending',
      date: '2026-06-07 13:45',
    },
    {
      id: 'ORD-002',
      customer: 'María García',
      total: 120_500,
      status: 'completed',
      date: '2026-06-07 12:30',
    },
    {
      id: 'ORD-003',
      customer: 'Carlos López',
      total: 65_000,
      status: 'processing',
      date: '2026-06-07 11:15',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-600 mt-1">
          Resumen general de tu tienda en tiempo real
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventas Totales"
          value={formatPrice(stats.totalSales)}
          subtitle="Este mes"
          icon={<MoneyIcon />}
          trend="+12.5%"
          trendUp
        />
        <StatCard
          title="Pedidos"
          value={stats.totalOrders.toString()}
          subtitle="Este mes"
          icon={<OrdersIcon />}
          trend="+8.2%"
          trendUp
        />
        <StatCard
          title="Usuarios"
          value={stats.totalUsers.toString()}
          subtitle="Total registrados"
          icon={<UsersIcon />}
          trend="+23"
          trendUp
        />
        <StatCard
          title="Pedidos Activos"
          value={stats.activeOrders.toString()}
          subtitle="Pendientes de entrega"
          icon={<ActiveIcon />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas Semanales */}
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Ventas de la Semana
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[
              { day: 'Lun', value: 85 },
              { day: 'Mar', value: 65 },
              { day: 'Mié', value: 92 },
              { day: 'Jue', value: 78 },
              { day: 'Vie', value: 95 },
              { day: 'Sáb', value: 100 },
              { day: 'Dom', value: 72 },
            ].map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-[#1c6554] transition-all hover:bg-[#1c6554]/80"
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs text-slate-600">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Más Vendidos */}
        <div className="bg-white border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Productos Más Vendidos
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Leche Entera Alquería 1.1L', sold: 156, stock: 200 },
              { name: 'Pan Tajado Bimbo x600g', sold: 142, stock: 60 },
              { name: 'Huevos AA x30 Und', sold: 128, stock: 50 },
              { name: 'Arroz Diana x5 Kg', sold: 98, stock: 100 },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-slate-100">
                      <div
                        className="h-full bg-[#1c6554]"
                        style={{
                          width: `${(product.sold / (product.sold + product.stock)) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-600 w-16 text-right">
                      {product.sold} vendidos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">Pedidos Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  ID Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Fecha
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => alert(`Ver detalles del pedido ${order.id}`)}
                      className="text-sm font-medium text-[#1c6554] hover:text-[#1c6554]/80 transition-colors"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== COMPONENTES ====================

/**
 * Tarjeta de estadística con icono y tendencia
 */
interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, subtitle, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className="w-12 h-12 bg-[#1c6554]/10 flex items-center justify-center text-[#1c6554]">
          {icon}
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span
            className={`text-sm font-medium ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend}
          </span>
          <span className="text-xs text-slate-500">vs mes anterior</span>
        </div>
      )}
    </div>
  );
}

/**
 * Badge de estado del pedido
 */
function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: 'bg-amber-100 text-amber-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const labels = {
    pending: 'Pendiente',
    processing: 'Procesando',
    completed: 'Completado',
    cancelled: 'Cancelado',
  };

  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}

// ==================== UTILIDADES ====================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
}

// ==================== ICONOS ====================

function MoneyIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function ActiveIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}
