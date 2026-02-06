 import { motion } from "framer-motion";
 
 interface ProgressBarProps {
   currentStep: number;
   totalSteps: number;
 }
 
 export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
   const progress = ((currentStep) / totalSteps) * 100;
 
   return (
     <div className="w-full px-6 pt-4">
       <div className="flex justify-between items-center mb-2">
         <span className="text-sm text-muted-foreground">
           質問 {currentStep} / {totalSteps}
         </span>
         <span className="text-sm font-medium text-primary">
           {Math.round(progress)}%
         </span>
       </div>
       <div className="h-2 bg-secondary rounded-full overflow-hidden">
         <motion.div
           className="h-full gradient-primary rounded-full"
           initial={{ width: 0 }}
           animate={{ width: `${progress}%` }}
           transition={{ duration: 0.4, ease: "easeOut" }}
         />
       </div>
     </div>
   );
 };