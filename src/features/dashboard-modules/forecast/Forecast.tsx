import { useEffect, useState } from "react";
import ForecastDailyItem from "./components/ForecastdailyItem";
import SkeletonForecast from "./components/SkeletonForecast";
import useGetForecast from "./useGetForecast";
import LocationForm from "./components/LocationForm";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, MapPinOff } from "lucide-react";

const Forecast = () => {
  const [foreacastData, isLoading, error] = useGetForecast();
  const [userLocation, setUserLocation] = useState<boolean>(false);

  useEffect(() => {
    const location = localStorage.getItem("location");
    if (location) {
      setUserLocation(true);
    }
  }, []);

  const removeLocation = () => {
    const itemsToDelete = ["location", "latitude", "longitude"];
    for (const item of itemsToDelete) {
      localStorage.removeItem(item);
    }
    setUserLocation(false);
  };
  return (
    <div>
      {!userLocation ? (
        <LocationForm setUserLocation={setUserLocation} />
      ) : (
        <>
          {isLoading && <SkeletonForecast />}
          {error && <p>error</p>}

          {!isLoading && (
            <>
              <Button
                variant={"ghost"}
                size={"icon"}
                className={`absolute top-3 left-3`}
              >
                <MapPinOff
                  size={"30"}
                  strokeWidth={1.5}
                  onClick={removeLocation}
                />
              </Button>
              <ul className="gap-2 flex flex-col text-xl font-thin mt-1">
                {foreacastData.map((dailyForecast, index) => (
                  <ForecastDailyItem
                    key={index}
                    dailyForecast={dailyForecast}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Forecast;
