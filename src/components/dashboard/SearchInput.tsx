export const SearchInput = () => {
  return (
    <div className=" max-[1292px]:w-full w-[60%] flex items-center">
      <div className="w-full rounded-full border-2 border-orange-400/20 ">
        <div className="flex items-center gap-3 rounded-full p-1.5 bg-[#D4D4D4]/15 ">
          <div className=" rounded-full p-4 bg-[#2b3743] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search for a user, event, or functionality"
            className="w-full bg-transparent outline-none border-none text-2xl font-poppins"
          />
        </div>
      </div>
    </div>
  );
};
