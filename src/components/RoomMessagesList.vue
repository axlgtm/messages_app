<script setup>
import { computed, onMounted, watch } from "vue";
import { useRoomMessageStore } from "../stores/roomMessageStore";
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const activeRoomId = ref(null);

const roomMessageStore = useRoomMessageStore()
const router = useRouter()
const route = useRoute()

const roomMessage = computed(() => roomMessageStore.roomMessages)

const clickMessage = (roomMessageId) => {
  roomMessageStore.setActiveRoomMessage(roomMessageId)
  router.push(`/message/${roomMessageId}`)
  activeRoomId.value = roomMessageId;
}

onMounted(() => {
  activeRoomId.value = route.params.roomId
  console.log('masuk')
})

watch(() => route.params.roomId, (newId) => {
  activeRoomId.value = newId;
});
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
      :class="[
        'gap-2 flex p-3 shadow-md mb-2 bg-white rounded cursor-pointer border-4 border-transparent',
        room.room_id == activeRoomId ? ' !border-teal-300': ''
      ]"
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