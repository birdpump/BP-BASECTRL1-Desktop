<script>

  import Switch from "./base/Switch.svelte";

  let switchVal;

  $: window.api.sendLedStatus(switchVal);

</script>

<style>

</style>

<Switch bind:checked={switchVal}/>
<!--<div>Que pro</div>-->