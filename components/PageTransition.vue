<template>
  <transition
    name="page"
    mode="out-in"
    @before-leave="beforeLeave"
    @enter="enter"
    @after-enter="afterEnter"
  >
    <slot />
  </transition>
</template>

<script setup>
const beforeLeave = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateY(10px)'
}

const enter = (el, done) => {
  setTimeout(() => {
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
    done()
  }, 50)
}

const afterEnter = (el) => {
  el.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
}
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
