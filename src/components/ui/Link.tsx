import React from 'react';
import { navigate } from '../../lib/router';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

/** In-app link: plain left clicks navigate without a page reload; modified clicks behave like a normal <a>. */
const Link: React.FC<LinkProps> = ({ to, onClick, ...rest }) => (
  <a
    href={to}
    onClick={(event) => {
      onClick?.(event);
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      navigate(to);
    }}
    {...rest}
  />
);

export default Link;
