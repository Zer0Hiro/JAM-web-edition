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
import { getNextLesson, getPrevLesson, getLessonById } from "./lessons";
import useProgress from "./hooks/useProgress";
import { useLanguage } from "./i18n/context";
import { JAMaiAssistant } from './components/JAMai'

export default function App() {
  const { lang } = useLanguage();
  const [currentView, setCurrentView] = useState("home");
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const { completedLessons, completeLesson } = useProgress();

  const selectedLesson = selectedLessonId ? getLessonById(selectedLessonId, lang) : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedLessonId]);

  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
    setSelectedLessonId(null);
  }, []);

  const handleSelectLesson = useCallback((lesson) => {
    setSelectedLessonId(lesson.id);
    setCurrentView("lesson");
  }, []);

  const handleStartLearning = useCallback(() => {
    setCurrentView("lessons");
  }, []);

  const handleTryEditor = useCallback(() => {
    setCurrentView("sandbox");
  }, []);

  const handleNextLesson = useCallback(() => {
    if (!selectedLessonId) return;
    const next = getNextLesson(selectedLessonId, lang);
    if (next) {
      setSelectedLessonId(next.id);
    }
  }, [selectedLessonId, lang]);

  const handlePrevLesson = useCallback(() => {
    if (!selectedLessonId) return;
    const prev = getPrevLesson(selectedLessonId, lang);
    if (prev) {
      setSelectedLessonId(prev.id);
    }
  }, [selectedLessonId, lang]);

  if (currentView === "lesson" && selectedLesson) {
    const next = getNextLesson(selectedLesson.id, lang);
    const prev = getPrevLesson(selectedLesson.id, lang);

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
        <JAMaiAssistant lessonId={selectedLesson.id} />
      </>
    );
  }

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
      <JAMaiAssistant />
    </div>
  );
}
