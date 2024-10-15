import { global } from "@/constant/global";

function convertStatusToVietnamese (status: string) {
  if(status === global.PROJECT_STATUS.STOPPED) {
    return "Đã dừng"
  } else if (status === global.PROJECT_STATUS.PENDING) {
    return "Đang thực hiện"
  } else {
    return "Đã hoàn thành"
  }
}

function convertToVietnameseDate(dateString: string) {
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  }

  // Format the date using Vietnamese locale
  return new Intl.DateTimeFormat("vi-VN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export {
  convertStatusToVietnamese,
  convertToVietnameseDate
}