<template>
  <div class="flex flex-col h-screen">
    <!-- top -->
    <div class="bg-gray-100 p-5 flex gap-2">
      <div class="avatar">
        <div class="w-16 rounded-xl">
          <img :src="userSelected.user_avatar_url" alt="Avatar"/>
        </div>
      </div>
      <div class="flex flex-col justify-center">
        <div>{{ userSelected.name }}</div>
        <div>{{ userSelected.user_id }}</div>
      </div>
    </div>
    <!-- Middle -->
     <div class="grow p-5">
      <div v-for="(msg, index) in messagesList" :key="index" :class="msg.type === 'sender' ? 'chat chat-end' : 'chat chat-start'">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img :src="msg.avatar" alt="Avatar" />
          </div>
        </div>
        <div class="chat-header">
          {{ msg.name }}
          <time class="text-xs opacity-50 ml-1">{{ msg.time }}</time> <!-- Optional -->
        </div>
        <div class="chat-bubble" :class="msg.type === 'sender' ? 'chat-bubble-accent' : ''">
          {{ msg.text }}
        </div>
        <div v-if="msg.type === 'sender'" class="chat-footer opacity-50">Sent just now</div>
      </div>
        <!-- <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                :src="userSelected.user_avatar_url"
              />
            </div>
          </div>
          <div class="chat-header">
            {{ userSelected.name }}
            <time class="text-xs opacity-50">12:45</time>
          </div>
          <div class="chat-bubble">I need money ASAP, i sell this macbook cheap for ya. Interested ?</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div class="chat-header">
            You
            <time class="text-xs opacity-50">12:46</time>
          </div>
          <div class="chat-bubble chat-bubble-accent">Sure, let me see.</div>
          <div class="chat-footer opacity-50">Seen at 12:46</div>
        </div> -->
     </div>
     <!-- bottom -->
      <div class="p-5 bg-gray-100 relative">
        <!-- <div v-if="error" role="alert" class="alert alert-error">
          <span>{{ error }}</span>
        </div> -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 transform translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform translate-y-2"
        >
          <div v-if="error" role="alert" class="alert alert-error absolute -top-16 right-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>
        </transition>
        <div class="flex gap-2 items-center">
          <input v-model="newMessage" type="text" placeholder="" class="input input-accent input-lg w-full" @keyup.enter="sendMessage"/>
          <button class="btn btn-accent" @click="sendMessage">Send</button>
        </div>
      </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoomMessageStore } from '../stores/roomMessageStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue'

// import { storeToRefs } from 'pinia';
const route = useRoute()
const messages = useRoomMessageStore()
// const d = storeToRefs(messages)
// console.log(d,'active')

onMounted(() => {
  if (route.params.roomId) {
    messages.setActiveRoomMessage(route.params.roomId)
    initializeMessages()
  }
})

watch(() => route.params.roomId, (newRoomId) => {
  messages.setActiveRoomMessage(newRoomId)
  initializeMessages()
})

const userSelected = computed(() => {
  return messages.roomMessages.find(
    (message) => message.room_id == route.params.roomId
  );
});


const messagesList = ref([])
const newMessage = ref('')
const error = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() != '') {
    messagesList.value.push({
      text: newMessage.value,
      type: "sender",
      name: "You",
      avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
      time: getCurrentTime()
    })
    console.log(messagesList,'ini')
    newMessage.value = ''
  } else {
    error.value = 'Message cannot be empty.';
    const timeoutId = setTimeout(() => {
      error.value = ''
    }, 2500)
    onBeforeUnmount(() => {
      clearTimeout(timeoutId)
    })
    return;
  }
}
const getCurrentTime = () => {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
const initializeMessages = () => {
  if (!userSelected.value) return []

  messagesList.value = [
    {
      text: "I need money ASAP, i sell this macbook cheap for ya. Interested ?",
      type: "receiver",
      name: userSelected.value.name,
      avatar: userSelected.value.user_avatar_url,
      time: getCurrentTime()
    },
    {
      text: "Sure, let me see.",
      type: "sender",
      name: "You",
      avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
      time: getCurrentTime()
    }
  ]
}
// console.log(messagesList)
</script>