 import { Button } from "@/components/ui/button";
 import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
 
 interface NavigationButtonsProps {
   onBack?: () => void;
   onNext?: () => void;
   onGenerate?: () => void;
   showBack?: boolean;
   showNext?: boolean;
   showGenerate?: boolean;
   nextDisabled?: boolean;
   nextLabel?: string;
   skipLabel?: string;
   onSkip?: () => void;
   isGenerateLoading?: boolean;
 }
 
 export const NavigationButtons = ({
   onBack,
   onNext,
   onGenerate,
   showBack = true,
   showNext = true,
   showGenerate = false,
   nextDisabled = false,
   nextLabel = "次へ",
   skipLabel,
   onSkip,
   isGenerateLoading = false,
 }: NavigationButtonsProps) => {
   return (
     <div className="px-6 pb-8 pt-4 space-y-3">
       {showGenerate && (
         <Button
           onClick={onGenerate}
           disabled={isGenerateLoading}
           className="w-full h-14 text-lg font-bold gradient-primary hover:opacity-90 shadow-soft disabled:opacity-50"
           size="lg"
         >
           <Sparkles className="w-5 h-5 mr-2" />
           {isGenerateLoading ? "生成中..." : "口コミを生成する"}
         </Button>
       )}
       {showNext && (
         <Button
           onClick={onNext}
           disabled={nextDisabled}
           className="w-full h-14 text-lg font-bold gradient-primary hover:opacity-90 shadow-soft disabled:opacity-50"
           size="lg"
         >
           {nextLabel}
           <ChevronRight className="w-5 h-5 ml-1" />
         </Button>
       )}
       {skipLabel && onSkip && (
         <Button
           onClick={onSkip}
           variant="ghost"
           className="w-full h-12 text-muted-foreground hover:text-foreground"
         >
           {skipLabel}
         </Button>
       )}
       {showBack && (
         <Button
           onClick={onBack}
           variant="ghost"
           className="w-full h-12 text-muted-foreground hover:text-foreground"
         >
           <ChevronLeft className="w-4 h-4 mr-1" />
           戻る
         </Button>
       )}
     </div>
   );
 };