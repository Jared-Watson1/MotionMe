import PropTypes from "prop-types";
import { useState } from "react";

function ContractInfo({ isDarkMode }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const contractAddress = "SPLXXXXXXXXXXXXXXXXXXXXXX";
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div
      className={`w-full max-w-md p-5 rounded-lg shadow border ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">Contract Info</h2>
      <address
        className="relative p-4 rounded-lg border grid grid-cols-2 not-italic leading-loose"
        style={{
          backgroundColor: isDarkMode ? "gray-700" : "gray-50",
          borderColor: isDarkMode ? "gray-600" : "gray-200",
        }}
      >
        <div className="space-y-2 leading-loose hidden sm:block">
          <span>Contract Address</span>
        </div>
        <div
          id="contract-details"
          className="space-y-2 font-medium leading-loose"
        >
          [BUY MOTION] [SPLXXXXXXXXXXXXXXXXXXXXXX]
        </div>
        <button
          onClick={handleCopyToClipboard}
          className={`absolute end-2 top-2 p-2 rounded-lg inline-flex items-center justify-center transition ${
            isDarkMode
              ? "text-gray-400 hover:bg-gray-800"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {copied ? (
            <svg
              className="w-3.5 h-3.5 text-blue-700 dark:text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
              aria-hidden="true"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          )}
        </button>
        <div
          id="tooltip-contract-details"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </address>
    </div>
  );
}

ContractInfo.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default ContractInfo;
