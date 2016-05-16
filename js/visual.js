  var canvas = document.querySelector('#texture');
  var ctx = canvas.getContext('2d');
  var a = {
      x: 5
      , y: 5
      , converged: 0
      , total: 0
      , type: "a"
      , color: "rgba(0,0,0,.1)"
  }
  var b = {
      x: 15
      , y: 15
      , converged: 0
      , total: 0
      , type: "b"
      , color: "rgba(0,0,255,.1)"

  }
  var c = {
      x: 25
      , y: 25
      , converged: 0
      , total: 0
      , type: "c"
      , color: "rgba(43,255,102,.1)"
  }
  var d = {
      x: 25
      , y: 15
      , converged: 0
      , total: 0
      , type: "d"
      , color: "rgba(102,51,153,.1)"
  }
  var convPoints = [a, b, c, d]
  var width = window.innerWidth
  var height = window.innerHeight
  var size = 20
  var rows = (width / size).toFixed();
  var cols = (height / size).toFixed();

  var stateArray = [];
  var cells = [];


  //shape code
  var shape = {
      ctx: ctx
      , row: 0
      , column: 0
      , type: "a"
      , fillStyle: ""
      , state: "alive"
      , draw: function () {

          this.wrap();
          ctx.fillStyle = this.fillStyle;

          //ctx.fillRect(this.row * size, this.column * size, size, size)
          ctx.beginPath();
          ctx.arc(this.row * size - (size / 4), this.column * size - (size / 4), size / 4, 0, 2 * Math.PI);
          ctx.fill();
          //prepareLineup();
      }
      , status: function () {
          console.log("x= " + this.x + " y= " + this.y)
      }
      , move: function () {
          this.draw();
      }
      , converge: function (point) {
          var rnd = Math.random() * (5 - 1) + 1
          if (rnd < 4) {
              if (this.row == point.x && this.column == point.y) {
                  point.converged += 1
              }
              if (point.x < this.row || this.row < point.x) {
                  if (this.row > point.x) {
                      this.row -= 1;
                  }
                  if (this.row < point.x) {
                      this.row += 1;
                  }
              }
              if (point.y < this.column || this.column < point.y) {
                  if (this.column > point.y) {
                      this.column -= 1;
                  }
                  if (this.column < point.y) {
                      this.column += 1;
                  }
              }
          }
      }
      , wrap: function () {
          if (this.row > rows) {
              this.row = 1
          }

          if (this.row < 1) {
              this.row = rows
          }

          if (this.column > cols) {
              this.column = 1
          }
          if (this.column < 1) {
              this.column = cols
          }

      }




  }
  setup();
  window.onresize = function () {
      width = window.innerWidth
      height = window.innerHeight
      ctx.canvas.width = width;
      ctx.canvas.height = height;
      var rows = (width / size).toFixed();
      var cols = (height / size).toFixed();
  };

  function setup() {
      ctx.canvas.width = width;
      ctx.canvas.height = height;

      // console.log(width)
      //console.log(height)
      //console.log(rows)
      // console.log("in setup");
      for (var y = 0; y < cols; y++) {
          for (var i = 0; i < rows; i++) {
              var square = Object.create(shape);
              square.row = i;
              square.column = y;
              var rnd = Math.random() * (5 - 1) + 1
              if (rnd >= 4) {
                  square.type = "d";
                  square.fillStyle = d.color;
              } else if (rnd >= 3 && rnd < 4) {
                  square.type = "a";
                  square.fillStyle = a.color;
              } else if (rnd >= 2 && rnd < 3) {
                  square.type = "b";
                  square.fillStyle = b.color;
              } else if (rnd < 2) {
                  square.type = "c";
                  square.fillStyle = c.color;
              }
              var square1 = Object.create(square);
              cells.push(square1);
          }
      }
      draw();
      setInterval(loop, 100);

      function loop() {
          //console.log("in loop");
          prepareLineup();
          update();
          //cells[10].fillStyle="grey";
          //draw();
      }
  }

  function prepareLineup() {
      //console.log("in prepare lineup");
      // 
      moveConvergePoints();
      //console.log(rnd);
      for (var i = 0; i < cells.length; i++) {
          var aliveNeib = 0;
          //var newState
          var square = cells[i];
          if (square.state == "alive") {
              if (square.type == "a") {
                  square.converge(a);
              }
              if (square.type == "b") {
                  square.converge(b);
              }
              if (square.type == "c") {
                  square.converge(c);
              }
              if (square.type == "d") {
                  square.converge(d);
              }

          } else {
              cells.pop(square);
          }


      }
  }

  function draw() {

      for (var i = 0; i < cells.length; i++) {
          cells[i].draw();
      }
  }

  function update() {
      ctx.fillStyle = "rgba(255,255,255,.4)"
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (var i = 0; i < cells.length; i++) {
          cells[i].move();
      }

  }

  function disperse(typeobj) {
      var type = typeobj.type;

      for (var i = 0; i < cells.length; i++) {
          if (cells[i].type == type) {
              cells[i].row = (Math.random() * (rows)).toFixed();
              cells[i].column = (Math.random() * (cols)).toFixed();
              //var randomColor = (Math.random() * (255)).toFixed();
              // typeobj.color = "rgba(" + randomColor + "," + randomColor + "," + randomColor + ",.5)"
          }

      }
  }

  function moveConvergePoints() {

      for (var i = 0; i < convPoints.length; i++) {
          if (convPoints[i].converged < 80) {

              var conv = convPoints[i].converged
                  //console.log(conv)
              playNote(cMajorHarmony[i], 1, (conv / 240), conv / 120, conv / 120);
              //oscNote(cMajorHarmony[i], conv / 60);
          }
          if (convPoints[i].converged > 60) {
              //playNote(cMajorHarmony[i], 1, 2, 1, 1);
              //console.log("maxed occupancy")
              convPoints[i].x = (Math.random() * (rows - 3) + 1).toFixed();
              convPoints[i].y = (Math.random() * (cols - 3) + 1).toFixed();
              convPoints[i].converged = 0;
              disperse(convPoints[i])
          }

      }
  }