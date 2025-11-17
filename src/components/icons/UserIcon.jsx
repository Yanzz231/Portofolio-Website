import { memo } from "react";

const UserIcon = ({ width = 20, height = 20, className = "", ...props }) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

UserIcon.displayName = 'UserIcon';

export default memo(UserIcon);
