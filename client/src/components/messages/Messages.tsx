import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};
export default Messages;
