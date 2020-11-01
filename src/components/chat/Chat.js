/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-confusing-arrow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unknown-property */

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';

import './Chat.css';
import translate from '../../translations/translate';
import { unsetUserAction } from '../../store/actions/authActions';
import useDarkMode from '../../hooks/useDarkMode';

const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [currentChannel, setCurrentChannel] = useState('');
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const ThemeSwitcher = useDarkMode();

  const chooseChannel = (s, name) => {
    setMessages('');

    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const promise = axios.get(`https://unptitfive-server.herokuapp.com/message/${name}`, config);
    promise.then(
      (res) => {
        if (res.data) {
          const str = res.data.map((e) => (
            <div className="message">
              <div>
                <b>{e.user.username}</b> : {e.message}
              </div>
            </div>
          ));
          setMessages((message) => [...message, str]);
          window.scrollTo(0, document.body.scrollHeight);
        }
        setCurrentChannel(name);
        s.emit('join', name);
      },
    );
  };

  const s = io('https://unptitfive-server.herokuapp.com/', {
    query: {
      token: Cookies.get('token'),
      lang: navigator.languages,
    },
  });

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const promise = axios.get('https://unptitfive-server.herokuapp.com/channel', config);
    promise.then(
      (res) => {
        setChannels(res.data);
        if (res.data) {
          chooseChannel(s, res.data[0].name);
        }
      },
    );

    setSocket(s);

    s.on('info', (data) => {
      const divStyle = {
        color: data.color,
        fontStyle: 'italic',
      };
      const msg = <div className="info" style={divStyle}><b>{data.message}</b></div>;
      let scrollAtBottom = false;
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        scrollAtBottom = true;
      }
      setMessages((message) => [...message, msg]);
      if (scrollAtBottom) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });

    s.on('message', (data) => {
      const msg = (
        <div className="message">
          <div>
            <b>{data.username}</b> : {data.message}
          </div>
        </div>
      );
      let scrollAtBottom = false;
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        scrollAtBottom = true;
      }
      setMessages((message) => [...message, msg]);
      if (scrollAtBottom) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    socket.emit('message', input);
    setInput('');
    e.preventDefault();
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const disconnectUser = () => {
    if (Cookies.get('isConnected') && Cookies.get('token')) {
      dispatch(unsetUserAction());
      history.push('/authentification');
    }
  };

  return (
    <div className="chat">
      <div className="channel-left">
        <div className="title">{translate('CHANNEL', navigator.languages)}</div>
        <ul className="channel-list">
          {channels.map((elem, index) => ( // eslint-disable-line
            <li
              className={(elem.name === currentChannel) ? 'current-channel' : ''}
              onClick={() => (elem.name !== currentChannel) ? chooseChannel(socket, elem.name)
                : null}
            >
              {elem.name}
            </li>
          ))}
        </ul>
        <div className="theme-switcher">{ThemeSwitcher}</div>
        <div className="logout" onClick={() => disconnectUser()}>{translate('LOGOUT', navigator.languages)}</div>
      </div>
      <div className="chat-area">
        <div className="message-container">
          {messages}
        </div>
        <form onSubmit={onSubmit}>
          <input
            className="input-message"
            type="text"
            value={input}
            onChange={onChange}
            autofocus="true"
            placeholder={translate('ENTER_MESSAGE', navigator.languages)}
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
