import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ReviewAnswers } from "@/types/review";
import { WelcomeScreen } from "./WelcomeScreen";
import { ProgressBar } from "./ProgressBar";
import { StepTrigger } from "./steps/StepTrigger";
import { StepReason } from "./steps/StepReason";
import { StepFavorites } from "./steps/StepFavorites";
import { StepImpression } from "./steps/StepImpression";
import { StepRecommend } from "./steps/StepRecommend";
import { ReviewResult } from "./ReviewResult";
import { generateReviews } from "@/utils/reviewGenerator";
import { useToast } from "@/hooks/use-toast";
 
 const TOTAL_STEPS = 5;
 
export const ReviewWizard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [reviews, setReviews] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const [answers, setAnswers] = useState<ReviewAnswers>({
     trigger: "",
     reason: "",
     favorites: [],
     impression: "",
     recommend: "",
   });
 
   const updateAnswer = useCallback(<K extends keyof ReviewAnswers>(
     key: K,
     value: ReviewAnswers[K]
   ) => {
     setAnswers((prev) => ({ ...prev, [key]: value }));
   }, []);
 
  const handleStart = useCallback(() => {
    setShowWelcome(false);
  }, []);

   const nextStep = useCallback(() => {
     if (step < TOTAL_STEPS) {
       setStep((prev) => prev + 1);
     }
   }, [step]);
 
   const prevStep = useCallback(() => {
     if (step > 1) {
       setStep((prev) => prev - 1);
     }
   }, [step]);
 
const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      const generatedReviews = await generateReviews(answers);
      setReviews(generatedReviews);
      setShowResult(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "口コミの生成に失敗しました。";
      toast({
        title: "生成エラー",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [answers, toast]);
 
   const handleBackFromResult = useCallback(() => {
     setShowResult(false);
   }, []);
 
  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

   if (showResult) {
     return (
       <ReviewResult
         reviews={reviews}
         onBack={handleBackFromResult}
       />
     );
   }
 
   return (
     <div className="flex flex-col min-h-screen gradient-subtle">
       <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
       
       <AnimatePresence mode="wait">
         {step === 1 && (
           <StepTrigger
             key="step1"
             value={answers.trigger}
             onChange={(value) => updateAnswer("trigger", value)}
             onNext={nextStep}
           />
         )}
         {step === 2 && (
           <StepReason
             key="step2"
             value={answers.reason}
             onChange={(value) => updateAnswer("reason", value)}
             onNext={nextStep}
             onBack={prevStep}
           />
         )}
         {step === 3 && (
           <StepFavorites
             key="step3"
             value={answers.favorites}
             onChange={(value) => updateAnswer("favorites", value)}
             onNext={nextStep}
             onBack={prevStep}
           />
         )}
         {step === 4 && (
           <StepImpression
             key="step4"
             value={answers.impression}
             onChange={(value) => updateAnswer("impression", value)}
             onNext={nextStep}
             onBack={prevStep}
           />
         )}
{step === 5 && (
          <StepRecommend
            key="step5"
            value={answers.recommend}
            onChange={(value) => updateAnswer("recommend", value)}
            onGenerate={handleGenerate}
            onBack={prevStep}
            isGenerating={isGenerating}
          />
        )}
       </AnimatePresence>
     </div>
   );
 };