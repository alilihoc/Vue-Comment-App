<template>
  <div>
    <div class="row col">
      <h1>Comments</h1>
    </div>

    <!-- Comments list  -->
    <div
        v-for="comment in comments"
        :key="comment.id"
        class="row col"
    >
      <comment :comment="comment"/>
    </div>

    <!-- Comments error  -->
    <div
        v-if="hasError"
        class="row col mt-2"
    >
      <div
          class="alert alert-danger"
          style="white-space: pre-line;"
          role="alert"
      >
        {{ error }}
      </div>
    </div>

    <!-- Comments success  -->
    <div
        v-if="isSuccess"
        class="row col mt-2"
    >
      <div
          class="alert alert-success"
          role="alert"
      >
        {{ 'Comment has successfully been saved!' }}
      </div>
    </div>

    <!-- Comment form  -->
    <div class="row col">
      <form>
        <div class="form-row mt-2">
          <div class="col-6">
            <input
                v-model="firstname"
                type="text"
                class="form-control"
                placeholder="Fistname"
            >
          </div>
          <div class="col-6">
            <input
                v-model="lastname"
                type="text"
                class="form-control"
                placeholder="Lastname"
            >
          </div>
        </div>

        <div class="form-row mt-2">
          <div class="col-6">
            <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
            >
          </div>
          <div class="col-6">
            <input
                v-model="birth_date"
                type="date"
                class="form-control"
                required="required"
            >
          </div>
        </div>
        <div class="form-row mt-2">
          <div class="col-12">
            <textarea
                v-model="comment"
                type="text"
                class="form-control"
                placeholder="Comment"
            ></textarea>
          </div>
        </div>
        <div class="form-row mt-2">
          <div class="col-12">
            <button
                :disabled="isLoading"
                type="button"
                class="btn btn-primary"
                @click="createComment()"
            >
              {{ isLoading ? 'Loading...' : 'Create' }}
            </button>
          </div>
        </div>
      </form>
    </div>

    <div
        v-if="!isLoading && !hasComments"
        class="row col mt-2"
    >
      No comments!
    </div>

  </div>
</template>

<script>
import Comment from "../components/Comment";

export default {
  name: "Comments",
  components: {
    Comment
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      birth_date: null,
      comment: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["comment/isLoading"];
    },
    hasError() {
      return this.$store.getters["comment/hasError"];
    },
    error() {
      return this.$store.getters["comment/error"];
    },
    isSuccess() {
      return this.$store.getters["comment/isSuccess"];
    },
    hasComments() {
      return this.$store.getters["comment/hasComments"];
    },
    comments() {
      return this.$store.getters["comment/comments"];
    }
  },
  created() {
    this.$store.dispatch("comment/findAll");
  },
  methods: {
    async createComment() {
      const data = {
        email: this.$data.email,
        firstname: this.$data.firstname,
        lastname: this.$data.lastname,
        birthDate: this.$data.birth_date,
        comment: this.$data.comment,
      }

      const result = await this.$store.dispatch("comment/create", data);
      if (result !== null) {
        this.$data.email = ""
        this.$data.firstname = "";
        this.$data.lastname = "";
        this.$data.birth_date = "";
        this.$data.comment = "";
      }
    }
  }
};
</script>