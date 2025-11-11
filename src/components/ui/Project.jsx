import { useState, memo, useCallback } from "react";
import { AnimatePresence } from "motion/react";
import ProjectDetails from "./ProjectDetails";
import { ArrowRightIcon } from "../icons";

const Project = memo(({
  title,
  description,
  subDescription,
  href,
  image,
  images,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  const previewImage = image || (images && images[0]);

  const handleMouseEnter = useCallback(() => setPreview(previewImage), [previewImage, setPreview]);
  const handleMouseLeave = useCallback(() => setPreview(null), [setPreview]);
  const handleShowDetails = useCallback(() => setIsHidden(true), []);
  const handleCloseDetails = useCallback(() => setIsHidden(false), []);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={handleShowDetails}
          className="flex items-center gap-1 cursor-pointer hover-animation text-white"
        >
          Read More
          <ArrowRightIcon />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <AnimatePresence>
        {isHidden && (
          <ProjectDetails
            title={title}
            description={description}
            subDescription={subDescription}
            image={image}
            images={images}
            tags={tags}
            href={href}
            closeModal={handleCloseDetails}
          />
        )}
      </AnimatePresence>
    </>
  );
});

Project.displayName = 'Project';

export default Project;
