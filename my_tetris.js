 ////////// variables //////////
    showScore = document.querySelector('#score')
    score = 0
    best_score = 0
    button = document.querySelector('#start-button')
    reset_button = document.querySelector('#reset-button')
    width = 10
    next_random = 0
    time = null
    Playing = 0
    GameOver = 0
    
    ///////// grid /////////
    grid = document.querySelector('.grid')
    for(i = 0; i < 200; i++) {
        div = document.createElement('div')
        grid.appendChild(div)
    }
    
    // Ligne invisible du bas (barrière)
    for(i = 0; i < 10; i++) {
        div = document.createElement('div')
        div.classList.add("solid")
        div.classList.add("border")
        grid.appendChild(div)
    }

     square = Array.from(document.querySelectorAll('.grid div'))

     next_grid = document.querySelector('.next-grid')
    for(i = 0; i < 16; i++) {
        div = document.createElement('div')
        next_grid.appendChild(div)
    }

     hold_grid = document.querySelector('.hold-grid')
    for(i = 0; i < 16; i++) {
        div = document.createElement('div')
        hold_grid.appendChild(div)
    }
 
    ///////// next-grid ////////
    next_square = document.querySelectorAll('.next-grid div')
    next_grid_width = 4
    next_grid_index = 0

     base_tetromino = [[next_grid_width, next_grid_width+1, next_grid_width+2, next_grid_width+3], //cyan
    [next_grid_width+1, next_grid_width+2, next_grid_width*2, next_grid_width*2+1], //red
    [next_grid_width, next_grid_width+1, next_grid_width*2+1, next_grid_width*2+2], //green
    [next_grid_width+1, next_grid_width*2, next_grid_width*2+1, next_grid_width*2+2], //purple
    [next_grid_width+1, next_grid_width+2, next_grid_width*2+1, next_grid_width*2+2], //yellow
    [next_grid_width+2, next_grid_width*2, next_grid_width*2+1, next_grid_width*2+2], //orange
    [next_grid_width+1, next_grid_width*2+1, next_grid_width*2+2, next_grid_width*2+3]] //blue
     function draw_next_grid() {
        next_square.forEach(square => {
            colors_tetrominoes.forEach(color => square.classList.remove(color))
        })
        
        base_tetromino[next_random].forEach(index => {next_square[next_grid_index + index].classList.add(colors_tetrominoes[next_random])})
    }

     ///////// hold-grid //////////
    hold_square = document.querySelectorAll('.hold-grid div')
    hold_grid_index = 0
    hold_tetromino = null

     function draw_hold_grid() {

         if(hold_tetromino == null)  {
            base_tetromino[random].forEach(index => {hold_square[hold_grid_index + index].classList.add(colors_tetrominoes[random])})
            remove()
            hold_tetromino = random
            random = next_random
            next_random = Math.floor(Math.random() * tetrominoes.length)
            current_tetromino = tetrominoes[random][0]

             position = 3
            side = 0

             draw()
            draw_next_grid()
        }

         else {
            hold_square.forEach(square => {
                colors_tetrominoes.forEach(color => square.classList.remove(color))
            })
            
            remove()
            tmp = hold_tetromino
            hold_tetromino = random
            random = tmp
            current_tetromino = tetrominoes[random][side]

             draw()
            base_tetromino[hold_tetromino].forEach(index => {hold_square[hold_grid_index + index].classList.add(colors_tetrominoes[hold_tetromino])})
        }

     }

     //////// start/stopt button /////////
    button.addEventListener('click', () => { 
        if (GameOver) {
            resetGame()
            return 0
        }

         if(time){
            clearInterval(time)
            time = 0
            Playing = 0
        }
        else if(time==null){
            draw()
            time = setInterval(goDown, 1000)
            Playing = 1
            next_random = Math.floor(Math.random() * tetrominoes.length)
            draw_next_grid()
        }

         else{
            draw()
            draw_next_grid()
            time = setInterval(goDown, 1000)
            Playing = 1
        }
    })

 
     reset_button.addEventListener('click', () => { 
            resetGame()
    })

   
    //////// line done and score ////////
    function addscore() {
        for (i = 0; i < square.length - 10; i += width) {
    
            row = []
            for (j = 0; j < width; j++) {
                row.push(i + j)
            }
    
            if (row.every(index => square[index].classList.contains("solid"))) {
                score += 20
                showScore.innerHTML = score
    
                row.forEach(index => {
                    colors_tetrominoes.forEach(color => square[index].classList.remove(color))
                    square[index].classList.remove("solid")
                    remove()
                })
    
                removedSquares = square.splice(i, width)
                square = removedSquares.concat(square)
                square.forEach(cell => grid.appendChild(cell))
            }
        }
    }

 /////// game over & reset///////
    function game_over(){
        if(current_tetromino.some(index => square[position + index].classList.contains("solid"))){
            showScore.innerHTML = "END"
            clearInterval(time)
            time = null
            Playing = 0
            GameOver = 1
        }
    }

     function resetGame(){
        if(score > best_score){
            best_score = score
        }
        score = 0
        showScore.innerHTML = score
        Playing = 0
        GameOver = 0
        position = 3
        side = 0
        hold_tetromino = null
        clearInterval(time)
        time = null

         draw_star()
    
        square.slice(0,200).forEach(c => c.className = "")
        next_square.forEach(c => c.className = "")
        hold_square.forEach(c => c.className = "")
    
        random = Math.floor(Math.random()*tetrominoes.length)
        next_random = Math.floor(Math.random()*tetrominoes.length)
        current_tetromino = tetrominoes[random][0]
    }
