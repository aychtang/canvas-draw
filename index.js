
var active  = false;

// -----------------------------------------------------------------------------

function setActive (a)
{
  return (e) => active = a;
}

function newDraw (x, y)
{
  return new CustomEvent("newDraw", { detail: { x : x, y : y } });
}

function newPos (x, y)
{
  return new CustomEvent("newPos", { detail: { x : x, y : y } });
}

function makeLine (c, x, y)
{
  c.dispatchEvent(newDraw(x, y));
}

function makePos (c, x, y)
{
  c.dispatchEvent(newPos(x, y));
}

// -----------------------------------------------------------------------------

var isActive  = setActive(true);
var notActive = setActive(false);

function bindCanvas (canvas)
{
  canvas.addEventListener("mouseup"  , notActive);
  canvas.addEventListener("mouseout" , notActive);

  canvas.addEventListener("mousemove", (e) => {
    if (active)
      makeLine(canvas, e.x, e.y);
  });

  canvas.addEventListener("mousedown", (e) => {
    isActive();
    makePos(canvas, e.x, e.y);
  });
}

exports.bindCanvas = bindCanvas;
