import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NavLink({ href, children, style = {}, ...props }) {
  const [DS, setDS] = useState(null);
  useEffect(() => {
    import('../design-system/NavLink')
      .then((m) => setDS(() => m.default || m))
      .catch(() => {});
  }, []);

  if (DS) return <DS href={href} style={style} {...props}>{children}</DS>;

  return (
    <Link href={href} {...props}>
      <a style={{ color: 'var(--accent, #9b6cff)', textDecoration: 'underline', ...style }}>{children}</a>
    </Link>
  );
}
