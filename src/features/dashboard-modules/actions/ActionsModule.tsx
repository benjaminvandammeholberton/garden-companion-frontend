import { useContext, useState } from "react";

import directSowingIcon from "../../../assets/actions-icons/direct-sowing.png";
import harvestIcon from "../../../assets/actions-icons/harvest.png";
import plantingIcon from "../../../assets/actions-icons/planting.png";
import removeIcon from "../../../assets/actions-icons/remove.png";
import cameraIcon from "../../../assets/actions-icons/camera.png";
import wateringIcon from "../../../assets/actions-icons/watering.png";
import fertilizeIcon from "../../../assets/actions-icons/fertilize.png";
import weedIcon from "../../../assets/actions-icons/weed.png";
import parasiteIcon from "../../../assets/actions-icons/parasite.png";

import { action_names } from "@/constants";
import DirectSowingForm from "./DirectSowingForm";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogDescription,
  // DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlantingForm from "./PlantingForm";
import FertilizeForm from "./FertilizeForm";
import TreatForm from "./TreatForm";
import HarvestForm from "./HarvestForm";
import WateringForm from "./WateringForm";
import WeedForm from "./WeedForm";
import ObservationForm from "./ObservationForm";
import RemoveForm from "./RemoveForm";
import FormHeader from "./components/FormHeader";
import AreasContext from "@/contexts/AreasContext";
import { useToast } from "@/components/ui/use-toast";
import DiaryAndProductionModal from "../../../components/DiaryAndProductionModal";
import { Newspaper } from "lucide-react";

interface ActionsModuleProps {}

const ActionsModule: React.FC<ActionsModuleProps> = () => {
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});
  const { toast } = useToast();
  const areasContext = useContext(AreasContext);
  if (!areasContext) {
    throw new Error("AreasContext must be used within an AreasProvider");
  }
  const { areas } = areasContext;

  const handleOpenChange = (index: number, isOpen: boolean) => {
    if (areas.length === 0) {
      toast({
        title: "Vous n'avez pas encore d'espace de culture",
        description:
          'Pour enregistrer une nouvelle action, créez une zone de culture à partir du module "Zones de culture"',
      });
      return;
    }
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: isOpen, // Update only the specific dialog's open state
    }));
  };

  const closeDialog = (index: number) => {
    setOpenStates((prevStates) => ({
      ...prevStates,
      [index]: false, // Close the dialog for the specified index
    }));
  };

  const actionMap = {
    [action_names.SOWING]: {
      index: 0,
      icon: directSowingIcon,
      title: "Semer",
      form: <DirectSowingForm onClose={() => closeDialog(0)} />,
    },
    [action_names.PLANTING]: {
      index: 1,
      icon: plantingIcon,
      title: "Planter",
      form: <PlantingForm onClose={() => closeDialog(1)} />,
    },
    [action_names.WATERING]: {
      index: 2,
      icon: wateringIcon,
      title: "Arroser",
      form: <WateringForm onClose={() => closeDialog(2)} />,
    },
    [action_names.FERTILIZING]: {
      index: 3,
      icon: fertilizeIcon,
      title: "Fertiliser",
      form: <FertilizeForm onClose={() => closeDialog(3)} />,
    },
    [action_names.TREATING]: {
      index: 4,
      icon: parasiteIcon,
      title: "Traiter",
      form: <TreatForm onClose={() => closeDialog(4)} />,
    },
    [action_names.HARVESTING]: {
      index: 5,
      icon: harvestIcon,
      title: "Récolter",
      form: <HarvestForm onClose={() => closeDialog(5)} />,
    },
    [action_names.REMOVING]: {
      index: 6,
      icon: removeIcon,
      title: "Fin de culture",
      form: <RemoveForm onClose={() => closeDialog(6)} />,
    },
    [action_names.WEEDING]: {
      index: 7,
      icon: weedIcon,
      title: "Désherber",
      form: <WeedForm onClose={() => closeDialog(7)} />,
    },
    [action_names.OBSERVING]: {
      index: 8,
      icon: cameraIcon,
      title: "Observer",
      form: <ObservationForm onClose={() => closeDialog(8)} />,
    },
  };
  const sortedActions = Object.values(actionMap).sort(
    (a, b) => a.index - b.index
  );
  return (
    <div className="grid grid-cols-3 px-2 h-[280px] mt-[-5px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      <DiaryAndProductionModal area={null}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={`absolute top-3 right-3`}
        >
          <Newspaper strokeWidth={1.5}/>
        </Button>
      </DiaryAndProductionModal>
      {sortedActions?.map((action) => (
        <div key={action.index} className="flex flex-col items-center">
          <Dialog
            modal
            open={openStates[action.index] || false}
            onOpenChange={(isOpen) => handleOpenChange(action.index, isOpen)}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" className="flex-col size-20 p-1">
                <img className="w-10" src={action.icon} alt="" />
                <span className="text-xs text-center whitespace-break-spaces">
                  {action.title}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent
              aria-describedby={undefined}
              className="h-dvh md:h-[90vh] w-full md:w-auto rounded-none md:rounded-lg overflow-y-auto overflow-x-hidden flex flex-col items-center gap-10  dark:bg-slate-900"
              onOpenAutoFocus={(event) => event.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>
                  <FormHeader icon={action.icon} name={action.title} />
                </DialogTitle>
              </DialogHeader>
              <div className="w-96 flex justify-center">{action.form}</div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};
export default ActionsModule;
