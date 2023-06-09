import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatList.css";

const chatroom_id = 1;
const socket = new WebSocket(`ws://localhost:8000/ws/chatroom/${chatroom_id}/`);
socket.onmessage = function (event) {
  const message = JSON.parse(event.data);
  // handle message here
};
// send message using socket.send() method

function ChatList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/chatrooms/1/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const chatBox = data.map((element) => {
    return (
      <li key={element.id}>
        <div className="chat-card">
          <h4>@{element.user.username}</h4>
          <div className="chat-message">
            <p>{element.text}</p>
          </div>
        </div>
      </li>
    );
  });

  console.log(data);
  return (
    <div>
      <h1>Baseball</h1>
      {chatBox}
    </div>
  );
}

export default ChatList;
