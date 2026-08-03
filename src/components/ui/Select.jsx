import React from 'react';

export default function Select(props) {
  return (
    <select
      {...props}
      style={{
        width: '100%',
        padding: '12px 14px',
        borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(255,255,255,0.02)',
        color: 'white',
        outline: 'none',
        boxSizing: 'border-box',
        appearance: 'none',
        ...props.style,
      }}
    />
  );
}
