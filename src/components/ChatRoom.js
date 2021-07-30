import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const ChatRoom = (props) => {
  const { match: { params: { roomId } } } = props;

  const [ room, setRoom ] = useState();
  const [ messages, setMessages ] = useState();
  
  useEffect(() => {
    const db = getDatabase();
    const roomRef = ref(db, `Rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      setRoom(data);
    });
  }, [roomId])

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, `Messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const newDataArray = [];
      for (let key in data) {
        if (roomId === data[key].room) {
          newDataArray.push({
            key,
            room: data[key].room,
            content: data[key].content,
            sentBy: data[key].sentBy,
            timestamp: data[key].timestamp,
          })
        }
      }
      console.log(newDataArray);
      setMessages(newDataArray);
    });
  }, [roomId])

  return (
    <>
      {
        room
        ? <>
            <h2>{room.name}</h2>
            <h3>{room.description}</h3>
            {
              messages
              ? messages.map((message) => {
                  return <p key={message.key}>{`${message.timestamp} - ${message.sentBy}: ${message.content}`}</p>
                })
              : null
            }
            
          </>
        : null
      }
    </>
  )
};


export default ChatRoom;