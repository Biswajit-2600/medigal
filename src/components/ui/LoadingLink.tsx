"use client";

import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import { ReactNode, MouseEvent } from 'react';

interface LoadingLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  loadingMessage?: string;
  style?: React.CSSProperties;
}

export default function LoadingLink({ 
  children, 
  className, 
  style,
  loadingMessage = 'Loading...', 
  ...props 
}: LoadingLinkProps) {
  const router = useRouter();
  const { showLoading } = useLoading();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showLoading(loadingMessage);
    
    // Small delay to show the loading screen before navigation
    setTimeout(() => {
      router.push(props.href.toString());
    }, 100);
  };

  return (
    <Link {...props} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}