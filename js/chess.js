var dbclicked = false;
var unicodes = [];
var clicked = false;

function startTimer() {

	var countdownTimer = setInterval(function () {

		var chessOfXML = document.querySelector("#chess-block");

		if (chessOfXML != null) {
			document.querySelector("#chess-block").onclick = function () {


				var chessxml;

				document.getElementById("home-icon").style.display = "initial";
				document.getElementById("pwd").innerHTML = "chess";

				var chessxml;
				var xhr = new XMLHttpRequest();
				//xhr.open('get', 'http://ceit.aut.ac.ir/~sepehr/Saba/chess2.xml', false);
				xhr.open('get', 'http://ie.ce-it.ir/hw3/xml/chess.xml', false);
				
					xhr.send();
				chessxml = xhr.responseXML;
				chess_xml_processor(chessxml);
			}
			clearTimeout(countdownTimer);
		}
	}, 300);
}
startTimer();


function chess_xml_processor(chessxml) {
	document.querySelector('#main-container').innerHTML = "";
	var panel = document.createElement("div");
	panel.setAttribute("id", "chess");
	var info = document.createElement("div");
	info.setAttribute("id", "chess-info");
	var w_score = document.createElement("div");
	w_score.setAttribute("class", "score");
	w_score.innerHTML = "white score: ";
	var white = document.createElement("span");
	white.setAttribute("id", "white-score");
	w_score.appendChild(white);
	var b_score = document.createElement("div");
	b_score.setAttribute("class", "score");
	b_score.innerHTML = "black score: ";
	var black = document.createElement("span");
	black.setAttribute("id", "black-score");
	 ///////////////////////////////////////
	b_score.appendChild(black);
	var turn = document.createElement("div");
	turn.setAttribute("id", "turn");
	turn.setAttribute("class", chessxml.querySelector('chess').getAttribute('turn'));
	turn.innerHTML = turn.getAttribute("class");
	var w_chessman = document.createElement("div");
	w_chessman.setAttribute("id", "white-chessman-panel");
	var b_chessman = document.createElement("div");
	b_chessman.setAttribute("id", "black-chessman-panel");
	var board = document.createElement("table");
	var rows = [];
	for (i = 0; i < 8; i++) {
		var cols = [];
		rows[i] = document.createElement("tr");
		for (j = 0; j < 8; j++) {
			cols[j] = document.createElement("td");
			rows[i].appendChild(cols[j]);



		}
		board.appendChild(rows[i]);
	}
	w_chessman.style.color='white';
	b_chessman.style.color='black';




	info.appendChild(w_score);
	info.appendChild(turn);
	info.appendChild(b_score);
	document.querySelector('#main-container').appendChild(panel);
	panel.appendChild(info);
	panel.appendChild(w_chessman);
	panel.appendChild(board);
	panel.appendChild(b_chessman);
	


	$("#chess table tr:nth-child(2n+1) td:nth-child(2n+1)").css("background-color",chessxml.querySelector('board').getAttribute('white-cells'));
	
	$("#chess table tr:nth-child(2n) td:nth-child(2n)").css("background-color",chessxml.querySelector('board').getAttribute('white-cells'));

	
	$("#chess table tr:nth-child(2n+1) td:nth-child(2n)").css("background-color",chessxml.querySelector('board').getAttribute('black-cells'));
	
	$("#chess table tr:nth-child(2n) td:nth-child(2n+1)").css("background-color",chessxml.querySelector('board').getAttribute('black-cells'));

	
	//setting row and column for each td
	for (i = 0; i < 8; i++) {
		for (j = 0; j < 8; j++) {
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('row', i);
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('col', j);
		}
	}



	///////////initializations
	///////////reading from xml attributes

	var white_mans = chessxml.querySelector('board').querySelector('white');
	var black_mans = chessxml.querySelector('board').querySelector('black');

	var chess_mans = chessxml.querySelector('chessmans');
	var wfield =  chessxml.querySelector('board').querySelector('white').getAttribute('field');
	var bfield = chessxml.querySelector('board').querySelector('black').getAttribute('field');
	//var wfield='bottom';
	//var bfield='top';
	
	
	var wi_score = 0,
		bl_score = 0;
	for (i = 0; i < chess_mans.childElementCount; i++) { ///be tedade noe mohre ha
		unicodes[chess_mans.children[i].tagName] = chess_mans.querySelector(chess_mans.children[i].tagName).getAttribute('unicode');
		//baraye un noe khas , mire az roo board mikhune (whitemans az ru boarde) noe mohrasho

		var w_mans = white_mans.querySelectorAll(chess_mans.children[i].tagName);
		var b_mans = black_mans.querySelectorAll(chess_mans.children[i].tagName);


		//for that group , with white color
		for (k = 0; k < w_mans.length; k++) {
			r = w_mans[k].getAttribute('row');
			c = w_mans[k].getAttribute('col');
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].innerHTML = unicodes[chess_mans.children[i].tagName];
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].style.color = 'white';
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('color', 'white');
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('type', chess_mans.children[i].tagName);
			//	document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('firstmove', 'true');
			
			/*if (chess_mans.children[i].tagName == 'bishop') {
				if (w_mans[k].getAttribute('type') == 'black')
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('ro', 'siaro');
				if (w_mans[k].getAttribute('type') == 'white')
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('ro', 'sefidro');
			}
			*/
			
				if (wfield=='top'){
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('homefield', 'bottom');
				}
				else if (wfield=='bottom'){
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('homefield', 'top');
				}
			
		
		}
		
		for (l = 0; l < b_mans.length; l++) {
			r = b_mans[l].getAttribute('row');
			c = b_mans[l].getAttribute('col');
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].innerHTML = unicodes[chess_mans.children[i].tagName];
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].style.color = 'black';
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('color', 'black');
			document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('type', chess_mans.children[i].tagName);
			/*if (chess_mans.children[i].tagName == 'bishop') {
				if (b_mans[l].getAttribute('type') == 'black') ///// tooye xml, belakhare ye bishopi darim ke type dare 
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('ro', 'black');
				if (b_mans[l].getAttribute('type') == 'white')
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('ro', 'white');
			}
			*/
			
				if (bfield=='top'){
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('homefield', 'bottom');
				}
				else if (bfield=='bottom'){
					document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c].setAttribute('homefield', 'top');
				}
			
			

		}


		/////////////////////////////out haye avalie
		var wouts, bouts;
		if (chess_mans.children[i].tagName == 'pawn') {
			wouts = 8 - w_mans.length;
			bouts = 8 - b_mans.length;
			wi_score += bouts * 1;
			bl_score += wouts * 1;
		} else if (chess_mans.children[i].tagName == 'king' || chess_mans.children[i].tagName == 'queen') {
			wouts = 1 - w_mans.length;
			bouts = 1 - b_mans.length;
			wi_score += bouts * 9;
			bl_score += wouts * 9;

		} else {
			wouts = 2 - w_mans.length;
			bouts = 2 - b_mans.length;
			if (chess_mans.children[i].tagName == 'rook') {
				wi_score += bouts * 5;
				bl_score += wouts * 5;
			} else {
				wi_score += bouts * 3;
				bl_score += wouts * 3;
			}
		}



		for (j = 0; j < wouts; j++) {
			document.querySelector('#white-chessman-panel').innerHTML += '\n';
			w_chessman.innerHTML += unicodes[chess_mans.children[i].tagName];
			


		}
		for (z = 0; z < bouts; z++) {
			document.querySelector('#black-chessman-panel').innerHTML += '\n';
			b_chessman.innerHTML += unicodes[chess_mans.children[i].tagName];
			

		}
	}
	document.querySelector('#black-score').innerHTML = bl_score;
	document.querySelector('#white-score').innerHTML = wi_score;
	
	
////////////////////////////////////// ba farze inke wfield 


	
	$('td').attr('mincastle','false');
	$('td').attr('maxcastle','false');
	
	/////defaultaro chek nikonam . age kasi ba defaul barabar yani first move un khune tru age na false . in yani age first move bashe 
	//maslan vase castling ya harkate sarbaz karbord dare
	$('td').attr('firstmoves', 'false');
	$('td').each(function () {
		if (($(this).attr('row') == 1 && $(this).attr('homefield') == 'top') || ($(this).attr('row') == 6 && $(this).attr('homefield') == 'bottom')) {
			if (($(this)).html() == unicodes['pawn']) {
				$(this).attr('firstmoves', 'true');
			}
		}
		if (($(this).attr('row') == 0 && $(this).attr('color') == 'black') || ($(this).attr('row') == 7 && $(this).attr('color') == 'white')) {
			if ($(this).attr('col') == 0 || $(this).attr('col') == 7) {
				if (($(this)).html() == unicodes['rook']) {
					$(this).attr('firstmoves', 'true');
				}
			}
			if ($(this).attr('col') == 1 || $(this).attr('col') == 6) {
				if (($(this)).html() == unicodes['knight']) {
					$(this).attr('firstmoves', 'true');
				}

			}
			if ($(this).attr('col') == 2 || $(this).attr('col') == 5) {
				if (($(this)).html() == unicodes['bishop']) {
					$(this).attr('firstmoves', 'true');
				}

			}
			if ($(this).attr('col') == 3) {
				if (($(this)).html() == unicodes['queen']) {
					$(this).attr('firstmoves', 'true');
				}

			}
			if ($(this).attr('col') == 4) {
				if (($(this)).html() == unicodes['king']) {
					$(this).attr('firstmoves', 'true');
				}

			}

		}
	})
	
	is_check(document.querySelector("#turn").innerHTML);
	




	$('td').attr('readytogo', 'false');
	$('td').attr('validate', 'false');
	var movingcolor, movingunicode, movingtype, killedcolor, killedunicode, killedtype,movinghomefield;
	$('td').click(function () {

			if (!clicked) {
				if (($(this).html()) != "") {
					movingcolor = $(this).attr('color');
					movinghomefield=$(this).attr('homefield');
					if (document.querySelector('#turn').innerHTML == movingcolor) {

						$(this).css('color', 'green');
						var r = parseInt($(this).attr('row'));
						var c = parseInt($(this).attr('col'));

						//////////PAWN
						if ($(this).attr('type') == 'pawn') {
							
							if ($(this).attr('firstmoves') == 'true') {
								if ($(this).attr('homefield') == 'bottom') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r - 1 && $(this).attr('col') == c) {
												$(this).attr('validate', 'true');
											}
											if ($(this).attr('row') == r - 2 && $(this).attr('col') == c) {
												if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) + 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML != "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('validate', 'false');
												} else if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) + 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML == "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('validate', 'true');
												}

											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('validate', 'true');
											}
										}

									})
								} else if ($(this).attr('homefield') == 'top') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r + 1 && $(this).attr('col') == c) {
												$(this).attr('validate', 'true');
											}
											if ($(this).attr('row') == r + 2 && $(this).attr('col') == c) {
												if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) - 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML != "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('validate', 'false');
												} else if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) - 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML == "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('validate', 'true');
												}

											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('validate', 'true');
											}
										}
									})
								}
							} else if ($(this).attr('firstmoves') == 'false') {

								if ($(this).attr('homefield') == 'bottom') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r - 1 && $(this).attr('col') == c) {

												$(this).attr('validate', 'true');
											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('validate', 'true');
											}
										}
									})


								} else if ($(this).attr('homefield') == 'top') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r + 1 && $(this).attr('col') == c) {
												$(this).attr('validate', 'true');
											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('validate', 'true');
											}
										}
									})
								}
							}

						}


						///////////KNIGHT
						if ($(this).attr('type') == 'knight') {


							$('td').each(function () {
								if (
									($(this).attr('row') == r - 2 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 2 || $(this).attr('col') == c + 2)) || ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 2 || $(this).attr('col') == c + 2)) || ($(this).attr('row') == r + 2 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1))
								) {
									$(this).attr('validate', 'true');
								}

							})

						}


						////////BISHOP
						if ($(this).attr('type') == 'bishop') {
							/*
									var m = c-r;
									var n = c-(-r);
									$("td").each(function() {
										var a = parseInt($(this).attr("col"))- parseInt( $(this).attr("row"));
										var b = $(this).attr("col") - (- $(this).attr("row"));
										if (a == m || b == n)
											$(this).css("background-color", "lightgreen");
									})
									*/

							var izbas, ikbas, bizbas, bikbas = false;
							for (i = r - 1; i >= 0; i--) {
								for (j = c + 1; j < 8; j++) {
									if (!ikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												ikbas = true;
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!izbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												izbas = true;
											
											}
										}
									}
								}

							}

							for (i = r + 1; i < 8; i++) {
								for (j = c + 1; j < 8; j++) {
									if (!bizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!bikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {
											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
											
											}
										}
									}
								}
							}




						}


						///////KING (VASE KING, 9 TA DORIASH . PAYIN KHODESH HARKUDUM POR BASHE NATUNE NEMIRE)
						if ($(this).attr('type') == 'king') {

							if($(this).attr('firstmoves')=='true'){
								
								if(document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-4].getAttribute('firstmoves')=='true'){
									if (
										document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-3].innerHTML=="" && document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-2].innerHTML=="" && document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-1].innerHTML=="" ){
									console.log("CASTLE FIRST MOVE");
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-2].setAttribute('validate','true');
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-2].setAttribute('maxcastle','true');
									}
									
								}
								if(document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+3].getAttribute('firstmoves')=='true') {
									if (
										document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+1].innerHTML=="" && document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+2 ].innerHTML=="" ){
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+2].setAttribute('validate','true');
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+2].setAttribute('mincastle','true');
									
									
								}
							}
								
							}
							
							$('td').each(function () {
								if (
									($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c || $(this).attr('col') == c + 1))

								) {
									$(this).attr('validate', 'true');
								}

							})

						}


						//////////QUEEEN
						if ($(this).attr('type') == 'queen') {
							var izbas, ikbas, bizbas, bikbas = false;
							$('td').each(function () {
								if ($(this).attr('row') == r) {
									for (j = c + 1; j < 8; j++) {
										if (!bizbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
												
											}

										}
									}
									for (j = c - 1; j >= 0; j--) {
										if (!bikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
												
											}
										}
									}
								}

								if ($(this).attr('col') == c) {
									for (i = r + 1; i < 8; i++) {
										if (!izbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												izbas = true;
												
											}

										}
									}
									for (i = r - 1; i >= 0; i--) {
										if (!ikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												ikbas = true;
												
											}
										}
									}
								}

							})
							

							var jizbas, jikbas, jbizbas, jbikbas = false;
							for (i = r - 1; i >= 0; i--) {
								for (j = c + 1; j < 8; j++) {
									if (!jikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jikbas = true;
											
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!jizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jizbas = true;
												
											}
										}
									}
								}

							}

							for (i = r + 1; i < 8; i++) {
								for (j = c + 1; j < 8; j++) {
									if (!jbizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jbizbas = true;
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!jbikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {
											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jbikbas = true;
												
											}
										}
									}
								}
							}

						}


						/////////ROOK
						if ($(this).attr('type') == 'rook') {
							var izbas, ikbas, bizbas, bikbas = false;
							$('td').each(function () {
								if ($(this).attr('row') == r) {
									for (j = c + 1; j < 8; j++) {
										if (!bizbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
												
											}

										}
									}
									for (j = c - 1; j >= 0; j--) {
										if (!bikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
												
											}
										}
									}
								}

								if ($(this).attr('col') == c) {
									for (i = r + 1; i < 8; i++) {
										if (!izbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												izbas = true;
												
											}

										}
									}
									for (i = r - 1; i >= 0; i--) {
										if (!ikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('validate', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												ikbas = true;
											
											}
										}
									}
								}

							})
						}



						/////UN TD KE MIKHAYM HARKAT BEDIM readytogo true .  unicode o typesho begir.coloro home fieldesham bala gereftam
						$(this).attr('readytogo', 'true');
						movingunicode = $(this).html();
						movingtype = $(this).attr('type');

						/////be eza unike turneshe ,vase hame khune ha ,bia bebin age valid shodan , opacity avaz kon
						/////age poreo hamrange , nonvalidate va rangesh bargarde age hamrang nis ghermezam beshe
						$('td').each(function () {
							if ($(this).attr('validate') == 'true') {
								$(this).css('opacity', '0.85');

								if ($(this).html() != "") {
									if ($(this).attr('color') == movingcolor) {
										$(this).css('opacity', '1');
										$(this).attr('validate', 'false');
									} else {
										$(this).css('color', 'red');
									}
								}
							}
						})
						clicked = true;
					}
				}
			}
			else if (clicked) {
				console.log("CLICKKKKKK ");
				///harki click shod na . uni ke valid bude age click beshe ,dige tamum jabeja mishe
				if ($(this).attr('validate') == 'true') {
					$(this).attr('comingin','true');
					///moving chesman mikhad too in khune jadid ke click shode o valide						
					//if full,emtiaz be unike turneshe , attre color unicode typesho begire mohsrasham bere sootoon kenari

					if ($(this).html() != "") {
						console.log("PORaM zadatam");
						killedcolor = $(this).attr('color');
						killedtype = $(this).attr('type');
						killedunicode = $(this).html();
						updatescore(killedcolor, killedtype);
						updatecolumns(killedcolor, killedtype);
						$(this).html("");
						

					}
					
					
					///this unjayie ke dare mire
					
					if( movingunicode==unicodes['pawn'] && ( (movinghomefield=='bottom' && $(this).attr('row') == 0 ) || (movinghomefield=='top' && $(this).attr('row')==7))){
						var promotingtype = prompt("Enter a type to promote (knight,bishop,queen,rook)", "");
							if ((promotingtype != null) && (promotingtype=='knight'|| promotingtype=='queen' || promotingtype=='bishop' ||promotingtype =='rook')) {
							$(this).html(unicodes[promotingtype]);
							$(this).attr('type',promotingtype);
							}
							else{
								window.alert("you entered a wrong thing to promote.pawn promoting to queen");
								$(this).html(unicodes['queen']);
								$(this).attr('type','queen');
							}

							}
					//// in baghei haalatye ke promotion nis 
					else{
						$(this).html(movingunicode);
						$(this).attr('type', movingtype);
					}
					if($(this).attr('maxcastle')== 'true'){
							
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))-2].innerHTML="";
						
						
						
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))+1].innerHTML=unicodes['rook'];
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))+1].setAttribute('type','rook');
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))+1].setAttribute('color',movingcolor);
						
						
					}
					if($(this).attr('mincastle')== 'true'){
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))+1].innerHTML="";
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))-1].innerHTML=unicodes['rook'];
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))-1].setAttribute('type','rook');
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[parseInt($(this).attr('row') )].getElementsByTagName("td")[(parseInt($(this).attr('col') ))-1].setAttribute('color',movingcolor);
						
					}
					
					//dar har sooratam 
					$(this).attr('color', movingcolor);
					$(this).attr('homefield', movinghomefield);
					//is_check(document.querySelector("#turn").innerHTML);
					
					
					
					
						
					
					//roo yeki ke valid bude click shode o rafte hamechi t shode
					$('td').each(function () {
						if($(this).attr('readytogo') != 'true' && $(this).attr('comingin') != 'true'){
						$(this).css('color', $(this).attr('color'));
						$(this).css('opacity', '1');
						$(this).attr('validate', 'false');
						}
					})
					
					console.log("MAN RAFTAM");
					///khuneyi ke azash rafte khali beshe va dige first move nabashe
					setTimeout(function(){
						$('td').each(function () {
						if ($(this).attr('readytogo') == 'true') {
								$(this).html("");
								$(this).attr('readytogo', 'false');
								$(this).attr('firstmoves','false');
								$(this).removeAttr('type');
								$(this).removeAttr('homefield');
						}
						else if($(this).attr('comingin') == 'true'){
						$(this).css('opacity', '1');
						$(this).attr('validate', 'false');
						$(this).attr('comingin','false');
						$(this).css('color', movingcolor);
						$(this).attr('firstmoves','false');
						}
					})
						
					},400);
					setTimeout(function(){
					is_check(document.querySelector("#turn").innerHTML);
					updateturn(movingcolor);
					is_check(document.querySelector("#turn").innerHTML);
					},500);


				}
				//age valid ham nabashe ,biad birun az in search donbale tekun
				else if ($(this).attr('validate') == 'false') {
					$('td').each(function () {
						$(this).css('color', $(this).attr('color'));
						$(this).css('opacity', '1');
						$(this).attr('validate', 'false');
						$(this).attr('readytogo', 'false'); /// coming inam nemikhad false she chon faghat too valid true shode ke bades bar midarim 
					})
				}
				clicked = false;
				$('td').each(function () {
						$(this).attr('mincastle', 'false');
						$(this).attr('maxcastle', 'false');
				})
				
			}
		});
}



function is_check(turn){
	
$('td').each(function(){
	//az moghabela , tahdidi has ya na
	if($(this).html()!="" && $(this).attr('color') !=turn ){
			var r = parseInt($(this).attr('row'));
			var c = parseInt($(this).attr('col'));

						//////////PAWN
						if ($(this).attr('type') == 'pawn') {

							if ($(this).attr('firstmoves') == 'true') {

								if ($(this).attr('homefield') == 'bottom') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r - 1 && $(this).attr('col') == c) {
												$(this).attr('cango', 'true');
											}
											if ($(this).attr('row') == r - 2 && $(this).attr('col') == c) {
												if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) + 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML != "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('cango', 'false');
												} else if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) + 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML == "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('cango', 'true');
												}

											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('cango', 'true');
											}
										}

									})
								} else if ($(this).attr('homefield') == 'top') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r + 1 && $(this).attr('col') == c) {
												$(this).attr('cango', 'true');
											}
											if ($(this).attr('row') == r + 2 && $(this).attr('col') == c) {
												if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) - 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML != "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('cango', 'false');
												} else if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row'))) - 1].getElementsByTagName("td")[(parseInt($(this).attr('col')))].innerHTML == "") {
													document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[(parseInt($(this).attr('row')))].getElementsByTagName("td")[(parseInt($(this).attr('col')))].setAttribute('cango', 'true');
												}

											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('cango', 'true');
											}
										}
									})
								}
							} else if ($(this).attr('firstmoves') == 'false') {

								if ($(this).attr('homefield') == 'bottom') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r - 1 && $(this).attr('col') == c) {

												$(this).attr('cango', 'true');
											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('cango', 'true');
											}
										}
									})


								} else if ($(this).attr('homefield') == 'top') {
									$('td').each(function () {
										if ($(this).html() == "") {
											if ($(this).attr('row') == r + 1 && $(this).attr('col') == c) {
												$(this).attr('cango', 'true');
											}
										} else if ($(this).html() != "") {
											if ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) {
												$(this).attr('cango', 'true');
											}
										}
									})
								}
							}

						}


						///////////KNIGHT
						if ($(this).attr('type') == 'knight') {


							$('td').each(function () {
								if (
									($(this).attr('row') == r - 2 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 2 || $(this).attr('col') == c + 2)) || ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 2 || $(this).attr('col') == c + 2)) || ($(this).attr('row') == r + 2 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1))
								) {
									$(this).attr('cango', 'true');
								}

							})

						}


						////////BISHOP
						if ($(this).attr('type') == 'bishop') {
							/*
									var m = c-r;
									var n = c-(-r);
									$("td").each(function() {
										var a = parseInt($(this).attr("col"))- parseInt( $(this).attr("row"));
										var b = $(this).attr("col") - (- $(this).attr("row"));
										if (a == m || b == n)
											$(this).css("background-color", "lightgreen");
									})
									*/

							var izbas, ikbas, bizbas, bikbas = false;
							for (i = r - 1; i >= 0; i--) {
								for (j = c + 1; j < 8; j++) {
									if (!ikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												ikbas = true;
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!izbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												izbas = true;
												
											}
										}
									}
								}

							}

							for (i = r + 1; i < 8; i++) {
								for (j = c + 1; j < 8; j++) {
									if (!bizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
											
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!bikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {
											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
											
											}
										}
									}
								}
							}




						}


						///////KING (VASE KING, 9 TA DORIASH . PAYIN KHODESH HARKUDUM POR BASHE NATUNE NEMIRE)
						if ($(this).attr('type') == 'king') {

							if($(this).attr('firstmoves')=='true'){
								
								if(document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-4].getAttribute('firstmoves')=='true'){
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-2].setAttribute('cango','true');
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c-2].setAttribute('maxcastle','true');
									
								}
								if(document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+3].getAttribute('firstmoves')=='true') {
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+2].setAttribute('cango','true');
									document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[c+2].setAttribute('mincastle','true');
									
									
								}
								
							}
							
							$('td').each(function () {
								if (
									($(this).attr('row') == r - 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r && ($(this).attr('col') == c - 1 || $(this).attr('col') == c + 1)) || ($(this).attr('row') == r + 1 && ($(this).attr('col') == c - 1 || $(this).attr('col') == c || $(this).attr('col') == c + 1))

								) {
									$(this).attr('cango', 'true');
								}

							})

						}


						//////////QUEEEN
						if ($(this).attr('type') == 'queen') {
							var izbas, ikbas, bizbas, bikbas = false;
							$('td').each(function () {
								if ($(this).attr('row') == r) {
									for (j = c + 1; j < 8; j++) {
										if (!bizbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
												
											}

										}
									}
									for (j = c - 1; j >= 0; j--) {
										if (!bikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
												
											}
										}
									}
								}

								if ($(this).attr('col') == c) {
									for (i = r + 1; i < 8; i++) {
										if (!izbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												izbas = true;
											
											}

										}
									}
									for (i = r - 1; i >= 0; i--) {
										if (!ikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												ikbas = true;
											
											}
										}
									}
								}

							})
							

							var jizbas, jikbas, jbizbas, jbikbas = false;
							for (i = r - 1; i >= 0; i--) {
								for (j = c + 1; j < 8; j++) {
									if (!jikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jikbas = true;
												
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!jizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jizbas = true;
												
											}
										}
									}
								}

							}

							for (i = r + 1; i < 8; i++) {
								for (j = c + 1; j < 8; j++) {
									if (!jbizbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jbizbas = true;
												
											}
										}
									}
								}
								for (j = c - 1; j >= 0; j--) {
									if (!jbikbas) {
										if (Math.abs(r - i) == Math.abs(c - j)) {
											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML != "") {
												jbikbas = true;
												
												
											}
										}
									}
								}
							}

						}


						/////////ROOK
						if ($(this).attr('type') == 'rook') {
							var izbas, ikbas, bizbas, bikbas = false;
							$('td').each(function () {
								if ($(this).attr('row') == r) {
									for (j = c + 1; j < 8; j++) {
										if (!bizbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bizbas = true;
												
											}

										}
									}
									for (j = c - 1; j >= 0; j--) {
										if (!bikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[r].getElementsByTagName("td")[j].innerHTML != "") {
												bikbas = true;
												
											}
										}
									}
								}

								if ($(this).attr('col') == c) {
									for (i = r + 1; i < 8; i++) {
										if (!izbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												izbas = true;
											
											}

										}
									}
									for (i = r - 1; i >= 0; i--) {
										if (!ikbas) {

											document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].setAttribute('cango', 'true');
											if (document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[c].innerHTML != "") {
												ikbas = true;
												
											}
										}
									}
								}

							})
						}
		
		
	}
})	
$('td').each(function(){
	if ($(this).html()==unicodes['king'] && $(this).attr('color')==turn){
		if($(this).attr('cango')=='true'){
			window.alert(turn+ " checkkkked !!!!  BE CAREFUL");
		}
	}
})
$('td').each(function(){
	$(this).attr('cango','false');
})

}




function updateturn(movingcolor) {
	if (movingcolor == 'white') {
		document.querySelector('#turn').innerHTML = 'black';
		document.querySelector('#turn').setAttribute('class', 'black');
	} else if (movingcolor == 'black') {
		document.querySelector('#turn').innerHTML = 'white';
		document.querySelector('#turn').setAttribute('class', 'white');
	}
}


function updatescore(killedcolor, killedtype) {
	var score;
	if (killedtype == 'pawn') {
		score = 1;
	} else if (killedtype == 'king' || killedtype == 'queen') {
		score = 9;
	} else if (killedtype == 'knight' || killedtype == 'bishop') {
		score = 3;
	} else if (killedtype == 'rook') {
		score = 5;
	}

	if (killedcolor == 'white') {
		a=parseInt(document.querySelector('#black-score').innerHTML );
		a+=score;
		document.querySelector('#black-score').innerHTML= a;
	}
	if (killedcolor == 'black') {
		b=parseInt(document.querySelector('#white-score').innerHTML );
		b+=score;
		document.querySelector('#white-score').innerHTML= b;
	}

}

function updatecolumns(killedcolor, killedtype) {
	if (killedcolor == 'white') {
		document.querySelector('#white-chessman-panel').innerHTML += '\n';
		document.querySelector('#white-chessman-panel').innerHTML += unicodes[killedtype];
	} else if (killedcolor == "black") {
		document.querySelector('#black-chessman-panel').innerHTML += '\n';
		document.querySelector('#black-chessman-panel').innerHTML += unicodes[killedtype];
	}
}