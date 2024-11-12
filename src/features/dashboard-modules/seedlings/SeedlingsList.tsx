import { useEffect, useState } from "react";

// assets
import vegetableIconsMaps from "@/maps/vegetableMaps";
import unknowVegetable from "../../../assets/vegetables-icons/unknown-vegetable.png";

// ui
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

// interfaces
import { SeedlingInterface } from "@/interfaces/interfaces";

// api
import {
  deleteSeedling,
  getAllSeedlings,
  updateSeedling,
} from "@/api/api-services/seedlingsApi";

// utils
import capitalize from "@/utils/capitalizeStr";
import useSortedData from "@/hooks/useSortedData";
import { Button } from "@/components/ui/button";
import PlantManagerModal from "@/modal/PlantManagerModal";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface SeedlingsListProps {
  sortedBy: string;
  handleClickSort: (type: string) => void;
}

const SeedlingsList: React.FC<SeedlingsListProps> = ({ sortedBy }) => {
  const [seedlings, setSeedlings] = useState<SeedlingInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [seedlingToPlant, setSeedlingToPlant] = useState({});
  const [seedlingInputQuantity, setSeedlingInputQuantity] = useState<number>(0);

  const { toast } = useToast();

  const openPlantingModal = (seedling: SeedlingInterface) => {
    setSeedlingToPlant(seedling);
    setIsModalOpen(true);
  };

  const handleChangeQuantity = async (
    seedling: SeedlingInterface,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value);
    setSeedlingInputQuantity(newQuantity);
    if (newQuantity > 0) {
      try {
        const updatedSeedling = {
          ...seedling,
          quantity: newQuantity,
        };
        await updateSeedling(seedling.uuid, updatedSeedling);
        const updatedSeedlings = seedlings.map((seed) => {
          if (seed.uuid !== seedling.uuid) {
            return seed;
          }
          return {
            ...seed,
            quantity: newQuantity,
          };
        });
        setSeedlings(updatedSeedlings);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (seedling: SeedlingInterface) => {
    try {
      await deleteSeedling(seedling.uuid);
      const newSeedlingsList = seedlings.filter((seedlingItem) => {
        return seedlingItem.uuid !== seedling.uuid;
      });
      setSeedlings(newSeedlingsList);
      toast({
        title: "Semis supprimé 👍",
        description: `${seedling.name} - ${seedling.variety}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const sortedData = useSortedData(seedlings, sortedBy);
  useEffect(() => {
    const fetchSeedlings = async () => {
      try {
        const data = await getAllSeedlings();
        setSeedlings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeedlings();
  }, []);

  const vegetableIcon = (vegetableName: string) => {
    const icon = vegetableIconsMaps.find(
      (asset) => asset.name.fr === vegetableName.toLowerCase()
    );
    if (icon) {
      return icon.assets;
    }
    return unknowVegetable;
  };

  const timeFromSowed = (date: string) => {
    const now = new Date();
    const time = now.getDate() - new Date(date).getDate();
    if (time === 0) {
      return "aujd";
    }
    return time + "j";
  };

  return (
    <div className="h-[280px] overflow-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-100 dark:scrollbar-track-slate-900">
      <ul className="text-lg font-thin h-5/6 p-2 cursor-default">
        {sortedData.map((vegetable) => {
          return (
            <li
              className="flex gap-3 w-full justify-between items-center"
              key={vegetable.uuid}
            >
              <div className="flex gap-3 h-6">
                <img
                  className="w-5 h-5"
                  src={vegetableIcon(vegetable.name)}
                  alt=""
                />

                <Popover>
                  <PopoverTrigger
                    onClick={() => setSeedlingInputQuantity(vegetable.quantity)}
                  >
                    <span>
                      {capitalize(vegetable.name)} -{" "}
                      {capitalize(vegetable.variety)} ({vegetable.quantity})
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white dark:bg-slate-900 border rounded-lg pt-2 pb-5 px-5 w-96">
                    <div className="flex justify-between items-end">
                      <Button onClick={() => openPlantingModal(vegetable)}>
                        Planter
                      </Button>
                      <Button
                        onClick={() => handleDelete(vegetable)}
                        variant={"destructive"}
                      >
                        Supprimer
                      </Button>
                      <div>
                        <label className="text-xs">Quantity</label>
                        <Input
                          min={1}
                          type="number"
                          className="w-20"
                          value={seedlingInputQuantity}
                          onChange={(e) => {
                            handleChangeQuantity(vegetable, e);
                          }}
                        />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    {timeFromSowed(vegetable.sowing_date)}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Semé le{" "}
                      {new Date(vegetable.sowing_date).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
      </ul>
      <PlantManagerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        actionName={"planting"}
        defaultValues={{ planting: seedlingToPlant }}
      />
    </div>
  );
};

export default SeedlingsList;
