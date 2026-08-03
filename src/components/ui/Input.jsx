import React from 'react';

export default function Input(props) {
  return (
    <input
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
        boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.01)',
        ...props.style,
      }}
    />
  );
}
