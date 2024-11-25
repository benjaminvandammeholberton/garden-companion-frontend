import vegetableIconsMaps from "@/maps/vegetableMaps";
import { ActionInterface } from "./Diary";
import directSowingIcon from "../../assets/actions-icons/direct-sowing.png";
import plantingIcon from "../../assets/actions-icons/planting.png";
import harvestIcon from "../../assets/actions-icons/harvest.png";
import waterIcon from "../../assets/actions-icons/watering.png";
import removeIcon from "../../assets/actions-icons/remove.png";
import treatIcon from "../../assets/actions-icons/parasite.png";
import cameraIcon from "../../assets/actions-icons/camera.png";
import weedIcon from "../../assets/actions-icons/weed.png";
import fertilizeIcon from "../../assets/actions-icons/fertilize.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import capitalize from "@/utils/capitalizeStr";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiaryItemEditDialog from "./DiaryItemEditDialog";

const PhotoItem: React.FC<{ file_path: string }> = ({ file_path }) => {
  return (
    <>
      {file_path && (
        <img
          className="w-auto max-h-96 object-cover rounded-sm"
          src={file_path}
          alt=""
        />
      )}
    </>
  );
};

export const DiaryItemDirectSowing: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
    </>
  );
};

export const DiaryItemPlanting: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety}) :{" "}
        {action.vegetable.quantity} {action.vegetable.quantity_unit}
      </div>
    </>
  );
};

export const DiaryItemHarvesting: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.quantity} {action.quantity_unit || "kg"}{" "}
        {action.vegetable &&
          `de : ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemWatering: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.quantity && action.quantity > 0 ? action.quantity : ""}{" "}
        {action.quantity_unit || ""}{" "}
        {((action.quantity && action.quantity > 0) || action.quantity_unit) &&
          action.vegetable &&
          ": "}
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemWeeding: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.vegetable &&
          `${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemFertilizing: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.product_name} : {action.quantity || ""}{" "}
        {action.quantity_unit || ""}{" "}
        {action.vegetable &&
          `pour ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

export const DiaryItemRemoving: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.vegetable.name} ({action.vegetable.variety})
      </div>
    </>
  );
};

export const DiaryItemObservation: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.vegetable?.name &&
          `${action.vegetable.name} (${action.vegetable.variety})`}
      </div>
    </>
  );
};

export const DiaryItemTreating: React.FC<{ action: ActionInterface }> = ({
  action,
}) => {
  return (
    <>
      <div className="cursor-pointer">
        {action.product_name} : {action.quantity || ""}{" "}
        {action.quantity_unit || ""}{" "}
        {action.vegetable &&
          `sur ${action.vegetable.name} (${action.vegetable?.variety})`}
      </div>
    </>
  );
};

interface DiaryItemGeneralProps {
  action: ActionInterface;
}

export const DiaryItemGeneral: React.FC<DiaryItemGeneralProps> = ({
  action,
}) => {
  const vegetableAsset = vegetableIconsMaps.find(
    (asset) => asset?.name?.fr === action.vegetable.name.toLowerCase()
  );
  let file_path;
  if (action.photos) {
    file_path = action.photos[0]?.photo;
  }

  const actionComponentMap: { [key: string]: [JSX.Element, string, string] } = {
    SOWING: [
      <DiaryItemDirectSowing action={action} />,
      "Semis",
      directSowingIcon,
    ],
    PLANTING: [
      <DiaryItemPlanting action={action} />,
      "Plantation",
      plantingIcon,
    ],
    WATERING: [<DiaryItemWatering action={action} />, "Arrosage", waterIcon],
    FERTILIZING: [
      <DiaryItemFertilizing action={action} />,
      "Fertilisation",
      fertilizeIcon,
    ],
    TREATING: [<DiaryItemTreating action={action} />, "Traitement", treatIcon],
    HARVESTING: [
      <DiaryItemHarvesting action={action} />,
      "Récolte",
      harvestIcon,
    ],
    WEEDING: [<DiaryItemWeeding action={action} />, "Désherbage", weedIcon],
    OBSERVING: [
      <DiaryItemObservation action={action} />,
      "Observation",
      cameraIcon,
    ],
    REMOVING: [
      <DiaryItemRemoving action={action} />,
      "Fin de culture",
      removeIcon,
    ],
  };

  return (
    <Card className="w-full lg:w-[800px]">
      <CardHeader className="p-3 pb-6">
        <div className="flex items-center justify-center relative">
        <div className="flex flex-col justify-between h-14 w-20 items-center absolute top-0 left-0">
              <img
                className="size-10"
                src={actionComponentMap[action.operation_type][2]}
                alt=""
              />
              <span className="text-xs  text-center">
                {actionComponentMap[action.operation_type][1]}
              </span>
            </div>

          <div className="flex flex-col gap-6 lg:gap-6 justify-between items-center">
          <span className="text-sm font-semibold">
            {new Date(action.date).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
            })}
          </span>
            {vegetableAsset && (
              <div className="flex flex-col justify-center gap-2 items-center">
                <img
                  className="size-9"
                  src={vegetableAsset?.assets}
                  alt=""
                />
                <span className="text-center">
                  {capitalize(vegetableAsset?.name.fr)}
                  {action.vegetable?.variety && ` ${action.vegetable?.variety}`}
                </span>
              </div>
            )}
          </div>
          <DiaryItemEditDialog action={action} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center gap-4">
        {actionComponentMap[action.operation_type][0]}
        {action.description && (
          <p className="text-justify">
            <span className="font-semibold">Notes : </span>
            {action.description}
          </p>
        )}
        {file_path && <PhotoItem file_path={file_path} />}
      </CardContent>
    </Card>
  );
};
