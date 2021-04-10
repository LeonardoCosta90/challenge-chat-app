import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    var connectionOptions = {
      'force new connection': true,
      reconnectionAttempts: 'Infinity',
      timeout: 10000,
      transports: ['websocket'],
    };

    socket = io.connect(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name);
    console.log(socket);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
