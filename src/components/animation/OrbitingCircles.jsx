import { twMerge } from "tailwind-merge";
import { memo, useMemo } from "react";
import { OrbitCircleIcon } from "../icons";

const OrbitingCircles = memo(({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}) => {
  const calculatedDuration = useMemo(() => duration / speed, [duration, speed]);

  return (
    <>
      {path && <OrbitCircleIcon radius={radius} />}
      {useMemo(() => {
        const childArray = Array.isArray(children) ? children : [children];
        return childArray.map((child, index) => {
          const angle = (360 / childArray.length) * index;
          return (
            <div
              key={index}
              style={{
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
              }}
              className={twMerge(
                `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full ${
                  reverse ? "[animation-direction:reverse]" : ""
                }`,
                className
              )}
              {...props}
            >
              {child}
            </div>
          );
        });
      }, [children, calculatedDuration, radius, iconSize, reverse, className, props])}
    </>
  );
});

OrbitingCircles.displayName = 'OrbitingCircles';

export default OrbitingCircles;
