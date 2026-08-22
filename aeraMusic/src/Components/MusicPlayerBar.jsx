import { useSelector } from "react-redux";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaStepForward, FaStepBackward } from "react-icons/fa";
import AudioPlayerContext from "../Context/AudioContext";
import { useContext } from "react";
import WaveComponent from "./WaveComponent";
const MusicPlayerBar = () => {
  // const selectedMood = useSelector((state) => state.music.selectedMood);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const tracks = useSelector((state) => state.player.tracks);

  const { playAudio, duration, currentTime } = useContext(AudioPlayerContext);
  const currentIndex = tracks.findIndex(
    (track) => track._id === currentTrack?._id,
  );

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <div className="secondary p-4 flex justify-between items-center">
      <div className="bg-green-50">{currentTrack?.title}</div>
      <div className="musicController">
        <div className="flex flex-col items-center gap-1 p-3">
          <WaveComponent />
          <div className="flex items-center gap-7">
            <span className="text-2xl text-white">
              <FaStepBackward />
            </span>
            <button
              className="text-5xl text-green-400 outline-0"
              onClick={() => {
                if (currentTrack) {
                  playAudio(currentTrack);
                }
              }}
            >
              {isPlaying || currentTime == duration ? (
                <FaCirclePause />
              ) : (
                <FaCirclePlay />
              )}
            </button>
            <button
              className="text-2xl text-white"
              onClick={() => {
                const nextTrack = tracks[(currentIndex + 1) % tracks.length];
                console.log("TRACKS:", tracks);
                console.log("CURRENT INDEX:", nextTrack);
                console.log("CURRENT TRACK:", currentTrack);
                // if (nextTrack) {
                //   playAudio(nextTrack);
                // }
              }}
            >
              <FaStepForward />
            </button>
          </div>
          <div className="songProgress flex items-center justify-between gap-4">
            <span className="text-white font-semibold">
              {formatTime(duration)}
            </span>

            <div className="progressContainer min-w-68">
              <div
                className="flex w-full h-1.5 primary rounded-full overflow-hidden"
                role="progressbar"
                // aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="flex flex-col justify-center rounded-full overflow-hidden mutedBackGreen text-xs text-primary-foreground text-center whitespace-nowrap transition duration-100"
                  style={{
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <span className="text-white font-semibold">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
      <div className="volumeControl"></div>
    </div>
  );
};

export default MusicPlayerBar;
