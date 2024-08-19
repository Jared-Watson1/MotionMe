import AssetItem from "./AssetItem";
import PropTypes from "prop-types";

import Blunt from "../assets/motion-me-assets/BLUNT.png";
import BucketHat from "../assets/motion-me-assets/BUCKET HAT.png";
import Cap from "../assets/motion-me-assets/CAP.png";
import Caution from "../assets/motion-me-assets/CAUTION.png";
import Cigarette from "../assets/motion-me-assets/CIGARETTE.png";
import DollarChain from "../assets/motion-me-assets/DOLLAR CHAIN.png";
import Dollar from "../assets/motion-me-assets/DOLLAR.png";
import Flames from "../assets/motion-me-assets/FLAMES.png";
import GetMotion from "../assets/motion-me-assets/GET MOTION.png";
import Glasses from "../assets/motion-me-assets/GLASSES.png";
import Glasses1 from "../assets/motion-me-assets/GLASSES(1).png";
import HolyFinger from "../assets/motion-me-assets/HOLY FINGER.png";
import JointRight from "../assets/motion-me-assets/JOINT (RIGHT).png";
import Joint from "../assets/motion-me-assets/JOINT.png";
import Moisturized from "../assets/motion-me-assets/MOISTURIZED.png";
import Puff from "../assets/motion-me-assets/PUFF.png";
import RolledJoint from "../assets/motion-me-assets/ROLLED JOINT.png";
import RubberDuck from "../assets/motion-me-assets/RUBBER DUCK.png";
import Shades from "../assets/motion-me-assets/SHADES.png";
import Shades1 from "../assets/motion-me-assets/SHADES(1).png";
import SmokeCloud from "../assets/motion-me-assets/SMOKE CLOUD.png";
import SmokeWisps from "../assets/motion-me-assets/SMOKE WISPS.png";
import Stars from "../assets/motion-me-assets/STARS.png";
import ThugLifeLeft from "../assets/motion-me-assets/THUG LIFE (LEFT).png";
import ThugLifeRight from "../assets/motion-me-assets/THUG LIFE (RIGHT).png";
import WizardHat from "../assets/motion-me-assets/WIZARD HAT.png";

const assets = [
  { name: "Blunt", src: Blunt },
  { name: "Bucket Hat", src: BucketHat },
  { name: "Cap", src: Cap },
  { name: "Caution", src: Caution },
  { name: "Cigarette", src: Cigarette },
  { name: "Dollar Chain", src: DollarChain },
  { name: "Dollar", src: Dollar },
  { name: "Flames", src: Flames },
  { name: "Get Motion", src: GetMotion },
  { name: "Glasses", src: Glasses },
  { name: "Glasses(1)", src: Glasses1 },
  { name: "Holy Finger", src: HolyFinger },
  { name: "Joint (Right)", src: JointRight },
  { name: "Joint", src: Joint },
  { name: "Moisturized", src: Moisturized },
  { name: "Puff", src: Puff },
  { name: "Rolled Joint", src: RolledJoint },
  { name: "Rubber Duck", src: RubberDuck },
  { name: "Shades", src: Shades },
  { name: "Shades(1)", src: Shades1 },
  { name: "Smoke Cloud", src: SmokeCloud },
  { name: "Smoke Wisps", src: SmokeWisps },
  { name: "Stars", src: Stars },
  { name: "Thug Life (Left)", src: ThugLifeLeft },
  { name: "Thug Life (Right)", src: ThugLifeRight },
  { name: "Wizard Hat", src: WizardHat },
  // Add more as needed
];

function AssetList({ isDarkMode, onAssetClick, imageHeight }) {
  return (
    <div className="md:p-4 p-2 w-full">
      <h2
        className={`mb-4 text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Your Assets
      </h2>
      <div
        className="overflow-y-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4"
        style={{ height: imageHeight + "px" }} // Set the height dynamically
      >
        {assets.map((asset, index) => (
          <AssetItem
            key={index}
            name={asset.name}
            src={asset.src}
            isDarkMode={isDarkMode}
            onClick={() => onAssetClick(asset.src)}
          />
        ))}
      </div>
    </div>
  );
}

AssetList.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onAssetClick: PropTypes.func.isRequired,
  imageHeight: PropTypes.number.isRequired, // Add PropType for imageHeight
};

export default AssetList;
