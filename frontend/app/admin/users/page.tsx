/**
 * Admin Users Page - New Era Supermercado
 * 
 * Gestión de usuarios:
 * - Listar todos los usuarios
 * - Ver detalles completos del usuario
 * - Ver historial de compras
 * - Editar datos del usuario
 * - Activar/desactivar usuario
 * - Búsqueda y filtros
 * 
 * @module app/admin/users/page
 */

'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/format';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isActive: boolean;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  products: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'user-1',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+57 300 123 4567',
      address: 'Calle 123 #45-67',
      city: 'Bogotá',
      isActive: true,
      createdAt: '2026-01-15',
      totalOrders: 12,
      totalSpent: 850_000,
    },
    {
      id: 'user-2',
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+57 310 987 6543',
      address: 'Carrera 50 #30-20',
      city: 'Medellín',
      isActive: true,
      createdAt: '2026-02-20',
      totalOrders: 8,
      totalSpent: 620_000,
    },
    {
      id: 'user-3',
      name: 'Carlos López',
      email: 'carlos.lopez@email.com',
      phone: '+57 320 456 7890',
      address: 'Avenida 15 #100-45',
      city: 'Cali',
      isActive: false,
      createdAt: '2026-03-10',
      totalOrders: 3,
      totalSpent: 180_000,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleActive = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Usuarios</h2>
        <p className="text-slate-600 mt-1">
          Gestiona los usuarios registrados en tu tienda
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="search"
              placeholder="Buscar por nombre o email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-300 text-sm focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
            />
            <SearchIcon />
          </div>
          <select className="h-10 px-4 border border-slate-300 text-sm focus:outline-none focus:border-[#1c6554]">
            <option value="all">Todos</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Pedidos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                  Total Gastado
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-600 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1c6554] flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">
                          Registrado: {new Date(user.createdAt).toLocaleDateString('es-CO')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <p>{user.email}</p>
                    <p className="text-slate-500">{user.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {user.totalOrders}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {formatPrice(user.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleActive(user.id)}
                      className={`px-3 py-1 text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
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

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={(updatedUser) => {
            setUsers((prev) =>
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

// ==================== MODAL DE DETALLES DE USUARIO ====================

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

function UserDetailModal({ user, onClose, onUpdate }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'orders'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  // Mock orders
  const userOrders: Order[] = [
    {
      id: 'ORD-001',
      date: '2026-06-05',
      total: 125_000,
      status: 'completed',
      products: 8,
    },
    {
      id: 'ORD-002',
      date: '2026-05-28',
      total: 85_000,
      status: 'completed',
      products: 5,
    },
    {
      id: 'ORD-003',
      date: '2026-05-15',
      total: 65_000,
      status: 'completed',
      products: 4,
    },
  ];

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Detalles del Usuario
            </h3>
            <p className="text-sm text-slate-600">ID: {user.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6 flex gap-4">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-[#1c6554] text-[#1c6554]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'orders'
                ? 'border-[#1c6554] text-[#1c6554]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Historial de Compras
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-600 mb-1">Total Pedidos</p>
                  <p className="text-2xl font-bold text-slate-900">{user.totalOrders}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-600 mb-1">Total Gastado</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatPrice(user.totalSpent)}
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-600 mb-1">Estado de Cuenta</p>
                  <p className={`text-2xl font-bold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">Datos Personales</h4>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm font-medium text-[#1c6554] hover:text-[#1c6554]/80"
                    >
                      Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFormData({ ...user });
                          setIsEditing(false);
                        }}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        className="text-sm font-medium text-[#1c6554] hover:text-[#1c6554]/80"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full h-10 px-3 border border-slate-300 disabled:bg-slate-50 disabled:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
              <div className="space-y-6">
                <h4 className="font-semibold text-slate-900">
                  Historial de Compras ({userOrders.length})
                </h4>
                <div className="space-y-3">
                  {userOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-slate-200 p-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{order.id}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(order.date).toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <StatusBadge status={order.status} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{order.products} productos</span>
                        <span className="font-semibold text-slate-900">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== COMPONENTES ====================

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

// ==================== ICONOS ====================

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-2.5 w-5 h-5 text-slate-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
