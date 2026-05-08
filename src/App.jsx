import { useState, useCallback, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import HowItWorks from "./components/HowItWorks";
import LessonList from "./components/LessonList";
import LessonView from "./components/LessonView";
import Sandbox from "./components/Sandbox";
import SoundLibrary from "./components/SoundLibrary";
import ArduinoGuide from "./components/ArduinoGuide";
import BuildGuides from "./components/BuildGuides";
import VoiceSoundGuide from "./components/VoiceSoundGuide";
import MusicLibrary from "./components/MusicLibrary";
import Footer from "./components/Footer";
import { getLessonById, getNextLesson, getPrevLesson } from "./lessons";
import useProgress from "./hooks/useProgress";
import { useLanguage } from "./i18n/context";
import { JAMaiAssistant } from "./components/JAMai";

export default function App() {
  const { lang } = useLanguage();
  const [currentView, setCurrentView] = useState("home");
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [sandboxInitialCode, setSandboxInitialCode] = useState(null);
  const { completedLessons, completeLesson } = useProgress();
  const selectedLesson = selectedLessonId ? getLessonById(selectedLessonId, lang) : null;

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, selectedLesson?.id]);

  const handleNavigate = useCallback((view) => {
    setCurrentView(view);
    setSelectedLessonId(null);
  }, []);

  const handleOpenInEditor = useCallback((code) => {
    setSandboxInitialCode(code);
    setCurrentView("sandbox");
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

  const handleBuildYourOwn = useCallback(() => {
    setCurrentView("guide");
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

  // Render lesson view
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

  // Render main views
  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      {currentView === "home" && (
        <>
          <Hero
            onStartLearning={handleStartLearning}
            onTryEditor={handleTryEditor}
            onBuildYourOwn={handleBuildYourOwn}
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
          <Sandbox initialCode={sandboxInitialCode} />
          <Footer />
        </div>
      )}

      {currentView === "musicLibrary" && (
        <MusicLibrary onOpenInEditor={handleOpenInEditor} />
      )}

      {currentView === "library" && <SoundLibrary />}

      {currentView === "guide" && (
        <ArduinoGuide onBack={() => handleNavigate("buildGuides")} />
      )}

      {currentView === "buildGuides" && (
        <BuildGuides
          onOpenArduinoGuide={() => handleNavigate("guide")}
          onOpenVoiceSoundGuide={() => handleNavigate("voiceSoundGuide")}
        />
      )}

      {currentView === "voiceSoundGuide" && (
        <VoiceSoundGuide onBack={() => handleNavigate("buildGuides")} />
      )}

      <JAMaiAssistant />
    </div>
  );
}