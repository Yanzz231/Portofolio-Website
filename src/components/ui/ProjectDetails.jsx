import { motion, AnimatePresence } from "motion/react";
import { memo, useState, useCallback, useMemo } from "react";
import { CloseIcon, ArrowUpIcon } from "../icons";
import {
  ReactLogo,
  TailwindcssLogo,
  Html5Logo,
  Css3Logo,
  JavascriptLogo,
  TypescriptLogo,
  CsharpLogo,
  DotnetLogo,
  Auth0Logo,
  SqliteLogo,
  BlazorLogo,
  DotnetcoreLogo,
  CplusplusLogo,
  GitLogo,
  MicrosoftLogo,
  WordpressLogo,
  VitejsLogo,
  AzureLogo,
  StripeLogo,
  GolangLogo,
  NextjsLogo,
  ExpressjsLogo,
  BootstrapLogo,
  ElasticsearchLogo,
  LogstashLogo,
  KibanaLogo,
  FirebaseLogo,
  SupabaseLogo,
  NginxLogo,
  GcpLogo,
  FigmaLogo,
  PostmanLogo,
} from "../logos";

const logoMap = {
  "React.js": ReactLogo,
  "React": ReactLogo,
  "ReactJS": ReactLogo,
  "Tailwind CSS": TailwindcssLogo,
  "TailwindCSS": TailwindcssLogo,
  "HTML": Html5Logo,
  "HTML5": Html5Logo,
  "CSS": Css3Logo,
  "CSS3": Css3Logo,
  "JavaScript": JavascriptLogo,
  "TypeScript": TypescriptLogo,
  "C#": CsharpLogo,
  "Golang": GolangLogo,
  "Go": GolangLogo,
  ".Net": DotnetLogo,
  "ASP.NET": DotnetLogo,
  ".NET": DotnetLogo,
  ".NET Core": DotnetcoreLogo,
  ".NET 6": DotnetcoreLogo,
  "Next.js": NextjsLogo,
  "NextJS": NextjsLogo,
  "Express.js": ExpressjsLogo,
  "ExpressJS": ExpressjsLogo,
  "Bootstrap": BootstrapLogo,
  "Vite": VitejsLogo,
  "Vite.js": VitejsLogo,
  "Elasticsearch": ElasticsearchLogo,
  "Logstash": LogstashLogo,
  "Kibana": KibanaLogo,
  "Firebase": FirebaseLogo,
  "Supabase": SupabaseLogo,
  "NGINX": NginxLogo,
  "GCP": GcpLogo,
  "Google Cloud": GcpLogo,
  "Figma": FigmaLogo,
  "Postman": PostmanLogo,
  "Auth0": Auth0Logo,
  "SQLite": SqliteLogo,
  "Blazor": BlazorLogo,
  "C++": CplusplusLogo,
  "Git": GitLogo,
  "Microsoft": MicrosoftLogo,
  "WordPress": WordpressLogo,
  "Azure": AzureLogo,
  "Azure DevOps": AzureLogo,
  "Stripe": StripeLogo,
};

const ProjectDetails = memo(({
  title,
  description,
  subDescription,
  image,
  images,
  tags,
  href,
  closeModal,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageList = images && images.length > 0 ? images : (image ? [image] : []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  }, [imageList.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  }, [imageList.length]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }, [closeModal]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm"
      onClick={handleBackdropClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="relative max-w-6xl h-full md:h-[80vh] overflow-hidden border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-sm top-5 right-5 bg-midnight hover:bg-gray-500 z-10"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Left Column: Image Slider + Icons */}
          <div className="flex flex-col p-6 gap-6">
            {/* Image Slider */}
            <div className="relative flex-1 overflow-hidden rounded-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={imageList[currentImageIndex]}
                  alt={`${title} - ${currentImageIndex + 1}`}
                  className="object-cover w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {/* Navigation Arrows */}
              {imageList.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50 hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute p-2 transition-colors transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50 hover:bg-black/70"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute flex gap-2 transform -translate-x-1/2 bottom-4 left-1/2">
                    {imageList.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tech Stack Icons */}
            <div className="flex gap-3 flex-wrap">
              {tags.map((tag) => {
                const LogoComponent = logoMap[tag.name];
                return LogoComponent ? (
                  <div key={tag.id} className="rounded-full size-10 flex items-center justify-center bg-gradient-to-br from-indigo/20 to-royal/20 border border-white/10 backdrop-blur-sm">
                    <LogoComponent width="24" height="24" />
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="flex flex-col p-6 overflow-y-auto">
            <h5 className="mb-4 text-3xl font-bold text-white">{title}</h5>
            <div className="flex-1 space-y-4">
              <p className="text-lg font-normal text-neutral-300">{description}</p>
              {subDescription.map((subDesc, index) => (
                <p key={index} className="text-base font-normal text-neutral-400">{subDesc}</p>
              ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 mt-6 font-medium text-white transition-all rounded-lg cursor-pointer bg-gradient-to-r from-indigo to-royal hover:opacity-90"
            >
              View Project
              <ArrowUpIcon />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProjectDetails.displayName = 'ProjectDetails';

export default ProjectDetails;
