'use client';

import type { ReactNode } from 'react';

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
  minLength?: number;
  required?: boolean;
}

/**
 * Campo con etiqueta flotante e icono, usado en el formulario animado de auth.
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
}: AuthFieldProps) {
  return (
    <fieldset className="relative border-b-2 border-slate-400 dark:border-slate-600 focus-within:border-[#2E7D32] pb-3 flex items-center gap-3 transition-colors mb-2">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        minLength={minLength}
        placeholder=" "
        className="outline-none peer flex-1 bg-transparent text-slate-900 dark:text-white text-base pt-1"
      />
      <label
        htmlFor={id}
        className="absolute left-0 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-600 peer-focus:-top-6 peer-focus:text-[#2E7D32] peer-focus:text-sm peer-focus:font-semibold -top-6 text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all pointer-events-none"
      >
        {label}
      </label>
      <span className="text-slate-600 dark:text-slate-400 shrink-0">{icon}</span>
    </fieldset>
  );
}
