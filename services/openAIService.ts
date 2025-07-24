
interface AIResponse {
  text: string;
}

const SYSTEM_PROMPT_BASE = "Eres CodeGenie, un genio amigable y divertido que ayuda a los niños a aprender programación. Tu objetivo es responder preguntas sobre una lección específica. Explica las cosas de manera muy simple, con entusiasmo y usando analogías que un niño pueda entender. Basa tus respuestas únicamente en el contenido de la lección proporcionado. Mantén tus respuestas concisas, relevantes a la pregunta y motivadoras.";

export const getOpenAIResponse = async (userPrompt: string, lessonContent: string, lessonTitle: string): Promise<AIResponse> => {
  const fullUserPrompt = `Lección: "${lessonTitle}"\n\nContenido:\n${lessonContent}\n\nPregunta del estudiante: "${userPrompt}"`;
  
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error('API key is not set. Please ensure OpenAI_API_KEY is set in your .env file.');
    return { text: 'Lo siento, mi lámpara mágica no tiene energía. Parece que la clave de API no está configurada. Por favor, asegúrate de que un adulto configure la variable OpenAI_API_KEY en el entorno.' };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT_BASE },
          { role: 'user', content: fullUserPrompt }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from OpenAI API:', errorData);
      const errorMessage = errorData?.error?.message || 'Hubo un error con la API de OpenAI.';
      return { text: `Oops. ${errorMessage}` };
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content?.trim() || "No pude generar una respuesta. ¡Inténtalo de nuevo!";
    
    return { text };

  } catch (error) {
    console.error('Error al contactar la API de OpenAI:', error);
    const errorMessage = 'Oops. Hubo un problema al conectar con mi cerebro de IA. Por favor, revisa tu conexión a internet y vuelve a intentarlo.';
    return { text: errorMessage };
  }
};
