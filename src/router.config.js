export default {
  routes: {
    "/tr": {
      component: () => import("./pages/TR.svelte"),
    },
    "*": {
      component: () => import("./pages/EN.svelte")
    }
  },
};
