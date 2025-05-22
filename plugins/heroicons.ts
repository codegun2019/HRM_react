import { defineNuxtPlugin } from "#app"
import * as heroicons from "@heroicons/vue/24/outline"

export default defineNuxtPlugin((nuxtApp) => {
  // Register all Heroicons as global components
  Object.entries(heroicons).forEach(([name, component]) => {
    nuxtApp.vueApp.component(name, component)
  })
})
