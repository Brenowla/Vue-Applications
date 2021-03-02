<template>
  <q-page class="container full-height">
    <div>
      <ConversationArea />
    </div>
    <div class="column" v-if="1 === 1">
      <Top-Bar :title="'Marcelo vale'"></Top-Bar>
      <Chat-Area></Chat-Area>
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

export default {
  name: "MainLayout",
  data() {
    return {};
  },
  components: {
    Empty,
    ConversationArea,
    TopBar,
    ChatArea,
    MessageBar,
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