<script>
  import Counter from './Counter.svelte'
</script>

<svelte:head>
  <title>Counter Demo</title>
</svelte:head>

<main>
  <h1>Counter Demo</h1>
  <Counter initCount=123 />
</main>

<style>
  main{
    background: #0ff;
  }
</style>
