"use client";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdPause,
  MdPlayArrow,
  MdVolumeDown,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
interface IVideoPlayer {
  videoSrc: string;
}
const VideoPlayer = ({ videoSrc }: IVideoPlayer) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [_, setTrigger] = useState(false);
  const [currentDuration, setCurrentDuration] = useState("00:00");
  const [percentComplete, setPercentComplete] = useState(0);

  const handleMuted = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setTrigger((prev) => !prev);
    }
  }, []);

  const handleChangeVolume = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        videoRef.current.volume = Number(e.target.value);
        if (
          videoRef.current.volume == 0 ||
          (videoRef.current.volume !== 0 && videoRef.current.muted)
        ) {
          handleMuted();
        } else {
          setTrigger((prev) => !prev);
        }
      }
    },
    []
  );

  const handleClickPlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, setIsPlaying]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (document.activeElement?.tagName.toLocaleLowerCase() === "input") {
        return;
      }
      const { key } = event;
      switch (key.toLocaleLowerCase()) {
        case " ":
          handleClickPlay();
        default:
          return;
      }
    },
    [handleClickPlay]
  );
  const handleTimeUpdate = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!timelineRef.current) {
        return;
      }
      const timelineBounds = timelineRef.current.getBoundingClientRect();
      const clickPostion = e.clientX;
      const timeWidth = clickPostion - timelineBounds.left;
      const timelineWidth = timelineBounds.right - timelineBounds.left;
      const durationFraction = timeWidth / timelineWidth;
      if (videoRef.current) {
        videoRef.current.currentTime =
          durationFraction * videoRef.current.duration;
      }
    },
    [timelineRef, videoRef]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleClickFullScreen = useCallback(() => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      videoRef.current?.requestFullscreen();
    }
    setIsFullScreen((prev) => !prev);
  }, [isFullScreen, setIsFullScreen]);

  const timestampFormatter = useMemo(() => {
    return new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 });
  }, []);

  const formatTimestamp = useCallback(
    (time: number) => {
      const hours = Math.floor(time / (60 * 60));
      const minutes = Math.floor(time / 60) % 60;
      const seconds = Math.floor(time % 60);
      if (hours === 0) {
        return `${minutes}:${timestampFormatter.format(seconds)}`;
      } else {
        return `${hours}:${timestampFormatter.format(
          minutes
        )}}:${timestampFormatter.format(seconds)}`;
      }
    },
    [timestampFormatter]
  );

  const totalDuration = useMemo(() => {
    return formatTimestamp(videoRef.current?.duration || 0);
  }, []);

  const updateTimeStamp = () => {
    setCurrentDuration(formatTimestamp(videoRef.current?.currentTime || 0));
    setPercentComplete(
      Math.round(
        (1000 * (videoRef.current?.currentTime || 0)) /
          (videoRef.current?.duration || 1)
      ) / 1000
    );
  };
  return (
    <div className="relative w-full max-w-[1000px] flex justify-center m-auto group bg-black border-[1px] border-slate-800 rounded-md">
      <div className="absolute bottom-0 left-0 right-0 text-white bg-gradient-to-t from-black/40 z-10 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer">
        <div className="cursor-pointer flex mx-2 h-2 items-center group/timeline">
          <div
            onClick={handleTimeUpdate}
            ref={timelineRef}
            className="w-full relative bg-gray-500 opacity-50  hover:opacity-100 h-1 group-hover/timeline:h-full"
          >
            <span
              style={{ right: `${100 - percentComplete * 100}%` }}
              className="absolute left-0 top-0 bottom-0 bg-red-600"
            ></span>
            <div
              style={{ left: `${percentComplete * 100}%` }}
              className="scale-0 group-hover/timeline:scale-100 absolute h-[200%] aspect-square bg-red-600 rounded-full translate-x-[-50%] top-[-50%]"
            ></div>
          </div>
        </div>
        <div className="flex items-center justify-between text-3xl">
          <div className="flex gap-2 p-3 items-center">
            <button
              onClick={handleClickPlay}
              className="opacity-70 transition-opacity hover:opacity-100"
            >
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <div className="flex items-center gap-1 group/volume">
              <button
                className="opacity-70 transition-opacity hover:opacity-100"
                onClick={handleMuted}
              >
                {videoRef.current?.muted ? (
                  <MdVolumeOff />
                ) : videoRef.current && videoRef.current?.volume <= 0.5 ? (
                  <MdVolumeDown />
                ) : (
                  <MdVolumeUp />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={"any"}
                value={videoRef.current?.volume}
                onChange={handleChangeVolume}
                className="w-0 scale-0 group-hover/volume:w-20 group-hover/volume:scale-100 transition-all duration-200 origin-left accent-white"
              />
            </div>
            <div className="text-sm">
              {currentDuration}/{totalDuration}
            </div>
          </div>
          <div className="flex gap-2 p-3 items-center">
            <button
              onClick={handleClickFullScreen}
              className="opacity-70 translation-opacity hover:opacity-100"
            >
              {isFullScreen ? <MdFullscreenExit /> : <MdFullscreen />}
            </button>
          </div>
        </div>
      </div>
      <video
        src={videoSrc}
        ref={videoRef}
        onClick={handleClickPlay}
        onTimeUpdate={updateTimeStamp}
        className="w-full aspect-video z-[5] "
      ></video>
    </div>
  );
};

export default VideoPlayer;
