 export interface ReviewAnswers {
   trigger: string;
   reason: string;
   favorites: string[];
   impression: string;
   recommend: string;
 }
 
 export const triggerOptions = [
   { value: "紹介", label: "紹介" },
   { value: "SNS・広告", label: "SNS・広告" },
   { value: "Googleマップ", label: "Googleマップ" },
   { value: "前から気になっていた", label: "前から気になっていた" },
   { value: "近所", label: "近所" },
 ] as const;
 
 export const reasonOptions = [
   { value: "交通事故後", label: "交通事故後" },
   { value: "肩こり", label: "肩こり" },
   { value: "腰痛", label: "腰痛" },
   { value: "ダイエット", label: "ダイエット" },
   { value: "自律神経", label: "自律神経" },
   { value: "パーソナル", label: "パーソナル" },
 ] as const;
 
 export const favoriteOptions = [
   { value: "接客", label: "接客" },
   { value: "技術", label: "技術" },
   { value: "雰囲気", label: "雰囲気" },
   { value: "価格", label: "価格" },
   { value: "スピード", label: "スピード" },
   { value: "清潔感", label: "清潔感" },
 ] as const;
 
 export const recommendOptions = [
   { value: "初めての人", label: "初めての人" },
   { value: "慢性的な不調", label: "慢性的な不調がある方" },
   { value: "事故ケア", label: "事故後のケアが必要な方" },
   { value: "運動・トレ", label: "運動・トレーニングをする方" },
   { value: "リラックス", label: "リラックスしたい方" },
   { value: "忙しい人", label: "忙しい方" },
 ] as const;