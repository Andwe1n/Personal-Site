<script>
  import { onMount } from 'svelte';

  export let paused = false;
  let canvas;

  onMount(() => {
    let disposed = false;
    let cleanup;
    import('./storm.js').then(({ createStorm }) => {
      if (!disposed) cleanup = createStorm(canvas, () => paused);
    }).catch(error => {
      console.error('Storm background could not initialize:', error);
    });
    return () => { disposed = true; cleanup?.(); };
  });
</script>

<canvas id="scene" bind:this={canvas} aria-hidden="true"></canvas>

<style>
  canvas {
    position: fixed;
    inset: 0;
    display: block;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background: #030303;
  }
</style>
