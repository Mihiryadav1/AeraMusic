import { useSelector } from "react-redux";

const VisualizerBars = ({ frequencyData }) => {
  const isPlaying = useSelector((state) => state.player.isPlaying);

  return (
    <div className={`h-40 min-w-2  flex items-end overflow-hidden ${!isPlaying && "secondary"}`}>
      <div
        className={isPlaying ? "mutedBackGreen" : "bg-transparent"}
        style={{
          height: isPlaying ? `${frequencyData / 2}%` : "0%",
          width: "100%",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default VisualizerBars;
