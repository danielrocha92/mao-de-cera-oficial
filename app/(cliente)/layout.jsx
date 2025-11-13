// This layout wraps the client-facing part of the application.
// The main layout in app/layout.jsx already includes Header and Footer.
// We can use this file for client-specific context providers or structures if needed.

export default function ClientLayout({ children }) {
  return <>{children}</>;
}
