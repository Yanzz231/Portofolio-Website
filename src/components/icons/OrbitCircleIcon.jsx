import { memo } from 'react';

const OrbitCircleIcon = ({ radius = 160, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    className={`absolute inset-0 pointer-events-none size-full ${className}`}
  >
    <circle
      className="stroke-1 stroke-white/10"
      cx="50%"
      cy="50%"
      r={radius}
      fill="none"
    />
  </svg>
);

OrbitCircleIcon.displayName = 'OrbitCircleIcon';

export default memo(OrbitCircleIcon);
