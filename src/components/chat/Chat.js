import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState('');
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState({});

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
      },
    };
    const promise = axios.get('https://unptitfive-server.herokuapp.com/channel', config);
    promise.then(
      (res) => {
        setChannels(res.data);
        if (res.data) {
          chooseChannel(s, res.data[0].name);
        }
      }
    );

    const s = io('https://unptitfive-server.herokuapp.com/', {
      query: {
        token: Cookies.get('token'),
        lang: navigator.languages
      }
    });

    setSocket(s);

    s.on('info', (data) => {
      const divStyle = {
          color: data.color,
          fontStyle: 'italic',
      };
      const msg = <div className='info' style={divStyle}><b>{data.message}</b></div>;
      let scrollAtBottom = false;
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        scrollAtBottom = true;
      }
      setMessages(messages => [...messages, msg]);
      if (scrollAtBottom) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  
    s.on('message', (data) => {
      console.log('message received');
      const msg = <div className='message'><div><b>{data.username}</b> : {data.message}</div></div>;
      let scrollAtBottom = false;
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        scrollAtBottom = true;
      }
      setMessages(messages => [...messages, msg]);
      if (scrollAtBottom) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

  }, []);

  const onSubmit = e => {
    console.log('socket.emit', input);
    socket.emit('message', input);
    setInput('');
    e.preventDefault();
  };

  const onChange = e => {
    setInput(e.target.value);
  };

  const chooseChannel = (s, name) => {
    setMessages('');

    let config = {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
      },
    };
    const promise = axios.get('https://unptitfive-server.herokuapp.com/message/' + name, config);
    promise.then(
      (res) => {
        if (res.data) {
          const str = res.data.map((e) => {
            return (<div className='message'><div><b>{e.user.username}</b> : {e.message}</div></div>);
          });
          setMessages(messages => [...messages, str]);
          window.scrollTo(0, document.body.scrollHeight);
        }
        setCurrentChannel(name);
        s.emit('join', name);
      }
    );
  }

  return (
    <div className='chat'>
      <div className='channel-left'>
        <div className='title'>Channels</div>
        <ul className='channel-list'>
          {channels.map((elem, index) => (
            <li className={(elem.name === currentChannel) ? 'current-channel' : ''} onClick={() => (elem.name !== currentChannel) ? chooseChannel(socket, elem.name) : null}>
              {elem.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='chat-area'>
        <div className='message-container'>
          {messages}
        </div>
        <form onSubmit={onSubmit}>
          <input type='text' value={input} onChange={onChange} autofocus='true' placeholder='Votre message...' />
        </form>
      </div>
    </div>
  );
};

export default Chat;
