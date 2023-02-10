<template>
  <div class="card w-100 mt-2">

    <div class="card-body">
      <div class="card-body--user">
        {{ comment.firstname + ' ' + comment.lastname }}
      </div>

      <div class="card-body--comment">
        {{ comment.comment }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true
    },
  }
}
</script>