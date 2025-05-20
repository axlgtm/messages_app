<script setup>
import { computed } from "vue";
import { useRoomMessageStore } from "../stores/roomMessageStore";
import { useRouter } from 'vue-router';

const roomMessageStore = useRoomMessageStore()
const router = useRouter()

const roomMessage = computed(() => roomMessageStore.roomMessages)

const clickMessage = (roomMessageId) => {
  roomMessageStore.setActiveRoomMessage(roomMessageId)
  router.push(`/message/${roomMessageId}`)
}
// const selectRoomMessage = (roomMessageId) => {
//   roomMessageStore.setActiveRoomMessage(roomMessageId)
// }
</script>

<template>
  <div class="px-2">
    <div class="font-bold text-lg p-10">Messages</div>
    <div
      v-for="room in roomMessage"
      :key="room.room_id"
      class="gap-2 flex border-b-slate-300 p-3 shadow-md mb-2 bg-white rounded cursor-pointer"
      @click="clickMessage(room.room_id)"
    >

      <div class="avatar">
        <div class="w-16 rounded-xl">
          <img :src="room.user_avatar_url" alt="Avatar"/>
        </div>
      </div>
      <div>
        <div>{{ room.name }}</div>
        <p class="md:truncate md:w-64">{{ room.last_comment_text }}</p>
      </div>

    </div>
  </div>
</template>