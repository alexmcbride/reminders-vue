<template>
  <div class="add">
    <form v-on:submit="save">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-validate="'required'" name="title" type="text" v-model="title" class="form-control">
        <span>{{ errors.first('title') }}</span>
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import * as data from "../data";

export default {
  name: "Add",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    async save(event) {
      event.preventDefault();
      if (await this.$validator.validateAll()) {
        return await data.addOne("/api/reminders", "reminders", {
          title: this.title
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
