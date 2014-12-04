window.onload = ->
  canvas = document.getElementById "field"
  ctx = canvas.getContext '2d'
  count = 100
  circle_size = 50

  class Point
    constructor : (x, y, size) ->
      @x = x
      @y = y
      @size = size

    update: (dx, dy, dsize) ->
      @x += dx * 30
      @y += dy * 30
      @size -= dsize

  getRan = () -> (Math.random() - 0.5)*2

  nPoint = 1000
  points = (new Point(canvas.width/2, canvas.height/2, 5) for i in [0..nPoint])
  dpoints = ({dx:getRan(), dy:getRan(), dsize:0.01} for i in [0..nPoint])

  drawCircle = (pt) ->
    ctx.beginPath()
    if count > 0
       ctx.arc 250, 250, circle_size, 0, Math.PI*2, true
       if count > 0 && count < 15
       	  circle_size += 0.005
    else
       random = Math.floor(Math.random() * 10) + 1
       if random >= 5
            ctx.fillStyle = 'rgb(255,0,0)'
       else
       	    ctx.fillStyle = 'rgb(239, 143, 13)'
       ctx.arc pt.x, pt.y, pt.size, 0, Math.PI * 2, true
    ctx.fill()

  drawRect = () ->
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(100, 470, count * 3, 10)

  update = ->
    if count > 0
      count--
    ctx.clearRect 0, 0, canvas.width, canvas.height
    drawCircle(i) for i in points

    if count == 0
      for i in [0..nPoint]
        d = dpoints[i]
        points[i].update(d.dx, d.dy, d.dsize)

    drawRect()
    window.requestAnimationFrame update

  window.requestAnimationFrame update