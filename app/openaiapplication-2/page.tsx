import type { Metadata } from "next";
import OpenAIVideoPage from "../_shared/OpenAIVideoPage";

export const metadata: Metadata = {
  title: "Ayla Blumberg · OpenAI Student Collective (Video 2)",
  description: "Application video for the OpenAI Student Collective.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <OpenAIVideoPage
      eyebrow="OpenAI Student Collective · Response 2"
      prompt="What's something you helped make happen on campus?"
      videoSrc="/openai/video-2.mp4"
      tiktokUrl={null}
      tiktokNote="I posted the extended version on my TikTok too"
    />
  );
}
