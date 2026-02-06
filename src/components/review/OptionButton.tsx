 import { motion } from "framer-motion";
 import { Check } from "lucide-react";
 import { cn } from "@/lib/utils";
 
 interface OptionButtonProps {
   label: string;
   selected: boolean;
   onClick: () => void;
   multiple?: boolean;
 }
 
 export const OptionButton = ({
   label,
   selected,
   onClick,
   multiple = false,
 }: OptionButtonProps) => {
   return (
     <motion.button
       whileTap={{ scale: 0.98 }}
       onClick={onClick}
       className={cn(
         "w-full p-4 rounded-xl text-left transition-all duration-200",
         "border-2 flex items-center justify-between",
         selected
           ? "border-primary bg-accent shadow-card"
           : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
       )}
     >
       <span
         className={cn(
           "font-medium transition-colors",
           selected ? "text-accent-foreground" : "text-foreground"
         )}
       >
         {label}
       </span>
       <div
         className={cn(
           "w-6 h-6 rounded-full flex items-center justify-center transition-all",
           multiple ? "rounded-md" : "rounded-full",
           selected
             ? "gradient-primary"
             : "border-2 border-muted-foreground/30"
         )}
       >
         {selected && <Check className="w-4 h-4 text-primary-foreground" />}
       </div>
     </motion.button>
   );
 };