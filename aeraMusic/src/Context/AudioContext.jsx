import { createContext, useRef } from "react";
import { setPlaying, playTrack } from "../Features/playerSlice";
import { useDispatch } from "react-redux";

//context to share between components
const AudioPlayerContext = createContext();

export const AudioProvider = ({ children }) => {
  const dispatch = useDispatch();
  //reference to webaudio api audio context
  const audioContextRef = useRef(null);

  //Actual Audio Element
  const audioRef = useRef(new Audio());
  audioRef.current.crossOrigin = "anonymous";

  //Connection source between audioRef with web audio API
  const sourceRef = useRef(null);

  //Visual Analyzer Reference
  const analyserRef = useRef(null);

  const initializeAudio = () => {
    if (!audioContextRef.current) {
      //Web audio API Context creation
      const audioContext = new window.AudioContext();

      audioContextRef.current = audioContext;

      sourceRef.current = audioContext.createMediaElementSource(
        audioRef.current,
      );
      //create analyzer to visualize sound
      analyserRef.current = audioContext.createAnalyser();
      // To tell analyzer how much frequency information is to be calculated
      analyserRef.current.fftSize = 256;
      //Audio to analyzer
      sourceRef.current.connect(analyserRef.current);
      //Analyzer -> Speaker
      analyserRef.current.connect(audioContext.destination);
    }
  };

  const playAudio = async (track) => {
    initializeAudio();

    await audioContextRef.current.resume();
    const newAudioUrl = `http://localhost:8000/api/stream/${track._id}`;
    //if same song is clicked
    if (audioRef.current.src === newAudioUrl) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        dispatch(setPlaying(true));
      } else {
        audioRef.current.pause();
        dispatch(setPlaying(false));
      }
      return;
    }
    // different song
    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    audioRef.current.src = newAudioUrl;

    await audioRef.current.play();
    dispatch(playTrack(track));
    // console.log("Playing ID:", id);
    // console.log("Playing URL:", audioRef.current.src);
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        initializeAudio,
        audioRef,
        audioContextRef,
        analyserRef,
        playAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
