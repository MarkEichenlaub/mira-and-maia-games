class Card {
  constructor(id) {
    this.id = id;

    // build code numbers from difference set that generates finite projective plane
    this.code1 = id;
    this.code2 = (id + 1) % 13;
    this.code3 = (id + 3) % 13;
    this.code4 = (id + 9) % 13;
    this.code =
      2 ** this.code1 + 2 ** this.code2 + 2 ** this.code3 + 2 ** this.code4;
  }
}

function drawCircle(x, y, r, col = 0, weight = 1) {
  noFill();
  stroke(col);
  strokeWeight(weight);
  circle(x, y, 2 * r);
}

function drawCircleFilled(x, y, r, col = 0, weight = 1) {
  fill(255);
  stroke(col);
  strokeWeight(weight);
  circle(x, y, 2 * r);
}

function drawLineSegment(Ax, Ay, Bx, By) {
  stroke(0);
  strokeWeight(1);
  line(Ax, Ay, Bx, By);
}

function drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col) {
  fill(col);
  noStroke();
  beginShape();
  vertex(Ax, Ay);
  vertex(Bx, By);
  vertex(Cx, Cy);
  vertex(Dx, Dy);
  endShape(CLOSE);
}
