Qualtrics.SurveyEngine.addOnload(function ()
{
  //skip mobile preview
  if(jQuery(this.questionContainer).parents('.MobilePreviewFrame').length)
  {
    console.log('Mobile Preview - skipping rest of addOnload');
    return true;
  };


  //goal: drag and drop ios task (3 circles)
  //source: https://codeboxsystems.com/tutorials/en/how-to-drag-and-drop-objects-javascript-canvas/

  //*****************************QUALTRICS VARIABLES*****************************

  //set variable for "this" object and associated elements
  let this_question = this;
  let qid = this_question.questionId;
  let container = this_question.getQuestionContainer();

  let example_array = ("${e://Field/example_array}").split(",");

  let label_1 = ("${e://Field/label_1}");
  let label_2 = ("${e://Field/label_2}");
  let label_3 = ("${e://Field/label_3}");

  let radius = parseInt("${e://Field/circle_radius}");
  let label_font_size = ("${e://Field/label_font_size}");

  let start_x_1 = parseInt("${e://Field/start_x_1}");
  let start_y_1 = parseInt("${e://Field/start_y_1}");
  let start_x_2 = parseInt("${e://Field/start_x_2}");
  let start_y_2 = parseInt("${e://Field/start_y_2}");
  let start_x_3 = parseInt("${e://Field/start_x_3}");
  let start_y_3 = parseInt("${e://Field/start_y_3}");

  //*****************************DOM VARIABLES*****************************

  let dom_canvas = container.getElementsByClassName("myCanvas")[0];

  //*****************************MODEL*****************************

  var Rectangle = function(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isDragging = false;

    this.render = function(ctx) {
      ctx.save();

      ctx.beginPath();
      ctx.rect(this.x - this.width * 0.5, this.y - this.height * 0.5, this.width, this.height);
      ctx.fillStyle = '#2793ef';
      ctx.fill();

      ctx.restore();
    }
  }

  var Arc = function(x, y, radius, radians, label) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.radians = radians;
    this.isDragging = false;
    this.label = label;

    this.render = function(ctx) {
      ctx.save();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, this.radians, false);
      ctx.stroke();

      ctx.font = ""+label_font_size+"px Times New Roman";
      ctx.textAlign = "center";
      ctx.fillText(this.label,this.x,this.y);

      ctx.restore();
    }
  }

  var MouseTouchTracker = function(canvas, callback){

    function processEvent(evt) {
      var rect = canvas.getBoundingClientRect();
      var offsetTop = rect.top;
      var offsetLeft = rect.left;

      if (evt.touches) {
        return {
          x: evt.touches[0].clientX - offsetLeft,
          y: evt.touches[0].clientY - offsetTop
        }
      } else {
        return {
          x: evt.clientX - offsetLeft,
          y: evt.clientY - offsetTop
        }
      }
    }

    function onDown(evt) {
      evt.preventDefault();
      var coords = processEvent(evt);
      callback('down', coords.x, coords.y);
    }

    function onUp(evt) {
      evt.preventDefault();
      callback('up');
    }

    function onMove(evt) {
      evt.preventDefault();
      var coords = processEvent(evt);
      callback('move', coords.x, coords.y);
    }

    canvas.ontouchmove = onMove;
    canvas.onmousemove = onMove;

    canvas.ontouchstart = onDown;
    canvas.onmousedown = onDown;
    canvas.ontouchend = onUp;
    canvas.onmouseup = onUp;
  }

  function isHit(shape, x, y) {
    if (shape.constructor.name === 'Arc') {
      var dx = shape.x - x;
      var dy = shape.y - y;
      if (dx * dx + dy * dy < shape.radius * shape.radius) {
        return true
      }
    } else {
      if (x > shape.x - shape.width * 0.5 && y > shape.y - shape.height * 0.5 && x < shape.x + shape.width - shape.width * 0.5 && y < shape.y + shape.height - shape.height * 0.5) {
        return true;
      }
    }

    return false;
  }

  //*****************************INITIALIZE OBJECTS*****************************

  var circle0 = new Arc(start_x_1, start_y_1, radius, Math.PI * 2, label_1);
  var circle1 = new Arc(start_x_2, start_y_2, radius, Math.PI * 2, label_2);
  var circle2 = new Arc(start_x_3, start_y_3, radius, Math.PI * 2, label_3);

  let circle_array = [];
  circle_array.push(circle0);
  circle_array.push(circle1);
  circle_array.push(circle2);

  console.log(circle_array);

  //*****************************START PROGRAM*****************************

  document.getElementsByClassName("SkinInner")[0].style.paddingTop = "0px";



  var canvas = dom_canvas;
  var ctx = canvas.getContext('2d');
  var startX = 0;
  var startY = 0;

  for (i=0;i<circle_array.length;i++) {
    circle_array[i].render(ctx);
  }

  //*****************************MOUSE TRACKER*****************************

  var mtt = new MouseTouchTracker(canvas,
    function(evtType, x, y) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      switch(evtType) {

        case 'down':
          startX = x;
          startY = y;
          for (j=0;j<circle_array.length;j++) {
            if (isHit(circle_array[j], x, y)) {
              circle_array[j].isDragging = true;
            }
          }
          break;

        case 'up':
          for (k=0;k<circle_array.length;k++) {
            circle_array[k].isDragging = false;
          }
          break;

        case 'move':
          var dx = x - startX;
          var dy = y - startY;
          startX = x;
          startY = y;

          for (m=0;m<circle_array.length;m++) {
            if (circle_array[m].isDragging) {
              circle_array[m].x += dx;
              circle_array[m].y += dy;
            }
          }
          break;
      }

      for (n=0;n<circle_array.length;n++) {
        circle_array[n].render(ctx);
      }
    }
  );

  //*****************************FUNCTIONS*****************************



  //*****************************SAVING DATA*****************************

  //once P submits the page, take care of ev's
	Qualtrics.SurveyEngine.addOnPageSubmit(function(type) {


    //template for setting embedded data
    Qualtrics.SurveyEngine.setEmbeddedData("ev here","value here");

    for (i=0;i<circle_array.length;i++) {
      Qualtrics.SurveyEngine.setEmbeddedData("circle_x_"+(i+1),""+circle_array[i].x);
      Qualtrics.SurveyEngine.setEmbeddedData("circle_y_"+(i+1),""+circle_array[i].y);
    }


	});

});
