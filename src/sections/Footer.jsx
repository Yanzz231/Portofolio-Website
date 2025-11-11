import { memo } from "react";
import { mySocials } from "../constants";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "../components/socials";

const socialIconMap = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
};

const Footer = memo(() => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space">
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index) => {
          const IconComponent = socialIconMap[social.name.toLowerCase()];
          return IconComponent ? (
            <a href={social.href} key={index} target="_blank" rel="noopener noreferrer">
              <IconComponent />
            </a>
          ) : null;
        })}
      </div>
      <p>© 2025 Ali. All rights reserved.</p>
    </section>
  );
});

Footer.displayName = 'Footer';

export default Footer;
