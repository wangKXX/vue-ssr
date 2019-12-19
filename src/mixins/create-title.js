function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  }
}


const clientMixinTitle = {
  mounted() {
    const title = getTitle(this);
    console.log(title, 'title client')
    title && (document.title = title);
  }
}

const serveMixinTitle = {
  created() {
    const title = getTitle(this);
    console.log(title, 'title serve')
    title && (this.$ssrContext.title = title);
  }
}

export default process.env.plat === 'node' ? serveMixinTitle : clientMixinTitle;