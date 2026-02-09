import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
import { tabs, type TabName } from "./data";
import { colors } from "./theme";
import { TabBar } from "./components/TabBar";
import { AboutTab } from "./components/AboutTab";
import { ExperienceTab } from "./components/ExperienceTab";
import { ProjectsTab } from "./components/ProjectsTab";
import { SkillsTab } from "./components/SkillsTab";
import { EducationTab } from "./components/EducationTab";
import { ContactTab } from "./components/ContactTab";
import { TerminalChrome } from "./components/TerminalChrome";
import { Footer } from "./components/Footer";

const TITLE = "vaughan.codes";
const CURSOR = "\u2588"; // █ block cursor

function useTitleTypewriter() {
  const charIndex = useRef(0);
  const cursorVisible = useRef(true);

  useEffect(() => {
    // Phase 1: type out characters
    const typeId = setInterval(() => {
      charIndex.current++;
      cursorVisible.current = true;
      document.title = TITLE.slice(0, charIndex.current) + CURSOR;
      if (charIndex.current >= TITLE.length) clearInterval(typeId);
    }, 100);

    // Phase 2: blink cursor continuously
    const blinkId = setInterval(() => {
      cursorVisible.current = !cursorVisible.current;
      const text = TITLE.slice(0, charIndex.current);
      document.title = cursorVisible.current ? text + CURSOR : text;
    }, 500);

    return () => {
      clearInterval(typeId);
      clearInterval(blinkId);
    };
  }, []);
}

const tabComponents: Record<TabName, React.FC> = {
  About: AboutTab,
  Experience: ExperienceTab,
  Projects: ProjectsTab,
  Skills: SkillsTab,
  Education: EducationTab,
  Contact: ContactTab,
};

const SCALE = 0.8;

type WindowState = "normal" | "minimizing" | "minimized" | "restoring" | "maximized" | "closed";

const DOCK_TRANSFORM = "translate(0px, 30vh) scale(0.08)";
const ANIM_MS = 450;
const ANIM_TRANSITION = `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
const MAXIMIZE_MS = 350;
const MAXIMIZE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const MAXIMIZE_TRANSITION = `transform ${MAXIMIZE_MS}ms ${MAXIMIZE_EASE}`;

function BgLayer() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: 0.06,
        pointerEvents: "none",
      }}
    />
  );
}

export default function App() {
  useTitleTypewriter();
  const [activeTab, setActiveTab] = useState<TabName>("About");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [maximizeAnimating, setMaximizeAnimating] = useState(false);
  const drag = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  const isMaximized = windowState === "maximized";

  const handleTitleBarMouseDown = useCallback((e: MouseEvent) => {
    if (isMaximized) return;
    drag.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
  }, [offset, isMaximized]);

  useEffect(() => {
    function onMove(e: globalThis.MouseEvent) {
      if (!drag.current) return;
      const dx = (e.clientX - drag.current.startX) / SCALE;
      const dy = (e.clientY - drag.current.startY) / SCALE;
      setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
    }
    function onUp() {
      drag.current = null;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const handleClose = useCallback(() => {
    setWindowState("closed");
    window.close();
  }, []);

  const handleMinimize = useCallback(() => {
    setWindowState("minimizing");
  }, []);

  const handleMaximize = useCallback(() => {
    setMaximizeAnimating(true);
    setWindowState((prev) => (prev === "maximized" ? "normal" : "maximized"));
    setOffset({ x: 0, y: 0 });
  }, []);

  const [restoreReady, setRestoreReady] = useState(false);

  const handleRestore = useCallback(() => {
    setRestoreReady(false);
    setWindowState("restoring");
  }, []);

  // Minimize: window → dock, then switch to minimized
  useEffect(() => {
    if (windowState === "minimizing") {
      const t = setTimeout(() => setWindowState("minimized"), ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [windowState]);

  // Restore: appear at dock position, then animate to normal
  useEffect(() => {
    if (windowState === "restoring") {
      const t1 = setTimeout(() => setRestoreReady(true), 20);
      const t2 = setTimeout(() => {
        setWindowState("normal");
        setRestoreReady(false);
      }, 20 + ANIM_MS);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [windowState]);

  // Clear maximize animation flag after transition
  useEffect(() => {
    if (maximizeAnimating) {
      const t = setTimeout(() => setMaximizeAnimating(false), MAXIMIZE_MS);
      return () => clearTimeout(t);
    }
  }, [maximizeAnimating]);

  const navigate = useCallback(
    (dir: -1 | 1) => {
      const idx = tabs.indexOf(activeTab);
      const next = (idx + dir + tabs.length) % tabs.length;
      setActiveTab(tabs[next]);
    },
    [activeTab]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        navigate(-1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  const ActiveComponent = tabComponents[activeTab];
  const showWindow = windowState === "normal" || windowState === "maximized"
    || windowState === "minimizing" || windowState === "restoring";

  // Compute window wrapper animation styles
  let wrapperTransform = `translate(${offset.x}px, ${offset.y}px)`;
  let wrapperTransition = "none";
  let wrapperOpacity: number | undefined;

  if (windowState === "minimizing") {
    wrapperTransform = DOCK_TRANSFORM;
    wrapperTransition = ANIM_TRANSITION;
    wrapperOpacity = 0;
  } else if (windowState === "restoring" && !restoreReady) {
    wrapperTransform = DOCK_TRANSFORM;
    wrapperOpacity = 0;
  } else if (windowState === "restoring" && restoreReady) {
    wrapperTransform = `translate(${offset.x}px, ${offset.y}px)`;
    wrapperTransition = ANIM_TRANSITION;
    wrapperOpacity = 1;
  } else if (isMaximized) {
    wrapperTransform = "none";
  }

  // Apply maximize transition when animating (both maximize and unmaximize)
  if (maximizeAnimating && (windowState === "normal" || windowState === "maximized")) {
    wrapperTransition = MAXIMIZE_TRANSITION;
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0C0E14",
        padding: isMaximized ? 0 : "24px",
        transition: `padding ${MAXIMIZE_MS}ms ${MAXIMIZE_EASE}`,
        transform: `scale(${SCALE})`,
        transformOrigin: "center center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BgLayer />

      {/* Dock icon (minimizing + minimized + restoring) */}
      {(windowState === "minimizing" || windowState === "minimized" || windowState === "restoring") && (
        <div
          onClick={handleRestore}
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            zIndex: 1,
            animation: `${windowState === "restoring" ? "dock-fade-out" : "dock-fade-in"} 250ms ease-out forwards`,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              background: colors.bgLight,
              border: `1px solid ${colors.subtle}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            <img
              src="/favicon.png"
              alt="Portfolio"
              style={{ width: 72, height: 72, borderRadius: 12 }}
            />
          </div>
          <span
            style={{
              color: colors.text,
              fontSize: 21,
              fontFamily: "inherit",
            }}
          >
            Portfolio
          </span>
        </div>
      )}

      {/* Terminal window (normal / maximized) */}
      {showWindow && (
        <div
          style={{
            transform: wrapperTransform,
            transition: wrapperTransition,
            opacity: wrapperOpacity,
            width: isMaximized ? `calc(100vw / ${SCALE})` : "100%",
            height: isMaximized ? `calc(100vh / ${SCALE})` : "auto",
            maxWidth: isMaximized ? "none" : 1200,
          }}
        >
          <TerminalChrome
            onTitleBarMouseDown={handleTitleBarMouseDown}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isMaximized={isMaximized}
          >
            <TabBar
              tabs={[...tabs]}
              active={activeTab}
              onSelect={setActiveTab}
            />
            <div
              style={{
                flex: 1,
                overflow: "auto",
                padding: "24px 32px",
                background: colors.bg,
              }}
            >
              <ActiveComponent />
            </div>
            <Footer />
          </TerminalChrome>
        </div>
      )}
    </div>
  );
}
