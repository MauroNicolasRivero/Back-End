const socket = io()

const ulProductos = document.querySelector('#productos')

socket.on('productos', productos => {
  console.log("Que trae aca1",productos)
  if (ulProductos) {
    ulProductos.innerHTML = ''
    for (const producto of productos) {
      const liProductos = document.createElement('li')
      liProductos.innerHTML = producto
      ulProductos?.appendChild(liProductos)
    }
  }
})
