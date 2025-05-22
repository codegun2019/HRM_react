<template>
  <div 
    :class="[
      'animate-pulse bg-gray-200 rounded relative overflow-hidden',
      className
    ]"
  >
    <div class="shimmer-effect"></div>
  </div>
</template>

<script setup>
defineProps({
  className: {
    type: String,
    default: 'h-4 w-full'
  }
})
</script>

<style scoped>
.shimmer-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
