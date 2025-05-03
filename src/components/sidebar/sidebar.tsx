"use client";

import { LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    path: "/dashboard/user-management",
    icon: Users,
  },
  {
    title: "Content Management",
    path: "/dashboard/content-management",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#18183a] hidden md:flex flex-col py-8 px-4 border-r border-[#23234d]">
      <div className="text-2xl font-bold mb-10 text-[#7b5cff]">
        CineVerse Admin
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === item.path
                ? "bg-[#7b5cff] text-white"
                : "hover:bg-[#23234d] text-gray-300"
            }`}
          >
            {/* <span>{item.icon}</span> */}
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import {
//   Users,
//   LayoutDashboard,
//   Menu,
//   X,
// } from "lucide-react";

// const Sidebar = () => {
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(true);

//   const menuItems = [
//     {
//       title: 'Dashboard',
//       path: '/dashboard',
//       icon: LayoutDashboard,
//     },
//     {
//       title: 'User Management',
//       path: '/dashboard/user-management',
//       icon: Users,
//     },
//     {
//       title: 'Content Management',
//       path: '/dashboard/content-management',
//       icon: Users,
//     },
//   ];

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={cn(
//           "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out flex flex-col h-screen",
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         )}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-semibold">Dashboard</h2>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => setIsOpen(false)}
//             className="lg:hidden"
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         {/* Sidebar Navigation */}
//         <ScrollArea className="flex-1">
//           <div className="p-4">
//             <nav className="space-y-2">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.path}
//                     href={item.path}
//                     className={cn(
//                       "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
//                       pathname === item.path
//                         ? "bg-primary text-primary-foreground"
//                         : "hover:bg-muted"
//                     )}
//                   >
//                     <Icon className="h-4 w-4" />
//                     <span>{item.title}</span>
//                   </Link>
//                 );
//               })}
//             </nav>
//           </div>
//         </ScrollArea>

//         {/* Sidebar Footer */}
//         <div className="p-4 border-t">
//           <div className="text-sm text-muted-foreground">
//             © 2024 Dashboard
//           </div>
//         </div>
//       </div>

//       {/* Mobile Toggle Button */}
//       <Button
//         onClick={() => setIsOpen(true)}
//         size="icon"
//         className="fixed bottom-4 right-4 lg:hidden z-40 rounded-full shadow-lg"
//       >
//         <Menu className="h-5 w-5" />
//       </Button>
//     </>
//   );
// };

// export default Sidebar;
