"use client";

import { useUser } from "@/context/UserContext";
import React, { useCallback, useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { DataTable } from "@/components/data-table/data-table";
import { getErrMsg } from "@/utils/errorMessage";
import { EmailGroup } from "@/types/email-group.interface";
import { deleteEmailGroup, getEmailGroups } from "@/services/useApiEmailGroup";
import { createEmailGroupTableColumns } from "./components/EmailGroupTableColumns";
import EmptyEmailGroupsState from "./components/EmptyEmailGroupsState";
import PaginationControls from "../events/components/PaginationControls";
import DeleteEmailGroupModal from "./components/modals/DeleteEmailGroupModal";

function EmailGroupsPage() {
  const { user } = useUser();

  const [groups, setGroups] = useState<EmailGroup[]>([]);
  const [, setError] = useState<string>("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<EmailGroup | null>(null);

  const fetchGroups = useCallback(async () => {
    try {
      const offset = (page - 1) * limit;
      const res = await getEmailGroups({ limit, offset });
      setGroups(res.data ?? []);
    } catch (err: unknown) {
      setError(getErrMsg(err));
      setGroups([]);
    }
  }, [page]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleDeleteGroup = async () => {
    if (!selectedGroup) return;

    try {
      const res = await deleteEmailGroup(selectedGroup.id);
      if (res.status === 200) {
        setIsDeleteModalOpen(false);
        await fetchGroups();
      }
    } catch (err: unknown) {
      console.error("Error deleting email group:", getErrMsg(err));
    }
  };

  const openModal = (group: EmailGroup | null, type: "delete") => {
    setSelectedGroup(group);
    if (type === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  if (!user) {
    return null;
  }

  const columns = createEmailGroupTableColumns(openModal);

  return (
    <div className="min-h-screen text-white p-6">
      <div
        className="relative rounded-3xl p-8"
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(28px) saturate(120%)",
          WebkitBackdropFilter: "blur(28px) saturate(120%)",
          borderRadius: "22px",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: `
    0 20px 40px rgba(0,0,0,0.18),
    inset 0 1px 0 rgba(255,255,255,0.6),
    inset 0 -1px 0 rgba(255,255,255,0.15)
  `,
        }}
      >
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <Image
                src="/FigmaFiles/ccubed-icon.svg"
                alt="CCubed Icon"
                width={30}
                height={30}
                draggable={false}
                className="select-none"
              />
              Email Groups
            </h1>
            <p className="text-slate-400">Manage email groups and their members</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-semibold text-slate-300 bg-white/10 border border-white/20 rounded-full px-4 py-2">
              {groups.length} {groups.length === 1 ? "Group" : "Groups"}
            </span>
            <Link
              href="/member/email-group/create"
              className="px-6 py-3 text-black rounded-3xl hover:opacity-90 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 bg-brand"
            >
              <IconPlus size={20} />
              Create Email Group
            </Link>
          </div>
        </div>

        {groups.length === 0 ? (
          <EmptyEmailGroupsState />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={groups}
              headerVariant="purple"
              sort={true}
            />
            <PaginationControls
              page={page}
              onPageChange={setPage}
              hasNextPage={groups.length >= limit}
            />
          </>
        )}
      </div>

      <DeleteEmailGroupModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteGroup}
        groupName={selectedGroup?.name}
      />
    </div>
  );
}

export default EmailGroupsPage;
