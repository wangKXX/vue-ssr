<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="(num, key) in data" :key="`${key}-key`">{{num}}</div>
  </div>
</template>
<script>
import createTitle from '../mixins/create-title'
export default {
  mixins: [createTitle],
  title() {
    return 'About';
  },
  asyncData({ store, route }) {
    console.log('about', '预取')
    store.dispatch('fetchAboutData')
  },
  mounted() {
    console.log('create');
  },
  computed: {
    data() {
      return this.$store.state.aboutData;
    }
  }
}
</script>
