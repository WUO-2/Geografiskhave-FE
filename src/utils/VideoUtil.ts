import video1 from "../assets/videos/Video1.mp4";
import video2 from "../assets/videos/Video2.mp4";
import video3 from "../assets/videos/Video3.mp4";
import video4 from "../assets/videos/Video4.mp4";
import video5 from "../assets/videos/Video5.mp4";
import video6 from "../assets/videos/Video6.mp4";

const videoTable: Record<number, string> = {
  1: video1,
  2: video2,
  3: video3,
  4: video4,
  5: video5,
  6: video6,
};

export const GetVideoById = (id: number) => videoTable[id] || videoTable[1];
