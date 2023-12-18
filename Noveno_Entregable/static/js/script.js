
/*
const socket = io() //Socket del cliente, cuando se conecte en el main.js 
// se enviará el evento "connection" y se mostrará en la consola un aviso 

const ulProductos = document.querySelector('#productos')

socket.on('productos', productos => {
  if (ulProductos) {
    ulProductos.innerHTML = ''
    for (const producto of productos) {
      const liProductos = document.createElement('li')
      liProductos.innerHTML = producto.title // Muestro solamente el nombre del producto
      ulProductos?.appendChild(liProductos)
    }
  }
})
*/