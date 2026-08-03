import React from 'react';
import Link from 'next/link';

export default function NavLink({ href, children, style = {}, ...props }) {
  return (
    <Link href={href} {...props}>
      <a style={{ color: 'var(--accent, #9b6cff)', textDecoration: 'underline', ...style }}>{children}</a>
    </Link>
  );
}
