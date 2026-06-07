import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  iconOnly?: boolean;
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'h-9',
  md: 'h-[52px]',
  lg: 'h-[72px]',
} as const;

export default function Logo({ size = 'md', iconOnly = false, className = '' }: LogoProps) {
  const heightClass = iconOnly ? SIZE_CLASSES.sm : SIZE_CLASSES[size];

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <Image
        src="/logo.png"
        alt="New Era Domicilios"
        width={200}
        height={80}
        priority
        className={`${heightClass} w-auto object-contain transition-transform duration-200 group-hover:scale-105`}
      />
    </Link>
  );
}
