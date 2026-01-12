import React from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
    return (
        <section
            id={id}
            className={`py-20 lg:py-32 ${className}`} // Enforcing generous whitespace
        >
            {children}
        </section>
    );
};
