<script>
  import { onMount } from 'svelte'
  import { hsl } from 'd3'

  let canvas
  let ctx
  let time = 0

  let width = window.innerWidth
  let height = window.innerHeight
  let lines = Array(1000).fill().map(() => ({
    points: [{x: width/2, y: height/2}], dx: 0, dy: 0
  }))

  function dist(a, b){ return Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2) }

  onMount(() => {

    let s = window.devicePixelRatio || 1
    canvas.width = width*s
    canvas.height = height*s
    canvas.style = `width: ${width}px; height: ${height}px`

    ctx = canvas.getContext('2d')
    ctx.scale(s, s)

    const WALL_MARGIN = 10

    function draw() {
      time += 0.01
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      ctx.fillRect(0, 0, width, height)

      lines.forEach((line, i) => {
        // Update velocity and check bounds
        const point = line.points.at(-1)
        point.x = Math.min(Math.max(WALL_MARGIN, point.x), width - WALL_MARGIN)
        point.y = Math.min(Math.max(WALL_MARGIN, point.y), height - WALL_MARGIN)
        if (point.x === WALL_MARGIN || point.x === width - WALL_MARGIN) line.dx = 0
        if (point.y === WALL_MARGIN || point.y === height - WALL_MARGIN) line.dy = 0

        // Add random acceleration
        line.dx += (Math.random() - 0.5)*.1
        line.dy += (Math.random() - 0.5)*.1
        line.points.push({x: point.x + line.dx, y: point.y + line.dy})

        // draw line
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)
        line.points.forEach(d => ctx.lineTo(d.x, d.y))
        ctx.strokeStyle = hsl((time*20 + i*30) % 360, 1, 0.5).formatRgb()
        // ctx.lineWidth = (line.dx*line.dx + line.dy*line.dy)/4 + .5
        ctx.lineWidth = Math.min(1/dist(line.points[0], line.points.at(-1))*30, 5) + .2
        ctx.stroke()

        // trim line length
        if (line.points.length > 10) line.points.shift()
      })

      requestAnimationFrame(draw)
    }

    draw()
  })
</script>

<canvas bind:this={canvas}></canvas>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
