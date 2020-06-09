export default {
  routes: {
    "/en": {
      component: () => import("./pages/EN.svelte"),
    },
    "*": {
      component: () => import("./pages/TR.svelte")
    }
  },
};
