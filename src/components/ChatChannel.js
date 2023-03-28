import React, { useState, useEffect } from "react";
import "./ChatList.css";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    // Create a new WebSocket connection when the component mounts.
    const ws = new WebSocket("ws/chat/http://127.0.0.1:8000/ws/chatroom/1/");

    // Set up event listeners for the WebSocket.
    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    ws.onclose = () => console.log("WebSocket disconnected");

    // Save the WebSocket connection to state so we can access it later.
    setWebsocket(ws);

    // Clean up the WebSocket connection when the component unmounts.
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    // Send a message over the WebSocket connection.
    const message = { message: messageInput };
    websocket.send(JSON.stringify(message));
    setMessageInput("");
  };

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.message}</p>
        </div>
      ))}
      <input
        type="text"
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
