import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  children,
  className = '',
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-bg-tertiary text-text-secondary',
    success: 'bg-accent-green/20 text-accent-green',
    warning: 'bg-accent-yellow/20 text-accent-yellow',
    danger: 'bg-accent-red/20 text-accent-red',
    info: 'bg-accent-blue/20 text-accent-blue',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}