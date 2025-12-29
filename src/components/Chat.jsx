import { useEffect, useState, useRef } from "react";
import { client } from "../lib/appwrite";
import { Query } from "appwrite";
import { createRows, getRows, updateRow } from "../utils/db";
import { useUser } from "../auth/userContext";
import { useParams } from "react-router-dom";

// ... imports stay the same

const Chat = ({
  currentUserId: propCurrentUserId,
  recipientId: propRecipientId,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const [isSending, setIsSending] = useState(false); 
  const { user } = useUser();
  const { recipientId: paramRecipientId } = useParams();

  const currentUserId = propCurrentUserId || user?.$id;
  const recipientId = propRecipientId || paramRecipientId;
  const messageEndRef = useRef(null);

  // Compute conversationId only when both IDs are available
  const conversationId =
  currentUserId && recipientId
    ? [currentUserId, recipientId]
        .sort()
        .join("") // Remove the underscore to save space
        .slice(0, 36) // Ensure it never exceeds the limit
    : null;

  useEffect(() => {
    if (!conversationId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const res = await getRows(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_TABLE_ID_MESSAGES,
          [
            Query.equal("conversationId", conversationId),
            Query.orderAsc("$createdAt"),
          ]
        );
        console.log("Fetched messages:", res);
        setMessages(res.rows || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Subscribe to the collection
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.tables.${
        import.meta.env.VITE_APPWRITE_TABLE_ID_MESSAGES
      }.rows`,
      (response) => {
        console.log("Message subscription event:", response);
        const isCreate = response.events.some((e) =>
          e.includes("documents.*.create")
        );
        const payload = response.payload;

        if (isMounted && isCreate && payload.conversationId === conversationId) {
          // Check for duplicates to be safe
          setMessages((prev) => {
            if (prev.find((m) => m.$id === payload.$id)) return prev;
            return [...prev, payload];
          });
        }
      }
    );

    return () => {
      isMounted = false;
      // if (typeof unsubscribe === "function") unsubscribe();
      // else if (unsubscribe && typeof unsubscribe.close === "function")
        unsubscribe();
    };
  }, [conversationId, currentUserId, recipientId]);

  // Auto-scroll logic
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  

  const sendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim() || !conversationId || isSending) return;

  const participantsStr = [currentUserId, recipientId].sort().join(",");

  const msgText = newMessage; // Keep a reference
  setNewMessage(""); // Clear input immediately for better UX
  setIsSending(true); 

  try {
    // 1. Create the Message document in the messages collection
    await createRows(
  import.meta.env.VITE_APPWRITE_TABLE_ID_MESSAGES, // tableId
  {
    senderId: currentUserId,
    receiverId: recipientId,
    text: msgText,
    conversationId: conversationId,
  } // data (rowId will automatically be ID.unique())
);

    // 2. Update or Create the Conversation document (The Inbox entry)
    // We use the 'conversationId' as the Document ID so it's unique and easy to find.
    try {
      await updateRow(
        import.meta.env.VITE_APPWRITE_TABLE_ID_CONVERSATIONS,
        conversationId, // Document ID
        {
          lastMessage: msgText,
          participants: participantsStr,
          // updatedAt: new Date().toISOString(),
        }
      );
    } catch (error) {
      if (error.code === 404) {
        await createRows(
  import.meta.env.VITE_APPWRITE_TABLE_ID_CONVERSATIONS, // tableId
  {
    lastMessage: msgText,
    participants: participantsStr,
    // updatedAt: new Date().toISOString(),
  }, // data
  conversationId // rowId (Now this will correctly set the document ID)
);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Failed to send message:", error);
    setNewMessage(msgText); 
  } finally {
    setIsSending(false);
    // Optional: add a toast or alert here
  }
};

  if (!currentUserId || !recipientId) {
    return (
      <div className="p-4 text-center">Please log in and select a chat.</div>
    );
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-white shadow-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="text-center text-gray-400">Loading messages...</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.$id}
              className={`flex ${
                msg.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.senderId === currentUserId
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messageEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border p-2 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
