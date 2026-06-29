let idUser=0;

class User { 
    constructor(username,email,password,esAdmin,fechaRegistro) {
        this.id = ++idUser;
        this.username = username;
        this.email = email;
        this.password = password;
        this.esAdmin = esAdmin;
        this.fechaRegistro = fechaRegistro;
}}
