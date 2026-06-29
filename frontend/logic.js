
async function login(usuario, password) {
  //datos ingresados  
  const datos = {
    username: logUsername(),
    password: logPassword()
  }

  console.log("datos: ", datos)

    //base de daot
    const response = await fetch('http://localhost:4000/login', {
    method: "POST", //GET, POST, PUT o DELETE
    headers: { //Esto va siempre, solo aclaro que va en tipo JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos)
    
  })

  console.log(response)
  
  for (let user of users) {
    if (user.username === usuario) {
      if (user.password === password) {
        idUsuarioLogueado = user.id;
        window.location.href = 'index1.html';
      }
      return 0;
    }
  }
  return -1;
}

async function register() {
  // leer email, username, password por DOM


  const datos = {
    username: getUsername(),
    password: getPassword(),
    email: getEmail()
  }

  const response = await fetch('http://localhost:4000/registro', {
    method: "POST", //GET, POST, PUT o DELETE
    headers: { //Esto va siempre, solo aclaro que va en tipo JSON
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos) //JSON.stringify convierte de objeto a string
  })

  console.log(response) //Imprimo la respuesta en formato JSON

  let result = await response.json()//Desarma el json y lo arma como un objeto
  console.log("RESULTADO: ", result)
  //let nuevoUsuario = new User(username, email, password);
  //users.push(nuevoUsuario);
  //return nuevoUsuario.id;
   window.location.href = "index1.html";
}

function seleccionarNivel(nivel) {
  alert('Seleccionaste el nivel: ' + nivel);
}

//function cerrarSesion() {
 // alert('Cerrando sesión...');
 //  
  
//}

