<template>
  <div>
    <h2>Reminders</h2>
    <div class="list-group">
      <div v-for="reminder in reminders" v-bind:key="reminder._id" class="list-group-item">
        {{reminder.title}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Reminders",
  props: ["reminders"]
};
</script>

<style scoped>
</style>
