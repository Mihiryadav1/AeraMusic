import { createContext, useRef, useEffect, useState } from "react";
import { setPlaying, playTrack } from "../Features/playerSlice";
import { useDispatch } from "react-redux";

//context to share between components
const AudioPlayerContext = createContext();

export const AudioProvider = ({ children }) => {
  //Progress bar timer
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);

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

  //iniitlaize audio file
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

    const newAudioUrl = `${import.meta.env.VITE_API_URL}/api/stream/${track._id}`;
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
  // Get part of track on drag on progressbar
  const seekAudio = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  //Voume Control
  const changeVolume = (value) => {
    const newVolume = Number(value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  useEffect(() => {
    const audio = audioRef.current;

    console.log(audio, "hey audio");
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    //Song Ended
    const handleEnded = () => {
      dispatch(setPlaying(false));
      setCurrentTime(0);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        initializeAudio,
        audioRef,
        audioContextRef,
        analyserRef,
        playAudio,
        currentTime,
        duration,
        volume,
        changeVolume,
        seekAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export default AudioPlayerContext;
