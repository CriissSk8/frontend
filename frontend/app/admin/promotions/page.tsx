/**
 * Admin Promotions Page - New Era Supermercado
 * 
 * Gestión de promociones:
 * - Listar promociones activas e inactivas
 * - Crear nueva promoción
 * - Editar promoción existente
 * - Activar/desactivar promoción
 * - Eliminar promoción
 * - Las promociones se muestran como notificación en la landing
 * 
 * @module app/admin/promotions/page
 */

'use client';

import { useState } from 'react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 'promo-1',
      title: 'Envío Gratis',
      description: 'En compras superiores a $50.000',
      discount: '100%',
      startDate: '2026-06-01',
      endDate: '2026-06-30',
      isActive: true,
    },
    {
      id: 'promo-2',
      title: 'Descuento Especial',
      description: 'Hasta 40% de descuento en productos seleccionados',
      discount: '40%',
      startDate: '2026-06-07',
      endDate: '2026-06-10',
      isActive: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  const handleAddPromotion = () => {
    setEditingPromo(null);
    setIsModalOpen(true);
  };

  const handleEditPromotion = (promo: Promotion) => {
    setEditingPromo(promo);
    setIsModalOpen(true);
  };

  const handleToggleActive = (promoId: string) => {
    setPromotions((prev) =>
      prev.map((p) => (p.id === promoId ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleDeletePromotion = (promoId: string) => {
    if (confirm('¿Estás seguro de eliminar esta promoción?')) {
      setPromotions((prev) => prev.filter((p) => p.id !== promoId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Promociones</h2>
          <p className="text-slate-600 mt-1">
            Las promociones activas se muestran como notificación en la landing
          </p>
        </div>
        <button
          onClick={handleAddPromotion}
          className="px-4 py-2 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-medium transition-colors flex items-center gap-2"
        >
          <PlusIcon />
          Nueva Promoción
        </button>
      </div>

      {/* Active Promotions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Promociones Activas</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {promotions
            .filter((p) => p.isActive)
            .map((promo) => (
              <PromotionCard
                key={promo.id}
                promotion={promo}
                onEdit={handleEditPromotion}
                onToggle={handleToggleActive}
                onDelete={handleDeletePromotion}
              />
            ))}
          {promotions.filter((p) => p.isActive).length === 0 && (
            <p className="text-slate-500 col-span-2 text-center py-8">
              No hay promociones activas
            </p>
          )}
        </div>
      </div>

      {/* Inactive Promotions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Promociones Inactivas</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {promotions
            .filter((p) => !p.isActive)
            .map((promo) => (
              <PromotionCard
                key={promo.id}
                promotion={promo}
                onEdit={handleEditPromotion}
                onToggle={handleToggleActive}
                onDelete={handleDeletePromotion}
              />
            ))}
          {promotions.filter((p) => !p.isActive).length === 0 && (
            <p className="text-slate-500 col-span-2 text-center py-8">
              No hay promociones inactivas
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PromotionModal
          promotion={editingPromo}
          onClose={() => setIsModalOpen(false)}
          onSave={(promo) => {
            if (editingPromo) {
              setPromotions((prev) =>
                prev.map((p) => (p.id === editingPromo.id ? { ...editingPromo, ...promo } : p))
              );
            } else {
              setPromotions((prev) => [
                ...prev,
                { 
                  id: `promo-${Date.now()}`, 
                  isActive: true, 
                  title: promo.title || '',
                  description: promo.description || '',
                  discount: promo.discount || '',
                  startDate: promo.startDate || '',
                  endDate: promo.endDate || '',
                },
              ]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// ==================== CARD DE PROMOCIÓN ====================

interface PromotionCardProps {
  promotion: Promotion;
  onEdit: (promo: Promotion) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function PromotionCard({ promotion, onEdit, onToggle, onDelete }: PromotionCardProps) {
  return (
    <div className="bg-white border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-semibold text-slate-900">
              {promotion.title}
            </h4>
            <div className="px-2 py-1 bg-[#1c6554] text-white text-xs font-bold">
              -{promotion.discount}
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-3">{promotion.description}</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {new Date(promotion.startDate).toLocaleDateString('es-CO')}
            </span>
            <span className="text-slate-300">→</span>
            <span className="flex items-center gap-1">
              <CalendarIcon />
              {new Date(promotion.endDate).toLocaleDateString('es-CO')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={() => onToggle(promotion.id)}
          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
            promotion.isActive
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
        >
          {promotion.isActive ? 'Activa' : 'Inactiva'}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(promotion)}
            className="p-2 text-slate-600 hover:text-[#1c6554] hover:bg-slate-100 transition-colors"
            title="Editar"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(promotion.id)}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Eliminar"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==================== MODAL ====================

interface PromotionModalProps {
  promotion: Promotion | null;
  onClose: () => void;
  onSave: (promo: Partial<Promotion>) => void;
}

function PromotionModal({ promotion, onClose, onSave }: PromotionModalProps) {
  const [formData, setFormData] = useState({
    title: promotion?.title || '',
    description: promotion?.description || '',
    discount: promotion?.discount || '',
    startDate: promotion?.startDate || '',
    endDate: promotion?.endDate || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-2xl">
        <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            {promotion ? 'Editar Promoción' : 'Nueva Promoción'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-10 px-3 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              placeholder="Ej: Envío Gratis"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Descripción *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              placeholder="Descripción de la promoción"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Descuento *
            </label>
            <input
              type="text"
              required
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              className="w-full h-10 px-3 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              placeholder="Ej: 40%"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha Inicio *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full h-10 px-3 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Fecha Fin *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full h-10 px-3 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white text-sm font-medium transition-colors"
            >
              {promotion ? 'Guardar Cambios' : 'Crear Promoción'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==================== ICONOS ====================

function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

// ==================== ICONOS ====================

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
