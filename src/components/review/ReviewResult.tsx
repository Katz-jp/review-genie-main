import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ExternalLink, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_GOOGLE_MAPS_URL = "https://www.google.com/maps";
const WRITE_REVIEW_BASE = "https://search.google.com/local/writereview";

interface ReviewResultProps {
  reviews: string[];
  onBack: () => void;
  /** 指定した場合はURLパラメータより優先されます */
  googleMapsUrl?: string;
}

export const ReviewResult = ({
  reviews,
  onBack,
  googleMapsUrl: googleMapsUrlProp,
}: ReviewResultProps) => {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const googleMapsUrl = useMemo(() => {
    if (googleMapsUrlProp) return googleMapsUrlProp;
    const placeId = searchParams.get("placeid");
    if (placeId && placeId.trim() !== "") {
      return `${WRITE_REVIEW_BASE}?placeid=${encodeURIComponent(placeId.trim())}`;
    }
    return DEFAULT_GOOGLE_MAPS_URL;
  }, [searchParams, googleMapsUrlProp]);
 
  const handleCopy = async (review: string) => {
     try {
       await navigator.clipboard.writeText(review);
      setCopied(true);
       toast({
         title: "コピーしました",
         description: "口コミ文がクリップボードにコピーされました",
       });
      setTimeout(() => setCopied(false), 2000);
     } catch (err) {
       toast({
         title: "コピーに失敗しました",
         description: "もう一度お試しください",
         variant: "destructive",
       });
     }
   };
 
  const review = reviews[0];

   return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       className="flex flex-col min-h-screen"
     >
       <div className="px-6 pt-6 pb-4">
         <h2 className="text-xl font-bold text-foreground mb-2">
           口コミ文が生成されました 🎉
         </h2>
         <p className="text-sm text-muted-foreground">
          下の文章をコピーしてご利用ください
         </p>
       </div>
 
       <div className="flex-1 px-6 pb-4 space-y-4 overflow-y-auto">
         <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-primary bg-accent px-2 py-1 rounded-full">
                生成された口コミ
              </span>
              <span className="text-xs text-muted-foreground">
                {review.length}文字
              </span>
            </div>
            <p className="text-base leading-relaxed text-foreground mb-5">
              {review}
            </p>
            <Button
              onClick={() => handleCopy(review)}
              className="w-full h-12 gradient-primary hover:opacity-90 shadow-soft"
              size="lg"
             >
              {copied ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  コピーしました
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 mr-2" />
                  この文章をコピー
                </>
              )}
            </Button>
          </motion.div>
         </AnimatePresence>
       </div>
 
       <div className="px-6 pb-8 pt-4 space-y-3 border-t border-border bg-background">
         <Button
           onClick={() => window.open(googleMapsUrl, "_blank")}
           className="w-full h-14 text-base font-bold gradient-primary hover:opacity-90 shadow-soft"
           size="lg"
         >
           <ExternalLink className="w-5 h-5 mr-2" />
           Googleマップで投稿する
         </Button>
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full h-12 text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          戻る
        </Button>
       </div>
     </motion.div>
   );
 };
