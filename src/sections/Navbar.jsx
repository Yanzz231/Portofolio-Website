import { memo, useState, useEffect } from "react";
import { mySocials } from "@/constants";
import { InstagramIcon, LinkedInIcon } from "@/components/socials";

const socialIconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "work", "contact"];
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
    <div className="w-full h-[65px] fixed top-0 z-50 px-4 md:px-10 mt-2 md:mt-3">
      <div className="w-full h-full flex flex-row items-center justify-between m-auto">
        {/* Logo Section - Empty Space */}
        <div className="w-[50px] md:w-[70px]"></div>

        {/* Center Navigation - Glassmorphism Pill (Hidden on Mobile) */}
        <div className="hidden md:flex w-auto h-full flex-row items-center justify-center flex-1 mx-8">
          <div className="flex items-center justify-between w-auto gap-2 border border-[#7042f861] bg-[#0300145e] px-[12px] py-[6px] rounded-full text-gray-200">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`cursor-pointer px-3 py-1.5 rounded-full transition-all duration-300 text-sm ${
                    isActive
                      ? "bg-gradient-to-r from-lavender to-royal text-white shadow-lg"
                      : "hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Social Icons */}
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
  );
};

export default memo(Navbar);
