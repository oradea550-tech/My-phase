import React, { useEffect, useState } from 'react';

export default function Card({ children, style = {}, ...props }) {
  const [DS, setDS] = useState(null);
  useEffect(() => {
    import('../design-system/Card')
      .then((m) => setDS(() => m.default || m))
      .catch(() => {});
  }, []);

  if (DS) return <DS {...props} style={style}>{children}</DS>;

  return (
    <div
      {...props}
      style={{
        borderRadius: 12,
        padding: 28,
        background: 'rgba(255,255,255,0.02)',
        boxShadow: '0 6px 18px rgba(2,8,23,0.5)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
