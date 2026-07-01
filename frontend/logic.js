let filaActual = 0;
let palabraSecreta = "";
let nivel = localStorage.getItem("nivel");

async function login() {

    const datos = {
        username: logUsername(),
        password: logPassword()
    };

    const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    let result = await response.json();

    if (response.ok) {

        localStorage.setItem("usuario", result.id_usuario);

        window.location.href = "index1.html";

    } else {

        alert(result.mensaje);

    }

}

async function register() {

    const datos = {
        username: getUsername(),
        password: getPassword(),
        email: getEmail()
    };

    const response = await fetch("http://localhost:4000/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    let result = await response.json();

    alert(result.mensaje);

    if (result.mensaje == "Usuario registrado correctamente") {

        window.location.href = "index1.html";

    }

}

function seleccionarNivel(nivel) {

    localStorage.setItem("nivel", nivel);

    if (nivel == 1) {

        window.location.href = "indexfacil.html";

    } else {

        window.location.href = "indexdificil.html";

    }

}

function cerrarSesion() {

    localStorage.removeItem("usuario");
    localStorage.removeItem("nivel");

    window.location.href = "index.html";

}

async function cargarPalabra() {

    let response = await fetch(`http://localhost:4000/palabra/${nivel}`);

    let result = await response.json();

    palabraSecreta = result.palabra.toUpperCase();

    console.log("Palabra secreta:", palabraSecreta);

}

function enviarPalabra() {

    let palabra = document.getElementById("palabra").value.toUpperCase();

    if (palabra.length != palabraSecreta.length) {

        alert("Cantidad de letras incorrecta");
        return;

    }

    for (let i = 0; i < palabra.length; i++) {

        let casilla = document.getElementById(filaActual + "-" + i);

        casilla.innerHTML = palabra[i];

        if (palabra[i] == palabraSecreta[i]) {

            casilla.bgColor = "green";

        } else if (palabraSecreta.includes(palabra[i])) {

            casilla.bgColor = "yellow";

        } else {

            casilla.bgColor = "gray";

        }

    }

    if (palabra == palabraSecreta) {

        alert("Ganaste");

        return;

    }

    filaActual++;

    document.getElementById("palabra").value = "";

    if (filaActual == 6) {

        alert("Perdiste. La palabra era " + palabraSecreta);

    }

}

if (document.getElementById("palabra")) {

    cargarPalabra();

}
