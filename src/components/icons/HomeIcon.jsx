import { memo } from "react";

const HomeIcon = ({ width = 20, height = 20, className = "", ...props }) => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

HomeIcon.displayName = 'HomeIcon';

export default memo(HomeIcon);
