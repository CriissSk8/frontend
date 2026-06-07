'use client';

import { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoadingSpinner from '@/components/auth/LoadingSpinner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    setSent(true);
  }

  return (
    <AuthLayout type="forgot-password">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Recuperar contraseña
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Te enviaremos un enlace para restablecer tu acceso
        </p>
      </header>

      {sent ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
          Si el correo <strong>{email}</strong> está registrado, recibirás instrucciones en breve.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 input-focus transition-all"
              placeholder="tu@email.com"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#2E7D32] hover:bg-[#2E7D32]/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                Enviando...
              </span>
            ) : (
              'Enviar enlace de recuperación'
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
