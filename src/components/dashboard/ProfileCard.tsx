export const ProfileCard = ({ user }) => {
  return (
    <div
      className="relative p-3 h-80 bg-cover bg-center flex flex-col justify-end items-center rounded-xl shadow-2xl"
      style={{ backgroundImage: "url('/disco.jpg')" }}
    >
      <div
        className="absolute top-3 cursor-pointer  right-3 p-3 border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <svg
          className="w-6 h-6 text-white"
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
        <h1>{user.username}</h1>
        <h1>{user.role.split("_").join("-")}</h1>
      </div>
    </div>
  );
};
