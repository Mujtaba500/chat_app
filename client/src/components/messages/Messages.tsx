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
      {!loading && messages.length == 0 && (
        <p className="text-slate-900">Send a message to start a conversation</p>
      )}
    </div>
  );
};
export default Messages;
