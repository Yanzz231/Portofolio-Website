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

const outerSkills = [
  ReactLogo,
  NextjsLogo,
  DotnetLogo,
  GolangLogo,
  JavascriptLogo,
  TypescriptLogo,
  CsharpLogo,
  PythonLogo,
  Html5Logo,
  Css3Logo,
  ElasticsearchLogo,
  FirebaseLogo,
  SupabaseLogo,
  MysqlLogo,
];

const middleSkills = [
  TailwindcssLogo,
  BootstrapLogo,
  VitejsLogo,
  ExpressjsLogo,
  AzureLogo,
  GcpLogo,
  GitLogo,
  NginxLogo,
  MongodbLogo,
  PostgresqlLogo,
];

const innerSkills = [
  PostmanLogo,
  FigmaLogo,
  LogstashLogo,
  KibanaLogo,
  CplusplusLogo,
  PrismaLogo,
  StrapiLogo,
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
