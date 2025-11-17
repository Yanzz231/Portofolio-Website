"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";

const TimelineItem = memo(({ item, index }) => {
  return (
    <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
      <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
        <div className="absolute flex items-center justify-center w-10 h-10 rounded-full -left-[15px] bg-midnight">
          <div className="w-4 h-4 p-2 border rounded-full bg-neutral-800 border-neutral-700" />
        </div>
        <div className="flex-col hidden gap-2 font-bold md:flex md:pl-20 text-neutral-300">
          <h3 style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}>{item.date}</h3>
          {item.title && <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)' }} className="text-neutral-400">{item.title}</h3>}
          <h3 style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)' }} className="text-neutral-500">{item.job}</h3>
        </div>
      </div>

      <div className="relative w-full pl-20 pr-4 md:pl-4">
        <div className="block mb-4 text-left md:hidden">
          <h3 className="font-bold text-neutral-300" style={{ fontSize: 'clamp(0.875rem, 3.5vw, 1.125rem)' }}>{item.date}</h3>
          {item.title && <h3 className="font-bold text-neutral-400" style={{ fontSize: 'clamp(1.25rem, 5vw, 1.5rem)' }}>{item.title}</h3>}
          <h3 className="font-bold text-neutral-500" style={{ fontSize: 'clamp(1rem, 4.5vw, 1.25rem)' }}>{item.job}</h3>
        </div>

        {item.positions ? (
          <div className="space-y-6">
            {item.positions.map((position, posIndex) => (
              <div key={posIndex} className="pb-6 border-b border-neutral-700 last:border-b-0">
                <div className="mb-3">
                  <h4 className="font-bold text-neutral-300" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>{position.title}</h4>
                  <p className="text-neutral-400" style={{ fontSize: 'clamp(0.8125rem, 1.5vw, 0.875rem)' }}>{position.event} · {position.date}</p>
                </div>
                <ul className="space-y-3 list-disc list-outside ml-5">
                  {position.contents.map((content, contentIndex) => (
                    <li className="font-normal text-neutral-400 pl-2" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }} key={contentIndex}>
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3 list-disc list-outside ml-5">
            {item.contents.map((content, contentIndex) => (
              <li className="font-normal text-neutral-400 pl-2" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }} key={contentIndex}>
                {content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';

const Timeline = memo(({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  useEffect(() => {
    updateHeight();
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateHeight, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const timelineItems = useMemo(() =>
    data.map((item, index) => (
      <TimelineItem
        key={index}
        item={item}
        index={index}
      />
    )),
    [data]
  );

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <div ref={ref} className="relative pb-20">
        {timelineItems}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
