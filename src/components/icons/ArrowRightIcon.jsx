import { memo } from 'react';

const ArrowRightIcon = ({ className = "w-5", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8"
      clipRule="evenodd"
    />
  </svg>
);

ArrowRightIcon.displayName = 'ArrowRightIcon';

export default memo(ArrowRightIcon);
