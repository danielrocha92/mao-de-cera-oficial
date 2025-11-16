// components/ui/icons/CartIcon.jsx
const CartIcon = ({ className }) => (
  <svg
    className={className}
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="16.5" cy="18.5" r="1.5" fill="currentColor" />
    <circle cx="9.5" cy="18.5" r="1.5" fill="currentColor" />
    <path d="M17 17h-11v-14h-2" />
    <path d="M6 5l14 1l-1 7h-13" />
  </svg>
);

export default CartIcon;
