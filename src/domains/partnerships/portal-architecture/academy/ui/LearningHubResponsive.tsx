import { TrainingHubScreen } from "./mobile";
import { TrainingHubDesktop } from "./desktop";

export function LearningHubResponsive() {
  return (
    <div className="w-full">
      <div className="block lg:hidden">
        <TrainingHubScreen />
      </div>
      <div className="hidden lg:block">
        <TrainingHubDesktop />
      </div>
    </div>
  );
}

