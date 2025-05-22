import { defineNuxtPlugin } from "#app"
import ToastProvider from "~/components/ToastProvider.vue"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("ToastProvider", ToastProvider)
})
