import carrotIcon from "../../assets/vegetables-icons/carrot.png";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import cameraIcon from "../../assets/actions-icons/camera.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";
import placeHolderImage from "../../assets/placeholder-image.jpeg";

import { ActionInterface, AreaInterface } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axiosInstance from "@/api/axios";
import vegetableIconsMaps from "@/maps/vegetableMaps";
import DirectSowingForm from "../dashboard-modules/actions/DirectSowingForm";
import { Filter } from "lucide-react";
import backendRoutes from "@/api/apiRoutes";


const BASEURL = import.meta.env.REACT_APP_BACKEND_URL_BASE || "https://jammin-dev.com/"

const SOWING = "SOWING"
const PLANTING = "PLANTING"
const REMOVING = "REMOVING"
const WATERING = "WATERING"
const FERTILIZING = "FERTILIZING"
const TREATING = "TREATING"
const HARVESTING = "HARVESTING"
const WEEDING = "WEEDING"
const OBSERVING = "OBSERVING"

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

export const ActionFilterSelect = ({
  icon,
  text,
  type,
  actionTypes,
  setActionTypes,
}) => {
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    setIsSelected(actionTypes.includes(type));
  }, [actionTypes]);

  const handleClick = () => {
    if (actionTypes.length === 9){
      setActionTypes((prev) =>
        prev.filter((actionType) => actionType === type)
      );
      return
    }
    
    if (actionTypes.includes(type)) {
      setActionTypes((prev) =>
        prev.filter((actionType) => actionType !== type)
      );
    } else {
      setActionTypes((prev) => [...prev, type]);
    }
    setIsSelected(!isSelected);
  };

  return (
    <div className="mx-auto">
      <div
        className="flex flex-col items-center justify-between gap-2 cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={icon}
          alt=""
          className="w-10"
          style={{ filter: isSelected ? "" : "grayscale(100%)" }}
        />
        <span
          className={`text-sm text-center font-medium leading-none ${
            isSelected ? "font-medium" : "font-thin"
          } `}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

const DiaryItemDirectSowing = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={directSowingIcon} alt="" />
        <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemPlanting = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={plantingIcon} alt="" />
        <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemHarvesting = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = BASEURL + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={harvestIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.harvest_quantity} {action.harvest_unit || "kg"}{" "}
        {action.fertilizer_unit || ""}{" "}
        {action.vegetable &&
          `de : ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemWatering = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={waterIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {(action.quantity && parseFloat(action.quantity) > 0) ? action.quantity : ""} {action.quantity_unit || ""}{" "}
        {(((action.quantity && parseFloat(action.quantity) > 0)  || action.quantity_unit) && action.vegetable) && ": "}
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemWeeding = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photo) {
    file_path = BASEURL + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={weedIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemFertilizing = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={fertilizeIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.product_name} : {action.quantity || ""}{" "}
        {action.quantity_unit || ""}{" "}
        {action.vegetable &&
          `pour ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemRemoving = ({ action }) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photo) {
    file_path = BASEURL + action.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={removeIcon} alt="" />
        <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
      </div>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety})
      </div>
      {action.note && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.note}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemObservation = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={cameraIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.vegetable?.name &&
          `${action.vegetable.name} (${action.vegetable.variety})`}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemTreating = ({ action }) => {
  let vegetableAsset;
  if (action.vegetable) {
    vegetableAsset = vegetableIconsMaps.find(
      (asset) => asset.name.fr === action.vegetable.name.toLowerCase()
    );
  }
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={treatIcon} alt="" />
        {vegetableAsset && (
          <img className="w-8 h-8" src={vegetableAsset?.assets} alt="" />
        )}
      </div>
      <div className="cursor-pointer">
        {action.product_name} : {action.quantity || ""}{" "}
        {action.quantity_unit || ""}{" "}
        {action.vegetable &&
          `sur ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
      {action.description && (
        <p className="text-justify">
          <span className="font-semibold">Notes : </span>
          {action.description}
        </p>
      )}
      {file_path && (
        <img
          className="w-3/4 max-h-72 object-contain rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

const DiaryItemCreating = ({ action }) => {
  return (
    <>
      <div className="flex gap-2 lg:gap-5">
        <img className="w-8 h-8" src={directSowingIcon} alt="" />
        <img className="w-8 h-8" src={carrotIcon} alt="" />
      </div>
      <div className="cursor-pointer">4 rangées de Carotte - Nantaise </div>
      <p className="text-justify">
        <span className="font-semibold">Notes : </span>
        {action.note}
      </p>
      <img className="w-3/4 rounded-sm" src={placeHolderImage} alt="" />
    </>
  );
};

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

const DiaryItemGeneral: React.FC<DiaryItemGeneralProps> = ({ action }) => {
  const actionComponentMap = {
    SOWING: [<DiaryItemDirectSowing action={action} />, "Semis"],
    PLANTING: [<DiaryItemPlanting action={action} />, "Plantation"],
    WATERING: [<DiaryItemWatering action={action} />, "Arrosage"],
    FERTILIZING: [<DiaryItemFertilizing action={action} />, "Fertilisation"],
    TREATING: [<DiaryItemTreating action={action} />, "Traitement"],
    HARVESTING: [<DiaryItemHarvesting action={action} />, "Récolte"],
    WEEDING: [<DiaryItemWeeding action={action} />, "Désherbage"],
    OBSERVING: [<DiaryItemObservation action={action} />, "Observation"],
    REMOVING: [<DiaryItemRemoving action={action} />, "Fin de culture"],
  };

  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader>
        <div className="flex justify-between">
          <span className="text-sm">
            {new Date(action.date).toLocaleDateString("fr-FR")}
          </span>
          <span className="text-sm font-semibold">
            {actionComponentMap[action.operation_type][1]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {actionComponentMap[action.operation_type][0]}
      </CardContent>
    </Card>
  );
};

interface DiarayProps {
  area: AreaInterface | undefined;
}
const Diary: React.FC<DiarayProps> = ({ area }) => {


  const actionType = [
    SOWING,
    PLANTING,
    WATERING,
    FERTILIZING,
    TREATING,
    HARVESTING,
    REMOVING,
    WEEDING,
    OBSERVING,
  ];
  const [actions, setActions] = useState([]);
  const [actionTypes, setActionTypes] = useState(actionType);

  useEffect(() => {
    const getActions = async () => {
      try {
        const response = await axiosInstance.get(
          backendRoutes.operations + `?area=${area.uuid}`
        );
        setActions(response.data);
      } catch (error) {
        console.error(error);
        throw new Error("Can't fetch areas from the server");
      }
    };
    getActions();
  }, [area]);

  const ActionFilterList = [
    { icon: directSowingIcon, text: "Semis", type: "SOWING" },
    { icon: plantingIcon, text: "Plantation", type: "PLANTING" },
    { icon: waterIcon, text: "Arrosage", type: "WATERING" },
    { icon: fertilizeIcon, text: "Fertilisation", type: "FERTILIZING" },
    { icon: treatIcon, text: "Traitement", type: "TREATING" },
    { icon: harvestIcon, text: "Récolte", type: "HARVESTING" },
    { icon: removeIcon, text: "Fin de culture", type: "REMOVING" },
    { icon: weedIcon, text: "Désherbage", type: "WEEDING" },
    { icon: cameraIcon, text: "Observation", type: "OBSERVING" },
  ];

  return (
    <div className="w-full flex flex-col gap-5 px-1 py-4 items-center">
      <Popover>
        <PopoverTrigger asChild className="gap-2">
          <Button>
            <Filter strokeWidth={1.5} />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent
          asChild
          className="w-80 flex flex-col items-center gap-2 dark:bg-slate-900"
        >
          <div>
            <span className="p-1 hover:underline cursor-pointer" onClick={() => setActionTypes(actionType)}>Réinitialiser</span>
          <div className="grid grid-cols-3 gap-8">
            {ActionFilterList.map((action) => (
              <ActionFilterSelect
                key={action.type}
                icon={action.icon}
                text={action.text}
                type={action.type}
                actionTypes={actionTypes}
                setActionTypes={setActionTypes}
              />
            ))}
          </div>
          </div>
        </PopoverContent>
      </Popover>
      {actions
        .filter(
          (action) =>
            action.area.id === area.uuid && actionTypes.includes(action.operation_type)
        )
        // .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((action) =>
          <DiaryItemGeneral action={action} key={action.uuid} />
        )}
    </div>
  );
};

export default Diary;
