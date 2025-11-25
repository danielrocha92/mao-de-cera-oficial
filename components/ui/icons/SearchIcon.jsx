import React from 'react';

// components/ui/icons/SearchIcon.jsx
const SearchIcon = ({ className }) => (
  <svg
    className={className}
    aria-labelledby="title desc"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 19.9 19.7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <title id="title">Search Icon</title>
    <desc id="desc">A magnifying glass icon.</desc>
    <g>
      <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
      <circle cx="8" cy="8" r="7" />
    </g>
  </svg>
);

export default SearchIcon;
