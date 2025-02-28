document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const guessInput = document.getElementById("guess")
    const checkButton = document.getElementById("check-button")
    const restartButton = document.getElementById("restart-button")
    const attemptsSpan = document.querySelector("#attempts span")
    const messageElement = document.getElementById("message")
    const resultElement = document.getElementById("result")
  
    // Variables del juego
    let numeroSecreto
    let intentosRestantes
  
    // Iniciar juego
    iniciarJuego()
  
    // Event listeners
    checkButton.addEventListener("click", comprobarNumero)
    restartButton.addEventListener("click", iniciarJuego)
  
    // Permitir presionar Enter para comprobar
    guessInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        comprobarNumero()
      }
    })
  
    // Funciones
    function iniciarJuego() {
      // Generar número aleatorio entre 0 y 10
      numeroSecreto = Math.floor(Math.random() * 11)
      intentosRestantes = 3
  
      // Resetear UI
      attemptsSpan.textContent = intentosRestantes
      messageElement.textContent = ""
      messageElement.className = ""
      resultElement.textContent = ""
      guessInput.value = ""
      guessInput.disabled = false
      checkButton.disabled = false
      restartButton.classList.add("hidden")
  
      // Enfocar el input
      guessInput.focus()
  
      console.log("Número secreto (para depuración):", numeroSecreto)
    }
  
    function comprobarNumero() {
      // Validar entrada
      const numeroUsuario = Number.parseInt(guessInput.value)
  
      if (isNaN(numeroUsuario) || numeroUsuario < 0 || numeroUsuario > 10) {
        messageElement.textContent = "Por favor, ingresa un número válido entre 0 y 10."
        messageElement.className = "error"
        guessInput.value = ""
        guessInput.focus()
        return
      }
  
      // Reducir intentos
      intentosRestantes--
      attemptsSpan.textContent = intentosRestantes
  
      // Comprobar acierto
      if (numeroUsuario === numeroSecreto) {
        finalizarJuego(true)
      } else {
        // Dar pista
        const pista = numeroUsuario > numeroSecreto ? "más bajo" : "más alto"
  
        if (intentosRestantes > 0) {
          messageElement.textContent = `¡Incorrecto! El número es ${pista}. Inténtalo de nuevo.`
          messageElement.className = "error"
          guessInput.value = ""
          guessInput.focus()
        } else {
          finalizarJuego(false)
        }
      }
    }
  
    function finalizarJuego(victoria) {
      guessInput.disabled = true
      checkButton.disabled = true
      restartButton.classList.remove("hidden")
  
      if (victoria) {
        resultElement.textContent = "¡Felicidades! ¡Has adivinado el número!"
        resultElement.className = "success"
      } else {
        resultElement.textContent = `¡Se acabaron los intentos! El número era ${numeroSecreto}.`
        resultElement.className = "error"
      }
    }
  })
  
  