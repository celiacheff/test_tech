import { MouseEvent, useState } from "react";
import { StepIndicator } from "./StepIndicator";

type Step = { name: string };
const steps: Step[] = [
  { name: "Retour approuvé par le marchand" },
  { name: "Envoi effectué" },
  { name: "Reception par le marchand" },
  { name: "Retour validé" },
];

export type Status = "complete" | "current" | "upcoming";

interface CheckoutStepperProps {
  currentStep: number;
}

const CheckoutStepper = ({ currentStep }: CheckoutStepperProps) => {
  const [stepHovered, setStepHovered] = useState<number | null>(null);

  const handleMouseOver = (evt: MouseEvent<HTMLLIElement>) => {
    const step = Number(evt.currentTarget.dataset.key);
    if (getStatusFromStep(step) === "upcoming") {
      setStepHovered(step);
    }
  };

  const handleMouseOut = () => {
    setStepHovered(null);
  };

  const getStatusFromStep = (step: number): Status => (step < currentStep ? "complete" : step > currentStep ? "upcoming" : "current");
  const isStepHovered = (step: number): boolean => {
    if (stepHovered === null) return false;
    return step <= stepHovered && getStatusFromStep(step) === "upcoming";
  };

  return (
    <div className="flex flex-col items-start justify-center border-2 rounded-xl border-black-500 p-4 min-w-[250px] max-w-[500px]">
      <div className="pb-4 text-gray-700 text-lg font-bold">Demande de retour</div>
      <nav aria-label="Progress" className="w-full">
        <ol role="list" className="flex items-center w-full">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              data-key={stepIdx}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className={"relative w-full"}
            >
              <StepIndicator stepStatus={getStatusFromStep(stepIdx)} stepName={step.name} isHovered={isStepHovered(stepIdx)}></StepIndicator>
            </li>
          ))}
        </ol>
      </nav>
      <div className="flex w-full justify-between pt-4">
        <div className={`${!stepHovered ? "text-blue-500" : "text-gray-500"}`}>{steps[stepHovered || currentStep].name}</div>
        <div className={`${!stepHovered ? "text-black-500" : "text-gray-500"}`}>Étape {(stepHovered || currentStep) + 1} / 4</div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
