"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { MdDeleteOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import {
  useGetAllUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/components/redux/features/user/userApi";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import LoadingSpinner from "@/components/ui/loading-spinner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  contactNumber: string;
  status: "ACTIVE" | "INACTIVE";
  profilePhoto?: string;
  createdAt: string;
  updatedAt: string;
}

const ManageUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<User>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: users, isLoading } = useGetAllUserQuery([
    { name: 'page', value: currentPage },
    { name: 'limit', value: itemsPerPage }
  ]);

  const totalPages = Math.ceil((users?.meta?.total || 0) / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [createUser] = useCreateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    setValue("profilePhoto", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    const toastId = toast.loading("Adding User....", { duration: 2000 });

    if (!profilePhoto) {
      toast.error("Please provide a profile picture", {
        id: toastId,
      });
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      role: data.role,
      contactNumber: data.contactNumber,
      status: data.status,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));
    formData.append("file", profilePhoto);

    try {
      const res = await createUser(formData).unwrap();

      // Log FormData contents
      // console.log('Form Data Contents:');
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ': ' + pair[1]);
      // }

      toast.success("User added successfully!", { id: toastId });
      setIsModalOpen(false);
      reset();
      clearImage();
    } catch (error: any) {
      toast.error(error.message || "Failed to add user", { id: toastId });
      setIsModalOpen(false);
      reset();
      clearImage();
    }
  };

  const handleUserDelete = async (userId: string) => {
    const toastId = toast.loading("Deleting User...", { duration: 2000 });

    try {
      const res = await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!", { id: toastId });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user", { id: toastId });
    }
  };

  const handleRoleUpdate = async (
    userId: string,
    newRole: "USER" | "ADMIN"
  ) => {
    const toastId = toast.loading("Updating User Role...", { duration: 2000 });

    try {
      const res = await updateUser({
        id: userId,
        role: newRole,
      }).unwrap();
      toast.success("User role updated successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Failed to update user role", {
        id: toastId,
      });
    }
  };

  const handleStatusUpdate = async (
    userId: string,
    newStatus: "ACTIVE" | "INACTIVE"
  ) => {
    const toastId = toast.loading("Updating User Status...", {
      duration: 2000,
    });

    try {
      const res = await updateUser({
        id: userId,
        status: newStatus,
      }).unwrap();
      toast.success("User status updated successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status", {
        id: toastId,
      });
    }
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen bg-[#00031b] p-2">
      <div className="max-w-full mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            User Management
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg transition-all"
          >
            Add User
          </button>
        </div>

        {/* User Table */}
        {isLoading ? (
          <p className="text-white text-5xl font-bold text-center">
            <LoadingSpinner />
          </p>
        ) : (
          <div className="rounded-xl border border-[#1a2d6d] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#000a3a]">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Contact Number</th>
                    <th className="px-6 py-4 text-left">Role</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.map((user: User) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-[#1a2d6d] hover:bg-[#000a3a]/50 transition-colors"
                    >
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.contactNumber}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm border ${
                            user.role === "ADMIN"
                              ? "border-purple-500/50 text-purple-400"
                              : "border-blue-500/50 text-blue-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm border ${
                            user.status === "ACTIVE"
                              ? "border-green-500/50 text-green-400"
                              : "border-red-500/50 text-red-400"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-2xl">
                        <div className="flex gap-4">
                          <MdDeleteOutline
                            className="cursor-pointer hover:text-red-500 transition-colors"
                            onClick={() => openDeleteModal(user)}
                          />
                          <FaPen
                            className="cursor-pointer hover:text-blue-500 transition-colors"
                            onClick={() => {
                              setUpdateModalOpen(true);
                              setUser(user);
                            }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 py-4 bg-[#000a3a]">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-[#1a2d6d] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-[#1a2d6d] text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-[#1a2d6d] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && userToDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-[#000a3a] p-6 rounded-xl border border-[#1a2d6d] max-w-md w-full mx-4"
              >
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-semibold text-white mb-4"
                >
                  Confirm Delete
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-300 mb-6"
                >
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-end gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeDeleteModal}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUserDelete(userToDelete.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update User Modal */}
        <UpdateUserModal
          isUpdateModalOpen={isUpdateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          user={user}
        />
      </div>
    </div>
  );
};

export default ManageUser;
