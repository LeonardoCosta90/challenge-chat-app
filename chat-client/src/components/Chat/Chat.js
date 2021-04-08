import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

const ENDPOINT = 'localhost:5000';

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

    socket = io.connect('http://localhost:5000', connectionOptions);
    //socket = io(ENDPOINT);

    //setRoom(room);
    //setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
