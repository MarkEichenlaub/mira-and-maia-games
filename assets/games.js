/* Arcade manifest — loaded via <script> (no fetch, works offline from file://).
   modes: A = vs computer, 2 = 2 players, S = solo, E = explore/toy, P = printable. */
window.GAMES = {
  sections: [
    {
      id: 'ba',
      title: 'Beast Academy Playground',
      emoji: '🐻',
      blurb: 'Playable versions of the math games & activities from Beast Academy Playground.',
      groups: [
        {
          name: 'Thinking Games', emoji: '🧠',
          games: [
            { slug:'ba/sim', title:'Sim', emoji:'🔺', color:'#ff5a5f', desc:"Draw lines — but don't make a triangle in your color!", modes:['A','2'] },
            { slug:'ba/circuit-breaker', title:'Circuit Breaker', emoji:'⚡', color:'#3a86ff', desc:'Connect your wires across the board before your rival.', modes:['A','2'] },
            { slug:'ba/fifteen', title:'Fifteen', emoji:'🃏', color:'#8338ec', desc:'Grab three cards that add up to 15. (Secret tic-tac-toe!)', modes:['A','2'] },
            { slug:'ba/anywhere-nim', title:'Anywhere Nim', emoji:'🔢', color:'#2ec4b6', desc:"Say one or two numbers — say '10' to win!", modes:['A','2'] },
            { slug:'ba/odd-knights', title:'Odd Knights', emoji:'♟️', color:'#ff9f1c', desc:'Take knights from the circle; end with an odd number.', modes:['A','2'] },
            { slug:'ba/bumper-cars', title:'Bumper Cars', emoji:'🚗', color:'#ff70a6', desc:'Move the cars; be the one to pick up the blue car!', modes:['A','2'] },
            { slug:'ba/high-ground', title:'High Ground', emoji:'⛰️', color:'#2ec4b6', desc:'Grow chains of numbers; write the highest number to win.', modes:['A','2'] },
            { slug:'ba/troll-hole', title:'Troll Hole', emoji:'🧌', color:'#8338ec', desc:'The troll eats the numbers next to the empty hole!', modes:['A','2'] },
            { slug:'ba/fruit-flies', title:'Fruit Flies', emoji:'🍇', color:'#ff5a5f', desc:"Munch grapes and hop around — don't get stuck!", modes:['A','2'] },
            { slug:'ba/fox-and-hare', title:'Fox & Hare', emoji:'🦊', color:'#ff9f1c', desc:'Be the fox and catch the hare — or the hare and escape!', modes:['A','2'] },
            { slug:'ba/hexagon-vs-triangle', title:'Hexagon vs Triangle', emoji:'🪙', color:'#ffd23f', desc:'Slide coins to build your secret shape first.', modes:['A','2'] },
            { slug:'ba/sprouts', title:'Sprouts', emoji:'🌱', color:'#2ec4b6', desc:'Connect dots with vines; draw the last vine to win.', modes:['A','2'] },
            { slug:'ba/cookie-cutter', title:'Cookie Cutter', emoji:'🍪', color:'#ff9f1c', desc:'Stamp cookies on the dough; stamp the last one!', modes:['A','2','S'] },
            { slug:'ba/blind-heist', title:'Blind Heist', emoji:'💎', color:'#3a86ff', desc:'Secretly split your gems across three vaults.', modes:['A','2'] },
            { slug:'ba/carronade', title:'Carronade', emoji:'🚢', color:'#3a86ff', desc:"Hide your ships and sink your rival's fleet!", modes:['A','2'] },
            { slug:'ba/cartographer', title:'Cartographer', emoji:'🗺️', color:'#2ec4b6', desc:'Color real maps so no two neighbors match.', modes:['S'] },
          ]
        },
        {
          name: 'Dice & Luck', emoji: '🎲',
          games: [
            { slug:'ba/pig', title:'Pig', emoji:'🐷', color:'#ff70a6', desc:'Roll for points — but a 1 wipes your turn. Press your luck!', modes:['A','2','S'] },
            { slug:'ba/pick-your-pony', title:'Pick Your Pony', emoji:'🐎', color:'#ff9f1c', desc:'Pick ponies and cheer them down the dice-roll racetrack.', modes:['A','2','S'] },
            { slug:'ba/odds-vs-evens', title:'Odds & Evens', emoji:'✋', color:'#8338ec', desc:'Throw fingers — is the total odd or even?', modes:['A','2'] },
            { slug:'ba/towers', title:'Towers', emoji:'🏗️', color:'#3a86ff', desc:'Flip cards and stack all five of your towers first.', modes:['A','2','S'] },
            { slug:'ba/xray-dice', title:'X-Ray Dice', emoji:'🔮', color:'#8338ec', desc:'Magic! Guess the hidden bottom of the die.', modes:['S'] },
          ]
        },
        {
          name: 'Card Games', emoji: '🃏',
          games: [
            { slug:'ba/tens-go-fish', title:'Tens Go Fish', emoji:'🎣', color:'#3a86ff', desc:'Go fish for pairs that add up to ten!', modes:['A','2'] },
            { slug:'ba/hungry-monster', title:'Hungry Monster', emoji:'👹', color:'#ff5a5f', desc:'Feed the monster the bigger card — collect the most!', modes:['A','2'] },
            { slug:'ba/speed', title:'Speed', emoji:'💨', color:'#2ec4b6', desc:'Play cards fast — first to empty your pile wins!', modes:['A','S'] },
          ]
        },
        {
          name: 'Memory', emoji: '🧩',
          games: [
            { slug:'ba/memory-matching', title:'Memory Match', emoji:'🧠', color:'#ff70a6', desc:'Flip and find the matching pairs.', modes:['A','2','S'] },
            { slug:'ba/memory-ten-apart', title:'Ten Apart', emoji:'🔟', color:'#ff9f1c', desc:'Match cards that are ten apart, like 4 and 14.', modes:['A','2','S'] },
          ]
        },
        {
          name: 'Aim & Action', emoji: '🎯',
          games: [
            { slug:'ba/wrecking-ball', title:'Wrecking Ball', emoji:'🔨', color:'#ff9f1c', desc:'Swing to smash number blocks and cross off 1–13.', modes:['A','2','S'] },
            { slug:'ba/trashketball', title:'Trashketball', emoji:'🗑️', color:'#2ec4b6', desc:'Toss paper balls in the can and score with math.', modes:['A','2','S'] },
            { slug:'ba/kanga-ruler', title:'Kanga-Ruler', emoji:'🦘', color:'#ff70a6', desc:'Hop and skip-count down the number path!', modes:['2','S'] },
          ]
        },
        {
          name: 'Make & Explore', emoji: '✨',
          games: [
            { slug:'ba/mobius-madness', title:'Möbius Madness', emoji:'♾️', color:'#8338ec', desc:'A magic loop with only ONE side — draw, color & cut it!', modes:['E'] },
            { slug:'ba/fortune-teller', title:'Magic Fortune Teller', emoji:'🪄', color:'#ff5a5f', desc:'A flipping symmetry trick — predict the arrow!', modes:['E'] },
            { slug:'ba/candle-conundrum', title:'Candle Conundrum', emoji:'🕯️', color:'#ff9f1c', desc:'Slide the pieces — a candle magically changes color!', modes:['E'] },
            { slug:'ba/square-flexagon', title:'Flexagon', emoji:'🎭', color:'#2ec4b6', desc:'Flex the paper to reveal hidden faces!', modes:['E'] },
            { slug:'ba/sierpinski-foldout', title:'Fractal Fold-Out', emoji:'🔻', color:'#3a86ff', desc:'Fold again and again — watch the fractal grow.', modes:['E'] },
            { slug:'ba/popup-dodecahedron', title:'Spin-a-Dodecahedron', emoji:'⬡', color:'#ff70a6', desc:'Spin a 3D shape: 12 faces, 20 corners, 30 edges.', modes:['E'] },
            { slug:'ba/number-deck', title:'Number Deck', emoji:'🎴', color:'#ffd23f', desc:'Make & print your own number cards for the games.', modes:['P'] },
          ]
        },
      ]
    },
    {
      id: 'mine',
      title: "Mira & Maia's Own Games",
      emoji: '⭐',
      blurb: 'Games we made together with Claude.',
      groups: [
        {
          name: '', emoji: '',
          games: [
            { slug:'mine/penguin-maze', title:'Penguin Maze', emoji:'🐧', color:'#3a86ff', desc:'Steer a penguin through a twisty ice maze.', modes:['S'] },
            { slug:'mine/six-vs-nine', title:'Six vs. Nine', emoji:'6️⃣', color:'#ff9f1c', desc:'Is it a 6 or a 9? Spot it fast!', modes:['S'] },
            { slug:'mine/time-to-get-up', title:'Time to Get Up?', emoji:'⏰', color:'#ff70a6', desc:"Read the clock — is it time to get up yet?", modes:['S'] },
            { slug:'mine/photo-memory', title:'Photo Memory', emoji:'🖼️', color:'#2ec4b6', desc:'Match pairs of your very own photos.', modes:['S'] },
            { slug:'mine/piano-garden', title:'Piano Garden', emoji:'🎹', color:'#8338ec', desc:'Play the piano and grow a flower garden.', modes:['S'] },
          ]
        }
      ]
    },
    {
      id: 'spot-it',
      title: 'Spot It Puzzles',
      emoji: '🔎',
      blurb: 'Matching-card puzzles built on beautiful math (projective planes!).',
      groups: [
        {
          name: '', emoji: '',
          games: [
            { slug:'spot-it/order-3', title:'Spot It (Order 3)', emoji:'🃏', color:'#ff5a5f', desc:'Arrange cards so every line shares one matching picture.', modes:['S'] },
            { slug:'spot-it/order-5', title:'Spot It (Order 5)', emoji:'🎴', color:'#3a86ff', desc:'The big 31-card matching puzzle.', modes:['S'] },
            { slug:'spot-it/fano-plane', title:'Fano Plane', emoji:'🎯', color:'#8338ec', desc:'The smallest matching puzzle — 7 magical points.', modes:['S'] },
          ]
        }
      ]
    }
  ]
};
