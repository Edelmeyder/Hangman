let lives = 1;
const abc = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"Ñ",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
];
const words = [
	"BANANA",
	"MANZANA",
	"SANDIA",
	"MANDARINA",
	"OTORRINOLARINGOLOGO",
	"UVA",
	"CARPINTERO",
	"PANTUFLA",
	"MANIJA",
	"CANILLA",
	"AURICULARES",
	"ONOMATOPEYA",
	"COMPUTADORA",
	"MICROFONO",
	"ESCRITORIO",
	"MILANESA",
	"DEPARTAMENTO",
	"AULA",
	"APRENDIZAJE",
	"TRADICION",
	"FLOR",
	"CAMPAMENTO",
	"GATITO",
	"DIFICULTAD",
	"LAVADO",
	"VIRUS",
	"ABEJA",
	"DIENTE",
	"ACCIDENTE",
	"INSTRUCCION",
	"INSPECCION",
	"CALCULADORA",
	"ARMONIA",
	"CABALLO",
	"VERSO",
	"BANDEJA",
	"COSTA",
	"PLAYA",
	"APIO",
	"SUSTANCIA",
	"DESGRACIA",
	"LIQUIDO",
	"CONOCIMIENTO",
	"AUTOMOVIL",
	"DEUDA",
	"SENTIDO",
	"RELACION",
	"GANCHO",
	"NERVIO",
	"PREFERENCIA",
	"POLLO",
	"POBLACION",
	"PAJARO",
	"GABINETE",
	"CONEXION",
	"INTERNET",
	"PROTOCOLO",
	"ANTENA",
	"PROCESADOR",
	"MITOCONDRIA",
	"UNIDAD",
	"DESPLAZAMIENTO",
	"UNIFORME",
	"TRANSPORTE",
	"BUDIN",
	"INTERFAZ",
	"TELEFONO",
	"CELULAR",
	"CARGADOR",
	"TULIPAN",
	"AHORCADO",
	"VENTANA",
	"RADIADOR",
	"COLCHON",
	"MONITOR",
	"BOTELLA",
	"ENTROPIA",
	"ELECTRICIDAD",
	"MAGNETISMO",
];
let word, showWord;

window.addEventListener("DOMContentLoaded", () => {
	createLetterButtons();
	startGame();
	document.getElementById("reset").onclick = reset;
});

function reset() {
	// resets the lives and image
	document.getElementById("image").src = "./resources/hangman0.png";
	lives = 1;
	// hides the end board if it was visible
	document.getElementById("endBoard").style.display = "none";
	// creates the buttons again to reenable those that were previously used
	createLetterButtons();
	// new word
	startGame();
}

// takes one word from the array as the word for the current game
// and shows a line for each letter of the selected word
function startGame() {
	
	word = words[parseInt(Math.random() * words.length)];
	showWord = document.getElementById("word");
	showWord.innerHTML = "";
	for (let i = 0; i < word.length; i++) {
		showWord.innerHTML += "-";
	}
}

// creates a button for each letter of the alphabet and inserts it into the keyboard
function createLetterButtons() {
	document.getElementById("keyboard").replaceChildren(); // empties previous buttons if there were any
	let frag = new DocumentFragment();
	let button;
	for (let i = 0; i < abc.length; i++) {
		button = document.createElement("button");
		button.onclick = letterPress;
		button.className = "letterButton";
		button.innerHTML = abc[i];
		frag.appendChild(button);
	}
	document.getElementById("keyboard").appendChild(frag);
}

// each time a new letter is pressed disables the corresponding button
// and calls the checkLetter function
function letterPress() {
	this.className = "letterButton pressed";
	this.onclick = null;
	checkLetter(this.innerHTML);
}

// if letter is in the word replaces de dashes for the corresponding letter
// in all the positions that correspond and else causes to loose a live
function checkLetter(letter) {
	let hit = false;
	let sW = "";
	for (let i = 0; i < word.length; i++) {
		if (letter === word[i]) {
			sW += letter;
			hit = true;
		} else {
			sW += showWord.innerHTML[i];
		}
	}
	if (hit) {
		showWord.innerHTML = sW;
	} else {
		changeImg();
	}
	checkEnd();
}

// checks if the game has ended whether by win or loose
// if it has, disables the letter buttons and updates the 
// end board accordingly 
function checkEnd() {
	let end = false;
	if (!showWord.innerHTML.includes("-")) {
		document.getElementById("endBoard").innerHTML = "Ganaste!";
		document.getElementById("endBoard").className = "endBoard win";
		end = true;
	}
	if (lives === 7) {
		document.getElementById("endBoard").innerHTML = "Perdiste!";
		document.getElementById("endBoard").className = "endBoard loose";
		end = true;
	}
	if (end) {
		Array.from(document.querySelectorAll(".letterButton")).forEach(
			(btn) => {
				btn.onclick = null;
			}
		);
		document.getElementById("endBoard").style.display = "block";
	}
}

// on each miss, looses a live and updates the hangman images accordingly
function changeImg() {
	document.getElementById("image").src = "./resources/hangman" + lives + ".png";
	lives++;
}
