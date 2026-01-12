import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'flat';
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    variant = 'default',
    noPadding = false
}) => {
    const variants = {
        default: 'bg-card border border-border shadow-sm',
        outline: 'bg-transparent border border-border',
        flat: 'bg-muted/50 border-0',
    };

    return (
        <div
            className={`
        ${variants[variant]}
        rounded-xl overflow-hidden
        ${noPadding ? '' : 'p-6'}
        ${className}
      `}
        >
            {children}
        </div>
    );
};
