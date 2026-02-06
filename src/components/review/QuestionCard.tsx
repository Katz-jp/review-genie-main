 import { motion } from "framer-motion";
 import { ReactNode } from "react";
 
 interface QuestionCardProps {
   question: string;
   subtitle?: string;
   children: ReactNode;
 }
 
 export const QuestionCard = ({ question, subtitle, children }: QuestionCardProps) => {
   return (
     <motion.div
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.4, ease: "easeOut" }}
       className="flex-1 flex flex-col px-6 py-8"
     >
       <div className="mb-8">
         <h2 className="text-xl font-bold text-foreground leading-relaxed mb-2">
           {question}
         </h2>
         {subtitle && (
           <p className="text-sm text-muted-foreground">{subtitle}</p>
         )}
       </div>
       <div className="flex-1">{children}</div>
     </motion.div>
   );
 };