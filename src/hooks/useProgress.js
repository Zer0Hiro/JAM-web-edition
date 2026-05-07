import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "jam-progress";

/**
 * Persist lesson completion progress in localStorage.
 */
export default function useProgress() {
  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...completedLessons])
      );
    } catch {
      // localStorage might be unavailable
    }
  }, [completedLessons]);

  const completeLesson = useCallback((lessonId) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedLessons(new Set());
  }, []);

  return { completedLessons, completeLesson, resetProgress };
}
