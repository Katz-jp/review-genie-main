 import { QuestionCard } from "../QuestionCard";
 import { OptionButton } from "../OptionButton";
 import { NavigationButtons } from "../NavigationButtons";
 import { triggerOptions } from "@/types/review";
 
 interface StepTriggerProps {
   value: string;
   onChange: (value: string) => void;
   onNext: () => void;
 }
 
 export const StepTrigger = ({ value, onChange, onNext }: StepTriggerProps) => {
   return (
     <>
       <QuestionCard question="来店のきっかけは何ですか？">
         <div className="space-y-3">
           {triggerOptions.map((option) => (
             <OptionButton
               key={option.value}
               label={option.label}
               selected={value === option.value}
               onClick={() => onChange(option.value)}
             />
           ))}
         </div>
       </QuestionCard>
       <NavigationButtons
         onNext={onNext}
         showBack={false}
         nextDisabled={!value}
       />
     </>
   );
 };