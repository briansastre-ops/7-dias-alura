document.addEventListener("DOMContentLoaded", () => {
    const addItemForm = document.getElementById("add-item-form")
    const newItemInput = document.getElementById("new-item")
    const shoppingList = document.getElementById("shopping-list")
    const emptyListMessage = document.getElementById("empty-list-message")
    const notification = document.getElementById("notification")
    const notificationMessage = document.getElementById("notification-message")
  
    const listaDeCompras = JSON.parse(localStorage.getItem("listaDeCompras")) || []
  
    function actualizarLista() {
      shoppingList.innerHTML = ""
  
      if (listaDeCompras.length === 0) {
        emptyListMessage.style.display = "block"
      } else {
        emptyListMessage.style.display = "none"
  
        listaDeCompras.forEach((item, index) => {
          const listItem = document.createElement("li")
          listItem.className = "list-item item-enter"
  
          const itemText = document.createElement("span")
          itemText.textContent = item
  
          const deleteButton = document.createElement("button")
          deleteButton.textContent = "Eliminar"
          deleteButton.className = "delete-button"
          deleteButton.addEventListener("click", () => eliminarItem(index, item))
  
          listItem.appendChild(itemText)
          listItem.appendChild(deleteButton)
          shoppingList.appendChild(listItem)
        })
      }
  
      localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras))
    }
  
    function añadirItem(item) {
      if (item.trim() === "") {
        mostrarNotificacion("Por favor, introduce un alimento válido")
        return
      }
  
      if (listaDeCompras.includes(item)) {
        mostrarNotificacion("Este alimento ya está en la lista")
        return
      }
  
      listaDeCompras.push(item)
      actualizarLista()
      mostrarNotificacion(`"${item}" ha sido añadido a la lista`)
    }
  
    function eliminarItem(index, item) {
      const listItem = shoppingList.children[index]
      listItem.className = "list-item item-exit"
  
      setTimeout(() => {
        listaDeCompras.splice(index, 1)
        actualizarLista()
        mostrarNotificacion(`"${item}" ha sido eliminado de la lista`)
      }, 300)
    }
  
    function mostrarNotificacion(mensaje) {
      notificationMessage.textContent = mensaje
      notification.classList.add("show")
  
      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)
    }
  
    addItemForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const newItem = newItemInput.value
      añadirItem(newItem)
      newItemInput.value = ""
      newItemInput.focus()
    })
  
    actualizarLista()
  })
