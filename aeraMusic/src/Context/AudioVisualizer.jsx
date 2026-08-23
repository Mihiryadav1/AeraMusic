import { useContext, useEffect, useState } from "react";
import AudioPlayerContext from "../Context/AudioContext";
import VisualizerBars from "../Components/VisualizerBars";

const AudioVisualizer = () => {
  const [frequencyData, setFrequencyData] = useState([]);
  const { audioRef, analyserRef, initializeAudio } =
    useContext(AudioPlayerContext);

  useEffect(() => {
    initializeAudio();

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    const animate = () => {
      analyserRef.current.smoothingTimeConstant = 0.9;
      analyserRef.current.getByteFrequencyData(dataArray);
      // analyserRef.current.getByteTimeDomainData(dataArray);
      // analyserRef.current.getFloatTimeDomainData(dataArray);
      setFrequencyData([...dataArray]);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex items-end gap-1 h-1/2 overflow-hidden rounded-2xl">
      {frequencyData.map((value, index) => (
        <VisualizerBars key={index} frequencyData={value} />
      ))}
    </div>
  );
};

export default AudioVisualizer;
