import { Send, ArrowLeft, Paperclip, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { mockTailors } from '../data';
import { useApp } from '../context';

export const Chat = () => {
  const { setCurrentView, selectedTailorId } = useApp();
  const [selectedConversation, setSelectedConversation] = useState(
    selectedTailorId || '1'
  );
  const [message, setMessage] = useState('');

  const conversations = mockTailors.map((tailor) => ({
    id: tailor.id,
    name: tailor.name,
    avatar: tailor.avatar,
    lastMessage: 'Looking forward to working on your custom design!',
    lastMessageTime: '2h ago',
    unread: tailor.id === '1' ? 2 : 0,
  }));

  const mockMessages = [
    {
      id: '1',
      senderId: 'customer',
      content: "Hi! I'm interested in a custom wedding dress. Do you work with lace?",
      timestamp: '10:30 AM',
      isOwn: true,
    },
    {
      id: '2',
      senderId: selectedConversation || '1',
      content:
        "Hello! Yes, I specialize in wedding dresses and work with various types of lace. I'd love to help you create your dream dress!",
      timestamp: '10:32 AM',
      isOwn: false,
    },
    {
      id: '3',
      senderId: 'customer',
      content: 'That sounds perfect! What information do you need from me to get started?',
      timestamp: '10:35 AM',
      isOwn: true,
    },
    {
      id: '4',
      senderId: selectedConversation || '1',
      content:
        "I'll need your measurements, preferred style inspiration photos, and any specific details you want included. We can also schedule a video call to discuss everything in detail.",
      timestamp: '10:38 AM',
      isOwn: false,
    },
  ];

  const selectedTailor = mockTailors.find((t) => t.id === selectedConversation);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                selectedConversation === conv.id
                  ? 'bg-emerald-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={conv.avatar}
                  alt={conv.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedTailor ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-4">
              <button
                onClick={() => setCurrentView('browse')}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <img
                src={selectedTailor.avatar}
                alt={selectedTailor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{selectedTailor.name}</h3>
                <p className="text-sm text-gray-600">{selectedTailor.location}</p>
              </div>
              <button
                onClick={() => {
                  setCurrentView('tailor-profile');
                }}
                className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors"
              >
                View Profile
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      msg.isOwn
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        msg.isOwn ? 'text-emerald-100' : 'text-gray-500'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-end gap-2">
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    rows={1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};
