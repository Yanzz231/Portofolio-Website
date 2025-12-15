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
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-10 gap-6 sm:gap-0"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex-1">
          <p className="text-2xl">{title}</p>
          <div className="flex gap-5 mt-2 text-sand">
            {tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </div>
        <button
          onClick={handleShowDetails}
          className="flex items-center gap-1 cursor-pointer transition-transform duration-300 hover:-translate-y-1 text-white"
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
