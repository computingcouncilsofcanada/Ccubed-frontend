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
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center ">
        <div className="flex gap-4">
          <div
            className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-xl [&>svg]:flex-none"
            style={{
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              aspectRatio: "1",
            }}
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6z" />
              <path d="M12 14c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z" />
            </svg>
          </div>
          <div className="flex flex-col -gap-2">
            <p className="font-bold">Users</p>
            <p>{totalCount} current Users</p>
          </div>
        </div>
        <div
          className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            aspectRatio: "1",
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
      <div className="flex justify-between self-center items-center w-[50%]">
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
    <div className="rounded-full bg-[#CCCCCC]/5 flex justify-between p-2">
      <div className="flex items-center gap-2">
        <div
          className="cursor-pointer w-12 h-12 flex items-center justify-center flex-none overflow-hidden border-2 border-white/10 backdrop-blur-sm bg-[#D4D4D4]/4 shadow-2xl rounded-full [&>svg]:flex-none"
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
        <div className="flex flex-col -gap-1">
          <p>{user.username}</p>
          <p>{roleDisplay}</p>
        </div>
      </div>
      <div className="bg-[#59E2DC]/20 rounded-full px-3 flex items-center">
        <p>{domainDisplay}</p>
      </div>
    </div>
  );
};
