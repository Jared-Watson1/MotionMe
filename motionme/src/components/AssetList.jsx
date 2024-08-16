import AssetItem from './AssetItem';
import logo from '../assets/logo.png';
import glasses from '../assets/sunglasses.png';

function AssetList() {
  const assets = [logo, glasses]; // You can add more assets here as you add them to your project

  return (
    <div className="p-4">
      <h2 className="text-white mb-2">Drag and Drop Assets</h2>
      {assets.map((asset, index) => (
        <AssetItem key={index} src={asset} />
      ))}
    </div>
  );
}

export default AssetList;
