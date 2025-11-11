import { useRef, memo, useState, useEffect } from "react";
import { Card, CopyEmailButton, Frameworks } from "../components/ui";
import { Globe } from "../components/3d";
import {
  DotnetLogo,
  ReactLogo,
  AzureLogo,
  GolangLogo,
  NextjsLogo,
  CsharpLogo,
  TypescriptLogo,
  ElasticsearchLogo,
  MysqlLogo,
  GcpLogo,
  PostgresqlLogo,
  MongodbLogo,
} from "../components/logos";

const About = memo(() => {
  const grid2Container = useRef();
  const globeContainer = useRef();
  const [showGlobe, setShowGlobe] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowGlobe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (globeContainer.current) {
      observer.observe(globeContainer.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="assets/images/misc/coding-pov.png"
            alt="Coding POV"
            loading="lazy"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Andrian Pratama</p>
            <p className="subtext">
              As an undergraduate Computer Science student at Bina Nusantara University and a Fullstack Developer with 3 years of experience in web and mobile application development, highly enthusiastic about system architecture and cloud technologies.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
        {/* Grid 2 */}
        <div className="grid-default-color grid-2">
          <div
            ref={grid2Container}
            className="flex items-center justify-center w-full h-full relative overflow-hidden"
          >
            <p className="z-10 text-4xl md:text-5xl font-bold text-gray-300 text-center px-4">
              System Architecture<br/>& Cloud Technologies
            </p>
            {/* Floating Icons */}
            <div className="absolute top-[10%] left-[15%] opacity-20">
              <DotnetLogo width={60} height={60} />
            </div>
            <div className="absolute top-[25%] right-[20%] opacity-25">
              <ReactLogo width={50} height={50} />
            </div>
            <div className="absolute bottom-[25%] left-[10%] opacity-20">
              <AzureLogo width={55} height={55} />
            </div>
            <div className="absolute top-[60%] right-[15%] opacity-25">
              <GolangLogo width={50} height={50} />
            </div>
            <div className="absolute bottom-[15%] right-[25%] opacity-20">
              <NextjsLogo width={45} height={45} />
            </div>
            <div className="absolute top-[40%] left-[25%] opacity-15">
              <CsharpLogo width={40} height={40} />
            </div>
            <div className="absolute bottom-[40%] right-[30%] opacity-20">
              <TypescriptLogo width={45} height={45} />
            </div>
            <div className="absolute top-[15%] right-[35%] opacity-15">
              <ElasticsearchLogo width={40} height={40} />
            </div>
            <div className="absolute bottom-[30%] left-[30%] opacity-20">
              <MysqlLogo width={50} height={50} />
            </div>
            <div className="absolute top-[70%] left-[20%] opacity-15">
              <GcpLogo width={40} height={40} />
            </div>
            <div className="absolute top-[50%] right-[10%] opacity-20">
              <PostgresqlLogo width={45} height={45} />
            </div>
            <div className="absolute bottom-[50%] left-[35%] opacity-15">
              <MongodbLogo width={40} height={40} />
            </div>
          </div>
        </div>
        {/* Grid 3 */}
        <div ref={globeContainer} className="grid-black-color grid-3">
          <div className="z-10 w-[60%]">
            <p className="headtext">Location</p>
            <p className="subtext">
              Based in Tangerang, Indonesia. Open to remote work worldwide
            </p>
          </div>
          <figure className="absolute left-[30%] top-[10%]">
            {showGlobe && <Globe />}
          </figure>
        </div>
        {/* Grid 4 */}
        <div className="grid-special-color grid-4">
          <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
            <CopyEmailButton />
          </div>
        </div>
        {/* Grid 5 */}
        <div className="grid-default-color grid-5">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks />
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

export default About;
