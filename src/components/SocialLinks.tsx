import React from 'react';
import { SocialLink } from '../types';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'default' | 'muted';
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links, variant = 'default' }) => {
  const baseStyles = "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110";
  const variantStyles = {
    default: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
    muted: "bg-muted hover:bg-muted/80 text-muted-foreground"
  };

  return (
    <div className="flex gap-4">
      {links.map((link, index) => {
        const IconComponent = LucideIcons[link.icon as keyof typeof LucideIcons] as LucideIcon;
        
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseStyles} ${variantStyles[variant]}`}
            aria-label={link.platform}
          >
            {IconComponent && <IconComponent size={18} strokeWidth={2} />}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;