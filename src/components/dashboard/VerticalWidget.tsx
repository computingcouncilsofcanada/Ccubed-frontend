"use client";

import { useCallback, useEffect, useState } from "react";
import { privateAxios } from "@/lib/axios";
import { User } from "@/types/user.interface";

const USERS_PER_PAGE = 7;

export const VerticalWidget = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await privateAxios.get("/users");
      const data = res.data?.data ?? [];
      const allUsers = Array.isArray(data) ? data : [];
      setTotalCount(allUsers.length);
      const start = (page - 1) * USERS_PER_PAGE;
      setUsers(allUsers.slice(start, start + USERS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setTotalCount(0);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.max(1, Math.ceil(totalCount / USERS_PER_PAGE));

  return (
    <div className="flex flex-col gap-3 min-w-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <div className="flex gap-3 items-start min-w-0">
          <div
            className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-xl"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6z" />
              <path d="M12 14c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 min-w-0">
            <p className="text-base sm:text-lg font-bold">Users</p>
            <p className="text-sm sm:text-base text-white/90">{totalCount} current Users</p>
          </div>
        </div>
        <div
          className="cursor-pointer w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 self-end sm:self-auto overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <svg
            className="w-6 h-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
      <div className="flex justify-between items-center gap-2 w-full max-w-xs mx-auto sm:mx-0 sm:w-auto">
        <div
          className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            aspectRatio: "1",
          }}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </div>
        <div className="flex gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <p
                key={p}
                className={`cursor-pointer ${p === page ? "font-bold" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </p>
            ))}
        </div>
        <div
          className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            aspectRatio: "1",
          }}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        >
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6l6 6-6 6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ user }: { user: User }) => {
  const roleDisplay = user.role?.split("_").join(" ") ?? "—";
  const domainDisplay = user.domains?.length
    ? user.domains[0]
    : user.department ?? "—";
  return (
    <div className="rounded-full bg-[#CCCCCC]/5 flex justify-between items-center p-2 gap-2 min-w-0">
      <div className="flex items-center gap-2 min-w-0">
        <div
          className="cursor-pointer w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            aspectRatio: "1",
          }}
        >
          <svg
            className="w-6 h-6 text-white flex-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H9M17 7V15" />
          </svg>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm sm:text-base truncate">{user.username}</p>
          <p className="text-xs sm:text-sm text-white/90 truncate">{roleDisplay}</p>
        </div>
      </div>
      <div className="bg-[#59E2DC]/20 rounded-full px-2 sm:px-3 py-1 flex items-center shrink-0">
        <p className="text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[120px]">{domainDisplay}</p>
      </div>
    </div>
  );
};
