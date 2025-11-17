import { memo } from "react";

const AwardIcon = ({ width = 20, height = 20, className = "", ...props }) => (
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
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

AwardIcon.displayName = 'AwardIcon';

export default memo(AwardIcon);
