import { Html, useProgress } from "@react-three/drei";
import { memo } from "react";

const Loader = memo(() => {
  const { progress } = useProgress();
  return (
    <Html center className="text-xl font-normal text-center">
      {progress !== undefined ? Math.round(progress) : 0}% Loaded
    </Html>
  );
});

Loader.displayName = 'Loader';

export default Loader;
