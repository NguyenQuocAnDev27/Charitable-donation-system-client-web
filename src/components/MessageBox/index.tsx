import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";

interface MessageBoxProps {
  isLoading: boolean;
  isClose: boolean;
  message: string;
  project_id: number;
  onClose: () => void;
  onCreatePayment: (msg: string, project_id: number, amount?: number) => void;
  isGuest: boolean;
  senderName?: string;
  qrContent?: string; // QR content when available
}

const MessageBox: React.FC<MessageBoxProps> = ({
  isLoading,
  isClose,
  message,
  project_id,
  onClose,
  onCreatePayment,
  isGuest = false,
  senderName = "",
  qrContent = "",
}) => {
  const [name, setName] = useState(senderName);
  const [messageText, setMessageText] = useState(message);
  const [charLimitReached, setCharLimitReached] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("2000");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showQR, setShowQR] = useState(false); // State to handle QR display

  // Handle component close effect
  useEffect(() => {
    if (isClose) {
      onClose();
    }
  }, [isClose, onClose]);

  // Handle message input and enforce character limit
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 80) {
      setMessageText(value);
      setCharLimitReached(false);
    } else {
      setCharLimitReached(true);
    }
  };

  // Handle donation amount selection
  const handleAmountSelect = (amount: number | "custom") => {
    if (amount === "custom") {
      setShowCustomInput(true);
      setSelectedAmount(null);
      setCustomAmount("2000");
    } else {
      setSelectedAmount(amount);
      setShowCustomInput(false);
    }
  };

  // Handle Create Payment
  const handleCreatePayment = () => {
    const amount = showCustomInput ? parseFloat(customAmount) : selectedAmount;

    if (!amount || amount < 2000) {
      alert("Vui lòng chọn số tiền hợp lệ hoặc nhập ít nhất 2.000đ!");
      return;
    }

    // Call the API to create payment
    if (isGuest) {
      onCreatePayment(`${name};${messageText}`, project_id, amount);
    } else {
      onCreatePayment(messageText, project_id, amount);
    }

    // After payment creation, set to show QR
    setShowQR(true);
  };

  if (isClose) return null; // If closed, return nothing

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70">
      <div className="w-full max-w-sm rounded-lg bg-white p-4 text-black shadow-lg dark:bg-gray-800 dark:text-white sm:max-w-2xl sm:p-6">
        {isLoading ? (
          // State 1: Loading
          <div className="flex flex-col items-center justify-center px-6 py-12">
            <Loading />
            <p className="pt-10 text-center text-sm sm:text-base">
              Đang tạo mã QR thanh toán
            </p>
            <p className="pt-2 text-center text-sm sm:text-base">
              Vui lòng đợi...
            </p>
          </div>
        ) : showQR && qrContent ? (
          // State 3: QR Code Display
          <div className="px-1 py-2 text-center sm:px-2 sm:py-4">
            <div className="my-1">
              <img
                src={`data:image/jpeg;base64,${qrContent}`}
                alt="QR Code"
                className="h-100 mx-auto w-80"
              />
              <p className="my-5 text-sm text-green-500">
                Quét mã QR để thực hiện thanh toán.
              </p>
              <p className="my-5 text-sm text-yellow">
                <strong>Lưu ý: </strong>Thời gian trung bình để xử lí là 5 phút.
                <br />
                Vui lòng giữ hoá đơn sau khi thực hiện thanh toán
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                setMessageText("");
                setSelectedAmount(null);
                setShowQR(false);
                onClose();
              }}
              className="rounded-md bg-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-400 sm:text-base"
            >
              Đóng
            </button>
          </div>
        ) : (
          // State 2: Input and Button Create
          <div className="px-4 py-6 text-center sm:px-8 sm:py-8">
            {isGuest && (
              <div className="mb-4 sm:mb-6">
                <label
                  htmlFor="senderName"
                  className="mb-1 block text-sm sm:mb-2 sm:text-base"
                >
                  Nhập tên người gửi
                </label>
                <input
                  type="text"
                  id="senderName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2 text-sm sm:text-base"
                  placeholder="Nhập tên người gửi"
                />
              </div>
            )}

            {/* Message input area */}
            <div className="mb-4 sm:mb-6">
              <label
                htmlFor="message"
                className="mb-1 block text-sm sm:mb-2 sm:text-base"
              >
                Nhập lời nhắn
              </label>
              <textarea
                id="message"
                value={messageText}
                onChange={handleMessageChange}
                rows={isGuest ? 3 : 5}
                className="w-full resize-none rounded border border-gray-300 p-2 text-sm sm:text-base"
                placeholder="Nhập lời nhắn"
                maxLength={80}
              />
              {charLimitReached && (
                <p className="mt-1 text-sm text-red-500 sm:mt-2">
                  Bạn đã đạt tới giới hạn 80 ký tự!
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                {messageText.length}/80 ký tự
              </p>
            </div>

            {/* Donation amount buttons */}
            <div className="mb-4 grid grid-cols-2 gap-2 px-5 sm:mb-6 sm:grid-cols-4 sm:gap-4">
              <button
                className={`w-full rounded-md px-4 py-2 sm:py-3 ${
                  selectedAmount === 10000
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-darkblue"
                }`}
                onClick={() => handleAmountSelect(10000)}
              >
                10.000đ
              </button>
              <button
                className={`w-full rounded-md px-4 py-2 sm:py-3 ${
                  selectedAmount === 20000
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-darkblue"
                }`}
                onClick={() => handleAmountSelect(20000)}
              >
                20.000đ
              </button>
              <button
                className={`w-full rounded-md px-4 py-2 sm:py-3 ${
                  selectedAmount === 50000
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-darkblue"
                }`}
                onClick={() => handleAmountSelect(50000)}
              >
                50.000đ
              </button>
              <button
                className={`w-full rounded-md px-4 py-2 sm:py-3 ${
                  showCustomInput
                    ? "bg-blue-500 text-white"
                    : "bg-blue-200 text-darkblue"
                }`}
                onClick={() => handleAmountSelect("custom")}
              >
                Khác
              </button>
            </div>

            {/* Custom donation input */}
            {showCustomInput && (
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Nhập số tiền"
                className="mb-10 mt-2 w-6/12 rounded border border-gray-300 p-2"
                min={2000}
                step={1000}
              />
            )}

            {/* Buttons for creating a payment code and closing */}
            <div className="flex justify-center space-x-2 sm:space-x-4">
              <button
                onClick={handleCreatePayment}
                className="rounded-md bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-400 sm:text-base"
              >
                Tạo mã thanh toán
              </button>

              <button
                onClick={onClose}
                className="rounded-md bg-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-400 sm:text-base"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
