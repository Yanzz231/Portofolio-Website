import { memo, useMemo } from "react";
import { OrbitingCircles } from "../animation";
import {
  CsharpLogo,
  JavascriptLogo,
  TypescriptLogo,
  CplusplusLogo,
  Html5Logo,
  Css3Logo,
  GolangLogo,
  PythonLogo,
  DotnetLogo,
  ReactLogo,
  NextjsLogo,
  ExpressjsLogo,
  TailwindcssLogo,
  BootstrapLogo,
  ElasticsearchLogo,
  LogstashLogo,
  KibanaLogo,
  FirebaseLogo,
  SupabaseLogo,
  MysqlLogo,
  MongodbLogo,
  PostgresqlLogo,
  PrismaLogo,
  AzureLogo,
  GitLogo,
  NginxLogo,
  GcpLogo,
  FigmaLogo,
  PostmanLogo,
  VitejsLogo,
  StrapiLogo,
} from "../logos";

// Tech stack based on CV:
// Programming Languages: C#, JavaScript, TypeScript, C++, HTML, CSS, C, Python, Golang
// Frameworks & Libraries: ASP.NET, .NET 6, ReactJS, NextJS, ExpressJS, Tailwind, Bootstrap
// Databases: MySQL, MongoDB, Prisma, PostgreSQL
// Tools & Platforms: Azure DevOps, Git, Postman, RDP, VPS, NGINX, GCP
// Software: Figma, JetBrains IDEA, Strapi
// Additional: ELK Stack (Elasticsearch, Logstash, Kibana), Firebase, Supabase, Vite

// Split skills into 3 groups for 3 orbits
// Outer orbit (largest): 14 icons
const outerSkills = [
  ReactLogo,            // ReactJS
  NextjsLogo,           // NextJS
  DotnetLogo,           // ASP.NET / .NET 6
  GolangLogo,           // Golang
  JavascriptLogo,       // JavaScript
  TypescriptLogo,       // TypeScript
  CsharpLogo,           // C#
  PythonLogo,           // Python
  Html5Logo,            // HTML
  Css3Logo,             // CSS
  ElasticsearchLogo,    // Elasticsearch
  FirebaseLogo,         // Firebase
  SupabaseLogo,         // Supabase
  MysqlLogo,            // MySQL
];

// Middle orbit: 10 icons
const middleSkills = [
  TailwindcssLogo,      // Tailwind
  BootstrapLogo,        // Bootstrap
  VitejsLogo,           // Vite
  ExpressjsLogo,        // ExpressJS
  AzureLogo,            // Azure DevOps
  GcpLogo,              // GCP
  GitLogo,              // Git
  NginxLogo,            // NGINX
  MongodbLogo,          // MongoDB
  PostgresqlLogo,       // PostgreSQL
];

// Inner orbit (smallest): 7 icons
const innerSkills = [
  PostmanLogo,          // Postman
  FigmaLogo,            // Figma
  LogstashLogo,         // Logstash
  KibanaLogo,           // Kibana
  CplusplusLogo,        // C++
  PrismaLogo,           // Prisma
  StrapiLogo,           // Strapi
];

const Frameworks = memo(() => {
  const outerOrbit = useMemo(() =>
    outerSkills.map((LogoComponent, index) => (
      <LogoComponent
        key={index}
        className="duration-200 rounded-sm hover:scale-110"
      />
    )),
    []
  );

  const middleOrbit = useMemo(() =>
    middleSkills.map((LogoComponent, index) => (
      <LogoComponent
        key={index}
        className="duration-200 rounded-sm hover:scale-110"
      />
    )),
    []
  );

  const innerOrbit = useMemo(() =>
    innerSkills.map((LogoComponent, index) => (
      <LogoComponent
        key={index}
        className="duration-200 rounded-sm hover:scale-110"
      />
    )),
    []
  );

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40} radius={150}>
        {outerOrbit}
      </OrbitingCircles>
      <OrbitingCircles iconSize={30} radius={100} reverse speed={1.5}>
        {middleOrbit}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={60} speed={2}>
        {innerOrbit}
      </OrbitingCircles>
    </div>
  );
});

Frameworks.displayName = 'Frameworks';

export default Frameworks;
