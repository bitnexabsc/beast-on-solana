"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type BeastSound = "roar" | "growl-ambient" | "bite" | "pepe-father-laugh";

type BeastAudioContextValue = {
  hasInteracted: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: BeastSound) => void;
};

const BeastAudioContext = createContext<BeastAudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const soundsRef = useRef<Record<BeastSound, HTMLAudioElement | null>>({
    roar: null,
    "growl-ambient": null,
    bite: null,
    "pepe-father-laugh": null,
  });

  useEffect(() => {
    soundsRef.current = {
      roar: new Audio("/audio/roar.mp3"),
      "growl-ambient": new Audio("/audio/growl-ambient.mp3"),
      bite: new Audio("/audio/bite.mp3"),
      "pepe-father-laugh": new Audio("/audio/pepe-father-laugh.mp3"),
    };

    const ambient = soundsRef.current["growl-ambient"];
    if (ambient) {
      ambient.loop = true;
      ambient.volume = 0.2;
    }

    const activateAudio = () => {
      setHasInteracted(true);
      setIsMuted(false);
    };
    window.addEventListener("pointerdown", activateAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", activateAudio);
      Object.values(soundsRef.current).forEach((sound) => {
        if (sound) {
          sound.pause();
          sound.src = "";
        }
      });
    };
  }, []);

  useEffect(() => {
    const ambient = soundsRef.current["growl-ambient"];
    if (!ambient || !hasInteracted) {
      return;
    }

    if (isMuted) {
      ambient.pause();
      ambient.currentTime = 0;
      return;
    }

    void ambient.play().catch((error: unknown) => {
      console.warn("Ambient audio playback failed:", error);
    });
  }, [hasInteracted, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const playSound = useCallback(
    (sound: BeastSound) => {
      const audio = soundsRef.current[sound];
      if (!audio || isMuted || !hasInteracted) {
        return;
      }

      audio.currentTime = 0;
      void audio.play().catch((error: unknown) => {
        console.warn(`Audio playback failed for ${sound}:`, error);
      });
    },
    [hasInteracted, isMuted]
  );

  const value = useMemo(
    () => ({
      hasInteracted,
      isMuted,
      toggleMute,
      playSound,
    }),
    [hasInteracted, isMuted, playSound, toggleMute]
  );

  return (
    <BeastAudioContext.Provider value={value}>
      {children}
    </BeastAudioContext.Provider>
  );
}

export function useBeastAudio() {
  const context = useContext(BeastAudioContext);
  if (!context) {
    throw new Error("useBeastAudio must be used inside AudioProvider");
  }

  return context;
}
