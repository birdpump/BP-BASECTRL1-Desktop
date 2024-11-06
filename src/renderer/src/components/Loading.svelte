<script>
  import { draw, fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { onMount } from "svelte";

  let condition = false;


  onMount(() => {
    condition = true;
  });

  let showText1 = false;
  let showText2 = false;

  onMount(() => {
    showText1 = true;
    const interval1 = setTimeout(() => {
      showText1 = false;
    }, 2400);

    const interval2 = setTimeout(() => {
      showText2 = true;
    }, 3300);
  });
</script>

<style>
    svg {
        display: block;
        height: 400px;
        width: 400px;
    }

    .svg-cont {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .bottom-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 40px;
        font-family: "Montserrat", sans-serif;
        color: rgba(255, 255, 255, 0.37);
        font-size: 16px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pulse {
        display: inline-block;
        animation: pulse ease-in-out infinite;
        animation-duration: 4s;
        animation-delay: 2.2s;
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .color-pulse {
        animation: colorPulse ease-in-out infinite;
        animation-duration: 1.5s;
        animation-delay: 0s;
    }

    @keyframes colorPulse {
        0%, 100% {
            color: rgba(255, 255, 255, 0.37);
        }
        50% {
            color: white;
        }
    }
</style>

<div class="loading-cont">

  <div class="svg-cont">
    {#if condition}
      <svg class="logo pulse" viewBox="0 0 1175 825" xmlns="http://www.w3.org/2000/svg">

        <g id="_0" serif:id="0" transform="matrix(1,0,0,1,214.015,494.108)">
          <g transform="matrix(1,0,0,1,-214.015,-494.108)">
            <path
              d="M228.643,550.801L371.173,53.741L430.15,53.741L367.014,273.925L596.07,273.925L516.677,550.801L228.643,550.801ZM303.877,494.108L473.956,494.108L520.836,330.618L350.757,330.618L303.877,494.108Z"
              style="fill:white;" in:fade="{{duration: 700, delay: 1400}}" />
          </g>
          <g>
            <g transform="matrix(1,0,0,1,-214.015,-494.108)">
              <path
                d="M228.643,550.801L371.173,53.741L430.15,53.741L367.014,273.925L596.07,273.925L516.677,550.801L228.643,550.801Z"
                style="fill:none;stroke:white;stroke-width:6px;stroke-miterlimit:1.5;"
                in:draw="{{duration: 2000, easing: quintOut}}" />
            </g>
            <g transform="matrix(1,0,0,1,-214.015,-494.108)">
              <path d="M303.877,494.108L350.757,330.618L520.836,330.618L473.956,494.108L303.877,494.108Z"
                    style="fill:none;stroke:white;stroke-width:6px;stroke-miterlimit:1.5;"
                    in:draw="{{duration: 2000, delay: 200, easing: quintOut}}" />
            </g>
          </g>
          <g transform="matrix(1,0,0,1,-214.015,-494.108)">
            <path
              d="M515.311,770.984L657.84,273.925L945.874,273.925L866.481,550.801L637.425,550.801L574.288,770.984L515.311,770.984ZM653.681,494.108L823.76,494.108L870.64,330.618L700.561,330.618L653.681,494.108Z"
              style="fill:white;" in:fade="{{duration: 700, delay: 1400}}" />
          </g>
          <g>
            <g transform="matrix(1,0,0,1,-214.015,-494.108)">
              <path
                d="M515.311,770.984L657.84,273.925L945.874,273.925L866.481,550.801L637.425,550.801L574.288,770.984L515.311,770.984Z"
                style="fill:none;stroke:white;stroke-width:6px;stroke-miterlimit:1.5;"
                in:draw="{{duration: 2000, easing: quintOut}}" />
            </g>
            <g transform="matrix(1,0,0,1,-214.015,-494.108)">
              <path d="M653.681,494.108L700.561,330.618L870.64,330.618L823.76,494.108L653.681,494.108Z"
                    style="fill:none;stroke:white;stroke-width:6px;stroke-miterlimit:1.5;"
                    in:draw="{{duration: 2000, delay: 200, easing: quintOut}}" />
            </g>
          </g>
        </g>
      </svg>
    {/if}

    <div class="bottom-text">
      {#if showText1}
        <div in:fade="{{ duration: 1000, delay: 1200}}" out:fade="{{ duration: 800}}">
          System Developed by birdpump
        </div>
      {/if}
      {#if showText2}
        <div in:fade="{{ duration: 2000}}" out:fade="{{ duration: 2000}}" class="">
          Waiting for Base Station Communication Link
        </div>
      {/if}
    </div>

  </div>
</div>
