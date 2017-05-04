window.onload = function() {
  var c = document.getElementById('nav-canvas');

  c.width = window.innerWidth;
  c.height = 37;

  var context = c.getContext('2d');

  colorPalate = [
    '#636153',
    '#B3A49D',
    '#E9F8F5',
    '#919EB7',
    '#050702'
  ]

  // mouse variable
  var mouse = {
    x: undefined,
    y: undefined
  }

  // mouse event listener
  window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  // resize listener
  window.addEventListener('resize', function() {
    c.width = window.innerWidth;
    c.height = 37;

    init();
  });

  // defines Circle object
  function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 12;
    this.color = colorPalate[Math.floor(Math.random()*colorPalate.length)];

    this.draw = function() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      context.fillStyle = this.color;
      context.fill();
    };

    this.update = function() {
      if (this.x + this.radius > c.width || this.x - this.radius < 0) {
        this.dx = -this.dx
      }
      if (this.y + this.radius > c.height || this.y - this.radius < 0) {
        this.dy = -this.dy
      }
      this.x += this.dx;
      this.y += this.dy;

      // interactivity
      this.diffX = mouse.x - this.x;
      this.diffY = mouse.y - this.y;
      this.distance = Math.sqrt((this.diffX * this.diffX) + (this.diffY * this.diffY));
      if (this.distance < 80) {
        if (this.radius < this.maxRadius) {
          this.radius += 1;
        }
      } else {
        if (this.radius > this.minRadius) {
          this.radius -= 1;
        }
      }

      this.draw();
    };
  }

  // creates Circle objects
  var circleArray = [];
  // creates the initial circles on load and resize
  function init() {
    circleArray = [];
    for (var i = 0; i < (c.width + c.height)/ 8; i++) {
      var radius = Math.random() * 3 + 2; // creates radius between 2 and 5
      var x = Math.random() * (c.width - radius * 2) + radius;
      var y = Math.random() * (c.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 2; // creates change of x from -1 to 1
      var dy = (Math.random() - 0.5) * 2; // creates change of y from -1 to 1

      circleArray.push(new Circle(x, y, dx, dy, radius));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, c.width, c.height);

    for(var i=0; i<circleArray.length; i++) {
      circleArray[i].update();
  }
  }

  init();
  animate();
  $('#nav').css('z-index', '10000')
}
