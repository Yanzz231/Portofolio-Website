import { memo } from "react";

const CertificateIcon = ({ width = 20, height = 20, className = "", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={width}
    height={height}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h12" />
    <circle cx="18" cy="18" r="3" />
    <path d="M18 14v8" />
    <path d="M15.5 20.5l2.5-2.5 2.5 2.5" />
  </svg>
);

CertificateIcon.displayName = 'CertificateIcon';

export default memo(CertificateIcon);
