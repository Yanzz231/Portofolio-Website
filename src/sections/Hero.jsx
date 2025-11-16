import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, memo, useState, useCallback } from "react";
import { HeroText, ErrorBoundary } from "../components/ui";
import { Astronaut, ParallaxBackground } from "../components/3d";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [glError, setGlError] = useState(false);

  const handleCreated = useCallback(({ gl }) => {
    if (!gl) {
      console.error("WebGL context creation failed");
      setGlError(true);
      return;
    }
    gl.setClearColor(0x000000, 0);
  }, []);

  const handleError = useCallback((error) => {
    console.error("Canvas error:", error);
    setGlError(true);
  }, []);

  return (
    <section className="flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space">
      <HeroText />
      <ParallaxBackground />
      {!glError && (
        <ErrorBoundary fallback={null}>
          <figure
            className="absolute inset-0"
            style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
          >
            <Canvas
              camera={{ position: [0, 1, 3] }}
              gl={{
                antialias: false,
                powerPreference: "high-performance",
                alpha: true,
                stencil: false,
                depth: true,
                preserveDrawingBuffer: false,
                failIfMajorPerformanceCaveat: false
              }}
              dpr={[1, 1.5]}
              onCreated={handleCreated}
              onError={handleError}
              style={{ pointerEvents: "auto" }}
            >
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <Astronaut
                    scale={isMobile ? 0.23 : 1}
                    position={isMobile ? [0, -1.5, 0] : [0, 0, 0]}
                  />
                </Float>
                <Rig />
              </Suspense>
            </Canvas>
          </figure>
        </ErrorBoundary>
      )}
    </section>
  );
};

const Rig = memo(() => {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x / 10, 1 + state.pointer.y / 10, 3],
      0.5,
      delta
    );
  });
  return null;
});

Rig.displayName = 'Rig';

export default memo(Hero);
