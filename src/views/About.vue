<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import createTitle from '../mixins/create-title'
export default {
  mixins: [createTitle],
  title() {
    return 'About';
  }
}
</script>
