function login(usuario, password) {
  for (let username of username) {
    if (user.username === username) {
      if (user.password === password) {
        idUsuarioLogueado = user.id;
        return user.id;
      }
      return 0;
    }
  }
  return -1;
}

async function register(email, username, password) {
    for (let user of users) {
        if (user.email === email) {
            return -1;
            console.log("ESTE MAIL YA ESTA REGISTRADO")
        }
    }

    const datos= {
        username: username,
        passsword: passsword,
        email: email
    }
    const response = await fetch('http://localhost:4000/registro',{
        method:"POST", //GET, POST, PUT o DELETE
        headers: { //Esto va siempre, solo aclaro que va en tipo JSON
            "Content-Type": "application/json",
          },
        body: JSON.stringify(datos) //JSON.stringify convierte de objeto a JSON
    })

    console.log(response) //Imprimo la respuesta en formato JSON
    
    let result = await response.json()//Desarma el json y lo arma como un objeto
    console.log(result)
    //let nuevoUsuario = new User(username, email, password);
    //users.push(nuevoUsuario);
    //return nuevoUsuario.id;
}