import { useSelector } from "react-redux";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaStepForward, FaStepBackward, FaRegHeart } from "react-icons/fa";
import AudioPlayerContext from "../Context/AudioContext";
import { useContext } from "react";
import WaveComponent from "./WaveComponent";
const MusicPlayerBar = () => {
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  const tracks = useSelector((state) => state.player.tracks);

  const { playAudio, duration, currentTime, seekAudio, changeVolume, volume } =
    useContext(AudioPlayerContext);
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
    // <div className="p-4 flex justify-between items-center secondary  lg:flex-row md:flex-col sm:flex-col">
    <div className="w-full p-4 grid grid-col-1 md:grid-cols-[auto_minmax(0,1fr)_auto] gap-8 secondary">
      {/* Track Info Div */}
      <div className="flex items-center rounded-2xl overflow-hidden">
        <div className="flex items-center primary p-2.5 overflow-hidden rounded-2xl">
          <div className="flex items-center gap-3 flex-1">
            <img
              src={currentTrack?.artwork}
              alt=""
              style={{
                width: "65px",
                height: "65px",
                objectFit: "cover",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            />
            <div className="text-white font-semibold">
              <p className="text-wrap">{currentTrack?.title}</p>
              <p className="text-sm mutedGreen">{currentTrack?.genre}</p>
            </div>
          </div>
          <div className="iconColor text-2xl mx-4">
            <FaRegHeart />
          </div>
        </div>
      </div>
      {/* Musiccontroller Div */}
      <div className="musicController min-w-0">
        <div className="flex flex-col items-center gap-3">
          <WaveComponent />
          <div className="flex items-center gap-7">
            <span className="text-2xl text-white outline-0">
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
              {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
            </button>
            <button
              className="text-2xl text-white outline-0"
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
            <span className="text-white font-semibold min-w-12 text-center">
              {formatTime(duration)}
            </span>
            <div className="progressContainer min-w-96">
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime || 0}
                onChange={(e) => {
                  seekAudio(Number(e.target.value));
                }}
                className="music-progress outline-0"
                style={{
                  background: `linear-gradient(
        to right,
        #08df73 0%,
        #08df73 ${duration ? (currentTime / duration) * 100 : 0}%,
        #e5e7eb ${duration ? (currentTime / duration) * 100 : 0}%,
        #e5e7eb 100%
      )`,
                }}
              />
            </div>

            <span className="text-white font-semibold min-w-12 text-center">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
      {/* Volume Div */}
      <div className="volumeControl flex items-center gap-3">
        <img src={volume > 1 ? "./volume_up.svg" : "./volume_off.svg"} />
        <input
          type="range"
          min={0}
          max="100"
          value={volume}
          className="volume-progress outline-0"
          style={{
            background: `linear-gradient(
    to right,
    #08df73 0%,
    #08df73 ${volume}%,
    #e5e7eb ${volume}%,
    #e5e7eb 100%
  )`,
          }}
          onChange={(e) => {
            changeVolume(e.target.value);
          }}
        />
        <span className="font-semibold text-white min-w-12 p-2 text-center ">
          {volume}
        </span>
      </div>
    </div>
  );
};

export default MusicPlayerBar;
