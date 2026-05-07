import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import HowItWorks from "./components/HowItWorks";
import LessonList from "./components/LessonList";
import LessonView from "./components/LessonView";
import Sandbox from "./components/Sandbox";
import SoundLibrary from "./components/SoundLibrary";
import Footer from "./components/Footer";
import { getNextLesson, getPrevLesson } from "./lessons";
import useProgress from "./hooks/useProgress";
import { MichaelAIAssistant } from './components/MichaelAI'

export default function App() {
  // Views: "home", "lessons", "sandbox", "lesson", "library"
  const [currentView, setCurrentView] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const { completedLessons, completeLesson } = useProgress();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedLesson?.id]);

  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
    setSelectedLesson(null);
  }, []);

  const handleSelectLesson = useCallback((lesson) => {
    setSelectedLesson(lesson);
    setCurrentView("lesson");
  }, []);

  const handleStartLearning = useCallback(() => {
    setCurrentView("lessons");
  }, []);

  const handleTryEditor = useCallback(() => {
    setCurrentView("sandbox");
  }, []);

  const handleNextLesson = useCallback(() => {
    if (!selectedLesson) return;
    const next = getNextLesson(selectedLesson.id);
    if (next) {
      setSelectedLesson(next);
    }
  }, [selectedLesson]);

  const handlePrevLesson = useCallback(() => {
    if (!selectedLesson) return;
    const prev = getPrevLesson(selectedLesson.id);
    if (prev) {
      setSelectedLesson(prev);
    }
  }, [selectedLesson]);

  // Render lesson view
  if (currentView === "lesson" && selectedLesson) {
    const next = getNextLesson(selectedLesson.id);
    const prev = getPrevLesson(selectedLesson.id);

    return (
      <>
        <LessonView
          lesson={selectedLesson}
          onBack={() => handleNavigate("lessons")}
          onNext={handleNextLesson}
          onPrev={handlePrevLesson}
          hasNext={!!next}
          hasPrev={!!prev}
          onComplete={completeLesson}
          completed={completedLessons.has(selectedLesson.id)}
        />
        <MichaelAIAssistant lessonId={selectedLesson.id} />
      </>
    );
  }

  // Render main views
  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      {currentView === "home" && (
        <>
          <Hero
            onStartLearning={handleStartLearning}
            onTryEditor={handleTryEditor}
          />
          <FeatureCards />
          <HowItWorks />
          <LessonList
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />
          <Sandbox />
          <Footer />
        </>
      )}

      {currentView === "lessons" && (
        <div className="pt-16">
          <LessonList
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />
          <Footer />
        </div>
      )}

      {currentView === "sandbox" && (
        <div className="pt-16">
          <Sandbox />
          <Footer />
        </div>
      )}

      {currentView === "library" && <SoundLibrary />}
      <MichaelAIAssistant />
    </div>
  );
}
