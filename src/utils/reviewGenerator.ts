import { ReviewAnswers } from "@/types/review";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

type PromptStyle = {
  id: string;
  title: string;
  instruction: string;
};

const PROMPT_STYLES: PromptStyle[] = [
  {
    id: "problem_first",
    title: "悩み→来院→施術→変化",
    instruction:
      "冒頭は『悩み・不調（例: 肩こり/腰痛など）』から入り、次に『来院した理由』→『施術や説明で良かった点』→『通った後の変化/安心感』→『おすすめ』の順でまとめてください。",
  },
  {
    id: "staff_first",
    title: "スタッフ印象→説明→安心感",
    instruction:
      "冒頭は『スタッフ/先生の印象（丁寧さ・話しやすさ等）』から入り、次に『説明の分かりやすさ』→『施術の良かった点』→『院内の雰囲気』→『おすすめ』の順でまとめてください。",
  },
  {
    id: "atmosphere_first",
    title: "院内/雰囲気→体験→満足",
    instruction:
      "冒頭は『院内の清潔感・雰囲気・通いやすさ』から入り、次に『来院のきっかけ』→『施術で良かった点』→『印象に残った出来事』→『おすすめ』の順でまとめてください。",
  },
  {
    id: "trigger_first",
    title: "きっかけ→選んだ理由→良かった点",
    instruction:
      "冒頭は『来院のきっかけ（紹介/検索/口コミ等）』から入り、次に『選んだ理由・目的』→『気に入った点（複数可）』→『印象に残ったこと（あれば）』→『おすすめ』の順でまとめてください。",
  },
  {
    id: "change_first",
    title: "変化→理由→感謝",
    instruction:
      "冒頭は『通って感じた変化・良くなった点』から入り、次に『来院理由・目的』→『施術や対応で良かった点』→『補足（院内/予約/説明など）』→『おすすめと感謝』の順でまとめてください。",
  },
];

function pickPromptStyle(): PromptStyle {
  const idx = Math.floor(Math.random() * PROMPT_STYLES.length);
  return PROMPT_STYLES[idx] ?? PROMPT_STYLES[0];
}

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key || typeof key !== "string" || key.trim() === "") {
    throw new Error(
      "OpenAI APIキーが設定されていません。.env に VITE_OPENAI_API_KEY を設定してください。"
    );
  }
  return key.trim();
}

function buildPrompt(answers: ReviewAnswers, style: PromptStyle): string {
  const lines: string[] = [
    "以下の条件に沿って、整骨院・接骨院への口コミ文を1つだけ生成してください。",
    "自然な日本語で、150文字程度の短文にしてください（多少の前後は可）。",
    "",
    "【重要（規約遵守）】",
    "・入力内容から推測できない具体情報（料金、治療効果の断定、病名の確定、医療的な断言、回数/期間、固有名詞など）は書かないでください。",
    "・誇張表現や断定を避け、『〜と感じた』『〜で安心した』のように体験ベースの表現にしてください。",
    "・第三者になりすましたり、事実でない内容を作らないでください。",
    "・宣伝文句/過度な誘導（例: 絶対おすすめ、最高、神対応 など）や特典・見返りを示唆する表現は避けてください。",
    "・箇条書き/見出し/絵文字/ハッシュタグは使わず、1つの自然な段落で。",
    "",
    `【今回の構成（ランダム選択）】${style.title}`,
    style.instruction,
    "",
    "【来院のきっかけ】",
    answers.trigger || "（未選択）",
    "",
    "【来院理由・目的】",
    answers.reason || "（未選択）",
    "",
    "【良かった点】",
    answers.favorites.length > 0 ? answers.favorites.join("、") : "（未選択）",
    "",
    "【特に印象に残ったこと】",
    answers.impression?.trim() || "（特になし）",
    "",
    "【おすすめしたい人】",
    answers.recommend || "（未選択）",
    "",
    "上記を踏まえ、口コミ1つだけを出力してください。",
    "説明や前置きは不要で、口コミ文のみを返してください。",
    "同じ内容でも語尾・言い回し・文の長さに変化をつけ、テンプレ感を減らしてください。",
  ];
  return lines.join("\n");
}

export async function generateReviews(answers: ReviewAnswers): Promise<string[]> {
  const apiKey = getApiKey();
  const style = pickPromptStyle();

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "あなたは口コミ投稿者の文章作成を支援するアシスタントです。ユーザーの実体験に基づく範囲で、誇張や捏造を避け、規約を守った自然な口コミ文を1つだけ作成してください。",
        },
        {
          role: "user",
          content: buildPrompt(answers, style),
        },
      ],
      max_tokens: 500,
      temperature: 0.85,
      top_p: 0.95,
      presence_penalty: 0.2,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    let message = `OpenAI API エラー (${response.status})`;
    try {
      const parsed = JSON.parse(errBody);
      if (parsed.error?.message) message = parsed.error.message;
    } catch {
      if (errBody) message += `: ${errBody.slice(0, 200)}`;
    }
    throw new Error(message);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content =
    data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("口コミ文を取得できませんでした。もう一度お試しください。");
  }

  return [content];
}
