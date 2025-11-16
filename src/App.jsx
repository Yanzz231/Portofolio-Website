import React, { lazy, Suspense } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";

const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Experiences = lazy(() => import("./sections/Experiences"));
const Testimonial = lazy(() => import("./sections/Testimonial"));
const Contact = lazy(() => import("./sections/Contact"));

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      {/* <Navbar /> */}
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Experiences />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Testimonial />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default App;
