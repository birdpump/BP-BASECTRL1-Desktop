<script>
  export let checked = false;

  function toggleSwitch() {
    checked = !checked;
  }
</script>


<style>
    .switch-root {
        box-sizing: border-box;
        padding: 2px;
        display: inline-flex;
        width: 36px;
        cursor: pointer;
        align-items: center;
        border-radius: 9999px;
        transition: background-color 0.2s;
        border: none;
    }

    .switch-root.checked {
        background-color: var(--primary);
    }

    .switch-root.unchecked {
        background-color: var(--secondary);
    }

    .switch-thumb {
        background-color: #020817;
        display: block;
        height: 16px;
        width: 16px;
        border-radius: 9999px;
        transition: transform 0.2s;
    }

    .switch-thumb.checked {
        transform: translateX(16px);
    }

    .switch-thumb.unchecked {
        transform: translateX(0);
    }
</style>

<button
  class={`switch-root ${checked ? 'checked' : 'unchecked'}`}
  on:click={toggleSwitch}>
  <span class={`switch-thumb ${checked ? 'checked' : 'unchecked'}`}></span>
</button>