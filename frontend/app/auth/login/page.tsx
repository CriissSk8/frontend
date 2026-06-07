import { redirect } from 'next/navigation';

/** Redirige a la pantalla unificada de auth con animación */
export default function LoginPage() {
  redirect('/auth');
}
