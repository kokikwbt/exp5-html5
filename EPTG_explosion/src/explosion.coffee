window.onload = ->
  canvas = document.getElementById "field"
  ctx = canvas.getContext '2d'

  class Point
    constructor : (x, y, size) ->
      @x = x
      @y = y
      @size = size

    update: (dx, dy, dsize) ->
      @x += dx*count/20
      @y += dy*count/20
      @size -= dsize

  getRan = () -> (Math.random() - 0.5)*2

  count  = 0
  nPoint = 1000
  points = (new Point(canvas.width/2, canvas.height/2, 5) for i in [0..nPoint])
  points[0].update(0,0,-80)
  dpoints = ({dx:getRan()+count*5, dy:getRan()+count*5, dsize:0.01} for i in [0..nPoint])

  drawCircle = (pt) ->
    ctx.beginPath()
    ctx.arc pt.x, pt.y, pt.size, 0, Math.PI * 2, true
    ctx.fill()

  drawSquare = ->  
    ctx.beginPath()
    ctx.fillRect(100,400,300-(count)*3,10)

  update = ->
    if(count <90)
      ctx.clearRect 0, 0, canvas.width, canvas.height
      drawSquare()
      drawCircle(points[0])
      points[0].update(0,0,0)
    else if(count <100)
      ctx.fillStyle='rgb(255,98,50)'
    else
      ctx.clearRect 0, 0, canvas.width, canvas.height
      drawCircle(i) for i in points[1..nPoint]

      for i in [1..nPoint]
        d = dpoints[i]
        points[i].update(d.dx, d.dy, d.dsize)
    count++

    window.requestAnimationFrame update
  

  window.requestAnimationFrame update


  window.requestAnimationFrame update

  