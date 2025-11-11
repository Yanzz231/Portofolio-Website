import { memo } from 'react';

const LogstashLogo = memo(({ width = 32, height = 32, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    width={width}
    height={height}
    className={className}
  >
    <defs>
      <style>{`.cls-1{fill:#00bfb3;}.cls-2{fill:#fec514;}.cls-3{fill:#343741;}`}</style>
    </defs>
    <g transform="matrix(2.2459627,0,0,2.2459627,-19.757767,-35.37888)">
      <rect className="cls-1" height="10.685841" width="9.7953539" y="33.561947" x="25.271019"/>
      <path className="cls-2" d="M 11.913719,15.752212 H 11.023232 V 33.561947 H 22.59956 V 26.438053 A 10.685841,10.685841 0 0 0 11.913719,15.752212 Z"/>
      <path className="cls-3" d="m 11.023232,33.561947 v 0 a 10.685841,10.685841 0 0 0 10.685841,10.68584 h 0.890487 v -10.68584 z"/>
    </g>
  </svg>
));

LogstashLogo.displayName = 'LogstashLogo';

export default LogstashLogo;
