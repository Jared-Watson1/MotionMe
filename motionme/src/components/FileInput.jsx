import PropTypes from "prop-types";

function FileInput({ onFileChange }) {
  return (
    <div className="flex w-full items-center justify-center">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-[#023047] text-[#fb8500] rounded-lg shadow-lg tracking-wide uppercase border border-[#fb8500] cursor-pointer hover:bg-[#219ebc] hover:text-white transition duration-300 ease-in-out">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files[0])}
        />
      </label>
    </div>
  );
}

FileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
};

export default FileInput;
