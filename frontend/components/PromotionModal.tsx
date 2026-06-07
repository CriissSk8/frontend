/**
 * Promotion Modal Component - New Era Supermercado
 * 
 * Modal de bienvenida que muestra las promociones activas.
 * Aparece automáticamente al ingresar al sitio y debe cerrarse manualmente.
 * Sigue la estética del proyecto con diseño elegante y minimalista.
 * 
 * @module components/PromotionModal
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount?: string;
  cta: string;
  ctaLink: string;
}

/**
 * Modal de promociones activas.
 * 
 * Aparece automáticamente al entrar al sitio.
 * Diseño tipo hero con imagen de fondo y overlay.
 * 
 * @returns {JSX.Element | null}
 */
export default function PromotionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Esperar 1 segundo antes de mostrar el modal
    const timer = setTimeout(() => {
      // TODO: Obtener del backend
      const activePromotions: Promotion[] = [
        {
          id: 'promo-1',
          title: '¡Ofertas Especiales de la Semana!',
          description: 'Descuentos de hasta 40% en productos seleccionados. Aprovecha estas ofertas increíbles en frutas, verduras, lácteos y más.',
          image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80',
          discount: '40%',
          cta: 'Ver ofertas',
          ctaLink: '#productos',
        },
        {
          id: 'promo-2',
          title: 'Envío Gratis Todo el Mes',
          description: 'En compras superiores a $50.000 disfruta de envío gratis a domicilio. Válido para toda la ciudad.',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
          cta: 'Comprar ahora',
          ctaLink: '#productos',
        },
        {
          id: 'promo-3',
          title: 'Productos Frescos Diarios',
          description: 'Recibe productos frescos del campo directamente a tu casa. Calidad garantizada.',
          image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=80',
          cta: 'Explorar catálogo',
          ctaLink: '#productos',
        },
      ];

      if (activePromotions.length > 0) {
        setPromotions(activePromotions);
        setIsOpen(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Rotación automática de promociones
  useEffect(() => {
    if (!isOpen || promotions.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, promotions.length]);

  /**
   * Cierra el modal.
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  /**
   * Navega a una promoción específica.
   */
  const goToPromo = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isOpen || promotions.length === 0) return null;

  const promo = promotions[currentIndex];

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="relative w-full max-w-3xl bg-slate-900 shadow-2xl overflow-hidden pointer-events-auto animate-scale-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          {/* Botón de cerrar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>

          {/* Contenido con imagen de fondo */}
          <div className="relative h-[500px] sm:h-[550px]">
            {/* Imagen de fondo */}
            <div className="absolute inset-0">
              <Image
                key={promo.id}
                src={promo.image}
                alt={promo.title}
                fill
                className="object-cover animate-fade-in"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
            </div>

            {/* Contenido */}
            <div className="relative h-full flex flex-col justify-between p-8 sm:p-12">
              {/* Badge de promoción */}
              <div className="flex justify-center sm:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#1c6554] animate-pulse" />
                  <span className="text-sm font-semibold text-white uppercase tracking-wide">
                    Promoción Activa
                  </span>
                </div>
              </div>

              {/* Texto central */}
              <div className="text-center sm:text-left">
                <h2 
                  id="promo-title"
                  className="text-3xl sm:text-5xl font-bold text-white mb-4 animate-slide-up"
                >
                  {promo.title}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl animate-slide-up delay-75">
                  {promo.description}
                </p>

                {promo.discount && (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c6554] mb-6 animate-slide-up delay-150">
                    <span className="text-3xl sm:text-4xl font-bold text-white">
                      -{promo.discount}
                    </span>
                    <span className="text-sm text-white/90 uppercase tracking-wide">
                      Descuento
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start animate-slide-up delay-225">
                  <a
                    href={promo.ctaLink}
                    onClick={handleClose}
                    className="px-8 py-4 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-semibold text-center transition-all hover:shadow-lg"
                  >
                    {promo.cta}
                  </a>
                  <button
                    onClick={handleClose}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold transition-all"
                  >
                    Cerrar
                  </button>
                </div>
              </div>

              {/* Indicadores */}
              {promotions.length > 1 && (
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  {promotions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPromo(i)}
                      className={`h-1 transition-all ${
                        i === currentIndex
                          ? 'w-12 bg-white'
                          : 'w-8 bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Ver promoción ${i + 1}`}
                      aria-current={i === currentIndex ? 'true' : undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Icono de cerrar.
 * @returns {JSX.Element}
 */
function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
