'use client';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import AuthField from '@/components/auth/AuthField';
import LoadingSpinner from '@/components/auth/LoadingSpinner';

type AuthMode = 'login' | 'register';

interface AnimatedAuthProps {
  initialMode?: AuthMode;
}

const ANIMATION_MS = 500;

export default function AnimatedAuth({ initialMode = 'login' }: AnimatedAuthProps) {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(initialMode === 'register');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: '',
    address: '',
    city: '',
    confirmPassword: ''
  });

  // Desactivar la animación inicial después del primer render
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialMount(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const switchMode = useCallback(
    (toSignUp: boolean) => {
      if (isAnimating || isSignUp === toSignUp) return;
      setHasInteracted(true);
      setIsAnimating(true);
      setIsSignUp(toSignUp);
      setTimeout(() => setIsAnimating(false), ANIMATION_MS);
    },
    [isAnimating, isSignUp]
  );

  async function handleLoginSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    router.push('/');
  }

  async function handleRegisterSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    router.push('/');
  }

  const loginFormClass = getPanelAnimationClass('login-form', isSignUp, hasInteracted);
  const loginTextClass = getPanelAnimationClass('login-text', isSignUp, hasInteracted);
  const registerTextClass = getPanelAnimationClass('register-text', isSignUp, hasInteracted);
  const registerFormClass = getPanelAnimationClass('register-form', isSignUp, hasInteracted);

  return (
    <>
      {/* Logo - posición dinámica según modo */}
      <div className={`fixed z-[9999] transition-all duration-1000 ease-in-out hover:scale-110 pointer-events-auto ${
        isSignUp ? 'top-4 right-4' : 'bottom-4 left-4'
      }`} style={{
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
      }}>
        <Logo size="xl" />
      </div>

      <Link
        href="/"
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white backdrop-blur-sm border border-slate-200 text-slate-700 hover:text-slate-900 transition-all hover:shadow-md group pointer-events-auto"
      >
        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Volver al inicio</span>
      </Link>

      {/* Article principal */}
      <article className="bg-white dark:bg-slate-900 grid grid-cols-1 lg:grid-cols-2 w-full h-screen relative overflow-hidden">
        {/* Bloque rotado con gradiente corporativo */}
        <div
          className={`absolute bottom-0 bg-gradient-to-br from-[#0C447C] to-[#1c6554] w-[200%] h-[200%] transition-all duration-1000 ease-in-out ${
            isSignUp ? 'rotate-[-57deg] left-[-115%]' : 'rotate-[57deg] left-[15%]'
          }`}
          aria-hidden="true"
        />

        {/* LOGIN FORM */}
        <form
          onSubmit={handleLoginSubmit}
          className={`grid gap-8 content-center relative z-10 row-start-1 col-start-1 px-8 sm:px-12 lg:px-20 xl:px-24 py-10 ${
            isInitialMount ? 'opacity-0' : ''
          } ${loginFormClass} ${
            isSignUp ? 'hidden lg:grid' : 'grid'
          }`}
          style={isInitialMount ? { animation: 'fadeIn 0.6s ease-out 0.2s forwards' } : undefined}
        >
          <AuthFormHeader title="Iniciar sesión" />

          <AuthField
            id="login-email"
            label="Correo electrónico"
            type="email"
            value={loginData.email}
            onChange={(email) => setLoginData((prev) => ({ ...prev, email }))}
            icon={<UserIcon />}
          />

          <AuthField
            id="login-password"
            label="Contraseña"
            type="password"
            value={loginData.password}
            onChange={(password) => setLoginData((prev) => ({ ...prev, password }))}
            icon={<LockIcon />}
          />

          <div className="text-right -mt-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-[#1c6554] hover:text-[#1c6554]/70 font-semibold underline underline-offset-2"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <SubmitButton loading={isLoading} disabled={isAnimating} label="Iniciar sesión" loadingLabel="Iniciando..." />

          <p className="text-base text-center text-slate-700 dark:text-slate-300 font-normal">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              onClick={() => switchMode(true)}
              disabled={isAnimating}
              className="font-bold text-[#1c6554] hover:text-[#1c6554]/70 transition-colors underline underline-offset-2"
            >
              Regístrate
            </button>
          </p>
        </form>

        {/* TEXTO DERECHO (visible en modo login) */}
        <div
          className={`hidden lg:flex flex-col justify-center items-end gap-4 relative z-10 row-start-1 col-start-2 px-12 lg:px-20 xl:px-24 ${
            isInitialMount ? 'opacity-0' : ''
          } ${loginTextClass}`}
          style={isInitialMount ? { animation: 'fadeIn 0.6s ease-out 0.35s forwards' } : undefined}
        >
          <h3 className="text-4xl xl:text-5xl uppercase font-black text-slate-900 max-w-[320px] text-right leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
            ¡Bienvenido!
          </h3>
          <p className="text-slate-800 max-w-[320px] text-right text-base leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">
            Ingresa tus credenciales para acceder a ofertas exclusivas y recibir tus productos frescos en casa.
          </p>
        </div>

        {/* TEXTO IZQUIERDO (visible en modo registro) */}
        <div
          className={`hidden lg:flex flex-col justify-center items-start gap-4 relative z-10 row-start-1 col-start-1 px-12 lg:px-20 xl:px-24 ${
            isInitialMount ? 'opacity-0' : ''
          } ${registerTextClass}`}
          style={isInitialMount ? { animation: 'fadeIn 0.6s ease-out 0.35s forwards' } : undefined}
        >
          <h3 className="text-4xl xl:text-5xl uppercase font-black text-slate-900 max-w-[320px] text-left leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
            ¡Únete!
          </h3>
          <p className="text-slate-800 max-w-[320px] text-left text-base leading-relaxed font-bold drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">
            Crea tu cuenta y disfruta de envío gratis, ofertas exclusivas y entregas en menos de 30 minutos.
          </p>
        </div>

        {/* REGISTER FORM */}
        <form
          onSubmit={handleRegisterSubmit}
          className={`grid gap-6 content-start relative z-10 row-start-1 col-start-2 px-8 sm:px-12 lg:px-20 xl:px-24 py-10 overflow-y-auto max-h-screen ${
            isInitialMount ? 'opacity-0' : ''
          } ${registerFormClass} ${
            isSignUp ? 'grid' : 'hidden lg:grid'
          }`}
          style={isInitialMount ? { animation: 'fadeIn 0.6s ease-out 0.2s forwards' } : undefined}
        >
          <AuthFormHeader title="Crear cuenta" />

          <AuthField
            id="register-name"
            label="Nombre completo"
            value={registerData.name}
            onChange={(name) => setRegisterData((prev) => ({ ...prev, name }))}
            icon={<UserIcon />}
          />

          <AuthField
            id="register-email"
            label="Correo electrónico"
            type="email"
            value={registerData.email}
            onChange={(email) => setRegisterData((prev) => ({ ...prev, email }))}
            icon={<EmailIcon />}
          />

          <AuthField
            id="register-phone"
            label="Teléfono"
            type="tel"
            value={registerData.phone}
            onChange={(phone) => setRegisterData((prev) => ({ ...prev, phone }))}
            icon={<PhoneIcon />}
          />

          <AuthField
            id="register-address"
            label="Dirección de entrega"
            value={registerData.address}
            onChange={(address) => setRegisterData((prev) => ({ ...prev, address }))}
            icon={<MapIcon />}
          />

          <AuthField
            id="register-city"
            label="Ciudad"
            value={registerData.city}
            onChange={(city) => setRegisterData((prev) => ({ ...prev, city }))}
            icon={<MapIcon />}
          />

          <AuthField
            id="register-password"
            label="Contraseña"
            type="password"
            value={registerData.password}
            onChange={(password) => setRegisterData((prev) => ({ ...prev, password }))}
            icon={<LockIcon />}
            minLength={8}
          />

          <AuthField
            id="register-confirm-password"
            label="Confirmar contraseña"
            type="password"
            value={registerData.confirmPassword}
            onChange={(confirmPassword) => setRegisterData((prev) => ({ ...prev, confirmPassword }))}
            icon={<LockIcon />}
            minLength={8}
          />

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-4 h-4 accent-[#1c6554]"
            />
            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
              Acepto los{' '}
              <a href="/terminos" className="text-[#1c6554] hover:underline font-medium">
                términos y condiciones
              </a>
              {' '}y la{' '}
              <a href="/privacidad" className="text-[#1c6554] hover:underline font-medium">
                política de privacidad
              </a>
            </label>
          </div>

          <SubmitButton loading={isLoading} disabled={isAnimating} label="Crear cuenta" loadingLabel="Creando..." />

          <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-700">
            <p className="text-base text-slate-600 dark:text-slate-400">
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => switchMode(false)}
                disabled={isAnimating}
                className="font-bold text-[#1c6554] hover:text-[#1c6554]/70 transition-colors underline underline-offset-2"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </form>
    </article>
    </>
  );
}

type PanelId = 'login-form' | 'login-text' | 'register-text' | 'register-form';

/** Controla visibilidad y animación de cada panel según el modo activo */
function getPanelAnimationClass(panel: PanelId, isSignUp: boolean, hasInteracted: boolean): string {
  if (!hasInteracted) {
    const visible = {
      'login-form': !isSignUp,
      'login-text': !isSignUp,
      'register-text': isSignUp,
      'register-form': isSignUp,
    };
    return visible[panel] ? 'relative' : 'invisible relative';
  }

  const classes: Record<PanelId, { login: string; register: string }> = {
    'login-form': {
      login: 'relative animate-auth-appear-left',
      register: 'invisible relative animate-auth-hide-left',
    },
    'login-text': {
      login: 'relative animate-auth-appear-right',
      register: 'invisible relative animate-auth-hide-right',
    },
    'register-text': {
      login: 'invisible relative animate-auth-hide-left',
      register: 'relative animate-auth-appear-left',
    },
    'register-form': {
      login: 'invisible relative animate-auth-hide-right',
      register: 'relative animate-auth-appear-right',
    },
  };

  return isSignUp ? classes[panel].register : classes[panel].login;
}

function AuthFormHeader({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center lg:text-left text-slate-900 dark:text-white mb-3">
        {title}
      </h2>
      <div className="w-12 h-1 bg-gradient-to-r from-[#0C447C] to-[#1c6554] mx-auto lg:mx-0 mb-8"></div>
    </div>
  );
}

function SubmitButton({
  loading,
  disabled,
  label,
  loadingLabel,
}: {
  loading: boolean;
  disabled: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="bg-gradient-to-r from-[#0C447C] to-[#1c6554] text-white py-3.5 font-semibold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}
