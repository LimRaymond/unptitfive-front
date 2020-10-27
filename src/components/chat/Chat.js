import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import io from 'socket.io-client';

import { getCurrentUserAction } from '../../store/actions/authActions';
import { getAllChannelsAction } from '../../store/actions/chatActions';
import Cookies from 'js-cookie';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chatsState, setChats] = useState([]);
  const [message, setMessage] = useState({ message: '', name: ''});

  const socket = io('https://unptitfive-server.herokuapp.com/', {
    query: {
      token: Cookies.get('token'),
      lang: navigator.languages
    }
  });

  socket.on('info', (data) => {
    renderMessage(data.message);
    console.log(data.message);
  });
  
  socket.on('message', (data) => {
    console.log(data.username, data.message);
   });

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + Cookies.get('token'),
      },
    };
    const promise = axios.get('https://unptitfive-server.herokuapp.com/channel', config);
    promise.then(
      (res) => {
        setChats(res.data);
      }
    );
  }, []);

  console.log(chatsState);
  const chooseChannel = (name) => {
    socket.emit('join', name);
  }

  const renderMessage = (message) => {
    console.log(message);
    return (
      <h1 name="message">
        {message}
      </h1>
    );
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {chatsState.map((elem, index) => (
          <ListItem key={index} button onClick={() => chooseChannel(elem.name)}>
            {elem.name}
          </ListItem>
        ))}
      </List>
      <div>
        {renderMessage()}
      </div>
    </div>

  );
};

export default Chat;
