<script>
  import { onMount } from 'svelte'
  import { hsl } from 'd3-color'

  let canvas
  let ctx
  let time = 0
  let lines = Array(100).fill().map(() => ({
    points: [{x: window.innerWidth/2, y: window.innerHeight/2}],
    dx: (Math.random() - 0.5) * 5,
    dy: (Math.random() - 0.5) * 5
  }))

  onMount(() => {
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const WALL_MARGIN = 10

    function draw() {
      time += 0.01
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line, i) => {
        const color = hsl((time * 99 + i * 30) % 360, 1, 0.5)
        ctx.strokeStyle = color.formatRgb()
        ctx.lineWidth = 2


        // Update velocity and check bounds
        const lastPoint = line.points[line.points.length - 1]

        lastPoint.x = Math.min(Math.max(WALL_MARGIN, lastPoint.x), canvas.width - WALL_MARGIN)
        lastPoint.y = Math.min(Math.max(WALL_MARGIN, lastPoint.y), canvas.height - WALL_MARGIN)

        if (lastPoint.x === WALL_MARGIN || lastPoint.x === canvas.width - WALL_MARGIN) {
          line.dx = 0
        }
        if (lastPoint.y === WALL_MARGIN || lastPoint.y === canvas.height - WALL_MARGIN) {
          line.dy = 0
        }

        // Add some random acceleration
        line.dx += (Math.random() - 0.5) * 0.2
        line.dy += (Math.random() - 0.5) * 0.2

        // Add new point with current velocity
        const newPoint = {
          x: lastPoint.x + line.dx,
          y: lastPoint.y + line.dy
        }
        line.points.push(newPoint)

        // draw line
        ctx.beginPath()
        ctx.moveTo(line.points[0].x, line.points[0].y)
        line.points.forEach(pt => {
          ctx.lineTo(pt.x, pt.y)
        })
        ctx.stroke()

        // trim line length
        if(line.points.length > 100) line.points.shift()
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
