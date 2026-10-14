"use client";

import { useState, useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

type MediaType = "video" | "image";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

const sampleMediaContent: Record<MediaType, MediaContent> = {
  video: {
    src: "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1",
    poster:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1280&q=80",
    background:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=80",
    title: "Immersive Video Experience",
    date: "Cosmic Journey",
    scrollToExpand: "Scroll to Expand Demo",
    about: {
      overview:
        "This is a demonstration of the ScrollExpandMedia component with a video. As you scroll, the video expands to fill more of the screen, creating an immersive experience. This component is perfect for showcasing video content in a modern, interactive way.",
      conclusion:
        "The ScrollExpandMedia component provides a unique way to engage users with your content through interactive scrolling. Try switching between video and image modes to see different implementations.",
    },
  },
  image: {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1280&q=80",
    background:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    title: "Dynamic Image Showcase",
    date: "Ocean Adventure",
    scrollToExpand: "Scroll to Expand Demo",
    about: {
      overview:
        "This is a demonstration of the ScrollExpandMedia component with an image. The same smooth expansion effect works beautifully with static images, allowing you to create engaging visual experiences without video content.",
      conclusion:
        "The ScrollExpandMedia component works equally well with images and videos. This flexibility allows you to choose the media type that best suits your content while maintaining the same engaging user experience.",
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: MediaType }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
        About This Component
      </h2>
      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.overview}
      </p>

      <p className="text-lg mb-8 text-black dark:text-white">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

const createExpansion = (mediaType: MediaType, textBlend = false) => {
  const Expansion = () => {
    const currentMedia = sampleMediaContent[mediaType];

    useEffect(() => {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("resetSection"));
    }, []);

    return (
      <div className="min-h-screen">
        <ScrollExpandMedia
          mediaType={mediaType}
          mediaSrc={currentMedia.src}
          posterSrc={currentMedia.poster}
          bgImageSrc={currentMedia.background}
          title={currentMedia.title}
          date={currentMedia.date}
          scrollToExpand={currentMedia.scrollToExpand}
          textBlend={textBlend}
        >
          <MediaContent mediaType={mediaType} />
        </ScrollExpandMedia>
      </div>
    );
  };
  return Expansion;
};

export const VideoExpansionTextBlend = createExpansion("video", true);
export const ImageExpansionTextBlend = createExpansion("image", true);
export const VideoExpansion = createExpansion("video");
export const ImageExpansion = createExpansion("image");

function Demo() {
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resetSection"));
  }, [mediaType]);

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {(["video", "image"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setMediaType(type)}
            className={`px-4 py-2 rounded-lg capitalize ${
              mediaType === type
                ? "bg-white text-black"
                : "bg-black/50 text-white border border-white/30"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === "video" ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
}

export default Demo;
