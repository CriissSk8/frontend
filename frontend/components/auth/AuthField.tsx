/**
 * AuthField Component - New Era Supermercado
 * 
 * Campo de formulario con etiqueta flotante, icono y validación.
 * Usado en los formularios de autenticación (login y registro).
 * 
 * Características:
 * - Etiqueta flotante animada
 * - Icono decorativo
 * - Validación HTML5
 * - Siempre controlado (sin warnings de React)
 * - Estilos consistentes con el diseño corporativo
 * 
 * @module components/auth/AuthField
 */

'use client';

import type { ReactNode } from 'react';

/** Props del componente AuthField */
interface AuthFieldProps {
  /** ID único del campo (para label y accesibilidad) */
  id: string;
  /** Texto de la etiqueta flotante */
  label: string;
  /** Tipo de input HTML (text, email, password, tel, etc.) */
  type?: string;
  /** Valor actual del campo (siempre string, nunca undefined) */
  value: string;
  /** Callback cuando cambia el valor */
  onChange: (value: string) => void;
  /** Icono SVG a mostrar a la derecha */
  icon: ReactNode;
  /** Longitud mínima del texto (validación HTML5) */
  minLength?: number;
  /** Si el campo es obligatorio */
  required?: boolean;
  /** Texto de placeholder opcional */
  placeholder?: string;
}

/**
 * Campo de formulario con etiqueta flotante e icono.
 * 
 * Usado en formularios de autenticación con animaciones CSS.
 * La etiqueta flota hacia arriba cuando el campo tiene focus o valor.
 * 
 * @param {AuthFieldProps} props - Propiedades del componente
 * @returns {JSX.Element} Campo de formulario renderizado
 * 
 * @example
 * <AuthField
 *   id="email"
 *   label="Correo electrónico"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   icon={<EmailIcon />}
 *   required
 * />
 */
export default function AuthField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  icon,
  minLength,
  required = true,
  placeholder = ' ',
}: AuthFieldProps) {
  return (
    <fieldset className="relative border-b-2 border-slate-400 dark:border-slate-600 focus-within:border-[#1c6554] pb-3 flex items-center gap-3 transition-colors mb-2">
      {/* Input controlado - siempre tiene valor (string vacío por defecto) */}
      <input
        id={id}
        type={type}
        value={value || ''} // Garantizar que nunca sea undefined
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        className="outline-none peer flex-1 bg-transparent text-slate-900 dark:text-white text-base pt-1"
        aria-label={label}
      />
      
      {/* Etiqueta flotante con animación */}
      <label
        htmlFor={id}
        className="absolute left-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:-top-6 peer-focus:text-[#1c6554] peer-focus:text-sm peer-focus:font-semibold -top-6 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all pointer-events-none"
      >
        {label}
      </label>
      
      {/* Icono decorativo */}
      <span className="text-slate-600 dark:text-slate-400 shrink-0" aria-hidden="true">
        {icon}
      </span>
    </fieldset>
  );
}
