let loadedBAImages = []; // Temporary array to hold PImage objects during preload

const CARD_RADIUS = 50;
const CARD_GAP = 10;
const CORNER_X = 100;
const CORNER_Y = 50;
const IMG_SCALE = 28;
const IMG_RAD = 32;
let cards = []; // array of cards;
let lastClickedCircleId = -1;
let linesButton;
let linesButtonPushedTimes = 0;
let row1,
  row2,
  row3,
  row4,
  row5,
  col1,
  col2,
  col3,
  col4,
  col5,
  diag1,
  diag2,
  diag3,
  diag4,
  diag5,
  diag6,
  diag7,
  diag8,
  diag9,
  diag10,
  lineAtInf;

function preload() {
  loadedBAImages.push(loadImage("images/Alex.png"));
  loadedBAImages.push(loadImage("images/alligopher.png"));
  loadedBAImages.push(loadImage("images/blue_monster_digital.png"));
  loadedBAImages.push(loadImage("images/buffalobster.png"));
  loadedBAImages.push(loadImage("images/chimpanda.png"));
  loadedBAImages.push(loadImage("images/chipmonkey.png"));
  loadedBAImages.push(loadImage("images/Clod.png"));
  loadedBAImages.push(loadImage("images/Fiona.png"));
  loadedBAImages.push(loadImage("images/flamingoat.png"));
  loadedBAImages.push(loadImage("images/green_monster_digital.png"));
  loadedBAImages.push(loadImage("images/Grogg.png"));
  loadedBAImages.push(loadImage("images/Grok.png"));
  loadedBAImages.push(loadImage("images/Groofle.png"));
  loadedBAImages.push(loadImage("images/hippopotamoose.png"));
  loadedBAImages.push(loadImage("images/Kraken.png"));
  loadedBAImages.push(loadImage("images/Lizzie.png"));
  loadedBAImages.push(loadImage("images/MsLevans.png"));
  loadedBAImages.push(loadImage("images/MsQ.png"));
  loadedBAImages.push(loadImage("images/octopug.png"));
  loadedBAImages.push(loadImage("images/orangutoad.png"));
  loadedBAImages.push(loadImage("images/pelicamel.png"));
  loadedBAImages.push(loadImage("images/Platypus.png"));
  loadedBAImages.push(loadImage("images/porcupuma.png"));
  loadedBAImages.push(loadImage("images/R&G.png"));
  loadedBAImages.push(loadImage("images/Ralph.png"));
  loadedBAImages.push(loadImage("images/rhinocerabbit.png"));
  loadedBAImages.push(loadImage("images/Rote.png"));
  loadedBAImages.push(loadImage("images/spotted_jackalope.png"));
  loadedBAImages.push(loadImage("images/tarantulemur.png"));

  loadedBAImages.push(loadImage("images/tortusk.png"));
  loadedBAImages.push(loadImage("images/Winnie.png"));
  loadedBAImages.push(loadImage("images/Headmaster1.png"));
}

function setup() {
  createCanvas(1000, 750);

  for (let i = 0; i <= 30; i++) {
    cards[i] = new Card(i);
  }

  imageMode(CENTER);

  linesButton = createButton("Show Lines");
  linesButton.mouseClicked(showLinesButton);
  linesButton.size(100, 30);
  linesButton.position(755, 800);
  linesButton.style("font-size", "16px");

  const shuffleButton = createButton("Shuffle");
  shuffleButton.mouseClicked(shuffleCards);
  shuffleButton.size(70, 30);
  shuffleButton.position(770, 840);
  shuffleButton.style("font-size", "16px");
}

function draw() {
  background(255);

  computeCodes();

  if (linesButtonPushedTimes % 2 == 1) {
    showLines();
  }

  // draw cards
  for (let i = 0; i <= 30; i++) {
    const x = circleCenterx(i);
    const y = circleCentery(i);
    if (i === lastClickedCircleId) {
      drawCircleFilled(x, y, CARD_RADIUS, color(255, 0, 0), 5);
    } else {
      drawCircleFilled(x, y, CARD_RADIUS, 0, 1);
    }

    image(loadedBAImages[cards[i].code1], x, y, IMG_SCALE, IMG_SCALE);
    image(
      loadedBAImages[cards[i].code2],
      x + IMG_RAD * cos(PI / 2),
      y + IMG_RAD * sin(PI / 2),
      IMG_SCALE,
      IMG_SCALE
    );
    image(
      loadedBAImages[cards[i].code3],
      x + IMG_RAD * cos(PI / 2 + (1 / 5) * 2 * PI),
      y + IMG_RAD * sin(PI / 2 + (1 / 5) * 2 * PI),
      IMG_SCALE,
      IMG_SCALE
    );
    image(
      loadedBAImages[cards[i].code4],
      x + IMG_RAD * cos(PI / 2 + (2 / 5) * 2 * PI),
      y + IMG_RAD * sin(PI / 2 + (2 / 5) * 2 * PI),
      IMG_SCALE,
      IMG_SCALE
    );
    image(
      loadedBAImages[cards[i].code5],
      x + IMG_RAD * cos(PI / 2 + (3 / 5) * 2 * PI),
      y + IMG_RAD * sin(PI / 2 + (3 / 5) * 2 * PI),
      IMG_SCALE,
      IMG_SCALE
    );
    image(
      loadedBAImages[cards[i].code6],
      x + IMG_RAD * cos(PI / 2 + (4 / 5) * 2 * PI),
      y + IMG_RAD * sin(PI / 2 + (4 / 5) * 2 * PI),
      IMG_SCALE,
      IMG_SCALE
    );
  }

  // all the cards line up!
  if (
    row1 > 0 &&
    row2 > 0 &&
    row3 > 0 &&
    row4 > 0 &&
    row5 > 0 &&
    col1 > 0 &&
    col2 > 0 &&
    col3 > 0 &&
    col4 > 0 &&
    col5 > 0 &&
    diag1 > 0 &&
    diag2 > 0 &&
    diag3 > 0 &&
    diag4 > 0 &&
    diag5 > 0 &&
    diag6 > 0 &&
    diag7 > 0 &&
    diag8 > 0 &&
    diag9 > 0 &&
    diag10 > 0 &&
    lineAtInf > 0
  ) {
    for (let i = 0; i <= 30; i++) {
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
    noStroke(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Headmaster says", 820, 130);
    image(loadedBAImages[31], 820, 250, 220, 220);
    text("Awesome!", 820, 380);
  }
}

function mousePressed() {
  for (let i = 0; i <= 30; i++) {
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
  if (i <= 24) {
    return CORNER_X + (2 * (i % 5) + 1) * CARD_RADIUS + (i % 5) * CARD_GAP;
  } else {
    return (
      CORNER_X +
      2 * CARD_RADIUS +
      0.5 * CARD_GAP +
      2 * (i - 26) * CARD_RADIUS +
      (i - 26) * CARD_GAP
    );
  }
}

function circleCentery(i) {
  if (i <= 24) {
    return (
      CORNER_Y + (2 * floor(i / 5) + 1) * CARD_RADIUS + floor(i / 5) * CARD_GAP
    );
  } else {
    return CORNER_Y + 11 * CARD_RADIUS + 5 * CARD_GAP + 10;
  }
}

function computeCodes() {
  row1 = cardsCodeAnd(0, 1, 2, 3, 4);
  row2 = cardsCodeAnd(5, 6, 7, 8, 9);
  row3 = cardsCodeAnd(10, 11, 12, 13, 14);
  row4 = cardsCodeAnd(15, 16, 17, 18, 19);
  row5 = cardsCodeAnd(20, 21, 22, 23, 24);
  col1 = cardsCodeAnd(0, 5, 10, 15, 20);
  col2 = cardsCodeAnd(1, 6, 11, 16, 21);
  col3 = cardsCodeAnd(2, 7, 12, 17, 22);
  col4 = cardsCodeAnd(3, 8, 13, 18, 23);
  col5 = cardsCodeAnd(4, 9, 14, 19, 24);
  diag1 = cardsCodeAnd(0, 6, 12, 18, 24);
  diag2 = cardsCodeAnd(1, 7, 13, 19, 20);
  diag3 = cardsCodeAnd(2, 8, 14, 15, 21);
  diag4 = cardsCodeAnd(3, 9, 10, 16, 22);
  diag5 = cardsCodeAnd(4, 5, 11, 17, 23);
  diag6 = cardsCodeAnd(0, 9, 13, 17, 21);
  diag7 = cardsCodeAnd(1, 5, 14, 18, 22);
  diag8 = cardsCodeAnd(2, 6, 10, 19, 23);
  diag9 = cardsCodeAnd(3, 7, 11, 15, 24);
  diag10 = cardsCodeAnd(4, 8, 12, 16, 20);
  lineAtInf =
    cards[25].code &
    cards[26].code &
    cards[27].code &
    cards[28].code &
    cards[29].code &
    cards[30].code;
}

function cardsCodeAnd(a, b, c, d, e) {
  return (
    cards[a].code &
    cards[b].code &
    cards[c].code &
    cards[d].code &
    cards[e].code
  );
}

function swapCards(i, j) {
  const tempCard = cards[i];
  cards[i] = cards[j];
  cards[j] = tempCard;
}

// Fisher-Yates algorithm
function shuffleCards() {
  for (let i = 0; i <= 29; i++) {
    const j = floor(random(i, 31));
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
  Bx = circleCenterx(4) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(4) - CARD_GAP;
  Cx = circleCenterx(4) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(4) + CARD_GAP;
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
  Ax = circleCenterx(5) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(5) - CARD_GAP;
  Bx = circleCenterx(9) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(9) - CARD_GAP;
  Cx = circleCenterx(9) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(9) + CARD_GAP;
  Dx = circleCenterx(5) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(5) + CARD_GAP;

  if (row2 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // row 3
  Ax = circleCenterx(10) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(10) - CARD_GAP;
  Bx = circleCenterx(14) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(14) - CARD_GAP;
  Cx = circleCenterx(14) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(14) + CARD_GAP;
  Dx = circleCenterx(10) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(10) + CARD_GAP;

  if (row3 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // row 4
  Ax = circleCenterx(15) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(15) - CARD_GAP;
  Bx = circleCenterx(19) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(19) - CARD_GAP;
  Cx = circleCenterx(19) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(19) + CARD_GAP;
  Dx = circleCenterx(15) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(15) + CARD_GAP;

  if (row4 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // row 5
  Ax = circleCenterx(20) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(20) - CARD_GAP;
  Bx = circleCenterx(24) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(24) - CARD_GAP;
  Cx = circleCenterx(24) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(24) + CARD_GAP;
  Dx = circleCenterx(20) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(20) + CARD_GAP;

  if (row5 > 0) {
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
  Bx = circleCenterx(20) + CARD_GAP;
  By = circleCentery(20) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(20) - CARD_GAP;
  Cy = circleCentery(20) + CARD_RADIUS + CARD_GAP;
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
  Bx = circleCenterx(21) + CARD_GAP;
  By = circleCentery(21) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(21) - CARD_GAP;
  Cy = circleCentery(21) + CARD_RADIUS + CARD_GAP;
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
  Bx = circleCenterx(22) + CARD_GAP;
  By = circleCentery(22) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(22) - CARD_GAP;
  Cy = circleCentery(22) + CARD_RADIUS + CARD_GAP;
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

  // column 4
  Ax = circleCenterx(3) + CARD_GAP;
  Ay = circleCentery(3) - CARD_RADIUS - CARD_GAP;
  Bx = circleCenterx(23) + CARD_GAP;
  By = circleCentery(23) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(23) - CARD_GAP;
  Cy = circleCentery(23) + CARD_RADIUS + CARD_GAP;
  Dx = circleCenterx(3) - CARD_GAP;
  Dy = circleCentery(3) - CARD_RADIUS - CARD_GAP;

  if (col4 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // column 5
  Ax = circleCenterx(4) + CARD_GAP;
  Ay = circleCentery(4) - CARD_RADIUS - CARD_GAP;
  Bx = circleCenterx(24) + CARD_GAP;
  By = circleCentery(24) + CARD_RADIUS + CARD_GAP;
  Cx = circleCenterx(24) - CARD_GAP;
  Cy = circleCentery(24) + CARD_RADIUS + CARD_GAP;
  Dx = circleCenterx(4) - CARD_GAP;
  Dy = circleCentery(4) - CARD_RADIUS - CARD_GAP;

  if (col5 > 0) {
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
    circleCenterx(24) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(24) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(24) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(24) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
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
    circleCenterx(19) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(19) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(19) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(19) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
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
    circleCenterx(20) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(20) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(20) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(20) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(20) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(20) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(20) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(20) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

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
    circleCenterx(14) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(14) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(14) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(14) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
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
    circleCenterx(15) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(15) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(21) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(21) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(21) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(21) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(15) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(15) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

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
    circleCenterx(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(9) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(9) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(9) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(9) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag4 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(10) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(10) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(22) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(22) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(22) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(22) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(10) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(10) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

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
    circleCenterx(4) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(4) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(4) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(4) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(4) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(4) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(4) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(4) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag5 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(5) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(5) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(23) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(23) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(23) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(23) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(5) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(5) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

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

  if (diag6 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(9) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(9) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(21) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(21) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(21) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(21) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(9) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(9) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag6 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 7
  Ax =
    circleCenterx(1) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(1) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(5) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(5) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(5) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(5) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(1) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(1) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag7 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(14) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(14) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(22) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(22) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(22) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(22) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(14) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(14) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag7 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 8
  Ax =
    circleCenterx(2) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(2) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(10) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(10) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(10) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(10) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(2) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(2) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag8 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(19) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(19) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(23) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(23) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(23) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(23) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(19) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(19) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 9
  Ax =
    circleCenterx(3) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(3) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(15) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(15) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(15) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(15) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(3) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(3) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag9 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  Ax =
    circleCenterx(24) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(24) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(24) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(24) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(24) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(24) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(24) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(24) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag9 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // diagonal 10
  Ax =
    circleCenterx(4) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Ay =
    circleCentery(4) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Bx =
    circleCenterx(20) + CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  By =
    circleCentery(20) + CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cx =
    circleCenterx(20) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Cy =
    circleCentery(20) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dx =
    circleCenterx(4) - CARD_GAP / sqrt(2) + (CARD_RADIUS + CARD_GAP) / sqrt(2);
  Dy =
    circleCentery(4) - CARD_GAP / sqrt(2) - (CARD_RADIUS + CARD_GAP) / sqrt(2);

  if (diag10 > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);

  // line at infinity
  Ax = circleCenterx(25) - CARD_RADIUS - CARD_GAP;
  Ay = circleCentery(25) - CARD_GAP;
  Bx = circleCenterx(30) + CARD_RADIUS + CARD_GAP;
  By = circleCentery(30) - CARD_GAP;
  Cx = circleCenterx(30) + CARD_RADIUS + CARD_GAP;
  Cy = circleCentery(30) + CARD_GAP;
  Dx = circleCenterx(25) - CARD_RADIUS - CARD_GAP;
  Dy = circleCentery(25) + CARD_GAP;

  if (lineAtInf > 0) {
    col = color(0, 255, 0);
  } else {
    col = 255;
  }

  drawLineFilled(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, col);
  drawLineSegment(Ax, Ay, Bx, By);
  drawLineSegment(Cx, Cy, Dx, Dy);
}
