 import { QuestionCard } from "../QuestionCard";
 import { NavigationButtons } from "../NavigationButtons";
 import { Textarea } from "@/components/ui/textarea";
 
 interface StepImpressionProps {
   value: string;
   onChange: (value: string) => void;
   onNext: () => void;
   onBack: () => void;
 }
 
 export const StepImpression = ({ value, onChange, onNext, onBack }: StepImpressionProps) => {
   return (
     <>
       <QuestionCard
         question="印象に残ったことはありますか？"
         subtitle="自由にお書きください（スキップ可）"
       >
         <Textarea
           value={value}
           onChange={(e) => onChange(e.target.value)}
           placeholder="説明が丁寧だった、リラックスできた、等"
           className="min-h-[150px] text-base resize-none border-2 border-border focus:border-primary bg-card rounded-xl p-4"
         />
       </QuestionCard>
       <NavigationButtons
         onNext={onNext}
         onBack={onBack}
         nextLabel={value ? "次へ" : "スキップして次へ"}
       />
     </>
   );
 };