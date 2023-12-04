import { Status } from "./CheckoutStepper";

const stepClasses: Record<string, any> = {
  complete: {
    wrapper: "bg-blue-600 h-5 w-5",
    line: "bg-blue-600",
    circle: "bg-blue-600",
  },
  current: {
    wrapper: "bg-blue-600 h-5 w-5",
    line: "bg-blue-600",
    circle: "bg-blue-600",
  },
  upcoming: {
    wrapper: "border-2 border-gray-300 bg-white",
    line: "bg-gray-200",
    circle: "bg-transparent",
  },
  hovered: {
    wrapper: "border-2 border-gray-400 bg-white",
    line: "bg-gray-400",
    circle: "bg-gray-400",
  },
};

type StepIndicatorProps = {
  stepStatus: Status;
  stepName: string;
  isHovered: boolean;
};

export const StepIndicator = ({ stepStatus, stepName, isHovered }: StepIndicatorProps) => {
  const determineStatus = () => {
    if (isHovered && stepStatus === "upcoming") {
      return "hovered";
    }
    return stepStatus;
  };

  const status = determineStatus();

  return (
    <div className="group flex justify-end">
      <div className={`absolute inset-0 flex items-center`} aria-hidden="true">
        <div className={`h-1 w-full ${stepClasses[status].line}`}></div>
      </div>
      <a href="#" className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full ${stepClasses[status].wrapper}`}>
        {stepStatus !== "upcoming" ? <CheckIcon /> : <CircleIcon stepStatus={status} />}
        <span className="sr-only">{stepName}</span>
      </a>
    </div>
  );
};

const CircleIcon = ({ stepStatus }: any) => {
  return <span className={`h-2.5 w-2.5 rounded-full ${stepClasses[stepStatus].circle}`} aria-hidden="true" />;
};

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
};
