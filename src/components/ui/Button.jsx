import React from 'react';

export default function Button({ children, onClick, type = 'button', className = '', loading = false, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={loading || props.disabled}
      style={{
        marginTop: 18,
        width: '100%',
        padding: '12px 16px',
        borderRadius: 10,
        border: 'none',
        background: 'linear-gradient(90deg, #8A6CFF, #6F42C1)',
        color: 'white',
        fontWeight: 600,
        cursor: loading ? 'default' : 'pointer',
        boxShadow: '0 6px 18px rgba(111,66,193,0.18)',
        opacity: loading ? 0.8 : 1,
      }}
      {...props}
    >
      {loading ? 'Working...' : children}
    </button>
  );
}
