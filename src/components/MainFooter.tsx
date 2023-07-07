/**
 * @author Felix Orinda
 * @email forinda82@gmail.com
 * @create date 2023-07-06 23:46:46
 * @modify date 2023-07-06 23:46:46
 * @desc [Application footer]
 */

"use client";

function MainFooter() {
  return (
    <div className="bg-primary-darker min-h-[20rem] p-4 py-8">
      <footer className="flex flex-col justify-center items-center text-center text-white max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Felix Orinda</h1>
        </div>
        <div className="flex flex-row justify-center items-center space-x-4">
          {/* Copyright */}

          <div className="flex flex-row justify-center items-center space-x-4">
            <a
              href="
              https://www.linkedin.com/in/felix-orinda-5a1b3b1b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>LinkedIn</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4.5 4.5 0 01-6.364 0M16 10a6 6 0 10-12 0v6h6m-2 0h2m-2 0a4 4 0 118-4v4"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainFooter;
