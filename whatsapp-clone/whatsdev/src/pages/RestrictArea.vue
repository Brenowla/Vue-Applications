<template>
  <q-page class="container full-height">
    <div>
      <ConversationArea :users="users" @selectedItem="setCurrentItem" />
    </div>
    <div class="column" v-if="nameConversation">
      <Top-Bar :title="nameConversation"></Top-Bar>
      <Chat-Area
        :currentUser="selectedItem"
        :newMessages="newMessages"
      ></Chat-Area>
      <MessageBar></MessageBar>
    </div>
    <Empty v-else />
  </q-page>
</template>

<script>
import Empty from "../components/Empty/Index";
import ConversationArea from "../components/ConversationArea/Index";
import TopBar from "../components/TopBar/Index";
import ChatArea from "../components/ChatArea/Index";
import MessageBar from "../components/MessageBar/Index";
import api from "../services/api";
import { notify } from "../utils";
import { socket } from "../services/socket";

export default {
  name: "MainLayout",
  data() {
    return {
      users: [],
      newMessages: "",
      selectedItem: null,
      nameConversation: "",
    };
  },
  components: {
    Empty,
    ConversationArea,
    TopBar,
    ChatArea,
    MessageBar,
  },
  methods: {
    async setCurrentItem({ id, email }) {
      this.selectedItem = id;
      await api
        .get(`user/${email}`)
        .then((response) => {
          this.nameConversation = response.data.name;
        })
        .catch(() => {
          this.nameConversation = "Novo usuário";
        });
    },
  },
  created() {
    const receiver = localStorage.getItem("receiver");
    socket.on(receiver, (message) => {
      const arr = [];
      this.users.forEach((item) => {
        if (item.id === message.user_id) {
          item.newmessage = true;
        }
        arr.push(item);
      });
      this.newMessages = message.id;
      this.users = arr;
    });
  },
  async mounted() {
    await api
      .get("users")
      .then((response) => {
        this.users = response.data;
      })
      .catch(() => {
        notify("negative", "Falha ao listar usuários");
      });
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  overflow: hidden;
  min-width: 1200px;
}
</style>