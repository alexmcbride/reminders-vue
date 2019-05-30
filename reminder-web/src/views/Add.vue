<template>
  <div class="row">
    <div class="col-6 offset-3">
      <form v-on:submit="save">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-validate="'required'"
            name="title"
            type="text"
            v-model="title"
            class="form-control"
          >
          <span class="field-error">{{ errors.first('title') }}</span>
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
    </div>
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
      const result = await this.$validator.validateAll();
      if (result) {
        await data.addOne("/api/reminders", "reminders", {
          title: this.title
        });
      }
    }
  }
};
</script>

<style scoped>
  .field-error {
    color: #f00;
  }
</style>
