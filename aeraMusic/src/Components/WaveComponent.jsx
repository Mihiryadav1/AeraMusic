import AudioVisualizer from "../Context/AudioVisualizer";

const WaveComponent = () => {
  return (
    <div className="w-full overflow-hidden flex items-end h-full">
      <AudioVisualizer />
    </div>
  );
};

export default WaveComponent;
