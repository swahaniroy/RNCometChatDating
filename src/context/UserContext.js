import React, {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = React.createContext();

const UserContextProvider = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const [gender, setGender] = useState(null);

  const [matchedUsers, setMatchedUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const setUser = useCallback((id, name, gender) => {
    setIsLoading(false);
    setUserId(id);
    setUserName(name);
    setGender(gender);
  }, []);

  const unsetUser = useCallback(() => {
    setUserId(null);
    setIsLoggedIn(false);
  }, []);

  const addMatchedUser = useCallback(
    user_id => {
      setMatchedUsers(matched_user_ids => [...matched_user_ids, user_id]);
    },
    [matchedUsers],
  );

  useEffect(() => {
    if (userId) {
      AsyncStorage.setItem('user_id', userId);
    } else {
      AsyncStorage.removeItem('user_id');
    }
  }, [userId]);

  const value = {
    userId,
    userName,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    isLoading,
    setIsLoading,
    unsetUser,

    gender,

    matchedUsers,
    addMatchedUser,

    chats,
    setChats,
    setCurrentChat,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
//

export {UserContext, UserContextProvider};
