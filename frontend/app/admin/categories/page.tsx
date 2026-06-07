/**
 * Admin Categories Page - New Era Supermercado
 * 
 * Gestión de categorías de productos:
 * - Listar todas las categorías
 * - Agregar nueva categoría
 * - Editar categoría existente
 * - Eliminar categoría
 * - Ver cantidad de productos por categoría
 * 
 * @module app/admin/categories/page
 */

'use client';

import { useState } from 'react';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/data/catalog';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  // Contar productos por categoría
  const getProductCount = (categoryId: string) => {
    return MOCK_PRODUCTS.filter((p) => p.categoryId === categoryId).length;
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const productCount = getProductCount(categoryId);
    if (productCount > 0) {
      alert(`No puedes eliminar esta categoría porque tiene ${productCount} productos asociados`);
      return;
    }
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Categorías</h2>
          <p className="text-slate-600 mt-1">
            Organiza tus productos por categorías
          </p>
        </div>
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-medium transition-colors flex items-center gap-2"
        >
          <PlusIcon />
          Agregar Categoría
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const productCount = getProductCount(category.id);
          return (
            <div
              key={category.id}
              className="bg-white border border-slate-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#1c6554]/10 flex items-center justify-center text-[#1c6554]">
                  <FolderIcon />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditCategory(category)}
                    className="p-2 text-slate-600 hover:text-[#1c6554] hover:bg-slate-100 transition-colors"
                    title="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600">
                {productCount} {productCount === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSave={(category) => {
            if (editingCategory) {
              setCategories((prev) =>
                prev.map((c) => (c.id === editingCategory.id ? { ...c, ...category } : c))
              );
            } else {
              setCategories((prev) => [
                ...prev,
                { id: `cat-${Date.now()}`, ...category },
              ]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

// ==================== MODAL DE CATEGORÍA ====================

interface CategoryModalProps {
  category: any;
  onClose: () => void;
  onSave: (category: any) => void;
}

function CategoryModal({ category, onClose, onSave }: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md">
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            {category ? 'Editar Categoría' : 'Agregar Categoría'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre de la categoría *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-10 px-3 border border-slate-300 focus:outline-none focus:border-[#1c6554] focus:ring-2 focus:ring-[#1c6554]/20"
              placeholder="Ej: Lácteos y Huevos"
            />
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
              {category ? 'Guardar Cambios' : 'Agregar Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
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

function FolderIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
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
