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

  // const streamTrack = (id) => {
  //   const audio = new Audio(`http://localhost:8000/api/stream/${id}`);
  //   audio.play();
  // };

  useEffect(() => {
    getTracksByMood(selectedMood);
  }, [selectedMood]);
  return (
    <div className="w-full p-3">
      <p className="text-white text-2xl font-extrabold inline-block mb-4">
        Popular Tracks
      </p>
      {/* <div className="flex gap-5 overflow-x-auto">
        {isLoading ? (
          songList.map((item) => {
            return (
              <div
                key={item._id}
                className="secondary min-w-64 max-w-76 h-78 rounded-xl shrink-0 animate-pulse"
              ></div>
            );
          })
        ) : (
          <>
            {songList.map((item) => {
              return (
                <div
                  key={item._id}
                  className="min-w-64 max-w-76 rounded-xl h-78 shrink-0 flex items-end overflow-hidden"
                  style={{
                    backgroundImage: `url(${item.artwork})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="contentBackdrop bg-slate-300 w-full p-3 flex items-center gap-2">
                    <button
                      className="text-4xl text-white"
                      onClick={() => {
                        playAudio(item);
                      }}
                    >
                      {isPlaying && currentTrack?._id === item._id ? (
                        <IoPauseCircleOutline />
                      ) : (
                        <IoPlayCircleOutline />
                      )}
                    </button>
                    <div className="flex flex-col">
                      <p className="text-white text-lg">{item.title}</p>
                      <p className="text-white text-sm mutedGreen font-semibold capitalize">
                        {item.genere}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div> */}
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
            slidesPerView: 5,
          },
        }}
      >
        {songList.map((item) => (
          <SwiperSlide key={item._id}>
            <div
              className="h-50 md:h-78 rounded-xl overflow-hidden flex items-end"
              style={{
                backgroundImage: `url(${item.artwork})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat:"no-repeat"
              }}
            >
              <div className="w-full p-3 flex items-center gap-2 contentBackdrop">
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

                <div>
                  <p className="text-white text-lg">{item.title}</p>
                  <p className="text-sm mutedGreen font-semibold capitalize">
                    {item.genere}
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
