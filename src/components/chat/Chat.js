import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUserAction } from '../../store/actions/authActions';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUserAction);
  });

  return (
    <div>
      Bienvenue sur le chat
    </div>
  );
};

export default Chat;
