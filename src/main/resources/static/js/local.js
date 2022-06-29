function listarProductos(){
    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/product",settings)
    .then(response => response.json())
    .then(function(data){
            var productos = '';
            for(const producto of data){
                productos +=
                '<tr>'+
                '<th scope="row">'+producto.id+'</th>'+
                '<td>'+producto.name+'</td>'+
                '<td>'+producto.description+'</td>'+
                '<td>'+producto.existencia+'</td>'+
                '<td>'+producto.precio+'</td>'+
                '<td>'+
                    '<button type="button" class="btn btn-outline-danger" onclick="eliminaProducto(\''+producto.id+'\')"><i class="fa-solid fa-trash"></i></button>'+
                    '<a href="#" onclick="verModificarProducto(\''+producto.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-pen"></i></a>'+
                    '<a href="#" onclick="verProducto(\''+producto.id+'\')" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = productos;
        //}
    })
}



function eliminaProducto(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listarProductos();
        alertas("Se ha eliminado el producto exitosamente",2)
    })
}

function verModificarProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

            var cadena='';

            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Modificar producto</h1>'+
                '</div>'+

                '<form action="" method="post" id="myForm">'+
                    '<input type="hidden" name="id" id="id" value = "'+producto.id+'">'+
                    '<label for="name" class="form-label">Nombre</label>'+
                    '<input type="text" name="name" class="form-control" id="name" required value = "'+producto.name+'"> <br>'+
                    '<label for="description" class="form-label">Description</label>'+
                    '<input type="text" name="description" class="form-control" id="description" required value = "'+producto.description+'"> <br>'+
                    '<label for="existencia" class="form-label">Existencia del producto</label>'+
                    '<input type="text" name="existencia" class="form-control" id="existencia" required value = "'+producto.existencia+'"> <br>'+
                    '<label for="precio" class="form-label">Precio</label>'+
                    '<input type="text" name="precio" class="form-control" id="precio" required value = "'+producto.precio+'"> <br>'+

                    '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
                '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

async function modificarProducto(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/product/"+id, {
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listarProductos();
    alertas("Se ha modificado el producto exitosamente",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function verProducto(id){

    var settings={
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
    }
    fetch("api/product/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

            var cadena='';

            if(producto){
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Visualizar Producto</h1>'+
                '</div>'+
                '<ul class="list-group">'+
                '<li class="list-group-item">Color: '+producto.name+'</li>'+
                '<li class="list-group-item">Talla: '+producto.description+'</li>'+
                '<li class="list-group-item">Diseño: '+producto.existencia+'</li>'+
                '<li class="list-group-item">Precio: '+producto.precio+'</li>'+
                '</ul>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();
    })
}

function alertas(mensaje, tipo){
    if(tipo == 1){//success verde
        color = "success";
    }
    else{//danger rojo
        color = "danger";
    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>' +
                    mensaje+
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                 '</div>';
    document.getElementById("datos").innerHTML = alerta;
}

function registerForm(){
var s ="api/product";
    var cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-6"><i class="fa-solid fa-user-pen"></i>Registrar producto</h1>'+
                '</div>'+

                '<form action="" method="post" id="myForm">'+
                    '<input type="hidden" name="id" id="id">'+
                    '<label for="name" class="form-label">Nombre</label>'+
                    '<input type="text" name="name" class="form-control" id="name" required> <br>'+
                    '<label for="description" class="form-label">Descripcion</label>'+
                    '<input type="text" name="description" class="form-control" id="description" required> <br>'+
                    '<label for="existencia" class="form-label">Existencia del producto</label>'+
                    '<input type="text" name="existencia" class="form-control" id="existencia" required> <br>'+
                    '<label for="precio" class="form-label">Precio</label>'+
                    '<input type="text" name="precio" class="form-control" id="precio" required> <br>'+
                    '<button type="button" class="btn btn-outline-info" onclick="registrarProducto(\''+s+'\')">Registrar</button>'+
                '</form>';
                document.getElementById("contentModal").innerHTML = cadena;
                var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
                myModal.toggle();
}

async function registrarProducto(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/product", {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listarProductos();
    alertas("Se ha registrado el producto exitosamente",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function modalConfirmacion(texto, funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}


async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log(jsonData);
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);

    if(request.ok){
        const respuesta = await request.json();
        localStorage.token = respuesta.detail;
        localStorage.email = jsonData.email;
        location.href= "dashboard.html";

    }
}



function listar(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token

        },
    }
    fetch("api/users",settings)
    .then(response => response.json())
    .then(function(data){

        //if(data.lenght>0){
            var usuarios = '';
            for(const usuario of data){


                usuarios += '<tr>'+
                '<th scope="row">'+usuario.id+'</th>'+
                '<td>'+usuario.firstName+'</td>'+
                '<td>'+usuario.lastName+'</td>'+
                '<td>'+usuario.email+'</td>'+
                '<td>'+
                  '<button type="button" class="btn btn-outline-danger" onclick="eliminaUsuario(\''+usuario.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                  '<a href="#" onclick="verModificarUsuario(\''+usuario.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                  '<a href="#" onclick="verUsuario(\''+usuario.id+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';

                if(localStorage.email==usuario.email){
                  localStorage.nombre = usuario.firstName;
                 }
            }

            document.getElementById("listar").innerHTML = usuarios;
        //}
    })

}


function verAgregar(){
    validaToken()
    var s="api/users";
    var cadena='<form action="" method="post" id="myForm">'+
    '<label  for="firstName" class="form-label">First Name</label>'+
    '<input type="text" class="form-control" name="firstName" id="firstName" required> <br>'+
    '<label  for="lastName" class="form-label">last Name</label>'+
    '<input type="text" class="form-control" name="lastName" id="lastName" required><br>'+
   ' <label  for="email" class="form-label" >email</label>'+
   ' <input type="email" class="form-control" name="email" id="email" required><br>'+
   ' <label  for="password" class="form-label">password</label>'+
   ' <input type="password" class="form-control"  name="password" id="password" required><br>'+
   ' <button type="button"  class="btn btn-outline-info" onclick="sendDatas(\''+s+'\')">Registrar</button>'+
    '</form>';
            document.getElementById("contentModal").innerHTML = cadena;
            var myModale = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModale.toggle();
}

async function sendDatas(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
    listar();
    alertas(" Se ha registrado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}


function eliminaUsuario(id){
    validaToken()
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas(" Se ha eliminado el usuario exitosamente!",2)
        var myModalEl = document.getElementById('modalUsuario');
        var modal = bootstrap.Modal.getInstance(myModalEl)

    })
}

function verModificarUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
            var cadena='';
            if( usuario){
                cadena='<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Usuario</h1>'+
            '</div>'+
            '<form action="" method="post" id="myForm" >'+
                '<input type="hidden" name="id" id="id" value="'+usuario.id+'">'+
                '<label  for="firstName" class="form-label">First Name</label>'+
                '<input type="text" class="form-control" name="firstName" id="firstName"  required value="'+usuario.firstName+'"> <br>'+
               ' <label  for="lastName" class="form-label">last Name</label>'+
               ' <input type="text" class="form-control" name="lastName" id="lastName" required value="'+usuario.lastName+'"><br>'+
               ' <label  for="email" class="form-label" >email</label>'+
               ' <input type="email" class="form-control" name="email" id="email" required value="'+usuario.email+'"><br>'+
               ' <label  for="password" class="form-label">password</label>'+
               ' <input type="password" class="form-control"  name="password" id="password" required><br>'+
                '<button type="button"   class="btn btn-warning" onclick="modificarUsuario(\''+usuario.id+'\')">Modificar</button>'+
            '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();



    })
}

async function modificarUsuario(id){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request =  await fetch("api/users/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas(" Se ha modificado el usuario exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();


}

function verUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
            var cadena='';
            if( usuario){
                cadena='<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario</h1>'+
            '</div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Nombre: '+usuario.firstName+' </li>'+
            '<li class="list-group-item">Apellido: '+usuario.lastName+'</li>'+
            '<li class="list-group-item">Email: '+usuario.email+'</li>'+
          '</ul>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();

    })
}

function alertas(mensaje,tipo){
    var color="";
    if(tipo==1){//success
        color="success"
    }else{//danger
        color="danger"
    }
    var alerta=
    '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+
    mensaje+
   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
  '</div>'
  document.getElementById("datos").innerHTML = alerta;
   setTimeout(function() {document.getElementById('datos').innerHTML='';},3000);
}

function salir(){
    localStorage.clear();
    location.href="index.html"
}

function validaToken(){
    if(localStorage.token== undefined){
        salir();
    }
}