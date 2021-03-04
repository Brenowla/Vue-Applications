<template>
  <div class="message-bar row items-center">
    <div class="q-mx-md">
      <q-btn
        round
        dense
        unelevated
        icon="lar la-grin-alt"
        text-color="grey"
        size="15px"
        class="q-mr-sm"
      >
      </q-btn>
      <q-btn
        round
        dense
        unelevated
        icon="las la-paperclip"
        text-color="grey"
        size="15px"
        class="q-mr-sm"
      >
      </q-btn>
    </div>
    <q-input
      rounded
      outlined
      v-model="text"
      label="Digite uma mensagem"
      bg-color="white"
      class="input-message"
      @keyup.enter="sendMessage()"
    >
    </q-input>
    <q-btn
      round
      dense
      unelevated
      :icon="text ? 'send' : 'fas fa-microphone'"
      text-color="grey"
      size="15px"
      class="q-mr-sm"
      @click="sendMessage()"
    >
    </q-btn>
  </div>
</template>

<script>
import api from "../../services/api";
export default {
  name: "MessageBar",
  props: ["currentUser"],
  data() {
    return {
      text: "",
      myId: localStorage.getItem("myId"),
    };
  },
  methods: {
    async sendMessage() {
      if (this.text !== "" && this.currentUser) {
        await api
          .post("message", {
            text: this.text,
            user_destination: this.currentUser,
            user_send: this.myId,
          })
          .then((response) => {
            this.$emit("reload", { messageId: response.data.id });
            this.text = "";
          })
          .catch((err) => {
            notify("negative", err.response.data.message);
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message-bar {
  height: 62px;
  background-color: $grey-whats;

  .input-message {
    width: 75%;
  }
}
</style>