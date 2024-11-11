// components
import Forecast from "../features/dashboard-modules/forecast/Forecast";
import Recommandations from "../features/dashboard-modules/recommandations/Recommandations";
import SeedlingsModule from "../features/dashboard-modules/seedlings/SeedlingsModule";
import ToDoListModule from "../features/dashboard-modules/todo-list/components/ToDoListModule";
import ModuleHeader from "../features/dashboard-modules/ModuleHeader";
import ActionsModule from "../features/dashboard-modules/actions/ActionsModule";
import AreasModule from "../features/dashboard-modules/areas/components/AreasModule";

// hook
import useGetAreas from "../hooks/useGetAreas";

// shadcn ui
import { Card, CardContent } from "@/components/ui/card";
import { AreasProvider } from "@/contexts/AreasContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [areas, isLoadingAreas, errorGetAreas, setAreas] = useGetAreas();
  const navigate = useNavigate()

  useEffect(() => {
    window.history.pushState(null, document.title);
    const handlePopState = () => {
      navigate('/me/dashboard');
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return (
      <AreasProvider>
        <div>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
            <Card className="h-[350px] w-[370px] relative overflow-hidden">
              <ModuleHeader title={"Zones de Culture"} />
              <CardContent className="p-2">
                <AreasModule
                  {...{ areas, isLoadingAreas, errorGetAreas, setAreas }}
                />
              </CardContent>
            </Card>
            <Card className="h-[350px] w-[370px] relative">
              <ModuleHeader title={"Nouvelle action"} />
              <CardContent>
                <ActionsModule />
              </CardContent>
            </Card>
            <Card className="h-[350px] w-[370px] relative">
              <ModuleHeader title={"Semis en pot"} />
              <CardContent className="p-2">
                <SeedlingsModule />
              </CardContent>
            </Card>
            <Card className="h-[350px] w-[370px] relative">
              <ModuleHeader title={"Liste de tâches"} />
              <CardContent className="p-2">
                <ToDoListModule />
              </CardContent>
            </Card>
            <Card className="h-[350px] w-[370px] relative">
              <ModuleHeader title={"Prévisions météo"} />
              <CardContent>
                <Forecast />
              </CardContent>
            </Card>
            <Card className="h-[350px] w-[370px] relative">
              <ModuleHeader title={"Guide"} />
              <CardContent className="p-2 mt-[-10px]">
                <Recommandations />
              </CardContent>
            </Card>
          </div>
        </div>
      </AreasProvider>
  );
};

export default Dashboard;
