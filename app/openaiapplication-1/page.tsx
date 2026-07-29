import type { Metadata } from "next";
import OpenAIVideoPage from "../_shared/OpenAIVideoPage";

export const metadata: Metadata = {
  title: "Ayla Blumberg · OpenAI Student Collective (Video 1)",
  description: "Application video for the OpenAI Student Collective.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OpenAIVideoPage
      eyebrow="OpenAI Student Collective · Response 1"
      prompt="What's one way you use AI that you think more students should know about?"
      videoSrc="/openai/video-1.mp4"
      tiktokUrl="https://www.tiktok.com/t/ZP8tsSYPR/"
      tiktokNote="Watch the extended version on my TikTok"
    />
  );
}
