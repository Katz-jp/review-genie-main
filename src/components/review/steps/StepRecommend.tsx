 import { QuestionCard } from "../QuestionCard";
 import { OptionButton } from "../OptionButton";
 import { NavigationButtons } from "../NavigationButtons";
 import { recommendOptions } from "@/types/review";
 
interface StepRecommendProps {
   value: string;
   onChange: (value: string) => void;
   onGenerate: () => void;
   onBack: () => void;
   isGenerating?: boolean;
 }

 export const StepRecommend = ({ value, onChange, onGenerate, onBack, isGenerating = false }: StepRecommendProps) => {
   return (
     <>
       <QuestionCard question="どんな人におすすめしたいですか？">
         <div className="space-y-3">
           {recommendOptions.map((option) => (
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
         onBack={onBack}
         showNext={false}
         showGenerate={true}
         onGenerate={onGenerate}
         nextDisabled={!value}
         isGenerateLoading={isGenerating}
       />
     </>
   );
 };