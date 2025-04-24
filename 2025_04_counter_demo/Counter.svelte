<script>
  let {initCount=0} = $props()
  let count = $state(+initCount)
  const increment = () => {
    count += 1
  }
</script>



<button onclick={increment}>
  count is {count}
</button>
