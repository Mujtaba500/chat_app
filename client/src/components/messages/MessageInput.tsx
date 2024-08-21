import { Send } from "lucide-react";
import { useState } from "react";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleMessageSubmit = async () => {
    if (!message.trim()) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleMessageSubmit();
      }}
      className="px-4 mb-3 "
    >
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
};
export default MessageInput;
