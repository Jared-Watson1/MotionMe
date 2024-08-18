import AssetItem from "./AssetItem";
import logo from "../assets/logo.png";
import glasses from "../assets/sunglasses.png";

function AssetList({ isDarkMode }) {
  const assets = [logo, glasses];

  return (
    <div className="md:p-4 p-2 md:max-w-xs w-full">
      <h2
        className={`mb-4 text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Your Assets
      </h2>
      {assets.map((asset, index) => (
        <AssetItem key={index} src={asset} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
}

export default AssetList;
