import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquareHeart, ChevronRight, ClipboardCopy, MapPin } from "lucide-react";

const DEFAULT_TITLE = "口コミ作成アシスタント";

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [searchParams] = useSearchParams();
  const title =
    searchParams.get("shop_name")?.trim() || DEFAULT_TITLE;

  return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="flex flex-col min-h-screen gradient-subtle"
     >
       <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
         <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2, duration: 0.4 }}
           className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 shadow-soft"
         >
           <MessageSquareHeart className="w-10 h-10 text-primary-foreground" />
         </motion.div>
 
<motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-foreground text-center mb-3"
        >
          {title}
        </motion.h1>
 
         <motion.p
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="text-muted-foreground text-center mb-10 leading-relaxed"
         >
           かんたんな質問に答えるだけで
           <br />
           口コミ文章を自動で作成します
         </motion.p>

         <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.45 }}
           className="w-full max-w-md bg-card rounded-xl p-4 shadow-card border border-border mb-10"
         >
           <p className="text-sm text-foreground leading-relaxed">
             本アプリは、お客様の感想に基づいた文章作成をサポートする補助ツールです。投稿内容の最終確認と調整はご自身で行っていただくようお願いいたします。
           </p>
         </motion.div>
 
         <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="w-full space-y-4 mb-10"
         >
           <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
             <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
               <span className="text-lg font-bold text-primary">1</span>
             </div>
             <div>
               <h3 className="font-semibold text-foreground mb-1">5つの質問に回答</h3>
               <p className="text-sm text-muted-foreground">
                 来店のきっかけや気に入った点など、かんたんな質問に答えます
               </p>
             </div>
           </div>
 
           <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
             <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
               <ClipboardCopy className="w-5 h-5 text-primary" />
             </div>
             <div>
               <h3 className="font-semibold text-foreground mb-1">口コミ文章を自動生成</h3>
               <p className="text-sm text-muted-foreground">
                 回答内容をもとに自然な口コミ文章を作成します
               </p>
             </div>
           </div>
 
           <div className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-card">
             <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
               <MapPin className="w-5 h-5 text-primary" />
             </div>
             <div>
               <h3 className="font-semibold text-foreground mb-1">Googleマップに投稿</h3>
               <p className="text-sm text-muted-foreground">
                 コピーした文章をGoogleマップで投稿できます
               </p>
             </div>
           </div>
         </motion.div>
       </div>
 
       <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.6 }}
         className="px-6 pb-8"
       >
         <Button
           onClick={onStart}
           className="w-full h-14 text-lg font-bold gradient-primary hover:opacity-90 shadow-soft"
           size="lg"
         >
           はじめる
           <ChevronRight className="w-5 h-5 ml-1" />
         </Button>
       </motion.div>
     </motion.div>
   );
 };