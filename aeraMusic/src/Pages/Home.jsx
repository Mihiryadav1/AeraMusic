import CategoryList from "../Components/CategoryList";
import TrackList from "../Components/TrackList";
import WaveComponent from "../Components/WaveComponent";
import WeatherStats from "../Components/WeatherStats";

const Home = () => {
  return (
    <div className="primary h-full p-4 flex flex-col">
      <CategoryList />
      <TrackList />

      <div className="flex my-4 mx-3 items-center">
        <WeatherStats />
      </div>
      {/* <div className="flex flex-1">
        <WaveComponent />
      </div> */}
    </div>
  );
};

export default Home;
