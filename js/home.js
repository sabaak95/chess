window.onload = init;
var homexml;

function init() {
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'http://ie.ce-it.ir/hw3/xml/home.xml', false);
	xhr.send();
	homexml = xhr.responseXML;
	home_xml_processor();
}

function home_xml_processor() {
	var xmlheader = homexml.querySelector('header');
	var headerbgcolor = xmlheader.querySelector('background').innerHTML;
	var pwdcolor = xmlheader.querySelector('pwd').innerHTML;
	var game_icon = xmlheader.querySelector('gameicon');
	document.querySelector('header').style.backgroundColor = headerbgcolor;
	document.querySelector('#pwd').style.color = pwdcolor;
	document.getElementById("home-icon").style.display = "none";
	document.querySelector('#games li:first-child').style.color = game_icon.getAttribute('color');
	document.querySelector('#games li:first-child').onmouseover = function () {
		this.style.color = game_icon.getAttribute('hover');
	};
	document.querySelector('#games li:first-child').onmouseout = function () {
		this.style.color = game_icon.getAttribute('color');
	};
	//fk konam injurie ke daighan hamun tagaro bardashte avorde inja sakhte????NAA! unayieke ke too htmlesh has, chon nega too htmlan ke id daran bad to migi range un tage unvaro beriz too ye vari . tage injaro bokon mosavie un vare

	var xmlgames = homexml.querySelector('games');
	var allgames = xmlgames.querySelectorAll('game'); //all of the games
	for (var i = 0; i < allgames.length; i++) {
		if (allgames[i].getAttribute('active') == "true") {
			var activegame = document.createElement('li');
			activegame.innerHTML = allgames[i].querySelector('name').innerHTML;
			document.querySelector('#games').appendChild(activegame);
		}
	}
	document.querySelector('#games li:first-child').onclick = function () {
		var is_shown = document.querySelector('#games li:not(:first-child)').style.display; //bbin display chie
		var not_first_child = document.querySelectorAll('#games li:not(:first-child)'); //ye listi az in bache ha
		for (var i = 0; i < not_first_child.length; i++) {
			if (is_shown == 'initial') {
				not_first_child[i].style.display = 'none';
			} else {
				not_first_child[i].style.display = 'initial';
				var game_icon_games_props = game_icon.querySelector('game');
				not_first_child[i].style.color = game_icon_games_props.getAttribute('color');
				not_first_child[i].onmouseover = function () {
					this.style.color = game_icon_games_props.getAttribute('hover');
				};
				not_first_child[i].onmouseout = function () {
					this.style.color = game_icon_games_props.getAttribute('color');
				};


			}
		}
	}
	var a;
	var max = 0;
	var count;
	for (i = 0; i < allgames.length; i++) {
		(function () {
			var game_block = document.createElement('div');
			game_block.setAttribute("class", "game-block");
			var blockid = allgames[i].querySelector('name').innerHTML;
			blockid += "-block";
			game_block.setAttribute("id", blockid);
			game_block.setAttribute("data-onlines", allgames[i].querySelector('onlines').innerHTML);
			a = allgames[i].querySelector('onlines').innerHTML;
			if (max < a) {
				max = a;
				count = i;
			}

			var game_image_container = document.createElement('div');
			game_image_container.setAttribute("class", "game-image-container");

			var game_image_img = document.createElement('img');
			game_image_img.src = allgames[i].querySelector('image').innerHTML;
			game_image_container.appendChild(game_image_img);
			var game_block_p = document.createElement('p');
			game_block_p.innerHTML = allgames[i].querySelector('text').innerHTML;
			game_block.appendChild(game_image_container);
			game_block.appendChild(game_block_p);

			var hov = allgames[i].querySelector('text').getAttribute('hover');
			var unhov = allgames[i].querySelector('text').getAttribute('color');
			game_block_p.style.color = allgames[i].querySelector('text').getAttribute('color');
			game_block_p.onmouseover = function () {
				this.style.color = hov;
			};
			game_block_p.onmouseout = function () {
				this.style.color = unhov;
			};


			document.querySelector('#main-container').appendChild(game_block);
			// document.querySelector(blockid).appendChild(game_image_container);
			// document.querySelector('game_image_container').appendChild(game_image_img);
			// document.querySelector(blockid).appendChild(game_block_p);
		}());
	}





	console.log(count);


	var x = document.querySelector('#main-container').childElementCount;
	var main_childs = document.querySelectorAll('#main-container .game-block'); //ye listi az in bache ha
	for (j = 0; j < x; j++) {
		if (j == count) {
			main_childs[j].style.borderWidth = xmlgames.getAttribute('max-onlines-border-width');
			main_childs[j].style.backgroundColor = xmlgames.getAttribute('max-onlines-background');
			main_childs[j].style.borderColor = xmlgames.getAttribute('max-onlines-border-color');
			main_childs[j].style.borderStyle = xmlgames.getAttribute('max-onlines-border-style');
			main_childs[j].style.borderRadius = "15px";


		}

	}
	
	document.querySelector("#maze-block").onclick = function () {
	document.querySelector('#main-container').innerHTML="THIS GAME IS NOT IMPLEMENTED YET";
		document.getElementById("home-icon").style.display = "initial";
	}
	document.querySelector("#mario-block").onclick = function () {
			document.querySelector('#main-container').innerHTML="THIS GAME IS NOT IMPLEMENTED YET";
			document.getElementById("home-icon").style.display = "initial";
	}
	document.querySelector("#snake-block").onclick = function () {
			document.querySelector('#main-container').innerHTML="THIS GAME IS NOT IMPLEMENTED YET";
			document.getElementById("home-icon").style.display = "initial";
	}
	
	
	
	
	
}