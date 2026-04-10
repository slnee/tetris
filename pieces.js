///////////// The Tetrominoes /////////////
 cyan = [[width, width+1, width+2, width+3], [1, width+1, width*2+1, width*3+1], [width, width+1, width+2, width+3], [1, width+1, width*2+1, width*3+1]]

  red = [[1, 2, width, width+1], [0, width, width+1, width*2+1], [1, 2, width, width+1], [0, width, width+1, width*2+1]]

  green = [[0, 1, width+1, width+2], [1, width, width+1, width*2], [0, 1, width+1, width+2], [1, width, width+1, width*2]]

  purple = [[1, width, width+1, width+2], [1, width+1, width+2, width*2+1], [width, width+1, width+2, width*2+1], [1, width, width+1, width*2+1]]

  yellow = [[0, 1, width, width+1], [0, 1, width, width+1], [0, 1, width, width+1], [0, 1, width, width+1]]

  orange = [[width, width+1, width+2, width*2], [0, 1, width+1, width*2+1], [width*2, width*2+1, width*2+2, width+2], [0, width, width*2, width*2+1]]

  blue = [[width, width*2, width*2+1, width*2+2], [1, width+1, width*2+1, 2], [width, width+1, width+2, width*2+2], [1, width+1, width*2+1, width*2]]

  tetrominoes = [cyan, red, green, purple, yellow, orange, blue]
 colors_tetrominoes = ["cyan", "red", "green", "purple", "yellow", "orange", "blue"]

 
  random = Math.floor(Math.random()*tetrominoes.length) //choose a tetromino randomly
 position = 3 //starting place of the tetrominoes
 side = 0 //wich side the tetromino is
 current_tetromino = tetrominoes[random][side]

 
  //draw the tetromino
 function draw() {
     current_tetromino.forEach(index => {
         square[position + index].classList.add(colors_tetrominoes[random])})
 }

  //delete the tetromino
 function remove(){
     current_tetromino.forEach(index => colors_tetrominoes.forEach(color =>
             square[position + index].classList.remove(color)
         )
     )
 }

 
  /////////////key, controles and movement//////////////
  //assign function to keycode
 function controle(event) {
     if (Playing == 0 || GameOver == 1) {
         return 0
     } 

      if(event.keyCode == 40 || event.keyCode == 83){
         goDown()
     }

      else if(event.keyCode == 37 || event.keyCode == 81){
         goLeft()
     }

      else if(event.keyCode == 39 || event.keyCode == 68){
         goRight()
     }

      else if(event.keyCode == 38 || event.keyCode == 90){
         rotate()
     }

      else if(event.keyCode == 187 || event.keyCode == 69){
         draw_hold_grid()
     }

      else if(event.keyCode == 16 || event.keyCode == 65){
         score += 2
         showScore.innerHTML = score
         Hard_drop()
     }
 }
 
 document.addEventListener('keydown', controle)

  function goDown() {
     remove()
     position += width
     draw()
     stop()
 }

  function Hard_drop() {
     remove()
     while(!current_tetromino.some(index => square[position + index + width].classList.contains("solid"))) {
         position += width
     }
     draw()
     stop()
 }

  //move left unless you're at the left border of the grid or there is a tetromino
 function goLeft() {
     remove()
     border = current_tetromino.some(index => (position + index) % width == 0)
     if(border) {
         position = position
         draw()
     }

      else{
         position -= 1
         draw()
     }

      if(current_tetromino.some(index => square[position + index]).classList.contains("solid")){
         position += 1
         draw()
     }
 }

 
  //move right unless you're at the left border of the grid or there is a tetromino
 function goRight() {
     remove()
     border = current_tetromino.some(index => (position + index) % width == width - 1)

      if(border) {
         position = position
         draw()
     }

      else{
         position += 1
         draw()
     }

      if(current_tetromino.some(index => square[position + index]).classList.contains("solid")){
         position -= 1
         draw()
     }
 }

  //rotate the tetromino
 function rotate() {
     remove()
     oldSide = side
     side++
 
     if (side === tetrominoes[random].length) {
         side = 0
     }
     rotated = tetrominoes[random][side]
 
     isAtLeftEdge = rotated.some(index => (position + index) % width === 0)
     isAtRightEdge = rotated.some(index => (position + index) % width === width - 1)
 
     if (isAtLeftEdge && isAtRightEdge) {
         side = oldSide
     } 
     else {
         current_tetromino = rotated
     }
     draw()
 }

  //stop the tetromino
 function stop() {
     if(current_tetromino.some(index => square[position + index + width].classList.contains("solid"))) {
         current_tetromino.forEach(index => square[position + index].classList.add("solid"))
         random = next_random
         next_random = Math.floor(Math.random() * tetrominoes.length)
         current_tetromino = tetrominoes[random][0]

          position = 3
         side = 0

          draw()
         draw_next_grid()
         addscore()
         game_over()
     }
 }
