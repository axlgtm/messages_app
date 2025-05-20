import { defineStore } from "pinia";

export const useRoomMessageStore = defineStore('roomMessage', {
  state: () => ({
    roomMessages: [],
    activeRoomMessage: null
  }),
  actions: {
    setRoomMessages(roomMessages) {
      this.roomMessages = roomMessages
    },
    setActiveRoomMessage(roomMessageId) {
      this.activeRoomMessage = roomMessageId
    }
  }
})