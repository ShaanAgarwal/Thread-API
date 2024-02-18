import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { UserType } from "../UserContext";
import axios from "axios";
import { backendURL } from "../backendURL";

const DEFAULT_USER_IMAGE =
  "https://cdn-icons-png.flaticon.com/128/149/149071.png";

const FollowButton = ({ onPress, label }) => (
  <Pressable onPress={onPress} style={styles.followButton}>
    <Text style={styles.followButtonText}>{label}</Text>
  </Pressable>
);

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);
  const [requestSent, setRequestSent] = useState(false);

  const sendFollow = async (currentUserId, selectedUserId) => {
    try {
      const response = await axios.post(`${backendURL}/api/user/follow`, {
        currentUserId,
        selectedUserId,
      });

      if (response.status === 200) {
        setRequestSent(true);
        window.location.reload(); // Assuming this is in a web context
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  const handleUnfollow = async (targetId) => {
    try {
      const response = await axios.post(`${backendURL}/api/user/unfollow`, {
        loggedInUserId: userId,
        targetUserId: targetId,
      });

      if (response.status === 200) {
        setRequestSent(false);
        window.location.reload(); // Assuming this is in a web context
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    // Reset the requestSent state whenever the userId or item prop changes
    setRequestSent(false);
  }, [userId, item]);

  const { _id, name } = item;

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.userImage} source={{ uri: DEFAULT_USER_IMAGE }} />
        <Text style={styles.userName}>{name}</Text>
      </View>

      {requestSent || item?.followers?.includes(userId) ? (
        <FollowButton onPress={() => handleUnfollow(_id)} label="Following" />
      ) : (
        <FollowButton onPress={() => sendFollow(userId, _id)} label="Follow" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  userName: {
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  followButton: {
    borderColor: "#D0D0D0",
    borderWidth: 1,
    padding: 10,
    marginLeft: 10,
    width: 100,
    borderRadius: 8,
  },
  followButtonText: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default User;
