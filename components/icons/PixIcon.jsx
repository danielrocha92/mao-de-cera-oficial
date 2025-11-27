import React from 'react';

const PixIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.43 5.47a3.4 3.4 0 0 0-4.8 0L12 6.1l-.63-.63a3.4 3.4 0 0 0-4.8 0 3.4 3.4 0 0 0 0 4.8l.63.63-.63.63a3.4 3.4 0 0 0 0 4.8 3.4 3.4 0 0 0 4.8 0l.63-.63.63.63a3.4 3.4 0 0 0 4.8 0 3.4 3.4 0 0 0 0-4.8l-.63-.63.63-.63a3.4 3.4 0 0 0 0-4.8zM12 14.9l-2.9-2.9 2.9-2.9 2.9 2.9-2.9 2.9z"
      fill={color}
    />
  </svg>
);

export default PixIcon;
