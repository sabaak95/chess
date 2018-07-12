var dbclicked = false;

function startTimer() {

	var countdownTimer = setInterval(function () {

		var sudokuOfXML = document.querySelector("#sudoku-block");

		if (sudokuOfXML != null) {
			document.querySelector("#sudoku-block").onclick = function () {

				var xml = getXML('http://ie.ce-it.ir/hw3/xml/sudoku.xml');
				var xsl = getXML("js/sudoku.xsl");
				displayResult(xml, xsl);


				document.getElementById("home-icon").style.display = "initial";
				document.getElementById("pwd").innerHTML = "sudoku";


				var sudokumain = xml.querySelector('sudoku');
				var selcolor = sudokumain.getAttribute('selectedNumberColor');
				var selbgcolor = sudokumain.getAttribute('selectedNumberBackColor');
				var overhover = sudokumain.getAttribute('hover');



				/////////////ezafe sho in khat
				$('td').attr('dbclick', 'false');

				$('td').click(function () {
					if (($(this).html()) != "") {
						//if( dbclicked==false){
						if ($(this).attr('dbclick') == 'false') {
							$("td:contains('" + $(this).html() + "')").css("background-color", selbgcolor);
							$("td:contains('" + $(this).html() + "')").css("color", selcolor);
							////this added
							$("td:contains('" + $(this).html() + "')").attr("dbclick", 'true');
							///dbclicked=true;    
						}
						//else{
						else if ($(this).attr('dbclick') == 'true') {
							$("td:contains('" + $(this).html() + "')").css("background-color", '#DFFFDF');
							$("td:contains('" + $(this).html() + "')").css("color", 'black');
							////this added
							$("td:contains('" + $(this).html() + "')").attr("dbclick", 'false');
							// dbclicked=false;
						}
					}


				});


				$('td').hover(function () {
					if ($(this).attr('dbclick') == 'false') {
						$(this).css('background-color', overhover);
					}
				}, function () {
					if ($(this).attr('dbclick') == 'false') {
						if ($(this).attr('contenteditable') == 'true')
							$(this).css('background-color', 'white');
						else {
							$(this).css('background-color', ' #DFFFDF');
							$(this).css('background-color', 'rgba(0, 192, 0, 0.10)');
						}
					}

				});


				//$('td').keyup(function (event) {
					//$(this).html($(this).html()[0]);
				//})
					var rows = document.querySelector('#main-container').getElementsByTagName('tr');
					for (var i = 0; i < rows.length; i++) {
						var cols = rows[i].getElementsByTagName('td');
						for (var j = 0; j < cols.length; j++) {
							cols[j].onkeyup = function () {
							var str = this.innerHTML;
								for (var i = 0; i < str.length; i++) {
								if (!(str[i] > 0 && str[i] <= 9) || i > 0) {
								this.innerHTML = '';
								break;
							}
						}
							};
						}
					}
				
				





				for (i = 0; i < 9; i++) {
					for (j = 0; j < 9; j++) {
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('row', i);
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('col', j);
						document.getElementById("main-container").querySelector('table').getElementsByTagName("tr")[i].getElementsByTagName("td")[j].setAttribute('block',((Math.floor(i/3))*3)+(Math.floor(j/3))) ;
					}
				}
				
				
				
				document.querySelector('#check-sudoku').onclick = function (){
					var check;
					for(i=1; i<=9; i++) {
						for (j = 0; j < 9; j++) {
							if ($("td[col=" + j + "]:contains(" + i + ")").size() > 1){
							$("td[col=" + j + "]").css("background-color", "red");
							check=true;
							}
							if ($("td[row=" + j + "]:contains(" + i + ")").size() > 1){
							$("td[row=" + j + "]").css("background-color", "red");
							check=true;
							}
							if ($("td[block=" + j + "]:contains(" + i + ")").size() > 1){
							$("td[block=" + j + "]").css("background-color", "red");
							check=true;
							}
						}
    				}
					if(check!=true){
						window.alert("its ALLRIGHT ! ");
					}
					setTimeout(function(){
						$('td').each(function () {
						if ($(this).attr('contenteditable') == 'true')
							$(this).css('background-color', 'white');
						else {
							$(this).css('background-color', ' #DFFFDF');
							$(this).css('background-color', 'rgba(0, 192, 0, 0.10)');
						}
						})
						
					},400);
					
					
				}



				document.querySelector('#submit-sudoku').onclick = function () {
					var notfull = false;
					var xml = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="utf-8"?><solution></solution>', "text/xml");

					var cells = xml.createElement("cells");

					$('td').each(function () {
						if ($(this).html() != "") {

							var cell = xml.createElement("cell");
							cell.setAttribute("posval", (parseInt($(this).attr('row')) * 100) + (parseInt($(this).attr('col')) * 10) + parseInt($(this).html()));
							cell.appendChild(xml.createTextNode($(this).html()));
							cells.appendChild(cell);

						}
						else if ($(this).html() == ""){
							notfull=true;
						}
					})

					var student = xml.createElement("student");
					student.setAttribute("id", "9231002");
					student.appendChild(xml.createTextNode("Saba Akhyani"));

					xml.getElementsByTagName("solution")[0].appendChild(cells);
					xml.getElementsByTagName("solution")[0].appendChild(student);
					console.log((new XMLSerializer()).serializeToString(xml));
					
					
					if(!notfull){
					var request = new XMLHttpRequest();
					request.open("POST", "http://ie.ce-it.ir/hw3/sudoku_validator.php", true);
					request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					request.send("solution_xml=" + (new XMLSerializer()).serializeToString(xml));
					request.onreadystatechange = function () {
						if (request.readyState == 4 && request.status == 200) {
							window.alert(request.responseText);
						}
					};
					}
					else{
						window.alert("NOT FULL YET");
					}


				}




				////// ye for mizanam . rooye satra . be eza harki ke $('tr).row == rowe in ,

				var sudoku_tds = document.querySelectorAll('#main-container #sudoku td'); //ye listi az td

				for (var i = 0; i < sudoku_tds.length; i++) {
					if (sudoku_tds[i].innerHTML == "") {
						sudoku_tds[i].setAttribute("contenteditable", "true");
					} else {
						sudoku_tds[i].setAttribute("contenteditable", "false");
					}
				};
			}

			clearTimeout(countdownTimer);
		}

	}, 300);

}
startTimer();



function getXML(url) {
	var xml = null;
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'xml',
		async: false,
		success: function (responseXML) {
			xml = responseXML;
		}
	});
	return xml;
}


function displayResult(xml, xsl) {
	xsltProcessor = new XSLTProcessor();
	xsltProcessor.importStylesheet(xsl);
	resultDocument = xsltProcessor.transformToFragment(xml, document);
	$('#main-container').html(resultDocument);
}