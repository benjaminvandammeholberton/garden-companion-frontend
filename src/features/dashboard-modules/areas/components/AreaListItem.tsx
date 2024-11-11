// Component that render a area description: area icon, the name of the
// area and the list of vegetables that grow in this area

import { AreaInterface } from "../../../../interfaces/interfaces";
import VegetableIconsList from "./VegetableIconsList";

interface AreaListItemInterface {
  area: AreaInterface;
  openModal: (area: AreaInterface) => void;
  areaIcon: string | undefined;
}

const AreaListItem: React.FC<AreaListItemInterface> = ({
  area,
  openModal,
  areaIcon,
}) => {
  return (
    <li className="flex gap-3 w-full justify-between">
      <div
        onClick={() => openModal(area)}
        className="cursor-pointer flex items-center gap-3"
      >
        <img className="w-5 h-5" src={areaIcon} alt="" />
        <span className="text-lg">{area.name}</span>
      </div>
      <VegetableIconsList area={area} />
    </li>
  );
};

export default AreaListItem;
