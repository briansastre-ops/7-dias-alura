document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const alimentoInput = document.getElementById("alimento")
    const categoriaSelect = document.getElementById("categoria")
    const agregarBtn = document.getElementById("agregar")
    const listaCompras = document.getElementById("lista-compras")
  
    const listaDeCompras = {}
  
    function agregarAlimento() {
      const alimento = alimentoInput.value.trim()
      const categoria = categoriaSelect.value
  
      if (alimento === "" || categoria === "") {
        alert("Por favor, ingresa un alimento y selecciona una categoría")
        return
      }
  
      if (!listaDeCompras[categoria]) {
        listaDeCompras[categoria] = []
      }
  
      listaDeCompras[categoria].push(alimento)
  
      alimentoInput.value = ""
      categoriaSelect.value = ""
  
      actualizarLista()
  
      alimentoInput.focus()
    }
  
    function eliminarAlimento(categoria, indice) {
      listaDeCompras[categoria].splice(indice, 1)
  
      if (listaDeCompras[categoria].length === 0) {
        delete listaDeCompras[categoria]
      }
  
      actualizarLista()
    }
  
    function actualizarLista() {
      // Limpiar la lista actual
      listaCompras.innerHTML = ""
  
      if (Object.keys(listaDeCompras).length === 0) {
        listaCompras.innerHTML = '<div class="mensaje-vacio">Tu lista de compras está vacía</div>'
        return
      }
  
      for (const categoria in listaDeCompras) {
        const categoriaDiv = document.createElement("div")
        categoriaDiv.className = "categoria"
  
        const categoriaTitulo = document.createElement("div")
        categoriaTitulo.className = "categoria-titulo"
        categoriaTitulo.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1)
        categoriaDiv.appendChild(categoriaTitulo)
  
        const alimentosLista = document.createElement("div")
        alimentosLista.className = "alimentos-lista"
  
        listaDeCompras[categoria].forEach((alimento, indice) => {
          const alimentoItem = document.createElement("div")
          alimentoItem.className = "alimento-item"
  
          const alimentoTexto = document.createElement("span")
          alimentoTexto.textContent = alimento
          alimentoItem.appendChild(alimentoTexto)
  
         
          const eliminarBtn = document.createElement("button")
          eliminarBtn.className = "eliminar-btn"
          eliminarBtn.textContent = "x"
          eliminarBtn.addEventListener("click", () => eliminarAlimento(categoria, indice))
          alimentoItem.appendChild(eliminarBtn)
  
          alimentosLista.appendChild(alimentoItem)
        })
  
        categoriaDiv.appendChild(alimentosLista)
        listaCompras.appendChild(categoriaDiv)
      }
    }
  
    
    agregarBtn.addEventListener("click", agregarAlimento)
  
  
    alimentoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        agregarAlimento()
      }
    })
  
    
    actualizarLista()
  })
  
  