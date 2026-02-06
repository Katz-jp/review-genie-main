 import { QuestionCard } from "../QuestionCard";
 import { OptionButton } from "../OptionButton";
 import { NavigationButtons } from "../NavigationButtons";
 import { reasonOptions } from "@/types/review";
 
 interface StepReasonProps {
   value: string;
   onChange: (value: string) => void;
   onNext: () => void;
   onBack: () => void;
 }
 
 export const StepReason = ({ value, onChange, onNext, onBack }: StepReasonProps) => {
   return (
     <>
       <QuestionCard question="来院の理由は何ですか？">
         <div className="space-y-3">
           {reasonOptions.map((option) => (
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
         onBack={onBack}
         nextDisabled={!value}
       />
     </>
   );
 };