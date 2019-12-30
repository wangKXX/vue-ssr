<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-for="(num, key) in data" :key="`${key}-num`">{{ num }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import createTitle from "../mixins/create-title";
export default {
  name: "home",
  mixins: [createTitle],
  title: "Home",
  components: {
    HelloWorld
  },
  asyncData({ store, route }) {
    console.log('home', '预取')
    store.dispatch('fetchData')
  },
  computed: {
    data() {
      return this.$store.state.data;
    }
  },
  beforeCreate() {},
  created() {}
};
</script>
