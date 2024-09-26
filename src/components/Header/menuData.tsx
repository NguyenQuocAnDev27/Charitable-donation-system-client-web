import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Trang chủ",
    path: "/",
    newTab: false,
  },
  {
    id: 3,
    title: "Danh sách sao kê",
    path: "/donationlist",
    newTab: false,
  },
  {
    id: 5,
    title: "Chiến dịch",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "Hỗ trợ lũ bão yagi",
        path: "/projects",
        newTab: false,
      },
      {
        id: 52,
        title: "Xuân tình nguyện",
        path: "/projects",
        newTab: false,
      },
      {
        id: 53,
        title: "Mùa hè xanh",
        path: "/projects",
        newTab: false,
      },
      {
        id: 54,
        title: "Tết trung thu",
        path: "/projects",
        newTab: false,
      },
      {
        id: 55,
        title: "Khác",
        path: "/projects",
        newTab: false,
      }
    ]
  },
  {
    id: 4,
    title: "Về chúng tôi",
    path: "/about",
    newTab: false,
  },
];
export default menuData;
