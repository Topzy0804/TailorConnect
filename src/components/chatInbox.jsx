import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { client } from "../lib/appwrite";
import { getRows } from "../utils/db";
import { useUser } from "../auth/userContext";
import { Query } from "appwrite";

export const ChatInbox = () => {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    if (!user?.$id) return;

    try {
      const res = await getRows(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_TABLE_ID_CONVERSATIONS,
        [
          Query.contains("participants", user.$id),
          Query.orderDesc("$updatedAt"), // Our custom timestamp
        ]
      );

      console.log("Fetch conversations response:", res)

      const docs = res?.rows || [];
      console.log("Fetched conversations:", docs);
      const formatted = docs.map((doc) => {
        console.log("processing doc:", doc.$id, "participants:", doc.participants);
        const ids = doc.participants.split(",");
        const otherUserId = ids.find((id) => id !== user.$id);
        
        return {
        
        id: doc.$id,
        userId: otherUserId,
        lastMessage: doc.lastMessage,
        updatedAt: doc.$updatedAt,
        };
      });

      setConversations(formatted);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();

    // Subscribe to changes in the Conversations collection
    const unsubscribe = client.subscribe([
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.tables.${import.meta.env.VITE_APPWRITE_TABLE_ID_CONVERSATIONS}.rows`],
      (response) => {
        console.log("Subscription event received:", response);
        // If a conversation we are part of is updated/created, refresh the list
        if (response.payload.participants.includes(user?.$id)) {
          fetchConversations();
        }
      }
    );

    return () => unsubscribe();
  }, [user?.$id]);

  // Helper for nice date formatting
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (loading) return <div className="p-6 text-gray-500">Loading conversations...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>

      {conversations.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No conversations yet. Start a chat from a user's profile!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((convo) => (
            <Link
              key={convo.id}
              to={`/chat/${convo.userId}`}
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                  {convo.userId.slice(-2).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-semibold text-gray-900">
                    User {convo.userId.slice(-6)}
                  </h3>
                  <p className="text-sm text-gray-500 truncate max-w-[180-px] sm:max-w-[300px]">
                    {convo.lastMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-tighter">
                  {formatTime(convo.updatedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};