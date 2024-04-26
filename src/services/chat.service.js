import { ChatManager } from "../Dao/db/managers/chatManagerDB.js"

const chatManager = new ChatManager()

export const getChatMessages = async () => {
    return (await chatManager.getChat(1)).data.messages // Assuming you pass chatId as argument
}

export const addMessageToChat = async (data) => {
    await chatManager.addMessageToChat(1, data) // Assuming you pass chatId as argument
}