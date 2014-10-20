(function() {
  window.onload = function() {
    var Point, canvas, count, ctx, dpoints, drawCircle, drawSquare, getRan, i, nPoint, points, update;
    canvas = document.getElementById("field");
    ctx = canvas.getContext('2d');
    Point = (function() {
      function Point(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
      }

      Point.prototype.update = function(dx, dy, dsize) {
        this.x += dx * count / 20;
        this.y += dy * count / 20;
        return this.size -= dsize;
      };

      return Point;

    })();
    getRan = function() {
      return (Math.random() - 0.5) * 2;
    };
    count = 0;
    nPoint = 1000;
    points = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= nPoint ? _i <= nPoint : _i >= nPoint; i = 0 <= nPoint ? ++_i : --_i) {
        _results.push(new Point(canvas.width / 2, canvas.height / 2, 5));
      }
      return _results;
    })();
    points[0].update(0, 0, -80);
    dpoints = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= nPoint ? _i <= nPoint : _i >= nPoint; i = 0 <= nPoint ? ++_i : --_i) {
        _results.push({
          dx: getRan() + count * 5,
          dy: getRan() + count * 5,
          dsize: 0.01
        });
      }
      return _results;
    })();
    drawCircle = function(pt) {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2, true);
      return ctx.fill();
    };
    drawSquare = function() {
      ctx.beginPath();
      return ctx.fillRect(100, 400, 300 - count * 3, 10);
    };
    update = function() {
      var d, _i, _j, _len, _ref;
      if (count < 90) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSquare();
        drawCircle(points[0]);
        points[0].update(0, 0, 0);
      } else if (count < 100) {
        ctx.fillStyle = 'rgb(255,98,50)';
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        _ref = points.slice(1, +nPoint + 1 || 9e9);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          drawCircle(i);
        }
        for (i = _j = 1; 1 <= nPoint ? _j <= nPoint : _j >= nPoint; i = 1 <= nPoint ? ++_j : --_j) {
          d = dpoints[i];
          points[i].update(d.dx, d.dy, d.dsize);
        }
      }
      count++;
      return window.requestAnimationFrame(update);
    };
    window.requestAnimationFrame(update);
    return window.requestAnimationFrame(update);
  };

}).call(this);
