import CategoryList from "../Components/CategoryList";
import TrackList from "../Components/TrackList";
import WeatherStats from "../Components/WeatherStats";

const Home = () => {
  return (
    <div className="primary p-4 flex flex-col">
     <div className="wrapper">
       <CategoryList />
     </div>
      <div className="wrapper">
        <TrackList />
      </div>

      <div className="flex my-4 mx-3 items-center">
        <WeatherStats />
      </div>
    </div>
  );
};

export default Home;
