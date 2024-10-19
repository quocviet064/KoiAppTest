import { HoverBorderGradient } from "./HoverBorder";
import { IoMdArrowDropdown } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { useDispatch } from "react-redux";
import { IoMdNotifications, IoIosSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import {
    clearCurrentUser,
    setCurrentUser,
} from "../../../lib/redux/reducers/userSlice";
import { AppDispatch } from "@/lib/redux/store";

interface User {
  Id: string;
  Name: string;
  Email: string;
  Role: string; // Assuming Role can be "Admin", "Staff", or something else
}

interface UserMenuProps {
  currentUser: User | null; // currentUser can be null or a valid user object
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const ToggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    // Check if user is stored in sessionStorage and set it in Redux
    const user = sessionStorage.getItem("user");
    if (user) {
      dispatch(setCurrentUser(JSON.parse(user)));
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    // Clear user from Redux store
    dispatch(clearCurrentUser());
    setIsOpen(false);
    toast.success("Đăng xuất thành công!");
    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className="relative">
      <div
        onClick={ToggleOpen}
        className="flex flex-row items-center justify-between gap-3"
      >
        <span>Chào mừng</span>
        <HoverBorderGradient>
        {currentUser?.Name} <IoMdArrowDropdown size={25} />
        </HoverBorderGradient>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[12vw] md:w-3/1 bg-white overflow-hidden right-0 top-12 text-sm z-10">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              currentUser.Role === "Staff" ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label="Dashboard"
                    icon={<MdDashboard size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Thông báo"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    label="Đăng xuất"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              ) : currentUser.Role === "Admin" ? (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label="Dashboard"
                    icon={<MdDashboard size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Quản lý người dùng"
                    icon={<MdManageAccounts size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Thông báo"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    label="Đăng xuất"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => {}}
                    label="Hồ sơ của tôi"
                    icon={<CgProfile size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Lịch sử"
                    icon={<FaHistory size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Thông báo"
                    icon={<IoMdNotifications size={20} />}
                  />
                  <MenuItem
                    onClick={() => {}}
                    label="Cài đặt"
                    icon={<IoIosSettings size={20} />}
                  />
                  <MenuItem
                    onClick={handleLogout}
                    label="Đăng xuất"
                    icon={<HiOutlineLogin size={20} />}
                  />
                </>
              )
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
