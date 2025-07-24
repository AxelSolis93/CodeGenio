# CodeGenio

CodeGenio es una plataforma web interactiva diseñada para que niños y principiantes aprendan los fundamentos de la programación de una manera divertida, visual y atractiva. A través de lecciones gamificadas, un asistente de IA amigable y un sistema de progreso, los usuarios se embarcan en una aventura para convertirse en genios del código.
  Características Principales

    Niveles de Aprendizaje Progresivos: Desde conceptos básicos como "Hola, Mundo" y variables, hasta temas avanzados como APIs y manipulación del DOM.

    Asistente de IA (CodeGenio): Un chatbot integrado en cada lección que responde preguntas y explica conceptos complejos de forma sencilla, utilizando el poder de la API de OpenAI.

    Sistema de Autenticación y Perfiles:

        Registro y Login simplificado por email, con persistencia en localStorage.

        Soporte para múltiples perfiles bajo una misma cuenta (Ideal para planes Familiares e Instituciones).

        Panel de control para que padres y educadores supervisen el progreso.

    Gamificación: Los estudiantes ganan Puntos de Experiencia (XP) al completar lecciones, manteniéndolos motivados.

    Certificados Personalizables: Al completar el curso, los estudiantes reciben un certificado que puede incluir el logo de su institución.

    Prueba de Nivel: Una prueba inicial para recomendar el nivel de partida más adecuado para el estudiante.

    Diseño Moderno y Responsivo: Una interfaz limpia y atractiva construida con Tailwind CSS que funciona en cualquier dispositivo.

Stack Tecnológico

    Frontend: React, TypeScript

    Estilos: Tailwind CSS

    Inteligencia Artificial: OpenAI API (usando el modelo gpt-4.1-nano)
    
  Instalación y Puesta en Marcha

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

    Clona el repositorio:
    Generated bash

      
git clone https://github.com/tu-usuario/codegenio.git](https://github.com/AxelSolis93/CodeGenio.git
cd codegenio

    

Configura las variables de entorno:

    Crea un archivo llamado .env.local en la raíz del proyecto.

    Añade tu clave de API de OpenAI.


# .env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    
Inicia el servidor de desarrollo:

      
Instalar dependencias

        npm install
     

   Cómo Empezar a Usar
    
    npm run dev

    Abre la aplicación en tu navegador.

    Haz clic en "Iniciar Sesión / Registrarse".

    Introduce tu email. Si eres un nuevo usuario, se te guiará para crear una cuenta, elegir un plan y crear tu primer perfil.

    ¡Listo! Explora los niveles, completa las lecciones y no dudes en preguntarle al Asistente de IA si tienes alguna duda.
