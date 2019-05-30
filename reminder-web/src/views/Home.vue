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
    data.getAll("/api/reminders", "reminders")
      .then(reminders => {
        this.reminders = reminders;
      })
      .catch(err => {
        // eslint-disable-next-line
        console.log("Error: " + err);
      });
  }
};
</script>
