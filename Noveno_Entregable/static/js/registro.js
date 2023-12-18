/*
Este archivo js le da funcionalidad al formulario creado en la vista index,
usamos la modalidad fetch para cursar la petición "post" al servidor, convertimos
los input a Json y los enviamos a través del body del request
*/

const formRegistro = document.querySelector('form')
formRegistro?.addEventListener('submit', event => {
  event.preventDefault()
  const datosProducto = Object.fromEntries(new FormData(formRegistro).entries())
  fetch('/productos', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datosProducto),
  })
    .then(res => res.json()).then(result => {
      if (result.status === 'ok') {
        alert('Producto registrado!')
      } else {
        alert('error al registrar el producto: ' + result.error)
      }
    })
    .catch(error => {
      alert('error al enviar el formulario: ' + error.message)
    })
})