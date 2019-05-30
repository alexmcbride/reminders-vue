<template>
  <div class="home">
    <Reminders v-bind:reminders="reminders"/>
  </div>
</template>

<script>
import Reminders from "../components/Reminders";
import * as data from "../data";

export default {
  name: "home",
  components: {
    Reminders
  },
  data() {
    return {
      reminders: []
    };
  },
  created() {
    this.reminders = await data.getAll("/api/reminders", "reminders");
  }
};
</script>
