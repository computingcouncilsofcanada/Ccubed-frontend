"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  IconArrowLeft,
  IconMail,
  IconPlus,
  IconSearch,
  IconTrash,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import BgBoxMainPage from "@/components/essentials/BgBoxMainPage";
import { getUsers } from "@/services/useApiUser";
import {
  addEmailGroupMember,
  createEmailGroup,
  getEmailGroupById,
  getEmailGroupMembers,
  removeEmailGroupMember,
  updateEmailGroup,
} from "@/services/useApiEmailGroup";
import { User } from "@/types/user.interface";
import {
  EmailGroup,
  EmailGroupMember,
} from "@/types/email-group.interface";
import { getErrMsg } from "@/utils/errorMessage";
import {
  EMAIL_REGEX,
  dedupeMembersForSubmit,
  formatGroupTimestamp,
} from "../utils";
import RemoveMemberModal from "./modals/RemoveMemberModal";

type EmailGroupForm = {
  name: string;
  description?: string;
};

export interface EmailGroupFormContentProps {
  mode: "create" | "update";
  groupId?: string;
}

const CARD_CLASS =
  "bg-white/5 backdrop-blur-sm rounded-xl shadow-sm border border-white/10 p-6 h-full";

export default function EmailGroupFormContent({
  mode,
  groupId,
}: EmailGroupFormContentProps) {
  const isUpdate = mode === "update";
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [group, setGroup] = useState<EmailGroup | null>(null);
  const [members, setMembers] = useState<EmailGroupMember[]>([]);
  const [pageLoading, setPageLoading] = useState(isUpdate);
  const [pageError, setPageError] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
  const [manualEmails, setManualEmails] = useState<string[]>([]);
  const [manualEmailInput, setManualEmailInput] = useState("");
  const [manualEmailError, setManualEmailError] = useState("");
  const [memberMode, setMemberMode] = useState<"users" | "manual">("users");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingMembers, setIsAddingMembers] = useState(false);

  const [selectedMember, setSelectedMember] = useState<EmailGroupMember | null>(
    null
  );
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailGroupForm>();

  const existingEmails = useMemo(
    () => members.map((m) => m.email.toLowerCase()),
    [members]
  );

  const normalizedExisting = useMemo(
    () => new Set(existingEmails),
    [existingEmails]
  );

  const fetchUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await getUsers({ limit: 1000, offset: 0 });
      setUsers(res.data ?? []);
    } catch (err: unknown) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchGroupData = useCallback(async () => {
    if (!isUpdate || !groupId) return;
    setPageLoading(true);
    try {
      const [groupRes, membersRes] = await Promise.all([
        getEmailGroupById(groupId),
        getEmailGroupMembers(groupId),
      ]);
      setGroup(groupRes.data);
      setMembers(membersRes.data ?? []);
      reset({
        name: groupRes.data.name,
        description: groupRes.data.description ?? "",
      });
      setPageError("");
    } catch (err: unknown) {
      setPageError(getErrMsg(err));
      setGroup(null);
      setMembers([]);
    } finally {
      setPageLoading(false);
    }
  }, [isUpdate, groupId, reset]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  const filteredUsers = useMemo(() => {
    const query = userSearch.trim().toLowerCase();
    const available = users.filter(
      (u) => !normalizedExisting.has(u.email.toLowerCase())
    );
    if (!query) return available;
    return available.filter(
      (u) =>
        u.username.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
    );
  }, [users, userSearch, normalizedExisting]);

  const selectedUsers = useMemo(
    () => users.filter((u) => selectedUserIds.has(u.id)),
    [users, selectedUserIds]
  );

  const pendingMemberCount = selectedUserIds.size + manualEmails.length;
  const totalMemberCount = isUpdate
    ? members.length + pendingMemberCount
    : pendingMemberCount;

  const clearPendingSelection = () => {
    setSelectedUserIds(new Set());
    setManualEmails([]);
    setManualEmailInput("");
    setManualEmailError("");
    setUserSearch("");
  };

  const toggleUserSelection = (userId: string) => {
    const targetUser = users.find((u) => u.id === userId);
    if (!targetUser) return;

    if (selectedUserIds.has(userId)) {
      setSelectedUserIds((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
      return;
    }

    const normalizedEmail = targetUser.email.toLowerCase();
    if (normalizedExisting.has(normalizedEmail)) return;
    if (manualEmails.includes(normalizedEmail)) return;

    const duplicateAmongSelected = users.some(
      (u) =>
        selectedUserIds.has(u.id) &&
        u.id !== userId &&
        u.email.toLowerCase() === normalizedEmail
    );
    if (duplicateAmongSelected) return;

    setSelectedUserIds((prev) => new Set(prev).add(userId));
  };

  const handleAddManualEmail = () => {
    const email = manualEmailInput.trim().toLowerCase();
    setManualEmailError("");

    if (!email) {
      setManualEmailError("Please enter an email address");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setManualEmailError("Please enter a valid email address");
      return;
    }
    if (normalizedExisting.has(email)) return;
    if (manualEmails.includes(email)) return;

    const matchingUser = users.find((u) => u.email.toLowerCase() === email);
    if (matchingUser && selectedUserIds.has(matchingUser.id)) {
      setSelectedUserIds((prev) => {
        const next = new Set(prev);
        next.delete(matchingUser.id);
        return next;
      });
      setManualEmails((prev) => [...prev, email]);
      setManualEmailInput("");
      return;
    }

    const duplicateAmongSelected = users.some(
      (u) => selectedUserIds.has(u.id) && u.email.toLowerCase() === email
    );
    if (duplicateAmongSelected) return;

    setManualEmails((prev) => [...prev, email]);
    setManualEmailInput("");
  };

  const handleRemoveManualEmail = (email: string) => {
    setManualEmails((prev) => prev.filter((e) => e !== email));
  };

  const addPendingMembers = async (targetGroupId: string) => {
    const emails = dedupeMembersForSubmit(
      users,
      selectedUserIds,
      manualEmails,
      existingEmails
    );

    if (emails.length === 0) return false;

    const promises = emails.map((email) =>
      addEmailGroupMember(targetGroupId, { email })
    );

    await Promise.allSettled(promises);
    clearPendingSelection();
    return true;
  };

  const onSubmit = async (data: EmailGroupForm) => {
    if (!isUpdate && pendingMemberCount === 0) return;

    setIsSubmitting(true);
    try {
      if (isUpdate && groupId) {
        await updateEmailGroup(groupId, {
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
        });
        await fetchGroupData();
      } else {
        const emails = dedupeMembersForSubmit(
          users,
          selectedUserIds,
          manualEmails
        );
        if (emails.length === 0) return;

        const groupRes = await createEmailGroup({
          name: data.name.trim(),
          description: data.description?.trim() || undefined,
        });

        const newGroupId = groupRes.data?.id;
        if (!newGroupId) {
          throw new Error("Failed to get created group ID");
        }

        const promises = emails.map((email) =>
          addEmailGroupMember(newGroupId, { email })
        );
        await Promise.allSettled(promises);

        router.push("/member/email-group");
      }
    } catch (err: unknown) {
      console.error(
        `Error ${isUpdate ? "updating" : "creating"} email group:`,
        err
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPendingMembers = async () => {
    if (!isUpdate || !groupId || pendingMemberCount === 0) return;

    setIsAddingMembers(true);
    try {
      await addPendingMembers(groupId);
      await fetchGroupData();
    } catch (err: unknown) {
      console.error("Error adding members:", err);
    } finally {
      setIsAddingMembers(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!groupId || !selectedMember) return;
    try {
      await removeEmailGroupMember(groupId, selectedMember.id);
      setIsRemoveModalOpen(false);
      setSelectedMember(null);
      await fetchGroupData();
    } catch (err: unknown) {
      console.error("Error removing member:", getErrMsg(err));
    }
  };

  if (!user) {
    return null;
  }

  if (isUpdate && pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#10212E] to-[#162C3D] text-slate-300">
        Loading group...
      </div>
    );
  }

  if (isUpdate && (pageError || !group)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#10212E] to-[#162C3D] text-slate-300 gap-4 p-6">
        <p>{pageError || "Email group not found."}</p>
        <Link
          href="/member/email-group"
          className="text-[#FAA336] hover:underline flex items-center gap-2"
        >
          <IconArrowLeft size={18} />
          Back to Email Groups
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative w-full overflow-hidden overflow-x-hidden bg-gradient-to-b from-[#10212E] to-[#162C3D] -mt-30 pt-30">
      <BgBoxMainPage maxHeight={400} enableGlow={true} />

      <div className="p-6 max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <Link
            href="/member/email-group"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[#7C3AED] transition-colors mb-4 group"
          >
            <IconArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Back to Email Groups</span>
          </Link>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {isUpdate ? "Edit Email Group" : "Create Email Group"}
            </h1>
            <p className="text-base sm:text-lg text-gray-200">
              {isUpdate
                ? "Update group details and manage members"
                : "Set up a new group and add members from the user list or manually"}
            </p>
            {isUpdate && group && (
              <p className="text-gray-400 text-sm mt-2">
                Created {formatGroupTimestamp(group.created_at) ?? "—"}
                {group.updated_at &&
                  ` · Updated ${formatGroupTimestamp(group.updated_at)}`}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <div className={CARD_CLASS}>
                <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                  <IconMail size={22} className="text-[#FAA336]" />
                  Group Details
                </h2>
                <p className="text-sm text-gray-400 mb-5">
                  Name and describe your email group
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Group Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      {...register("name", {
                        required: "Group name is required",
                      })}
                      type="text"
                      placeholder="e.g. Newsletter Subscribers"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAA336]/50 focus:border-[#FAA336]"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      {...register("description")}
                      rows={6}
                      placeholder="Optional description for this group"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAA336]/50 focus:border-[#FAA336] resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className={`${CARD_CLASS} hidden lg:block`}>
                <h3 className="text-sm font-semibold text-gray-300 mb-3">
                  Summary
                </h3>
                <div className="space-y-3 text-sm">
                  {isUpdate && (
                    <div className="flex justify-between text-gray-400">
                      <span>Current members</span>
                      <span className="text-white font-medium">
                        {members.length}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>
                      {isUpdate ? "New members selected" : "Members selected"}
                    </span>
                    <span className="text-white font-medium">
                      {pendingMemberCount}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>From users</span>
                    <span className="text-white font-medium">
                      {selectedUserIds.size}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Manual emails</span>
                    <span className="text-white font-medium">
                      {manualEmails.length}
                    </span>
                  </div>
                  {isUpdate && (
                    <div className="flex justify-between text-gray-400 pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-white font-medium">
                        {totalMemberCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`${CARD_CLASS} flex flex-col lg:sticky lg:top-6`}>
              {isUpdate && (
                <div className="mb-5 pb-5 border-b border-white/10">
                  <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <IconUsers size={16} className="text-[#FAA336]" />
                    Current members ({members.length})
                  </h3>
                  {members.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No members in this group yet
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between text-sm bg-white/5 rounded-lg px-3 py-2"
                        >
                          <div className="min-w-0">
                            <p className="text-white truncate">{member.email}</p>
                            <p className="text-gray-500 text-xs">
                              {member.user_id
                                ? "Registered user"
                                : "Manual email"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMember(member);
                              setIsRemoveModalOpen(true);
                            }}
                            className="text-gray-400 hover:text-red-400 ml-2 shrink-0"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <IconUsers size={22} className="text-[#FAA336]" />
                    {isUpdate ? "Add Members" : "Add Members"}
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {pendingMemberCount} new member
                    {pendingMemberCount === 1 ? "" : "s"} selected
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setMemberMode("users")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    memberMode === "users"
                      ? "bg-[#FAA336] text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/15"
                  }`}
                >
                  Select from Users
                </button>
                <button
                  type="button"
                  onClick={() => setMemberMode("manual")}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    memberMode === "manual"
                      ? "bg-[#FAA336] text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/15"
                  }`}
                >
                  Manual Email
                </button>
              </div>

              {memberMode === "users" ? (
                <div className="space-y-3 flex-1 flex flex-col min-h-0">
                  <div className="relative">
                    <IconSearch
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search by username or email..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAA336]/50"
                    />
                  </div>

                  {usersLoading ? (
                    <p className="text-gray-400 text-sm py-4 text-center">
                      Loading users...
                    </p>
                  ) : (
                    <div className="flex-1 min-h-[180px] max-h-[240px] lg:max-h-[280px] overflow-y-auto rounded-lg border border-white/10 divide-y divide-white/5">
                      {filteredUsers.length === 0 ? (
                        <p className="text-gray-400 text-sm py-4 text-center">
                          No available users found
                        </p>
                      ) : (
                        filteredUsers.map((u) => (
                          <label
                            key={u.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedUserIds.has(u.id)}
                              onChange={() => toggleUserSelection(u.id)}
                              className="w-4 h-4 rounded border-white/30 bg-white/10 text-[#FAA336] focus:ring-[#FAA336]/50"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">
                                {u.username}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {u.email}
                              </p>
                            </div>
                          </label>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={manualEmailInput}
                      onChange={(e) => {
                        setManualEmailInput(e.target.value);
                        setManualEmailError("");
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddManualEmail();
                        }
                      }}
                      placeholder="Enter email address"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FAA336]/50"
                    />
                    <button
                      type="button"
                      onClick={handleAddManualEmail}
                      className="px-4 py-2.5 bg-[#FAA336] hover:bg-[#F59527] text-white rounded-lg transition-colors flex items-center gap-1 shrink-0"
                    >
                      <IconPlus size={18} />
                      Add
                    </button>
                  </div>
                  {manualEmailError && (
                    <p className="text-red-400 text-sm">{manualEmailError}</p>
                  )}

                  {manualEmails.length > 0 ? (
                    <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
                      {manualEmails.map((email) => (
                        <span
                          key={email}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white"
                        >
                          {email}
                          <button
                            type="button"
                            onClick={() => handleRemoveManualEmail(email)}
                            className="text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <IconX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm py-6 text-center border border-dashed border-white/10 rounded-lg">
                      No manual emails added yet
                    </p>
                  )}
                </div>
              )}

              <div className="mt-5 pt-5 border-t border-white/10">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  {isUpdate ? "New members to add" : "Selected members"}
                </h3>
                {selectedUsers.length === 0 && manualEmails.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">
                    Members you add will appear here
                  </p>
                ) : (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedUsers.map((u) => (
                      <div
                        key={u.id}
                        className="flex items-center justify-between text-sm bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span className="text-white truncate min-w-0">
                          {u.username}{" "}
                          <span className="text-gray-400">({u.email})</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleUserSelection(u.id)}
                          className="text-gray-400 hover:text-red-400 ml-2 shrink-0"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    ))}
                    {manualEmails.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between text-sm bg-white/5 rounded-lg px-3 py-2"
                      >
                        <span className="text-white truncate min-w-0">
                          {email}
                        </span>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-xs text-gray-500">manual</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveManualEmail(email)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {isUpdate && pendingMemberCount > 0 && (
                  <button
                    type="button"
                    onClick={handleAddPendingMembers}
                    disabled={isAddingMembers}
                    className="w-full mt-4 px-6 py-2.5 bg-[#FAA336] hover:bg-[#F59527] text-white rounded-lg disabled:opacity-50 transition-all font-semibold"
                  >
                    {isAddingMembers
                      ? "Adding Members..."
                      : `Add ${pendingMemberCount} Member${pendingMemberCount === 1 ? "" : "s"}`}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/member/email-group"
              className="sm:basis-[30%] px-6 py-3 border-2 border-[#FAA336] rounded-lg hover:bg-[#FAA336]/10 transition-colors font-medium text-[#FAA336] flex items-center justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                (!isUpdate && pendingMemberCount === 0)
              }
              className="sm:basis-[70%] px-6 py-3 bg-[#FAA336] hover:bg-[#F59527] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isSubmitting
                ? isUpdate
                  ? "Saving..."
                  : "Creating Group..."
                : isUpdate
                  ? "Save Changes"
                  : "Create Email Group"}
            </button>
          </div>
        </form>
      </div>

      {isUpdate && (
        <RemoveMemberModal
          isOpen={isRemoveModalOpen}
          onClose={() => {
            setIsRemoveModalOpen(false);
            setSelectedMember(null);
          }}
          onConfirm={handleRemoveMember}
          member={selectedMember}
        />
      )}
    </div>
  );
}
