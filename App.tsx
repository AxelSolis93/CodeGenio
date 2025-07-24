
import React, { useState, useCallback, useEffect, useRef, forwardRef } from 'react';
import { AppView, Level, Lesson, SubscriptionPlan, SubscriptionPlanName, UserProfile, PlacementTestQuestion, AuthenticatedUser } from './types';
import { LEVELS_DATA, SUBSCRIPTION_PLANS_DATA, APP_NAME, APP_SLOGAN, PLACEMENT_TEST_QUESTIONS, IconRocket, IconBrain, IconStar } from './constants';
import Button from './components/Button';
import Card from './components/Card';
import { getOpenAIResponse } from './services/openAIService';
import InfoModal from './components/InfoModal';

interface AppState {
  authenticatedUser: AuthenticatedUser | null;
  profiles: UserProfile[];
  activeProfileId: string | null;
  institutionLogo: string | null;
}

const initialState: AppState = {
  authenticatedUser: null,
  profiles: [],
  activeProfileId: null,
  institutionLogo: null,
};


const Navbar: React.FC<{ 
  onNavigateHome: () => void;
  authenticatedUser: AuthenticatedUser | null;
  activeProfile: UserProfile | null;
  allProfiles: UserProfile[];
  onSwitchProfile: (profileId: string) => void;
  onCreateProfile: (name: string) => void;
  onNavigateToDashboard: () => void;
  onLogout: () => void;
  onLoginClick: () => void;
}> = ({ onNavigateHome, authenticatedUser, activeProfile, allProfiles, onSwitchProfile, onCreateProfile, onNavigateToDashboard, onLogout, onLoginClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleCreateNewProfile = () => {
    const name = prompt("Introduce el nombre del nuevo perfil:");
    if (name) {
      onCreateProfile(name);
    }
    setDropdownOpen(false);
  };
  
  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 shadow-md sticky top-0 z-50 print:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="text-white text-3xl font-bold tracking-tight cursor-pointer flex items-center"
          onClick={onNavigateHome}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
          {APP_NAME}
        </div>
        {authenticatedUser && activeProfile ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center text-white bg-white/20 rounded-full p-1 pr-3 cursor-pointer hover:bg-white/30 transition-colors">
              <div className={`h-8 w-8 rounded-full ${activeProfile.avatarColor} flex items-center justify-center font-bold text-lg mr-2`}>
                {activeProfile.name.charAt(0)}
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{activeProfile.name}</div>
                <div className="text-xs font-semibold bg-yellow-400 text-purple-800 rounded-full px-2 py-0.5 mt-1 inline-block">{activeProfile.xp} XP</div>
              </div>
              <svg className={`w-5 h-5 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                <div className="px-4 py-2 text-xs text-gray-500 uppercase font-bold">Cambiar Perfil</div>
                {allProfiles.filter(p => p.accountId === authenticatedUser.id).map(profile => (
                  <a key={profile.id} href="#" onClick={(e) => { e.preventDefault(); onSwitchProfile(profile.id); setDropdownOpen(false); }} className={`block px-4 py-2 text-sm ${profile.id === activeProfile.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    {profile.name} ({profile.xp} XP)
                  </a>
                ))}
                {(authenticatedUser.plan === SubscriptionPlanName.FAMILIAR || authenticatedUser.plan === SubscriptionPlanName.INSTITUCION) && (
                  <>
                    <div className="border-t border-gray-200 my-1"></div>
                     {authenticatedUser.plan === SubscriptionPlanName.FAMILIAR && 
                       <a href="#" onClick={(e) => {e.preventDefault(); handleCreateNewProfile();}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Crear Nuevo Perfil</a>
                     }
                    <a href="#" onClick={(e) => {e.preventDefault(); onNavigateToDashboard(); setDropdownOpen(false);}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Panel de Control</a>
                  </>
                )}
                 <div className="border-t border-gray-200 my-1"></div>
                 <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100">Cerrar Sesión</a>
              </div>
            )}
          </div>
        ) : (
            <Button onClick={onLoginClick} variant="light-on-dark">
                Iniciar Sesión / Registrarse
            </Button>
        )}
      </div>
    </nav>
  );
};

const HeroSection: React.FC<{ onStartLearning: () => void; onStartTest: () => void; }> = ({ onStartLearning, onStartTest }) => (
  <section className="py-12 md:py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white text-center">
    <div className="container mx-auto px-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mx-auto mb-6 text-yellow-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 10.5m5.571-10.5l-5.571 10.5m0 0l-2.143-4.286M6.429 9.75a2.25 2.25 0 01.03-1.006c.052-.246.124-.482.215-.705A2.25 2.25 0 018.57 6.75h6.857a2.25 2.25 0 011.884 1.295c.091.223.163.459.215.705a2.25 2.25 0 01.03 1.006m-11.43 4.5a2.25 2.25 0 00-.03 1.006c.052-.246.124-.482.215-.705A2.25 2.25 0 008.57 17.25h6.857a2.25 2.25 0 001.884-1.295c.091-.223.163-.459.215-.705a2.25 2.25 0 00.03-1.006m-5.715-4.5l-3.39-5.75m11.16 0l-3.39 5.75" />
      </svg>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{APP_NAME}</h1>
      <p className="text-xl md:text-2xl mb-8">{APP_SLOGAN}</p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-700 font-bold" onClick={onStartLearning}>
            ¡Empieza a Aprender!
          </Button>
          <Button size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-pink-600 font-bold" onClick={onStartTest}>
            Hacer Prueba de Nivel
          </Button>
      </div>
    </div>
  </section>
);

const SubscriptionSection: React.FC<{ onSelectPlan: (plan: SubscriptionPlanName) => void }> = ({ onSelectPlan }) => (
  <section className="py-16 bg-transparent">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Elige tu Aventura de Programación</h2>
      <p className="text-lg text-center text-gray-300 mb-12 max-w-2xl mx-auto">Cada plan está diseñado para darte la mejor experiencia de aprendizaje.</p>
      <div className="grid lg:grid-cols-3 gap-8 items-stretch">
        {SUBSCRIPTION_PLANS_DATA.map((plan: SubscriptionPlan) => (
          <div key={plan.name} className={`relative rounded-xl shadow-lg flex flex-col bg-gray-800/50 backdrop-blur-sm border border-gray-700 ${plan.highlight ? 'border-4 border-green-500' : ''}`}>
            {plan.highlight && (
              <div className="absolute -top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Más Popular</div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className={`text-2xl font-semibold mb-2 ${plan.name === SubscriptionPlanName.INSTITUCION ? 'text-purple-400' : plan.name === SubscriptionPlanName.FAMILIAR ? 'text-green-400' : 'text-blue-400'}`}>{plan.name}</h3>
              <p className="text-4xl font-bold text-white mb-4">{plan.price}</p>
              {plan.description && <p className="text-gray-300 text-sm mb-6">{plan.description}</p>}
              
              <ul className="space-y-3 text-gray-300 mb-6 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                type="button"
                className={`${plan.color} w-full text-white mt-8`}
                onClick={() => onSelectPlan(plan.name)}
              >
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LevelsSection = forwardRef<HTMLElement, { onSelectLevel: (level: Level) => void }>(({ onSelectLevel }, ref) => (
  <section className="py-16" ref={ref}>
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Elige tu Ruta de Aprendizaje</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {LEVELS_DATA.map((level) => (
          <Card 
            key={level.id} 
            className={`flex flex-col items-center text-center !p-0 overflow-hidden transform hover:scale-105 transition-transform duration-300 ${level.borderColor} border-t-8`}
            onClick={() => onSelectLevel(level)}
          >
            <div className={`w-full ${level.color} ${level.textColor} py-6 flex justify-center items-center`}>
              {level.icon}
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{level.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{level.description}</p>
              <Button variant="primary" className="mt-auto w-full">Comenzar Nivel</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
));

const LevelLessonsView: React.FC<{ level: Level; onSelectLesson: (lesson: Lesson) => void; onBack: () => void; }> = ({ level, onSelectLesson, onBack }) => (
  <section className="py-12">
    <div className="container mx-auto px-6">
      <Button onClick={onBack} variant="secondary" className="mb-8 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Volver a Niveles
      </Button>
      <div className="text-center mb-10">
        <div className={`inline-block p-4 rounded-full ${level.color} ${level.textColor}`}>{level.icon}</div>
        <h2 className="text-4xl font-bold text-gray-800 mt-4">{level.title}</h2>
        <p className="text-xl text-gray-600 mt-2">{level.description}</p>
      </div>
      <div className="space-y-6">
        {level.lessons.map((lesson) => (
          <Card key={lesson.id} onClick={() => onSelectLesson(lesson)} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-semibold text-pink-600">{lesson.title}</h3>
                <p className="text-gray-600 mt-1">{lesson.description}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{lesson.estimatedTime}</p>
                <Button size="sm" variant="ghost" className="mt-2">Empezar Lección</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const renderLessonContent = (content: string) => {
    const parts = content.split(/(\[CODE_START\].*?\[CODE_END\])/s);

    return parts.map((part, index) => {
        if (part.startsWith('[CODE_START]')) {
            const code = part.substring('[CODE_START]'.length, part.length - '[CODE_END]'.length).trim();
            return (
                <div key={index} className="my-4 bg-gray-800 text-white font-mono text-sm rounded-lg overflow-hidden shadow-md">
                    <div className="px-4 py-2 bg-gray-900 text-gray-400 text-xs flex justify-between items-center">
                        <span>Ejemplo de Código</span>
                        <span className="italic">JavaScript</span>
                    </div>
                    <pre className="p-4 overflow-x-auto"><code>{code}</code></pre>
                </div>
            );
        } else {
            const paragraphs = part.trim().split('\n').filter(p => p.trim() !== '');
            return paragraphs.map((paragraph, pIndex) => (
                <p key={`${index}-${pIndex}`} className="mb-4">{paragraph}</p>
            ));
        }
    });
};

interface LessonContentViewProps {
  lesson: Lesson;
  level: Level;
  onBackToLessonsList: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onBackToLevels: () => void;
  onCompleteLesson: (lessonId: string) => void;
  onNavigateToCertificate: () => void;
}

const LessonContentView: React.FC<LessonContentViewProps> = ({ lesson, level, onBackToLessonsList, onSelectLesson, onBackToLevels, onCompleteLesson, onNavigateToCertificate }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  useEffect(() => {
    // Reset chat when lesson changes
    setChatHistory([]);
    setUserInput('');
    setError('');
    setIsLoading(false);
  }, [lesson]);

  const handleAskAI = useCallback(async () => {
    const currentInput = userInput.trim();
    if (!currentInput) {
      setError("Por favor, escribe una pregunta para el asistente de IA.");
      return;
    }
    setError('');
    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', text: currentInput }]);
    setUserInput('');
    
    const response = await getOpenAIResponse(currentInput, lesson.content, lesson.title);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: response.text }]);
    setIsLoading(false);
  }, [userInput, lesson]);

  const currentIndex = level.lessons.findIndex(l => l.id === lesson.id);
  const nextLesson = currentIndex > -1 && currentIndex < level.lessons.length - 1
      ? level.lessons[currentIndex + 1]
      : null;
      
  const isFinalLessonOfCourse = level.id === 'avanzado' && lesson.id === 'ava-7';

  const handleNextLessonClick = () => {
    onCompleteLesson(lesson.id);
    if (nextLesson) {
      onSelectLesson(nextLesson);
    }
  };

  const handleLevelCompleteClick = () => {
    onCompleteLesson(lesson.id);
    onBackToLevels();
  };
  
  const handleCourseCompleteClick = () => {
    onCompleteLesson(lesson.id);
    onNavigateToCertificate();
  };

  const CompletionCard = () => {
    if (isFinalLessonOfCourse) {
      return (
        <Card className="text-center bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 p-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-800">🚀 ¡Felicidades! ¡Has completado todas las lecciones! 🚀</h3>
          <p className="text-gray-700 mt-2 mb-6 text-lg">
            ¡Eres oficialmente un Genio del Código! Has ganado <span className="font-bold text-amber-700">100 puntos de experiencia</span>.
          </p>
          <Button
            size="lg"
            className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
            onClick={handleCourseCompleteClick}
          >
            Generar tu Certificado
          </Button>
        </Card>
      );
    }

    return (
      <Card className="text-center bg-gradient-to-r from-green-300 via-teal-300 to-sky-300 p-8 shadow-2xl">
        <h3 className="text-3xl font-bold text-gray-800">
          {nextLesson ? '¡Lección Completada!' : '✨ ¡Felicidades, Nivel Completado! ✨'}
        </h3>
        <p className="text-gray-700 mt-2 mb-6 text-lg">
          Has ganado <span className="font-bold text-green-700">100 puntos de experiencia</span>. ¡Excelente progreso!
        </p>
        {nextLesson ? (
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
            onClick={handleNextLessonClick}
          >
            Ir a la Siguiente Lección
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
            onClick={handleLevelCompleteClick}
          >
            Elegir un Nuevo Desafío
          </Button>
        )}
      </Card>
    );
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <Button onClick={onBackToLessonsList} variant="secondary" className="mb-8 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Volver a Lecciones
        </Button>
        
        <Card className="mb-8">
          <h2 className={`text-3xl font-bold ${level.color.replace('bg-', 'text-').replace('-500', '-700')} mb-2`}>{lesson.title}</h2>
          <p className="text-sm text-gray-500 mb-4">Tiempo estimado: {lesson.estimatedTime}</p>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {renderLessonContent(lesson.content)}
          </div>
        </Card>

        <Card className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Consulta al Asistente de IA</h3>
          <p className="text-gray-600 mb-4">¿Tienes dudas sobre esta lección? Chatea con CodeGenio, tu genio programador personal.</p>
          
          <div className="bg-gray-100 rounded-lg p-4 h-96 flex flex-col shadow-inner">
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              <div className="flex">
                  <div className="bg-sky-200 text-sky-800 rounded-lg rounded-bl-none p-3 max-w-lg shadow">
                      <p>¡Hola! Soy CodeGenio. ¿En qué puedo ayudarte con la lección '{lesson.title}'?</p>
                  </div>
              </div>
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`shadow ${msg.role === 'user' ? 'bg-pink-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'} rounded-lg p-3 max-w-lg whitespace-pre-wrap`}>
                        <p>{msg.text}</p>
                    </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                      <div className="bg-white text-gray-800 rounded-lg rounded-bl-none p-3 max-w-lg shadow flex items-center">
                          <span className="typing-indicator"></span>
                          <span className="typing-indicator"></span>
                          <span className="typing-indicator"></span>
                      </div>
                  </div>
              )}
            </div>

            <div className="mt-4 flex items-center">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isLoading && userInput.trim()) {
                      handleAskAI();
                    }
                  }
                }}
                placeholder="Escribe tu pregunta aquí..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-200 disabled:cursor-not-allowed resize-none"
                rows={2}
                disabled={isLoading}
              />
              <Button onClick={handleAskAI} disabled={isLoading || !userInput.trim()} className="ml-2 !p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </Button>
            </div>
             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </Card>
        
        <CompletionCard />

      </div>
    </section>
  );
};

const DashboardView: React.FC<{
  allProfiles: UserProfile[];
  authenticatedUser: AuthenticatedUser | null;
  onBack: () => void;
  onCreateProfile: (name: string) => void;
  institutionLogo: string | null;
  onUpdateInstitutionLogo: (logo: string | null) => void;
}> = ({ allProfiles, authenticatedUser, onBack, onCreateProfile, institutionLogo, onUpdateInstitutionLogo }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string, content: React.ReactNode }>({ title: '', content: null });

  const showInfoModal = (title: string, content: React.ReactNode) => {
    setModalContent({ title, content });
    setModalOpen(true);
  };

  if (!authenticatedUser) {
    // This view should not be accessible without a logged-in user.
    return null;
  }
  
  const profiles = allProfiles.filter(p => p.accountId === authenticatedUser.id);
  const isEducator = authenticatedUser.plan === SubscriptionPlanName.INSTITUCION;

  const handleCreateNewProfile = () => {
    const promptText = isEducator ? "Introduce el nombre del nuevo estudiante:" : "Introduce el nombre del nuevo perfil:";
    const name = prompt(promptText);
    if (name) {
      onCreateProfile(name);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Nombre", "Puntos de Experiencia (XP)", "Lecciones Completadas"];
    const csvRows = [
      headers.join(','),
      ...profiles.map(p => [
        `"${p.name.replace(/"/g, '""')}"`, // Handle names with quotes
        p.xp,
        p.completedLessons.length
      ].join(','))
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `reporte_rendimiento_CodeGenio_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateInstitutionLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const title = isEducator ? "Panel de Control del Educador" : "Panel de Control Familiar";
  const subtitle = isEducator
    ? "Gestiona tus clases, el progreso de los estudiantes y accede a recursos exclusivos."
    : "Supervisa el progreso de aprendizaje de tu familia.";

  const canAddProfile = authenticatedUser.plan === SubscriptionPlanName.INSTITUCION || authenticatedUser.plan === SubscriptionPlanName.FAMILIAR;

  return (
    <>
      <section className="py-12 bg-slate-50 min-h-full">
        <div className="container mx-auto px-6">
          <Button onClick={onBack} variant="secondary" className="mb-8 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver
          </Button>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mt-4">{title}</h2>
            <p className="text-xl text-gray-600 mt-2">{subtitle}</p>
          </div>

          {isEducator && (
            <>
              <Card className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Herramientas del Educador</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <button
                    onClick={() => showInfoModal('Guía del Profesor', <p>¡Próximamente! Estamos preparando una guía completa con planes de lecciones y consejos pedagógicos para ayudarte a sacar el máximo provecho de CodeGenio en tu aula.</p>)}
                    className="block text-left p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors w-full"
                    >
                    <h4 className="font-semibold text-blue-800 text-lg">Guía del Profesor</h4>
                    <p className="text-blue-700 text-sm mt-1">Planes de lecciones y consejos pedagógicos.</p>
                  </button>
                  <button
                    onClick={() => showInfoModal('Material Curricular', <p>¡Estamos trabajando en ello! Pronto encontrarás aquí hojas de trabajo, ideas de proyectos y material de evaluación para complementar las lecciones.</p>)}
                    className="block text-left p-6 bg-green-100 rounded-lg hover:bg-green-200 transition-colors w-full"
                    >
                    <h4 className="font-semibold text-green-800 text-lg">Material Curricular</h4>
                    <p className="text-green-700 text-sm mt-1">Hojas de trabajo y proyectos.</p>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="block text-left p-6 bg-teal-100 rounded-lg hover:bg-teal-200 transition-colors w-full"
                    >
                    <h4 className="font-semibold text-teal-800 text-lg">Exportar Reporte</h4>
                    <p className="text-teal-700 text-sm mt-1">Descarga el progreso en formato CSV.</p>
                  </button>
                </div>
              </Card>

              <Card className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalización de Certificados</h3>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-full md:w-1/2">
                          <h4 className="font-semibold text-lg text-gray-700 mb-2">Logo de la Institución</h4>
                          <p className="text-sm text-gray-600 mb-4">
                              Este logo aparecerá en todos los certificados generados. Sube una imagen en formato PNG o JPG.
                          </p>
                          <div className="flex items-center gap-4">
                              <label htmlFor="logo-upload-dashboard" className="cursor-pointer bg-purple-500 text-white hover:bg-purple-600 font-semibold py-2 px-4 rounded-lg transition-colors flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                  <span>{institutionLogo ? 'Cambiar Logo' : 'Subir Logo'}</span>
                                  <input id="logo-upload-dashboard" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                              </label>
                              {institutionLogo && (
                                  <Button variant="ghost" onClick={() => onUpdateInstitutionLogo(null)}>
                                      Quitar Logo
                                  </Button>
                              )}
                          </div>
                      </div>
                      <div className="w-full md:w-1/2">
                          <h4 className="font-semibold text-lg text-gray-700 mb-2">Vista Previa del Logo</h4>
                          <div className="h-32 w-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 p-2">
                              {institutionLogo ? (
                                  <img src={institutionLogo} alt="Logo de la Institución" className="max-h-full max-w-full object-contain" />
                              ) : (
                                  <p className="text-gray-400 text-sm">No hay logo subido</p>
                              )}
                          </div>
                      </div>
                  </div>
              </Card>
            </>
          )}

          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{isEducator ? "Progreso de Estudiantes" : "Progreso Familiar"}</h3>
              {canAddProfile && (
                <Button onClick={handleCreateNewProfile}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  {isEducator ? "Añadir Estudiante" : "Añadir Perfil"}
                </Button>
              )}
            </div>
            {profiles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profiles.map(profile => (
                  <div key={profile.id} className="text-center border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
                    <div className={`mx-auto h-20 w-20 rounded-full ${profile.avatarColor} flex items-center justify-center font-bold text-4xl text-white mb-4`}>
                      {profile.name.charAt(0)}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">{profile.name}</h3>
                    <p className="text-lg text-gray-600 mt-2">
                      <span className="font-bold text-yellow-500">{profile.xp}</span> Puntos de Experiencia
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {profile.completedLessons.length} lecciones completadas
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                {isEducator ? "Aún no has añadido ningún estudiante. ¡Haz clic en 'Añadir Estudiante' para empezar!" : "No hay perfiles para mostrar."}
              </p>
            )}
          </Card>
        </div>
      </section>
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        {modalContent.content}
      </InfoModal>
    </>
  );
};

const PlacementTestView: React.FC<{ 
    onCompleteTest: (score: number) => void; 
    onBack: () => void;
}> = ({ onCompleteTest, onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const currentQuestion = PLACEMENT_TEST_QUESTIONS[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (selectedOption === null) {
            alert("Por favor, selecciona una respuesta.");
            return;
        }

        const newAnswers = { ...selectedAnswers, [currentQuestion.id]: selectedOption };
        
        setSelectedOption(null); // Reset for next question

        if (currentQuestionIndex < PLACEMENT_TEST_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswers(newAnswers);
        } else {
            // Last question, calculate score and finish
            const finalAnswers = { ...newAnswers };
            let score = 0;
            PLACEMENT_TEST_QUESTIONS.forEach(q => {
                if (finalAnswers[q.id] === q.correctAnswerIndex) {
                    score++;
                }
            });
            onCompleteTest(score);
        }
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
                 <Button onClick={onBack} variant="secondary" className="mb-8 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Volver
                </Button>
                <Card className="max-w-3xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Prueba de Nivel</h2>
                        <p className="text-gray-600 mt-2">Pregunta {currentQuestionIndex + 1} de {PLACEMENT_TEST_QUESTIONS.length}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                            <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / PLACEMENT_TEST_QUESTIONS.length) * 100}%` }}></div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">{currentQuestion.question}</h3>
                    
                    <div className="space-y-4">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedOption(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                    selectedOption === index 
                                    ? 'bg-pink-100 border-pink-500 ring-2 ring-pink-300' 
                                    : 'bg-white hover:bg-gray-100 border-gray-300'
                                }`}
                            >
                                <span className={`font-bold mr-3 ${selectedOption === index ? 'text-pink-600' : 'text-gray-700'}`}>
                                    {String.fromCharCode(65 + index)}:
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Button 
                            size="lg" 
                            onClick={handleNextQuestion}
                            disabled={selectedOption === null}
                            className="disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {currentQuestionIndex < PLACEMENT_TEST_QUESTIONS.length - 1 ? "Siguiente Pregunta" : "Finalizar Prueba"}
                        </Button>
                    </div>
                </Card>
            </div>
        </section>
    );
};


const CertificateView: React.FC<{
  profile: UserProfile | null;
  onBack: () => void;
  institutionLogo: string | null;
}> = ({ profile, onBack, institutionLogo }) => {

  const handlePrint = () => {
    window.print();
  };

  if (!profile) {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>No se encontró un perfil activo para generar el certificado.</p>
        <Button onClick={onBack} className="mt-4">Volver</Button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="print:hidden mb-8 flex justify-between items-center">
          <Button onClick={onBack} variant="secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Volver al Inicio
          </Button>
          <Button onClick={handlePrint}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6 18.75m0 0c-.24.03-.48.062-.72.096m.72-.096A42.415 42.415 0 0018 18.75m-12 0L6 13.829m0 0L6 18.75" />
            </svg>
            Imprimir / Guardar
          </Button>
        </div>

        <div id="certificate-printable-area" className="bg-white rounded-xl shadow-2xl transform transition-transform duration-300">
          <div className="certificate-content p-8 md:p-12 text-center border-20 border-yellow-400 relative">
            
            <div className="absolute top-8 right-8 h-24 w-24">
              <svg className="text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            </div>

            <div className="absolute top-8 left-8 h-24 w-24">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>

            {institutionLogo ? (
              <img src={institutionLogo} alt="Logo de la Institución" className="h-24 mx-auto mb-6 object-contain" />
            ) : profile?.isEducator ? (
              <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 mb-6 print:border-none print:h-auto">
                 <p className="print:hidden">Espacio para el logo de la Institución</p>
              </div>
            ) : <div className="h-24 mb-6"></div>
            }

            <p className="text-xl font-semibold text-gray-500 uppercase tracking-widest">Certificado de Finalización</p>
            <h1 className="text-3xl md:text-5xl font-bold text-purple-700 mt-4 mb-2">{APP_NAME}</h1>
            <p className="text-lg text-gray-600">certifica con orgullo que</p>
            <p className="text-4xl md:text-6xl font-serif text-pink-600 my-8 px-4 py-2 border-t-2 border-b-2 border-gray-200 inline-block">{profile.name}</p>
            <p className="text-lg text-gray-600">ha completado exitosamente todo el currículo de</p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">Introducción a la Programación</p>
            
            <div className="mt-12 flex justify-between items-end">
              <div className="text-left">
                <p className="text-sm font-bold border-b-2 border-gray-700 pb-1">{`Fecha: ${new Date().toLocaleDateString('es-ES')}`}</p>
                <p className="text-xs text-gray-500 mt-1">Fecha de Emisión</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-serif italic text-purple-700 border-b-2 border-gray-700 pb-1">El Equipo de CodeGenio</p>
                <p className="text-xs text-gray-500 mt-1">Autoridad Emisora</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const LoginView: React.FC<{
  onCheckEmail: (email: string) => Promise<{ userExists: boolean }>;
  onRegister: (credentials: { name: string; email: string; plan: SubscriptionPlanName }) => void;
  onBack: () => void;
}> = ({ onCheckEmail, onRegister, onBack }) => {
  const [step, setStep] = useState<'email' | 'register'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanName | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, introduce un email válido.');
      return;
    }
    setError('');
    setIsLoading(true);
    const { userExists } = await onCheckEmail(email);
    if (!userExists) {
      setStep('register');
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, introduce tu nombre.');
      return;
    }
    if (!selectedPlan) {
      setError('Por favor, selecciona un plan de suscripción.');
      // Scroll to plans if not visible
      document.getElementById('subscription-section-login')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setError('');
    setIsLoading(true);
    onRegister({ name, email, plan: selectedPlan });
  };
  
  const handleSelectPlan = (plan: SubscriptionPlanName) => {
    setSelectedPlan(plan);
    // Auto-scroll to top of form after selection
     document.getElementById('register-form-card')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="py-12 flex items-center justify-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4">
        {step === 'email' && (
          <div id="email-card" className="max-w-md mx-auto">
            <div className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 text-white">
              <h2 className="text-3xl font-bold text-center mb-2">Bienvenido a CodeGenio</h2>
              <p className="text-center text-gray-300 mb-8">Ingresa con tu email para continuar tu aventura.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email-login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="mt-1 block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <div className="flex items-center justify-between pt-4">
                  <Button onClick={onBack} variant="secondary" type="button">
                    Volver
                  </Button>
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? 'Verificando...' : 'Continuar'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {step === 'register' && (
           <div id="register-form-card" className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 text-white">
              <h2 className="text-3xl font-bold text-center mb-2">¡Un paso más! Crea tu cuenta</h2>
              <p className="text-center text-gray-300 mb-8">
                Estás a punto de unirte a {APP_NAME}. Email: <span className="font-bold text-pink-400">{email}</span>
              </p>
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="mt-1 block w-full px-3 py-3 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    placeholder="Tu nombre y apellido"
                  />
                </div>
                
                <div id="subscription-section-login">
                  <SubscriptionSection onSelectPlan={handleSelectPlan} />
                </div>

                {selectedPlan && (
                  <div className="!mt-12 text-center p-4 bg-green-900/50 border border-green-500 rounded-lg">
                    <p className="font-bold text-lg text-green-300">Has seleccionado el plan: {selectedPlan}</p>
                  </div>
                )}
                
                {error && <p className="text-red-400 text-sm !mt-4 text-center">{error}</p>}

                <div className="flex items-center justify-between pt-4 !mt-12">
                  <Button onClick={() => setStep('email')} variant="secondary" type="button">
                    Atrás
                  </Button>
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Completar Registro'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8 text-center print:hidden">
    <div className="container mx-auto">
      <p>&copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.</p>
      <p className="text-sm text-gray-400">¡El primer paso para ser un genio del código!</p>
    </div>
  </footer>
);


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [appState, setAppState] = useState<AppState>(initialState);
  
  const levelsSectionRef = useRef<HTMLElement>(null);
  
  // Multi-user state management
  useEffect(() => {
    try {
      const activeEmail = localStorage.getItem('codeGenioActiveUserEmail');
      if (activeEmail) {
        const allUsersData = JSON.parse(localStorage.getItem('codeGenioUsers') || '{}');
        if (allUsersData[activeEmail]) {
          setAppState(allUsersData[activeEmail]);
        }
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (!appState.authenticatedUser?.email) return;
    try {
      const allUsersData = JSON.parse(localStorage.getItem('codeGenioUsers') || '{}');
      allUsersData[appState.authenticatedUser.email] = appState;
      localStorage.setItem('codeGenioUsers', JSON.stringify(allUsersData));
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [appState]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedLevel, selectedLesson]);

  const handleStartLearning = () => {
    levelsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const handleLoginClick = () => {
    setCurrentView('login');
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedLevel(null);
    setSelectedLesson(null);
  };
  
  const handleStartTest = () => {
    if (!appState.authenticatedUser) {
      alert("Por favor, inicia sesión o regístrate para hacer la prueba de nivel.");
      setCurrentView('login');
      return;
    }
    setCurrentView('placement_test');
    setSelectedLevel(null);
    setSelectedLesson(null);
  };

  const handleCompleteTest = (score: number) => {
      let levelIndex = 0; // 'inicial' por defecto
      if (score >= 4) {
          levelIndex = 2; // 'avanzado'
      } else if (score >= 2) {
          levelIndex = 1; // 'intermedio'
      }
      
      const recommendedLevel = LEVELS_DATA[levelIndex];
      alert(`Prueba completada. Puntuación: ${score} de ${PLACEMENT_TEST_QUESTIONS.length}.\n\nBasado en tus resultados, te recomendamos empezar en el nivel: "${recommendedLevel.title}".`);
      setSelectedLevel(recommendedLevel);
      setCurrentView('level_lessons');
      setSelectedLesson(null);
  };

  const handleSelectLevel = (level: Level) => {
    if (!appState.authenticatedUser) {
      alert("Por favor, inicia sesión o regístrate para comenzar a aprender.");
      setCurrentView('login');
      return;
    }
    setSelectedLevel(level);
    setCurrentView('level_lessons');
    setSelectedLesson(null);
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentView('lesson_content');
  };

  const handleBackToLevels = () => {
    setCurrentView('home');
    setSelectedLevel(null);
    setSelectedLesson(null);
  };
  
  const handleBackToLessonsList = () => {
    setCurrentView('level_lessons');
    setSelectedLesson(null);
  };
  
  const handleCheckEmailAndLogin = async (email: string): Promise<{ userExists: boolean }> => {
    const allUsersData = JSON.parse(localStorage.getItem('codeGenioUsers') || '{}');
    if (allUsersData[email]) {
      // User exists, log them in
      setAppState(allUsersData[email]);
      localStorage.setItem('codeGenioActiveUserEmail', email);
      setCurrentView('home');
      return { userExists: true };
    }
    // User does not exist, proceed to registration
    return { userExists: false };
  };
  
  const handleRegister = (credentials: { name: string, email: string, plan: SubscriptionPlanName }) => {
    const newUser: AuthenticatedUser = {
      id: `user-account-${Date.now()}`,
      name: credentials.name,
      email: credentials.email,
      plan: credentials.plan
    };

    const avatarColors = [
        'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 
        'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ];
    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      accountId: newUser.id,
      name: credentials.name.split(' ')[0], // Use first name for profile
      avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      xp: 0,
      completedLessons: [],
      isEducator: credentials.plan === SubscriptionPlanName.INSTITUCION
    };
    
    const newState: AppState = {
      authenticatedUser: newUser,
      profiles: [newProfile],
      activeProfileId: newProfile.id,
      institutionLogo: null,
    };

    setAppState(newState);
    localStorage.setItem('codeGenioActiveUserEmail', newUser.email);
    setCurrentView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('codeGenioActiveUserEmail');
    setAppState(initialState);
    setCurrentView('home');
  };

  const handleSwitchProfile = (profileId: string) => {
    setAppState(prev => ({...prev, activeProfileId: profileId }));
    setCurrentView('home'); // Navigate to home after switching profile
  };

  const handleCreateProfile = (name: string) => {
    if (!appState.authenticatedUser) return;
    
    const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'];
    const existingColors = appState.profiles.map(p => p.avatarColor);
    const availableColors = avatarColors.filter(c => !existingColors.includes(c));
    const newColor = availableColors.length > 0 ? availableColors[0] : avatarColors[appState.profiles.length % avatarColors.length];
    
    const newProfile: UserProfile = {
      id: `profile-${Date.now()}`,
      accountId: appState.authenticatedUser.id,
      name: name,
      avatarColor: newColor,
      xp: 0,
      completedLessons: []
    };
    
    setAppState(prev => ({...prev, profiles: [...prev.profiles, newProfile]}));
  };

  const handleCompleteLesson = (lessonId: string) => {
    setAppState(prev => {
        const activeProfile = prev.profiles.find(p => p.id === prev.activeProfileId);
        if (activeProfile && !activeProfile.completedLessons.includes(lessonId)) {
            const updatedProfiles = prev.profiles.map(p => 
                p.id === prev.activeProfileId 
                ? { ...p, xp: p.xp + 100, completedLessons: [...p.completedLessons, lessonId] }
                : p
            );
            return { ...prev, profiles: updatedProfiles };
        }
        return prev;
    });
  };
  
  const handleNavigateToDashboard = () => setCurrentView('dashboard');
  const handleNavigateToCertificate = () => setCurrentView('certificate');

  const handleUpdateInstitutionLogo = (logo: string | null) => {
    setAppState(prev => ({ ...prev, institutionLogo: logo }));
  };

  const activeProfile = appState.authenticatedUser && appState.activeProfileId
    ? appState.profiles.find(p => p.id === appState.activeProfileId) ?? null
    : null;

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <LoginView onCheckEmail={handleCheckEmailAndLogin} onRegister={handleRegister} onBack={handleNavigateHome} />;
      case 'level_lessons':
        return selectedLevel ? <LevelLessonsView level={selectedLevel} onSelectLesson={handleSelectLesson} onBack={handleNavigateHome} /> : <div />;
      case 'lesson_content':
        return selectedLesson && selectedLevel 
          ? <LessonContentView 
              lesson={selectedLesson} 
              level={selectedLevel} 
              onBackToLessonsList={handleBackToLessonsList}
              onSelectLesson={handleSelectLesson}
              onBackToLevels={handleBackToLevels}
              onCompleteLesson={handleCompleteLesson}
              onNavigateToCertificate={handleNavigateToCertificate}
            /> 
          : <div />;
      case 'dashboard':
        return appState.authenticatedUser ? (
            <DashboardView 
                allProfiles={appState.profiles}
                authenticatedUser={appState.authenticatedUser}
                onBack={handleNavigateHome}
                onCreateProfile={handleCreateProfile}
                institutionLogo={appState.institutionLogo}
                onUpdateInstitutionLogo={handleUpdateInstitutionLogo}
            />
        ) : <div />;
      case 'placement_test':
        return <PlacementTestView onCompleteTest={handleCompleteTest} onBack={handleNavigateHome} />;
      case 'certificate':
        return <CertificateView profile={activeProfile} onBack={handleNavigateHome} institutionLogo={appState.institutionLogo} />;
      case 'home':
      default:
        return (
          <>
            <HeroSection onStartLearning={handleStartLearning} onStartTest={handleStartTest} />
            <LevelsSection ref={levelsSectionRef} onSelectLevel={handleSelectLevel} />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen app-bg">
      <Navbar 
        onNavigateHome={handleNavigateHome}
        authenticatedUser={appState.authenticatedUser}
        activeProfile={activeProfile}
        allProfiles={appState.profiles}
        onSwitchProfile={handleSwitchProfile}
        onCreateProfile={handleCreateProfile}
        onNavigateToDashboard={handleNavigateToDashboard}
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
