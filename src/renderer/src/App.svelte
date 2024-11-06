<script>
  import Loading from "./components/Loading.svelte";
  import Led from "./components/Led.svelte";

  import { onMount } from "svelte";


  let selected = Loading;

  onMount(() => {
    const interval1 = setTimeout(() => {
      selected = Led;
    }, 10000);

  });
</script>
<style>
    .main-div {
        /*background: #32363f;*/
    }
</style>

<div class="main-div">
  <svelte:component this={selected} />
</div>