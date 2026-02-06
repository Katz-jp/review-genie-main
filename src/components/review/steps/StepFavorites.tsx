 import { QuestionCard } from "../QuestionCard";
 import { OptionButton } from "../OptionButton";
 import { NavigationButtons } from "../NavigationButtons";
 import { favoriteOptions } from "@/types/review";
 
 interface StepFavoritesProps {
   value: string[];
   onChange: (value: string[]) => void;
   onNext: () => void;
   onBack: () => void;
 }
 
 export const StepFavorites = ({ value, onChange, onNext, onBack }: StepFavoritesProps) => {
   const toggleFavorite = (favorite: string) => {
     if (value.includes(favorite)) {
       onChange(value.filter((f) => f !== favorite));
     } else {
       onChange([...value, favorite]);
     }
   };
 
   return (
     <>
       <QuestionCard
         question="特に気に入った点はどこですか？"
         subtitle="複数選択できます"
       >
         <div className="space-y-3">
           {favoriteOptions.map((option) => (
             <OptionButton
               key={option.value}
               label={option.label}
               selected={value.includes(option.value)}
               onClick={() => toggleFavorite(option.value)}
               multiple
             />
           ))}
         </div>
       </QuestionCard>
       <NavigationButtons
         onNext={onNext}
         onBack={onBack}
         nextDisabled={value.length === 0}
       />
     </>
   );
 };