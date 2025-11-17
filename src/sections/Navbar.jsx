import { memo, useState, useEffect } from "react";
import { mySocials } from "@/constants";
import { InstagramIcon, LinkedInIcon } from "@/components/socials";
import { HomeIcon, UserIcon, BriefcaseIcon, AwardIcon, CertificateIcon, MailIcon } from "@/components/icons";

const socialIconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

const navLinks = [
  { name: "Home", href: "#home", icon: HomeIcon },
  { name: "About", href: "#about", icon: UserIcon },
  { name: "Projects", href: "#work", icon: BriefcaseIcon },
  { name: "Experience", href: "#experience", icon: AwardIcon },
  { name: "Certifications", href: "#certifications", icon: CertificateIcon },
  { name: "Contact", href: "#contact", icon: MailIcon },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "experience", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 mt-2 md:mt-3">
        <div className="w-full h-full flex flex-row items-center justify-between m-auto">
          <div className="text-white font-bold" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}>
            <span className="text-white">Yanz</span>
            <span className="text-gray-400">.</span>
          </div>

          <div className="flex flex-row gap-2 md:gap-3">
            {mySocials.map((social) => {
              const IconComponent = socialIconMap[social.name.toLowerCase()];
              return IconComponent ? (
                <a
                  href={social.href}
                  key={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 md:p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-gradient-to-r hover:from-lavender hover:to-royal hover:border-lavender hover:scale-110 transition-all duration-200"
                >
                  <IconComponent width={18} height={18} className="md:w-[20px] md:h-[20px] text-gray-200 hover:text-white transition-colors" />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <div className="hidden md:flex fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.substring(1);
          const IconComponent = link.icon;

          return (
            <div key={link.name} className="relative group">
              <a
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-lavender to-royal border-2 border-lavender shadow-lg shadow-lavender/50"
                    : "bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:bg-white/20 hover:border-lavender hover:shadow-lg hover:shadow-lavender/30"
                }`}
              >
                <IconComponent
                  width={20}
                  height={20}
                  className={`transition-colors ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`}
                />
              </a>

              {hoveredLink === link.name && (
                <div className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-navy/90 backdrop-blur-sm border border-white/20 rounded-lg whitespace-nowrap">
                  <span className="text-white text-sm font-medium">{link.name}</span>
                  <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-navy/90"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-t border-white/20 safe-area-bottom">
        <div className="flex items-center justify-evenly px-2 py-2.5 max-w-screen overflow-x-hidden">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            const IconComponent = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-to-r from-lavender to-royal shadow-lg shadow-lavender/50"
                    : "bg-transparent hover:bg-white/10"
                }`}
              >
                <IconComponent
                  width={20}
                  height={20}
                  className={`transition-colors ${isActive ? "text-white" : "text-gray-400"}`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
