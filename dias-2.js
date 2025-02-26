// ¿Sabes cuando te registras en un site y, justo después, al iniciar sesión, te llama por tu nombre? Eso es lo que harás en el desafío de hoy.

// Cuando creas un sistema, site o aplicación, es común querer agregar algunos toques personalizados para hacer la experiencia en tu aplicación más rica y dinámica.

// Hacer esto mediante programación puede no ser una tarea fácil. Dependiendo del nivel de personalización que quieras implementar, la cantidad de código que necesitarás escribir puede ser inmensa.

// Pero, por supuesto, puedes comenzar de una manera más sencilla. Para ello, lo importante es entender cómo capturar y almacenar valores dentro de variables. ¡Y en eso te voy a ayudar hoy!

// Las variables son los bloques básicos de construcción de cualquier sistema y son esenciales para procesar cualquier tipo de información, ya sea de una persona que ha iniciado sesión en el sistema o incluso para mostrar detalles de productos en un catálogo de comercio electrónico.

// Por eso, hoy te voy a enseñar a desarrollar un programa simulando una de esas aplicaciones. Debe pedir al usuario responder 3 preguntas:

// - ¿Cuál es tu nombre?
// - ¿Cuántos años tienes?
// - ¿Qué lenguaje de programación estás estudiando?

// A medida que se hagan las preguntas, la persona que esté usando el programa debe responder cada una de ellas.

// Al final, el sistema mostrará el mensaje:

// "Hola [nombre], tienes [edad] años y ya estás aprendiendo [lenguaje]!"

// Observa que cada información entre [ ] es una de las respuestas dadas por la persona.

let nombre = prompt("¿Cuál es tu nombre?");
let edad = prompt("¿Cuántos años tienes?");
let lenguaje = prompt("¿Qué lenguaje de programación estás estudiando?");

document.write(`Hola <strong>${nombre}</strong>, tienes <strong>${edad}</strong> años y ya estás aprendiendo <strong>${lenguaje}</strong>!`);


let gustaLenguaje = prompt(`¿Te gusta estudiar ${lenguaje}? (Responde con sí o no)`);
if (gustaLenguaje.toLowerCase() === "sí" || gustaLenguaje.toLowerCase() === "si") {
    document.write("<br>¡Qué bueno! Sigue aprendiendo y tendrás mucho éxito.");
} else {
    document.write("<br>¡Vaya! Quizás puedas probar con otro lenguaje.");
}
