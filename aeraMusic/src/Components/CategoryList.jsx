import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMood } from "../Features/musicSlice";
import { BiBrain } from "react-icons/bi";
import { SlEnergy } from "react-icons/sl";
import { CgCoffee } from "react-icons/cg";
import { BsLaptop } from "react-icons/bs";
import { TbLeaf } from "react-icons/tb";
import { PiListDashesBold } from "react-icons/pi";

const CategoryList = () => {
  const [moods, setMood] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // Mood Icons
  const moodIcons = {
    All: <PiListDashesBold />,
    Focus: <BiBrain />,
    Energy: <SlEnergy />,
    Productivity: <BsLaptop />,
    Coffee: <CgCoffee />,
    Relax: <TbLeaf />,
  };

  const currentSelectedMood = useSelector((state) => state.music.selectedMood);
  // console.log(currentSelectedMood,"From Store")

  const getAllMoods = async () => {
    setIsLoading(true);
    try {
      const getAllMoods = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/moods`,
      );
      setMood(["All", ...getAllMoods.data.data]);
      // console.log(getAllMoods.data?.data);
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllMoods();
  }, []);
  useEffect(() => {
    console.log("selectedMood", currentSelectedMood);
  }, [currentSelectedMood]);
  return (
    <div className="inline-block p-3 ">
      <p className="text-white text-2xl font-extrabold inline-block mb-4">
        Select Category
      </p>
      <div className="flex gap-6 overflow-x-auto category-scroll">
        {isLoading ? (
          Object.keys(moodIcons).map((mood) => (
            <div
              key={mood}
              className="w-18 flex flex-col items-center justify-center"
            >
              <div className="w-18 h-18 secondary rounded-2xl animate-pulse" />

              <div className="w-12 h-4 secondary rounded mt-2 animate-pulse" />
            </div>
          ))
        ) : (
          <>
            {moods.map((mood) => (
              <button
                key={mood}
                onClick={() => {
                  dispatch(setSelectedMood(mood));
                }}
                className="w-18 flex flex-col items-center justify-center iconColor"
              >
                <div
                  className={`moodCard w-18 h-18 secondary rounded-2xl flex items-center justify-center text-3xl ${
                    currentSelectedMood === mood ? "mutedGreen" : "iconColor"
                  }`}
                >
                  {moodIcons[mood]}
                </div>
                <span
                  className={`${currentSelectedMood === mood ? "mutedGreen" : "text-white"} font-semibold mt-2 `}
                >
                  {mood}
                </span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
