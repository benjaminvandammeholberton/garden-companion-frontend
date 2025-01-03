import greenhouse from "../assets/icons/area-environnements/greenhouse.png";
import outdoor from "../assets/icons/area-environnements/outdoor.png";
import indoor from "../assets/icons/area-environnements/indoor.png";

type areaMapsType = Record<string, string>[];

const areaEnvironnementsIconsMaps: areaMapsType = [
  { I: indoor },
  { O: outdoor },
  { G: greenhouse },
];

export default areaEnvironnementsIconsMaps;
