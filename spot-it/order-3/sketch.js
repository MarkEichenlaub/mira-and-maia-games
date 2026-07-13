let loadedBAImages = [];

const CARD_RADIUS = 60;
const CARD_GAP = 10;
const CORNER_X = 100;
const CORNER_Y = 50;
let cards = []; // array of cards;
let lastClickedCircleId = -1;
let linesButton;
let linesButtonPushedTimes = 0;
let row1,
  row2,
  row3,
  col1,
  col2,
  col3,
  diag1,
  diag2,
  diag3,
  diag4,
  diag5,
  diag6,
  lineAtInf;

function preload() {
  loadedBAImages.push(loadImage("images/Alex.png"));
  loadedBAImages.push(loadImage("images/Clod.png"));
  loadedBAImages.push(loadImage("images/Fiona.png"));
  loadedBAImages.push(loadImage("images/Grogg.png"));
  loadedBAImages.push(loadImage("images/Grok.png"));
  loadedBAImages.push(loadImage("images/Kraken.png"));
  loadedBAImages.push(loadImage("images/Lizzie.png"));
  loadedBAImages.push(loadImage("images/MsLevans.png"));
  loadedBAImages.push(loadImage("images/MsQ.png"));
  loadedBAImages.push(loadImage("images/Platypus.png"));
  loadedBAImages.push(loadImage("images/R&G.png"));
  loadedBAImages.push(loadImage("images/Ralph.png"));
  loadedBAImages.push(loadImage("images/Winnie.png"));
  loadedBAImages.push(loadImage("images/Headmaster1.png"));
}

function setup() {
  createCanvas(800, 600);

  for (let i = 0; i <= 12; i++) {
    cards[i] = new Card(i);
  }

  imageMode(CENTER);

  linesButton = createButton("Show Lines");
  linesButton.mouseClicked(showLinesButton);
  linesButton.size(100, 30);
  linesButton.position(600, 660);
  linesButton.style("font-size", "16px");

  const shuffleButton = createButton("Shuffle");
  shuffleButton.mouseClicked(shuffleCards);
  shuffleButton.size(70, 30);
  shuffleButton.position(615, 700);
  shuffleButton.style("font-size", "16px");
}

function draw() {
  background(255);

  computeCodes();

  if (linesButtonPushedTimes % 2 == 1) {
    showLines();
  }

  // draw cards
  for (let i = 0; i <= 12; i++) {
    const x = circleCenterx(i);
    const y = circleCentery(i);
    if (i === lastClickedCircleId) {
      drawCircleFilled(x, y, CARD_RADIUS, color(255, 0, 0), 5);
    } else {
      drawCircleFilled(x, y, CARD_RADIUS, 0, 1);
    }

    image(loadedBAImages[cards[i].code1], x - 25, y - 25, 40, 40);
    image(loadedBAImages[cards[i].code2], x + 25, y - 25, 40, 40);
    image(loadedBAImages[cards[i].code3], x - 25, y + 25, 40, 40);
    image(loadedBAImages[cards[i].code4], x + 25, y + 25, 40, 40);
  }

  // all the cards line up!
  if (
    row1 > 0 &&
    row2 > 0 &&
    row3 > 0 &&
    col1 > 0 &&
    col2 > 0 &&
    col3 > 0 &&
    diag1 > 0 &&
    diag2 > 0 &&
    diag3 > 0 &&
    diag4 > 0 &&
    diag5 > 0 &&
    diag6 > 0 &&
    lineAtInf > 0
  ) {
    for (let i = 0; i <= 12; i++) {
      if (i !== lastClickedCircleId) {
        drawCircle(
          circleCenterx(i),
          circleCentery(i),
          CARD_RADIUS,
          color(0, 0, 255),
          3
        );
      }
    }
    fill(0);
    noStroke();
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Headmaster says", 650, 130);
    image(loadedBAImages[13], 650, 250, 200, 200);
    text("Well done!", 650, 380);
  }
}

function mousePressed() {
  for (let i = 0; i <= 12; i++) {
    const x = circleCenterx(i);
    const y = circleCentery(i);
    if (dist(x, y, mouseX, mouseY) < CARD_RADIUS) {
      if (lastClickedCircleId >= 0) {
        // a circle was previously clicked on
        if (i === lastClickedCircleId) {
          // the same circle has been clicked on
          lastClickedCircleId = -1;
        } else {
          // a different circle has been clicked on
          swapCards(i, lastClickedCircleId);

          lastClickedCircleId = -1;
        }
      } else {
        // circle i has been clicked on
        lastClickedCircleId = i;
      }
      return;
    }
  }
}

function circleCenterx(i) {
  if (i <= 8) {
    return CORNER_X + (2 * (i % 3) + 1) * CARD_RADIUS + (i % 3) * CARD_GAP;
  } else {
    return (
      CORNER_X +
      2 * CARD_RADIUS +
      0.5 * CARD_GAP +
      2 * (i - 10) * CARD_RADIUS +
      (i - 10) * CARD_GAP
    );
  }
}

function circleCentery(i) {
  if (i <= 8) {
    return (
      CORNER_Y + (2 * floor(i / 3) + 1) * CARD_RADIUS + floor(i / 3) * CARD_GAP
    );
  } else {
    return CORNER_Y + 7 * CARD_RADIUS + 3 * CARD_GAP + 20;
  }
}

function computeCodes() {
  row1 = cardsCodeAnd(0, 1, 2);
  row2 = cardsCodeAnd(3, 4, 5);
  row3 = cardsCodeAnd(6, 7, 8);
  col1 = cardsCodeAnd(0, 3, 6);
  col2 = cardsCodeAnd(1, 4, 7);
  col3 = cardsCodeAnd(2, 5, 8);
  diag1 = cardsCodeAnd(0, 4, 8);
  diag2 = cardsCodeAnd(1, 5, 6);
  diag3 = cardsCodeAnd(2, 3, 7);
  diag4 = cardsCodeAnd(0, 5, 7);
  diag5 = cardsCodeAnd(1, 3, 8);
  diag6 = cardsCodeAnd(2, 4, 6);
  lineAtInf = cards[9].code & cards[10].code & cards[11].code & cards[12].code;
}

function cardsCodeAnd(a, b, c) {
  return cards[a].code & cards[b].code & cards[c].code;
}

function swapCards(i, j) {
  const tempCard = cards[i];
  cards[i] = cards[j];
  cards[j] = tempCard;
}

// Fisher-Yates algorithm
function shuffleCards() {
  for (let i = 0; i <= 11; i++) {
    const j = floor(random(i, 13));
    swapCards(i, j);
  }
}

function showLinesButton() {
  linesButtonPushedTimes++;

  if (linesButtonPushedTimes % 2 == 0) {
    linesButton.html("Show Lines");
  } else {
    linesButton.html("Hide Lines");
  }
}

function showLines() {
  let Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col;

  // row 1
  Ax = circleCenterx(0) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(0) - CARD_GAP;
  Bx = circleCenterx(2) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(2) - CARD_GAP;
  Cx = circleCenterx(2) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(2) + CARD_GAP;
  Dx = circleCenterx(0) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(0) + CARD_GAP;

  if (row1 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // row 2
  Ax = circleCenterx(3) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(3) - CARD_GAP;
  Bx = circleCenterx(5) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(5) - CARD_GAP;
  Cx = circleCenterx(5) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(5) + CARD_GAP;
  Dx = circleCenterx(3) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(3) + CARD_GAP;

  if (row2 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // row 3
  Ax = circleCenterx(6) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(6) - CARD_GAP;
  Bx = circleCenterx(8) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(8) - CARD_GAP;
  Cx = circleCenterx(8) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(8) + CARD_GAP;
  Dx = circleCenterx(6) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(6) + CARD_GAP;

  if (row3 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // column 1
  Ax = circleCenterx(0) + CARD_GAP;
  Ay = circleCentery(0) - CARD_RADIUS - CARD_GAP;
  Bx = circleCenterx(6) + CARD_GAP;
  By = circleCentery(6) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(6) - CARD_GAP;
  Cy = circleCentery(6) + CARD_RADIUS + CARD_GAP;
  Dx = circleCenterx(0) - CARD_GAP;
  Dy = circleCentery(0) - CARD_RADIUS - CARD_GAP;

  if (col1 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // column 2
  Ax = circleCenterx(1) + CARD_GAP;
  Ay = circleCentery(1) - CARD_RADIUS - CARD_GAP;
  Bx = circleCenterx(7) + CARD_GAP;
  By = circleCentery(7) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(7) - CARD_GAP;
  Cy = circleCentery(7) + CARD_RADIUS + CARD_GAP;
  Dx = circleCenterx(1) - CARD_GAP;
  Dy = circleCentery(1) - CARD_RADIUS - CARD_GAP;

  if (col2 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // column 3
  Ax = circleCenterx(2) + CARD_GAP;
  Ay = circleCentery(2) - CARD_RADIUS - CARD_GAP;
  Bx = circleCenterx(8) + CARD_GAP;
  By = circleCentery(8) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(8) - CARD_GAP;
  Cy = circleCentery(8) + CARD_RADIUS + CARD_GAP;
  Dx = circleCenterx(2) - CARD_GAP;
  Dy = circleCentery(2) - CARD_RADIUS - CARD_GAP;

  if (col3 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 1
  Ax =
    circleCenterx(0) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(0) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(8) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(8) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(8) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(8) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(0) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(0) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag1 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 2
  Ax =
    circleCenterx(1) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(1) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(5) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(5) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(5) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(5) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(1) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(1) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag2 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(6) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(6) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(6) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(6) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(6) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(6) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(6) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(6) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag2 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 3
  Ax =
    circleCenterx(2) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(2) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(2) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(2) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(2) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(2) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(2) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(2) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag3 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(7) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(7) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(7) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(7) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag3 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 4
  Ax =
    circleCenterx(0) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(0) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(0) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(0) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(0) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(0) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(0) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(0) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag4 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(5) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(5) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(7) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(7) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(7) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(7) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(5) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(5) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag4 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 5
  Ax =
    circleCenterx(1) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(1) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(3) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(3) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(1) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(1) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag5 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(8) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(8) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(8) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(8) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(8) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(8) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(8) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(8) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag5 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 6
  Ax =
    circleCenterx(2) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(2) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(6) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(6) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(6) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(6) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(2) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(2) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag6 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // line at infinity
  Ax = circleCenterx(9) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(9) - CARD_GAP;
  Bx = circleCenterx(12) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(12) - CARD_GAP;
  Cx = circleCenterx(12) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(12) + CARD_GAP;
  Dx = circleCenterx(9) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(9) + CARD_GAP;

  if (lineAtInf > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);
}
