import React from 'react';
import { SubscriptionPlan, Level, SubscriptionPlanName, PlacementTestQuestion } from './types';

// Iconos SVG simples como componentes React
export const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m5.841-2.58L15.59 14.37m0 0L21.25 12A9 9 0 007.5 4.5v4.912A9.003 9.003 0 0011.369 19.5m0-10.5h.008v.008h-.008V9m0 4.5h.008v.008h-.008v-.008m.390-3.351A9.001 9.001 0 0011.37 5.5H9.572V4.5h1.798a9.001 9.001 0 013.978 1.648l.39.391z" />
  </svg>
);

export const IconBrain = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A9.005 9.005 0 0112 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.485 0 4.73-.998 6.362-2.638M16.5 9.75V14.25" />
 </svg>
);

export const IconStar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-12 md:h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.82.61l-4.725-2.885a.563.563 0 00-.652 0l-4.725 2.885a.562.562 0 01-.82-.61l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);


export const SUBSCRIPTION_PLANS_DATA: SubscriptionPlan[] = [
  {
    name: SubscriptionPlanName.INDIVIDUAL,
    price: '$9.99/mes',
    features: [
      'Acceso a todos los niveles y lecciones', 
      'Soporte por IA en lecciones', 
      'Seguimiento de progreso personal',
      'Un perfil de estudiante'
    ],
    buttonText: 'Empezar ahora',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    name: SubscriptionPlanName.FAMILIAR,
    price: '$19.99/mes',
    features: [
      'Acceso completo para hasta 5 perfiles', 
      'Todos los niveles y lecciones',
      'Soporte de IA para cada perfil',
      'Panel de control parental para seguir el progreso'
    ],
    buttonText: 'Elegir plan Familiar',
    color: 'bg-green-500 hover:bg-green-600',
    highlight: true,
  },
  {
    name: SubscriptionPlanName.INSTITUCION,
    price: 'Personalizado',
    description: 'Perfecto para colegios, academias de código y centros educativos que buscan llevar la programación a sus aulas.',
    features: [
      'Licencias para toda la clase o institución',
      'Panel de control para educadores y administradores',
      'Seguimiento detallado del progreso por estudiante y clase',
      'Reportes de rendimiento avanzados y exportables',
      'Materiales curriculares y guías para el profesor',
      'Certificados personalizables con el logo de la institución',
      'Soporte prioritario y gestor de cuenta dedicado',
    ],
    buttonText: 'Solicitar una Demo',
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export const LEVELS_DATA: Level[] = [
  {
    id: 'inicial',
    title: 'Nivel Inicial',
    description: 'Empieza tu aventura en el código. ¡Vamos a crear cosas increíbles juntos!',
    icon: <IconRocket />,
    color: 'bg-sky-500',
    textColor: 'text-sky-100',
    borderColor: 'border-sky-700',
    lessons: [
      { 
        id: 'ini-1', title: 'Tu Primer "Hola Mundo"', 
        description: 'Aprende a dar tu primer paso y hacer que la computadora te salude.',
        content: '¡Bienvenido al mundo de la programación! Tu primera misión es hacer que la computadora diga "Hola, Mundo!". Es una tradición para todos los programadores.\n\nUsaremos un comando especial llamado `mostrar()`. Todo lo que pongas dentro de los paréntesis y entre comillas, ¡aparecerá en la pantalla!\n\n[CODE_START]\n// Este es un comando para mostrar un mensaje\nmostrar("¡Hola, Mundo!");\n[CODE_END]\n\n¡Felicidades! Acabas de escribir tu primera línea de código. Eres oficialmente un programador.',
        aiPromptContext: 'Soy un niño aprendiendo a programar. Explícame qué es "Hola, Mundo" y por qué es importante.',
        estimatedTime: '10 min'
      },
      { 
        id: 'ini-2', title: 'Variables: Cajas Mágicas', 
        description: 'Descubre cómo guardar información en "cajas mágicas" llamadas variables.',
        content: 'Imagina que tienes cajas mágicas para guardar tus juguetes. En programación, tenemos "variables", que son como cajas para guardar información.\n\nPodemos crear una variable con un nombre y ponerle algo adentro. Por ejemplo, podemos guardar un número o un texto.\n\n[CODE_START]\n// Creamos una caja (variable) llamada "puntos" y guardamos el número 100\nlet puntos = 100;\n\n// Creamos otra caja llamada "nombre" y guardamos el texto "Super Coder"\nlet nombre = "Super Coder";\n\n// Ahora podemos ver qué hay dentro\nmostrar(puntos);\nmostrar(nombre);\n[CODE_END]\n\n¡Las variables son súper útiles para recordar cosas en nuestros programas!',
        aiPromptContext: 'Explícame qué es una variable como si fueran cajas mágicas para guardar cosas.',
        estimatedTime: '15 min'
      },
       { 
        id: 'ini-3', title: 'Algoritmos: Recetas para Robots', 
        description: 'Aprende a dar instrucciones paso a paso, como si escribieras una receta.',
        content: 'Un algoritmo es como una receta de cocina, ¡pero para computadoras! Son una lista de pasos que le dices a la computadora que siga para hacer algo.\n\nPor ejemplo, para hacer un sándwich, los pasos serían:\n1. Tomar dos rebanadas de pan.\n2. Poner jamón en una rebanada.\n3. Poner queso sobre el jamón.\n4. Juntar las dos rebanadas de pan.\n\nEn programación, escribimos algoritmos para resolver problemas. ¡Cada programa que usamos sigue un algoritmo!',
        aiPromptContext: '¿Qué es un algoritmo? Explícamelo con una analogía divertida, como una receta de cocina.',
        estimatedTime: '15 min'
      },
      { 
        id: 'ini-4', title: 'Secuencias: El Orden Importa', 
        description: 'Descubre por qué el orden de tus instrucciones es súper importante.',
        content: 'Las computadoras siguen tus instrucciones en el orden exacto en que las escribes. ¡Igual que cuando sigues los pasos para armar un juguete! Si cambias el orden, el resultado puede ser muy diferente.\n\n[CODE_START]\n// ¿Qué pasa si saludamos primero y luego preparamos el mensaje?\nlet mensaje = "¡Estoy listo para programar!";\nmostrar("¡Hola!");\nmostrar(mensaje);\n\n// Ahora al revés\nmostrar(mensaje); // ¡Oh, no! La variable "mensaje" no existe todavía aquí.\nlet mensaje = "¡Estoy listo para programar!";\n[CODE_END]\n\nEl orden correcto es la clave para que tus programas funcionen como esperas. ¡Siempre de arriba hacia abajo!',
        aiPromptContext: '¿Por qué es importante el orden del código? Usa una analogía como armar un LEGO.',
        estimatedTime: '10 min'
      },
      { 
        id: 'ini-5', title: 'Depuración: ¡A Cazar Bichos!', 
        description: 'Aprende a encontrar y aplastar los "bichos" (errores) en tu código.',
        content: 'A veces, nuestro código no funciona. ¡No te preocupes! A estos errores los llamamos "bugs" o "bichos". Ser programador también significa ser un buen detective de bichos.\n\nUn error común es escribir mal un comando o el nombre de una variable.\n\n[CODE_START]\nlet nombreAmigo = "Alex";\n// ¡Uy! Escribimos "n ombre" en lugar de "nombreAmigo"\nmostrar(n ombre);\n// La consola nos dirá que hay un error. ¡Tenemos que arreglarlo!\n\n// Versión correcta:\nmostrar(nombreAmigo);\n[CODE_END]\n\nRevisar tu código con atención es el superpoder para cazar y arreglar cualquier bicho.',
        aiPromptContext: '¿Qué es un "bug" o "bicho" en programación? ¿Cómo puedo encontrarlos?',
        estimatedTime: '15 min'
      },
      { 
        id: 'ini-6', title: 'Comentarios: Notas para Ti', 
        description: 'Deja mensajes secretos en tu código que solo tú y otros programadores pueden leer.',
        content: 'Puedes escribir notas en tu código que la computadora ignorará por completo. ¡Son para los humanos! Se llaman "comentarios" y son muy útiles para recordar qué hace una parte de tu código o para dejar una idea.\n\nPara escribir un comentario, usamos dos barras inclinadas `//`.\n\n[CODE_START]\n// Esta variable guarda la edad de mi mascota.\nlet edadMascota = 4;\n\n// La siguiente línea mostrará un saludo\nmostrar("¡Mi mascota es genial!"); // ¡Y tiene 4 años!\n[CODE_END]\n\nUsa comentarios para que tu código sea más fácil de entender. ¡Es como dejar pistas para tu yo del futuro!',
        aiPromptContext: 'Explícame para qué sirven los comentarios en el código.',
        estimatedTime: '10 min'
      },
      { 
        id: 'ini-7', title: 'Tu Primer Dibujo con Código', 
        description: 'Usa el código para dibujar formas y figuras simples en la pantalla.',
        content: '¡No todo es texto! También podemos usar código para crear arte. Imagina que tienes un lápiz mágico que obedece tus comandos. Podemos decirle que dibuje un círculo, un cuadrado o que cambie de color.\n\n[CODE_START]\n// Le decimos al lápiz que se ponga de color rojo\ncolor("rojo");\n\n// Dibujamos un círculo en una posición (x, y) con un tamaño\ncirculo(50, 50, 40);\n\n// ¡Ahora un cuadrado azul!\ncolor("azul");\ncuadrado(100, 100, 60);\n[CODE_END]\n\n¡Experimenta con diferentes formas, colores y tamaños para crear tu propia obra de arte digital!',
        aiPromptContext: '¿Cómo puedo dibujar con código? Dame ideas sencillas para empezar.',
        estimatedTime: '20 min'
      },
    ],
  },
  {
    id: 'intermedio',
    title: 'Nivel Intermedio',
    description: 'Aprende nuevos trucos y hechizos para que tus programas sean más inteligentes.',
    icon: <IconBrain />,
    color: 'bg-amber-500',
    textColor: 'text-amber-100',
    borderColor: 'border-amber-700',
    lessons: [
      { 
        id: 'int-1', title: 'Condicionales: Tomando Decisiones', 
        description: 'Enseña a tu programa a decidir qué hacer con las sentencias if/else.',
        content: 'A veces, queremos que nuestro programa haga una cosa si algo es verdad, y otra cosa si es falso. ¡Para eso usamos los condicionales! Son como un "si pasa esto, haz aquello".\n\nUsamos la palabra mágica `if` (que significa "si" en inglés). Si la condición dentro del `if` es verdadera, se ejecuta el código.\n\n[CODE_START]\nlet edad = 10;\n\nif (edad > 7) {\n  mostrar("¡Puedes entrar al tobogán gigante!");\n} else {\n  mostrar("Aún necesitas crecer un poco más.");\n}\n[CODE_END]\n\nEl `else` (que significa "si no") nos da una acción alternativa. ¡Ahora tus programas pueden pensar!',
        aiPromptContext: 'Explícame qué es un condicional "if/else" con un ejemplo de un parque de diversiones.',
        estimatedTime: '20 min'
      },
      { 
        id: 'int-2', title: 'Bucles: Repitiendo Acciones', 
        description: 'Aprende a hacer que la computadora repita tareas muchas veces con los bucles.',
        content: '¿Te imaginas tener que escribir `mostrar("¡Hola!")` cien veces? ¡Sería muy aburrido! Para eso existen los bucles. Un bucle repite un bloque de código las veces que queramos.\n\nUn bucle famoso es el bucle `for`. Le decimos desde dónde empezar a contar, hasta dónde llegar y de cuánto en cuánto avanzar.\n\n[CODE_START]\n// Este bucle contará del 1 al 5\nfor (let i = 1; i <= 5; i = i + 1) {\n  mostrar("Número: " + i);\n}\n[CODE_END]\n\n¡Los bucles nos ahorran muchísimo trabajo y hacen que la computadora trabaje por nosotros!',
        aiPromptContext: '¿Qué es un bucle "for"? Explícame para qué sirve con un ejemplo fácil.',
        estimatedTime: '20 min'
      },
      { 
        id: 'int-3', title: 'Funciones: Hechizos de Código', 
        description: 'Crea tus propios "hechizos" de código para usarlos cuando quieras.',
        content: 'Una función es como un hechizo mágico que creas y le pones un nombre. Cada vez que dices el nombre del hechizo (llamas a la función), ¡sucede la magia!\n\nEsto es genial porque si tienes un conjunto de pasos que usas mucho, puedes guardarlos en una función y no tener que escribirlos una y otra vez.\n\n[CODE_START]\n// Creamos un hechizo (función) para saludar\nfunction saludarAmigo(nombre) {\n  mostrar("¡Hola, " + nombre + "! ¡Qué bueno verte!");\n}\n\n// Ahora usamos nuestro hechizo\nsaludarAmigo("Ana");\nsaludarAmigo("Luis");\n[CODE_END]\n\n¡Con las funciones, tu código será más ordenado y poderoso!',
        aiPromptContext: '¿Qué es una función en programación? Explícamelo como si fueran hechizos mágicos.',
        estimatedTime: '25 min'
      },
      { 
        id: 'int-4', title: 'Bucles "Mientras": Repetir con Condición', 
        description: 'Usa el bucle `while` para repetir algo mientras una condición sea verdadera.',
        content: 'Además del bucle `for`, existe otro tipo de bucle llamado `while` (mientras). Este bucle repetirá el código en su interior una y otra vez, ¡mientras una condición sea verdadera!\n\nEs útil cuando no sabemos exactamente cuántas veces necesitamos repetir algo.\n\n[CODE_START]\nlet energia = 5;\n\nwhile (energia > 0) {\n  mostrar("¡Aún tengo energía! Nivel: " + energia);\n  energia = energia - 1; // ¡Importante! Debemos cambiar la condición para no crear un bucle infinito.\n}\n\nmostrar("¡Uf! Necesito recargar.");\n[CODE_END]\n\n¡Los bucles `while` son geniales para juegos y simulaciones!',
        aiPromptContext: '¿Cuál es la diferencia entre un bucle `for` y un bucle `while`?',
        estimatedTime: '20 min'
      },
      { 
        id: 'int-5', title: 'Arrays: Listas de Amigos', 
        description: 'Guarda listas de tus cosas favoritas, como amigos o sabores de helado.',
        content: 'Imagina un cofre del tesoro donde guardas todos tus juguetes favoritos. En programación, un "array" es como ese cofre. Es una lista donde puedes guardar muchos valores juntos.\n\nPara crear un array, usamos corchetes `[]` y separamos los elementos con comas.\n\n[CODE_START]\n// Un array con nuestros postres favoritos\nlet postres = ["helado", "pastel", "galletas"];\n\n// Podemos ver un elemento específico por su posición (empezamos a contar desde 0)\nmostrar(postres[0]); // Muestra "helado"\nmostrar(postres[2]); // Muestra "galletas"\n[CODE_END]\n\nLos arrays son perfectos para guardar listas de amigos, puntuaciones de juegos, ¡o lo que se te ocurra!',
        aiPromptContext: 'Explícame qué es un array como si fuera un cofre del tesoro o una colección.',
        estimatedTime: '20 min'
      },
      { 
        id: 'int-6', title: 'Anidación: Ideas Dentro de Ideas', 
        description: 'Aprende a poner bucles dentro de condicionales (¡y viceversa!).',
        content: '¡Ahora vamos a combinar nuestros poderes! Podemos poner un condicional `if` dentro de un bucle `for`, o un bucle dentro de otro bucle. A esto se le llama "anidar" y nos permite crear programas muy inteligentes.\n\n[CODE_START]\n// Vamos a contar hasta 10 y decir si cada número es par o impar\nfor (let i = 1; i <= 10; i = i + 1) {\n  \n  // Un `if` anidado dentro del `for`\n  if (i % 2 === 0) { // El operador % nos da el resto de una división\n    mostrar(i + " es un número par.");\n  } else {\n    mostrar(i + " es un número impar.");\n  }\n}\n[CODE_END]\n\nAnidar es como construir con bloques de LEGO: ¡puedes juntar las piezas de diferentes maneras para crear algo nuevo y genial!',
        aiPromptContext: '¿Qué significa "anidar" código? Dame un ejemplo fácil de entender.',
        estimatedTime: '25 min'
      },
      { 
        id: 'int-7', title: 'Eventos: Magia al Hacer Clic', 
        description: 'Haz que tus programas reaccionen cuando el usuario hace clic en un botón.',
        content: 'Los programas más divertidos son los que reaccionan a lo que hacemos. A estas acciones, como hacer clic con el ratón o pulsar una tecla, las llamamos "eventos".\n\nPodemos "escuchar" un evento en un elemento, como un botón, y ejecutar una función cuando suceda.\n\n[CODE_START]\n// Imagina que tenemos un botón en la pantalla con el id="miBoton"\nlet miBoton = obtenerElemento("miBoton");\n\n// Le decimos al botón que escuche el evento "clic"\nmiBoton.alHacerClic(function() {\n  // Este código se ejecuta CADA VEZ que se hace clic en el botón\n  mostrar("¡Auch! ¡Me has hecho clic!");\n});\n[CODE_END]\n\n¡Con los eventos, puedes crear juegos interactivos, aplicaciones y mucho más!',
        aiPromptContext: '¿Qué es un evento en programación? Explícamelo como si fuera un interruptor de luz.',
        estimatedTime: '25 min'
      },
    ],
  },
  {
    id: 'avanzado',
    title: 'Nivel Avanzado',
    description: 'Conviértete en un maestro del código y crea proyectos aún más asombrosos.',
    icon: <IconStar />,
    color: 'bg-red-500',
    textColor: 'text-red-100',
    borderColor: 'border-red-700',
    lessons: [
       { 
        id: 'ava-1', title: 'Objetos: Crea tus Personajes', 
        description: 'Aprende a crear estructuras complejas, como personajes para un juego.',
        content: 'Si quisiéramos crear un personaje para un juego, necesitaríamos guardar varias cosas sobre él: su nombre, sus puntos de vida, si tiene una llave... Para eso usamos "objetos".\n\nUn objeto agrupa varias variables (propiedades) en un solo lugar. Usamos llaves `{}` para crearlos.\n\n[CODE_START]\n// Un objeto que representa a nuestro héroe\nlet heroe = {\n  nombre: "Capitán Valiente",\n  vida: 100,\n  tieneLlave: false\n};\n\n// Así vemos sus propiedades\nmostrar(heroe.nombre);\nmostrar("Vida: " + heroe.vida);\n[CODE_END]\n\n¡Con los objetos, puedes representar casi cualquier cosa del mundo real en tu código!',
        aiPromptContext: '¿Qué es un objeto en programación? Explícamelo creando un personaje de un videojuego.',
        estimatedTime: '25 min'
      },
      { 
        id: 'ava-2', title: 'Métodos: ¡Dando Poder a tus Objetos!', 
        description: 'Dale acciones y poderes a tus personajes con métodos.',
        content: 'Ahora que nuestro "Capitán Valiente" existe como un objeto, ¡démosle poderes! Un método es una función que vive dentro de un objeto. Es una acción que el objeto puede realizar.\n\nVamos a darle a nuestro héroe la habilidad de saludar.\n\n[CODE_START]\nlet heroe = {\n  nombre: "Capitán Valiente",\n  vida: 100,\n  tieneLlave: false,\n  // ¡Aquí está nuestro método!\n  saludar: function() {\n    mostrar("¡Hola! Soy " + this.nombre + " y estoy listo para la aventura.");\n  }\n};\n\n// Para usar su poder, llamamos al método así:\nheroe.saludar();\n[CODE_END]\n\nLa palabra `this` es especial: se refiere al propio objeto. ¡Así, el Capitán sabe cómo decir su propio nombre! Ahora puedes darle todo tipo de poderes a tus personajes.',
        aiPromptContext: 'Explícame qué es un método en un objeto, como si fuera un poder especial de un personaje.',
        estimatedTime: '25 min'
      },
      { 
        id: 'ava-3', title: 'Manipulando Arrays', 
        description: 'Aprende a añadir, quitar y cambiar elementos en tus listas de tesoros.',
        content: 'Tus listas (arrays) son dinámicas. ¡Puedes cambiarlas cuando quieras! Hay métodos especiales para añadir elementos al final, quitarlos o incluso añadirlos al principio.\n\n[CODE_START]\nlet inventario = ["espada", "escudo"];\n\n// Añadimos una poción al final\ninventario.agregar("poción"); // Ahora es ["espada", "escudo", "poción"]\nmostrar(inventario);\n\n// Quitamos el último elemento\ninventario.quitarUltimo(); // Ahora es ["espada", "escudo"]\nmostrar(inventario);\n\n// ¿Cuántos objetos tenemos?\nmostrar("Tengo " + inventario.longitud + " objetos.");\n[CODE_END]\n\nDominar estos métodos te da un control total sobre tus colecciones de datos.',
        aiPromptContext: '¿Cómo puedo añadir o quitar cosas de un array? ¿Qué es "longitud"?',
        estimatedTime: '25 min'
      },
      { 
        id: 'ava-4', title: 'El DOM: El Esqueleto de la Web', 
        description: 'Descubre cómo el código puede ver y cambiar los elementos de una página web.',
        content: 'Cada página web es un documento. Tu código puede interactuar con este documento a través de algo llamado DOM (Document Object Model). ¡Piensa en el DOM como el esqueleto de la página!\n\nPuedes usar JavaScript para seleccionar un elemento del esqueleto (como un título, un párrafo o una imagen) y cambiarlo.\n\n[CODE_START]\n// Imagina que hay un título en tu página con id="tituloPrincipal"\nlet miTitulo = obtenerElementoPorId("tituloPrincipal");\n\n// ¡Vamos a cambiar su texto!\nmiTitulo.texto = "¡Página Mágica Creada con Código!";\n\n// ¡Y su color!\nmiTitulo.estilo.color = "purple";\n[CODE_END]\n\nManipular el DOM es la clave para crear páginas web dinámicas e interactivas. ¡Es como tener control total sobre lo que ve el usuario!',
        aiPromptContext: '¿Qué es el DOM? Explícamelo como si fuera el esqueleto de una página web.',
        estimatedTime: '30 min'
      },
      { 
        id: 'ava-5', title: 'Proyecto: Tu Propia Calculadora', 
        description: '¡Junta todo lo que has aprendido para construir una calculadora que funciona!',
        content: '¡Es hora de un gran proyecto! Vamos a usar HTML para crear los botones, CSS para que se vea bonita, y JavaScript (con todo lo que has aprendido) para que funcione.\n\nNecesitarás:\n- Variables para guardar los números y la operación.\n- Funciones para sumar, restar, etc.\n- Manipulación del DOM para mostrar el resultado en la pantalla.\n- Eventos para que los botones reaccionen al hacer clic.\n\n[CODE_START]\n// Lógica simple para un botón de suma\nfunction sumar() {\n  let numero1 = obtenerValorDe("input1");\n  let numero2 = obtenerValorDe("input2");\n  let resultado = numero1 + numero2;\n  mostrarResultadoEnPantalla(resultado);\n}\n\n// Asociar esta función al evento de clic del botón de suma\nlet botonSuma = obtenerElementoPorId("botonSumar");\nbotonSuma.alHacerClic(sumar);\n[CODE_END]\n\nEste es un desafío emocionante que pone a prueba tus habilidades. ¡Demuestra todo lo que sabes!',
        aiPromptContext: 'Quiero hacer una calculadora. ¿Qué pasos debo seguir? ¿Qué conceptos de programación necesito usar?',
        estimatedTime: '45 min'
      },
       { 
        id: 'ava-6', title: 'JSON: El Lenguaje de los Datos', 
        description: 'Aprende sobre JSON, el formato que usan las computadoras para pasarse datos.',
        content: 'Cuando los programas se comunican por internet, necesitan un idioma en común para entenderse. JSON (JavaScript Object Notation) es ese idioma. ¡Se parece mucho a los objetos de JavaScript que ya conoces!\n\nEs una forma de escribir datos de manera ordenada que tanto humanos como computadoras pueden leer fácilmente.\n\n[CODE_START]\n// Así se ve un objeto de personaje en formato JSON\n{\n  "nombre": "Astro-Gato",\n  "planeta": "Miau-Prime",\n  "vidasRestantes": 9,\n  "poderes": ["rayo láser", "súper siesta"]\n}\n[CODE_END]\n\nVerás JSON por todas partes cuando trabajes con APIs y datos de internet. ¡Es el lenguaje universal para la información en la web!',
        aiPromptContext: '¿Qué es JSON? ¿Por qué se parece a los objetos de JavaScript?',
        estimatedTime: '20 min'
      },
      { 
        id: 'ava-7', title: 'APIs: Conectando con el Mundo', 
        description: 'Aprende cómo los programas hablan entre sí para obtener información.',
        content: 'Una API (Interfaz de Programación de Aplicaciones) es como un mesero en un restaurante. Tú (tu programa) le pides algo al mesero (la API), él va a la cocina (otro servidor o servicio) y te trae lo que pediste (los datos).\n\nPodemos usar APIs para obtener el clima, buscar gifs de gatos, conseguir datos de un juego, ¡y mucho más!\n\n[CODE_START]\n// Así se pediría un chiste aleatorio a una API de chistes\npedirDatos("https://api.dechistes.com/chiste-aleatorio")\n  .luego(function(respuesta) {\n    // La respuesta suele venir en formato JSON\n    let chiste = respuesta.chiste;\n    mostrar(chiste);\n  });\n[CODE_END]\n\nLas APIs abren un universo de posibilidades, permitiendo que tu programa se conecte y use el poder de otros servicios en internet.',
        aiPromptContext: '¿Qué es una API? Explícamelo con la analogía de un restaurante.',
        estimatedTime: '30 min'
      },
    ],
  },
];

export const PLACEMENT_TEST_QUESTIONS: PlacementTestQuestion[] = [
  {
    id: 'q1',
    question: '¿Qué usarías para guardar tu nombre en el código?',
    options: ['Un número', 'Una variable', 'Un bucle', 'Un color'],
    correctAnswerIndex: 1,
  },
  {
    id: 'q2',
    question: 'Si quieres que la computadora haga algo 10 veces, ¿qué es lo mejor que puedes usar?',
    options: [
      'Una variable',
      'Un condicional',
      'Un bucle',
      'Escribir el código 10 veces',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'q3',
    question: '¿Para qué sirve una declaración `if`?',
    options: [
      'Para repetir código.',
      'Para guardar información.',
      'Para tomar una decisión y hacer algo si una condición es verdadera.',
      'Para dibujar en la pantalla.',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'q4',
    question: '¿Qué es un algoritmo?',
    options: [
      'Un personaje de un juego.',
      'Un error en el código.',
      'Una lista de pasos o instrucciones para resolver un problema.',
      'El color de fondo de una página web.',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 'q5',
    question: '¿Qué resultado mostraría el código `mostrar("Hola, " + "Mundo");`?',
    options: ['Hola, Mundo', 'Hola,Mundo', 'Hola, + Mundo', 'Error'],
    correctAnswerIndex: 0,
  }
];


export const APP_NAME = "CodeGenio";
export const APP_SLOGAN = "¡Aprende Programación Jugando!";