import React, { ReactNode } from "react";

interface MenuItemProps {
  onClick: () => void; 
  label: string; 
  icon: ReactNode; 
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-300 transition font-semibold flex flex-row items-center "
    >
      <p className="mr-3">{icon}</p>
      {label}
    </div>
  );
};

export default MenuItem;
