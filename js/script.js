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

let misses;
let word;
const keyboard = document.getElementById("keyboard");
const endBoard = document.getElementById("endBoard");
const showWord = document.getElementById("word");
const hangman = document.getElementById("image");

createLetterButtons();

window.addEventListener("DOMContentLoaded", () => {
	startGame();
	document.getElementById("reset").onclick = reset;
});

function reset() {
	// reenables previously used keys
	const keys = Array.from(keyboard.children);
	for (const key of keys) {
		key.disabled = false;
	}
	// new game
	startGame();
}

// takes one word from the array as the word for the current game
// and shows a line for each letter of the selected word
function startGame() {
	// resets the lives and image
	hangman.src = "./resources/hangman0.png";
	misses = 0;
	// hides the end board if it was visible
	endBoard.style.display = "none";

	word = words[parseInt(Math.random() * words.length)];
	showWord.innerText = "-".repeat(word.length);
}

// creates a button for each letter of the alphabet and inserts it into the keyboard
function createLetterButtons() {
	const frag = new DocumentFragment();
	let button;
	for (let i = 0; i < abc.length; i++) {
		button = document.createElement("button");
		button.onclick = letterPress;
		button.className = "letterButton";
		button.innerText = abc[i];
		frag.appendChild(button);
	}
	keyboard.appendChild(frag);
}

// each time a new letter is pressed disables the corresponding button
// and calls the checkLetter function
function letterPress() {
	this.disabled = true;
	checkLetter(this.innerText);
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
			sW += showWord.innerText[i];
		}
	}
	if (hit) {
		showWord.innerText = sW;
	} else {
		misses++;
		changeImg();
	}
	checkEnd();
}

// checks if the game has ended whether by win or loose
// if it has, disables the letter buttons and updates the 
// end board accordingly 
function checkEnd() {
	let end = false;
	const wordComplete = !showWord.innerText.includes("-");
	if (wordComplete) {
		endBoard.innerText = "Ganaste!";
		endBoard.className = "endBoard win";
		end = true;
	}
	if (misses === 6) {
		endBoard.innerText = "Perdiste!";
		endBoard.className = "endBoard loose";
		end = true;
	}
	if (end) {
		const keys = Array.from(keyboard.children);
		for (const key of keys) {
				key.disabled = true;
		}
		endBoard.style.display = "block";
	}
}

// on each miss, looses a live and updates the hangman images accordingly
function changeImg() {
	hangman.src = "./resources/hangman" + misses + ".png";
}
