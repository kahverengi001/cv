<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @import "css/tailwind.css";
</style>

<script>
  import Router from "routve";
  import RouterConfig from "./router.config";
  import { addMessages, init } from "svelte-i18n";

  import tr from "./lang/tr.json";
  import en from "./lang/en.json";

  addMessages("tr", tr);
  addMessages("en", en);

  init({
    fallbackLocale: "en",
    initialLocale: "en",
  });
</script>

<Router config="{RouterConfig}" />
