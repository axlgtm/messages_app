<template>
  <div class="flex h-screen w-screen">
    <!-- Sidebar (Chat List) -->
    <div class="w-full md:w-sm border-r overflow-y-auto bg-gray-100">
      <!-- Replace with chat list -->
      <!-- <div class="p-4 font-semibold">Messages</div> -->
       <RoomMessagesList />
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1">
      <!-- Replace with chat content -->
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoomMessageStore } from "./stores/roomMessageStore";
import data from "./assets/list_rooms.json";
import RoomMessagesList from "./components/RoomMessagesList.vue";
import { RouterView } from 'vue-router'

const roomMessageStore = useRoomMessageStore()

onMounted(() => {
  roomMessageStore.setRoomMessages(data.data.customer_rooms)
})

</script>