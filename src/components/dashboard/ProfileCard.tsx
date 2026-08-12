export const ProfileCard = ({ user }) => {
  return (
    <div
      className="relative p-3 h-48 sm:h-64 md:h-72 lg:h-80 bg-cover bg-center flex flex-col justify-end rounded-xl shadow-2xl"
      style={{ backgroundImage: "url('/disco.jpg')" }}
    >
      <div
        className="absolute top-2 right-2 sm:top-3 sm:right-3 cursor-pointer p-2 sm:p-3 border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full shrink-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
          />
        </svg>
      </div>
      <div
        className="border-2 border-white/10 backdrop-blur-sm rounded-xl w-full p-2 bg-[#D4D4D4]/1 flex flex-col gap-1 "
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <p className="text-sm sm:text-base truncate">{user.username}</p>
        <p className="text-xs sm:text-sm text-white/90">{user.role.split("_").join("-")}</p>
      </div>
    </div>
  );
};
