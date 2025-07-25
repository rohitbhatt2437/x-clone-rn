import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { CONVERSATIONS, ConversationType } from "@/data/conversations";

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [conversationsList, setConversationsList] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (conversationId: number) => {
    Alert.alert("Delete Conversation", "Are you sure you want to delete the conversation?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setConversationsList((prev) =>
            prev.filter((conv) => conv.id !== conversationId)
          );
        },
      },
    ]);
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationsList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
      Alert.alert(
        "Message sent",
        `Your message has been sent to ${selectedConversation.user.name}`
      );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchInput}>
          <Feather name="search" size={20} color="#657786" />
          <TextInput
            style={styles.textInput}
            placeholder="Search for people and groups"
            placeholderTextColor="#657786"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        style={styles.flex1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationsList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            style={styles.conversationItem}
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversation(conversation.id)}
          >
            <Image
              source={{ uri: conversation.user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.flex1}>
              <View style={styles.nameRow}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.userName}>
                    {conversation.user.name}
                  </Text>
                  {conversation.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color="#1DA1F2"
                      style={{ marginLeft: 4 }}
                    />
                  )}
                  <Text style={styles.userHandle}>
                    @{conversation.user.username}
                  </Text>
                </View>
                <Text style={styles.timeText}>{conversation.time}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.actionFooter}>
        <Text style={styles.actionFooterText}>
          Tap to open • Long press to delete
        </Text>
      </View>

      <Modal visible={isChatOpen} animationType="slide" presentationStyle="pageSheet">
        {selectedConversation && (
          <SafeAreaView style={styles.flex1}>
            <View style={styles.chatHeader}>
              <TouchableOpacity onPress={closeChatModal} style={styles.backBtn}>
                <Feather name="arrow-left" size={24} color="#1DA1F2" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                style={styles.avatarSmall}
              />
              <View style={styles.flex1}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.userName}>
                    {selectedConversation.user.name}
                  </Text>
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>
                <Text style={styles.userHandle}>
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            <ScrollView style={styles.chatScroll} contentContainerStyle={{ padding: 16 }}>
              <Text style={styles.chatStartText}>
                This is the beginning of your conversation with{" "}
                {selectedConversation.user.name}
              </Text>
              {selectedConversation.messages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.messageRow,
                    message.fromUser && styles.messageFromUser,
                  ]}
                >
                  {!message.fromUser && (
                    <Image
                      source={{ uri: selectedConversation.user.avatar }}
                      style={styles.avatarTiny}
                    />
                  )}
                  <View style={[styles.messageWrapper, message.fromUser && styles.alignRight]}>
                    <View
                      style={[
                        styles.messageBubble,
                        message.fromUser
                          ? styles.messageFromUserBubble
                          : styles.messageFromOtherBubble,
                      ]}
                    >
                      <Text
                        style={
                          message.fromUser
                            ? styles.messageTextWhite
                            : styles.messageTextDark
                        }
                      >
                        {message.text}
                      </Text>
                    </View>
                    <Text style={styles.messageTime}>{message.time}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.inputRow}>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Start a message..."
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                style={[
                  styles.sendBtn,
                  {
                    backgroundColor: newMessage.trim()
                      ? "#1DA1F2"
                      : "#CBD5E1",
                  },
                ]}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flex1: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F172A",
  },
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  searchInput: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#F8FAFC",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    marginRight: 12,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userName: {
    fontWeight: "600",
    color: "#0F172A",
  },
  userHandle: {
    color: "#64748B",
    fontSize: 12,
    marginLeft: 4,
  },
  timeText: {
    color: "#64748B",
    fontSize: 12,
  },
  lastMessage: {
    fontSize: 14,
    color: "#64748B",
  },
  actionFooter: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#F8FAFC",
  },
  actionFooterText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },
  backBtn: {
    marginRight: 12,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 999,
    marginRight: 12,
  },
  chatScroll: {
    flex: 1,
  },
  chatStartText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 16,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  messageFromUser: {
    justifyContent: "flex-end",
  },
  avatarTiny: {
    width: 32,
    height: 32,
    borderRadius: 999,
    marginRight: 8,
  },
  messageWrapper: {
    flex: 1,
  },
  alignRight: {
    alignItems: "flex-end",
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 280,
  },
  messageFromUserBubble: {
    backgroundColor: "#1DA1F2",
  },
  messageFromOtherBubble: {
    backgroundColor: "#F1F5F9",
  },
  messageTextWhite: {
    color: "white",
  },
  messageTextDark: {
    color: "#0F172A",
  },
  messageTime: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#F1F5F9",
  },
  inputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});
