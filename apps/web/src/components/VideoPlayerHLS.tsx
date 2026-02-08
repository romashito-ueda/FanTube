import { useEffect, useRef } from "react";
import Hls from "hls.js";
import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  border-radius: 12px;
  background: #111;
`;

export const VideoPlayerHLS: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => {
        hls.destroy();
      };
    }
    videoRef.current.src = src;
  }, [src]);

  return <Video ref={videoRef} controls />;
};
