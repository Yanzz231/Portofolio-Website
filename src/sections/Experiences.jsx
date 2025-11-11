import { memo } from "react";
import { Timeline } from "../components/ui";
import { experiences } from "../constants";

const Experiences = memo(() => {
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
});

Experiences.displayName = 'Experiences';

export default Experiences;
