import {
  Home,
  Wrench,
  FolderKanban,
  Info,
  Contact,
  Users2,
  Camera,
  Video,
  IdCard,
  Files,
} from "lucide-react";

const linkIconWidth = 18;
export const groups = [
  {
    name: "Pages",
    links: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <Home width={linkIconWidth} />,
      },
      {
        name: "About",
        path: "/dashboard/pages/about",
        icon: <Info width={linkIconWidth} />,
      },
      {
        name: "Services",
        path: "/dashboard/pages/services",
        icon: <Wrench width={linkIconWidth} />,
      },
      {
        name: "Portfolio",
        path: "/dashboard/pages/portfolio",
        icon: <FolderKanban width={linkIconWidth} />,
      },
      {
        name: "Contact",
        path: "/dashboard/pages/contact",
        icon: <Contact width={linkIconWidth} />,
      },
    ],
  },
  {
    name: "Collections",
    links: [
      {
        name: "Clients",
        path: "/dashboard/clients",
        icon: <Users2 width={linkIconWidth} />,
      },
      {
        name: "Photography",
        path: "/dashboard/photography",
        icon: <Camera width={linkIconWidth} />,
      },
      {
        name: "Videography",
        path: "/dashboard/videography",
        icon: <Video width={linkIconWidth} />,
      },
      {
        name: "Employees",
        path: "/dashboard/employees",
        icon: <IdCard width={linkIconWidth} />,
      },
      {
        name: "Projects",
        path: "/dashboard/projects",
        icon: <FolderKanban width={linkIconWidth} />,
      },
    ],
  },
];
