import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

function Header({ isDarkMode, setIsDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Close the dropdown if the user clicks outside of it
    function handleClickOutside(event) {
      if (
        !event.target.closest("#menu-button") &&
        !event.target.closest("#menu-items")
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`p-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      } flex items-center justify-between`}
    >
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="h-16" />
        <h1
          className={`text-4xl font-bold tracking-wider ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          $MOTION
        </h1>
      </div>
      <div className="flex space-x-4 items-center">
        {/* Visible on medium and larger screens */}
        <div className="hidden md:flex space-x-4">
          <a
            href="https://t.me/solgotmotion"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 fill-current ${
                isDarkMode ? "text-white" : "text-black"
              } hover:text-gray-400 dark:hover:text-gray-600`}
              viewBox="0 0 50 50"
            >
              <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
            </svg>
          </a>
          <a
            href="https://x.com/solgotmotion"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 fill-current ${
                isDarkMode ? "text-white" : "text-black"
              } hover:text-gray-400 dark:hover:text-gray-600`}
              viewBox="0 0 50 50"
            >
              <path d="M 11 4 C 7.1456661 4 4 7.1456661 4 11 L 4 39 C 4 42.854334 7.1456661 46 11 46 L 39 46 C 42.854334 46 46 42.854334 46 39 L 46 11 C 46 7.1456661 42.854334 4 39 4 L 11 4 z M 11 6 L 39 6 C 41.773666 6 44 8.2263339 44 11 L 44 39 C 44 41.773666 41.773666 44 39 44 L 11 44 C 8.2263339 44 6 41.773666 6 39 L 6 11 C 6 8.2263339 8.2263339 6 11 6 z M 13.085938 13 L 22.308594 26.103516 L 13 37 L 15.5 37 L 23.4375 27.707031 L 29.976562 37 L 37.914062 37 L 27.789062 22.613281 L 36 13 L 33.5 13 L 26.660156 21.009766 L 21.023438 13 L 13.085938 13 z M 16.914062 15 L 19.978516 15 L 34.085938 35 L 31.021484 35 L 16.914062 15 z"></path>
            </svg>
          </a>
        </div>

        {/* More Button */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className={`inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-lg font-semibold tracking-wider items-center ${
                isDarkMode
                  ? "bg-black text-white hover:bg-gray-700"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
              id="menu-button"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              More
              <svg
                className={`-mr-1 h-5 w-5 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isMenuOpen && (
            <div
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
              id="menu-items"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className={`block px-4 py-2 text-lg font-semibold tracking-wider ${
                    isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-black hover:bg-gray-200"
                  }`}
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  Dextools
                </a>
                <a
                  href="#"
                  className={`block px-4 py-2 text-lg font-semibold tracking-wider ${
                    isDarkMode
                      ? "text-white hover:bg-gray-700"
                      : "text-black hover:bg-gray-200"
                  }`}
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-1"
                >
                  Dexscreener
                </a>
                {/* Hidden on large screens, visible on small screens */}
                <div className="block md:hidden">
                  <a
                    href="https://t.me/solgotmotion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-4 py-2 text-lg font-semibold tracking-wider ${
                      isDarkMode
                        ? "text-white hover:bg-gray-700"
                        : "text-black hover:bg-gray-200"
                    }`}
                  >
                    Telegram
                  </a>
                  <a
                    href="https://x.com/solgotmotion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-4 py-2 text-lg font-semibold tracking-wider ${
                      isDarkMode
                        ? "text-white hover:bg-gray-700"
                        : "text-black hover:bg-gray-200"
                    }`}
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg
            className={`fill-black ${!isDarkMode ? "block" : "hidden"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            className={`fill-white ${isDarkMode ? "block" : "hidden"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
};

export default Header;
