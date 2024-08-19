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
      className={`w-full max-w-md mx-auto mt-6 p-5 rounded-lg shadow ${
        isDarkMode
          ? "bg-black border border-gray-200 text-white"
          : "bg-white border border-gray-200 text-black"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">Contract Info</h2>
      {copied && (
        <div
          className={`mt-4 flex items-center p-4 text-sm rounded-lg transition-opacity duration-300 ${
            isDarkMode
              ? "bg-gray-800 text-green-400"
              : "bg-green-50 text-green-800"
          }`}
        >
          <svg
            className="flex-shrink-0 w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="font-medium">Copied to clipboard!</span>
        </div>
      )}
      <div
        className={`relative p-4 rounded-lg border cursor-pointer ${
          isDarkMode
            ? "bg-black border border-gray-200 text-white"
            : "bg-gray-50 border border-gray-200 text-black"
        }`}
        onClick={handleCopyToClipboard} // Make the whole box clickable
      >
        <div className="leading-loose">
          <span>Contract Address</span>
        </div>
        <div
          id="contract-details"
          className="space-y-2 font-medium leading-loose mt-2"
        >
          SPLXXXXXXXXXXXXXXXXXXXXXX
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent's onClick
            handleCopyToClipboard();
          }}
          className={`absolute end-2 top-2 p-2 rounded-lg inline-flex items-center justify-center transition ${
            isDarkMode
              ? "text-gray-400 hover:bg-gray-800"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {copied ? (
            <svg
              className="w-3.5 h-3.5 text-black dark:text-white"
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
      </div>
    </div>
  );
}

ContractInfo.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
};

export default ContractInfo;
