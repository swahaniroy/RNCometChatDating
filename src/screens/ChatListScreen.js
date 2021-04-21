import React, { useContext, useEffect, useCallback } from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

import { UserContext } from "../context/UserContext";

const chatsCollection = firestore().collection("chats");

const ChatListScreen = ({ navigation }) => {
  const { userId, chats, setChats, setCurrentChat } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const chatsQuerySnapshot = await chatsCollection
        .where("user_A_id", "==", userId)
        .get();

      if (chatsQuerySnapshot.size) {
        const items = [];
        chatsQuerySnapshot.forEach((documentSnapshot) => {
          const chats_data = documentSnapshot.data();
          items.push({
            id: chats_data.user_B_id,
            name: chats_data.user_B_name,
          });
        });

        setChats(items);
      }
    })();
  }, [userId]);

  const renderItems = useCallback(() => {
    return chats.map((item) => {
      return (
        <List.Item
          key={item.id}
          title={item.name}
          left={(props) => <List.Icon {...props} icon="chat" />}
          onPress={() => navigateToChat(item)}
        />
      );
    });
  }, [chats]);

  const navigateToChat = useCallback((item) => {
    setCurrentChat(item);
    navigation.push("Messages", {
      matchId: item.id,
      userName: item.name,
    });
  }, []);

  return <View>{renderItems()}</View>;
};

export default ChatListScreen;
