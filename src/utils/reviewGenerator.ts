import { ReviewAnswers } from "@/types/review";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key || typeof key !== "string" || key.trim() === "") {
    throw new Error(
      "OpenAI APIキーが設定されていません。.env に VITE_OPENAI_API_KEY を設定してください。"
    );
  }
  return key.trim();
}

function buildPrompt(answers: ReviewAnswers): string {
  const lines: string[] = [
    "以下の条件に沿って、整骨院・接骨院への口コミ文を1つだけ生成してください。",
    "自然な日本語で、150文字程度の短文にしてください。",
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
    "上記を踏まえ、口コミ1つだけを出力してください。説明や前置きは不要で、口コミ文のみを返してください。",
  ];
  return lines.join("\n");
}

export async function generateReviews(answers: ReviewAnswers): Promise<string[]> {
  const apiKey = getApiKey();

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
            "あなたは整骨院・接骨院の口コミを書く人の手伝いをするアシスタントです。指定された条件に沿って、自然で信頼感のある口コミ文を1つだけ生成してください。",
        },
        {
          role: "user",
          content: buildPrompt(answers),
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
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
