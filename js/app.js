//*-------------------------*
//|        MEMORY           |
//|                         |
//|         GAME            |
//|                         |
//|         2018            |
//|                         |
//|       COLOMBIA          |
//|                         |
//*-------------------------*



// * Variables*

// Cards of the game 

let cards_icons =["bicycle","bicycle","leaf","leaf","cube","cube",
                "anchor","anchor","paper-plane-o","paper-plane-o",
                "bolt","bolt","bomb","bomb","diamond","diamond"],

    deck= $(".deck"),
    time,
    restart=$(".restart"),
    stars= $("i"),
    moves_player= $(".moves_player"),
    num_mov = 0,
    panel_points= $(".score-panel"),
    match =0,
    open = [],
    click_player=0;



// Is an algorithm to place the cards of the game randomly, like random style
//
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Start of the game 
let start = ()=> {

  let cards_game = shuffle(cards_icons);
  deck.empty();
  num_mov=0;
  match=0;
  moves_player.text("0");

  // replace  the stars on the screen 
  stars.removeClass("fa-star-o").addClass("fa-star");

  for(let i = 0; i< cards_game.length; i++){

   // add the cards 
   deck.append($('<li class="card"><i class ="fa fa-'+ cards_game[i]+'"></i></li>'))

} 
  events();
	$(".clock_game").text("0:00");

};

// indicates the time as the game goes by

let time_play=()=>{

  let time_new= new Date().getTime();


   // indicates the time elapsed at each moment
  
   time =setInterval(() =>{

     let time_actual = new Date().getTime();

     // time between the moment in this moment and start
     
     let total_time = time_actual - time_new;
 

     // minutes and seconds
     
     let minutes = Math.floor((total_time %(1000*60*60))/(1000*60));
     let second = Math.floor((total_time % (1000*60))/1000);

    
     if(second < 10){


       second = "0" + second;



     }

     let time_visible = minutes + ":" + second;

     



    // show the time on the screen
    
     

     
      
      $(".clock_game").text(time_visible);

 }, 750);

};

// change the stars Points 
let pointsStars = (num_mov)=>{


   // depends of the number of movements of the player , the stars change
  
  let points = 3;
  if(num_mov<= 10){

     stars.eq(3).removeClass("fa-star").addClass("fa-star-o")
     points=3;

  }

  else if(num_mov > 10 && num_mov <=20){

     stars.eq(2).removeClass("fa-star").addClass("fa-star-o")
     points=2;

  }
  
   else if(num_mov > 20){

     stars.eq(1).removeClass("fa-star").addClass("fa-star-o")
     points=1;
 }

 return { points };

}


// end of the game 

let finish=(num_mov, points)=>{

 
 let message= points == 1 ? points + " Star" :points + " Stars";
 


 // || boostrap modal window ||
   swal({
		allowEscapeKey: false,
		allowOutsideClick: false,

		title: 'Congratulations! You Won!',
		text: 'With ' + num_mov + ' Moves and ' + message + "<br>"+ "Time: "+ $(".clock_game").text(),
    //, eso que esta ahi es una prueba mia ,
		type: 'success',
		confirmButtonColor: '#02ccba',
		confirmButtonText: 'Play again!'
	}).then((isConfirm)=> {

      
      if(isConfirm){

      	click_player=0;
      	clearInterval(time);
      	start();
      }

 })

}


// listeners of click user and other events
let events =()=>{


  deck.find(".card:not('.match, .open')").bind("click", function(){

   click_player++;
   click_player == 1? time_play() : '';

   if($(".show").length > 1){ return true;};
    // Check for call to be heppend before all dom update
   let this_element = $(this), cards_game = this_element.context.innerHTML;

    // check if the player open the same card
    
   if(this_element.hasClass("open")){ return true;};

   this_element.addClass("open show");
    open.push(cards_game);
    
    // Check with opened card
    // Add view changes in cards
	// Remove css animation classes

   if(open.length > 1){

   	if(cards_game === open[0]){

     deck.find(".open").addClass("match animated infinite rubberBand");
     setTimeout(()=>{

     deck.find('.match').removeClass('open show animated infinite rubberBand');
	      }, 800);
	      match++;
	    } else {
	      deck.find('.open').addClass('notmatch animated infinite wobble');
				setTimeout(()=> {
					deck.find('.open').removeClass('animated infinite wobble');
				}, 800 / 1.5);
	      setTimeout(()=> {
	        deck.find('.open').removeClass('open show notmatch animated infinite wobble');
	      }, 800);
	    
     
   	}

   	open =[];
   	 num_mov++
   	 pointsStars(num_mov);
   	 moves_player.html(num_mov);


  }
     
     // if all cards are matched the game end

     if (match === 8) {
			pointsStars(num_mov);
			let points = pointsStars(num_mov).points;
      clearInterval(time);
			setTimeout(()=> {
				finish(num_mov, points);
			}, 500);
	  }	
	});
};

  // Restart the game 
  // screen modal for choose options
 restart.bind("click" ,()=>{

  swal({
    allowEscapeKey: false,
    
    title: 'Are you sure?',
    text: "Your progress will be Lost!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#02ccba',
    cancelButtonColor: '#f95c3c',
    confirmButtonText: 'Yes, Restart Game!'
  }).then((isConfirm)=> {
    if (isConfirm) {
			click_player = 0;
			clearInterval(time);
      start();
    }
  })
});




// call for start the game
start()

