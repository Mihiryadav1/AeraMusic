import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { setCurrentTrack, setTracks } from "../Features/playerSlice";
import AudioPlayerContext from "../Context/AudioContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const TrackList = () => {
  const { playAudio } = useContext(AudioPlayerContext);
  const [songList, setsongList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const selectedMood = useSelector((state) => state.music.selectedMood);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const currentTrack = useSelector((state) => state.player.currentTrack);
  // console.log(currentTrack, "CURRENT");
  const getTracksByMood = async (mood) => {
    setIsLoading(true);
    try {
      const url =
        mood === "All"
          ? `${import.meta.env.VITE_API_URL}/api/tracks`
          : `${import.meta.env.VITE_API_URL}/api/tracks?mood=${mood}`;
      const response = await axios.get(url);

      // console.log(response.data.data);
      setsongList(response.data.data);
      dispatch(setTracks(response.data.data));
      dispatch(setCurrentTrack(response.data.data[0]));
    } catch (error) {
      console.error("Failed to fetch tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTracksByMood(selectedMood);
  }, [selectedMood]);
  return (
    <div className="w-full p-3">
      <p className="text-white text-2xl font-extrabold inline-block mb-4">
        Popular Tracks
      </p>
       
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 10,
          },
        }} 
      >
        {songList.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              className={`h-50 md:h-78 rounded-xl overflow-hidden flex items-end ${currentTrack._id===item._id?"border borderMutedGreen":"border-0"}`}
              style={{
                backgroundImage: `url(${item.artwork})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat",
                
              }}
            >
              <div className="w-full p-3 flex items-center gap-2 contentBackdrop min-h-1/3">
                <button
                  className="text-4xl text-white"
                  onClick={() => playAudio(item)}
                >
                  {isPlaying && currentTrack?._id === item._id ? (
                    <IoPauseCircleOutline />
                  ) : (
                    <IoPlayCircleOutline />
                  )}
                </button>

                <div className="flex flex-col items-start">
                  <p className="text-white text-lg text-left mb-1">{item.title}</p>
                  <p className="text-sm mutedGreen font-semibold capitalize">
                    {item.genre}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrackList;
