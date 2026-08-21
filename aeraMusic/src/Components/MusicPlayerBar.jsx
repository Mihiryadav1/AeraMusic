import { useSelector } from "react-redux";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaStepForward, FaStepBackward } from "react-icons/fa";
const MusicPlayerBar = () => {
  // const selectedMood = useSelector((state) => state.music.selectedMood);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  return (
    <div className="secondary p-4 flex justify-between items-center">
      <div className="bg-green-50">{currentTrack?.title}</div>
      <div className="musicController">
        <div className="flex items-center gap-4">
          <span className="text-xl text-white">
            <FaStepBackward />
          </span>
          <span className="text-4xl text-green-400">
            {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
          </span>
          <span className="text-2xl text-white">
            <FaStepForward />
          </span>
        </div>
      </div>
      <div className="volumeControl">V</div>
    </div>
  );
};

export default MusicPlayerBar;
