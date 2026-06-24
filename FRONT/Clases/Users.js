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

//*const users = [
    //new User("Chapa08", "mchiappara@pioix.edu.ar", "chapa64", false, "2018-12-09"),
 // new User("Santi09", "sratto@pioix.edu.ar", "santi2009", false, "2020-03-12"),
   // new User("Gabi00", "gbenitez@pioix.edu.ar", "gabi2000", false, "2023-12-14"),
    //new User("Benja","barismendi@pioix.edu.ar","benja00", false, "2026-06-22"), 
    //new User("Admin","administracion@pioix.edu.ar","Admin1", true, "2014-03-06")                   
//*