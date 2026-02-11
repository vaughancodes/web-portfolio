import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";
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
import { useIsMobile } from "./hooks/useIsMobile";

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

const DESKTOP_SCALE = 0.8;

type WindowState = "normal" | "minimizing" | "minimized" | "restoring" | "maximized" | "closed";

const DOCK_TRANSFORM = "translate(0px, 30vh) scale(0.08)";
const ANIM_MS = 450;
const ANIM_TRANSITION = `transform ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
const MAXIMIZE_MS = 350;
const MAXIMIZE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

const SWIPE_THRESHOLD = 50;

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;

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
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TabName>("About");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const preMaxRef = useRef<{ x: number; y: number; size: { w: number; h: number } | null }>({ x: 0, y: 0, size: null });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const resize = useRef<{
    dir: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startOx: number;
    startOy: number;
  } | null>(null);

  const scale = isMobile ? 1 : DESKTOP_SCALE;

  // Auto-maximize on mobile
  useEffect(() => {
    if (isMobile) {
      setWindowState("maximized");
      setOffset({ x: 0, y: 0 });
    }
  }, [isMobile]);

  const isMaximized = windowState === "maximized";

  const handleTitleBarMouseDown = useCallback((e: MouseEvent) => {
    if (isMaximized || isMobile) return;
    drag.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
  }, [offset, isMaximized, isMobile]);

  const handleResizeMouseDown = useCallback((dir: string, e: MouseEvent) => {
    if (isMaximized || isMobile) return;
    e.preventDefault();
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const currentW = size ? size.w : rect.width / scale;
    const currentH = size ? size.h : rect.height / scale;
    resize.current = {
      dir,
      startX: e.clientX,
      startY: e.clientY,
      startW: currentW,
      startH: currentH,
      startOx: offset.x,
      startOy: offset.y,
    };
  }, [isMaximized, isMobile, size, offset, scale]);

  useEffect(() => {
    if (isMobile) return;
    function onMove(e: globalThis.MouseEvent) {
      if (drag.current) {
        const dx = (e.clientX - drag.current.startX) / scale;
        const dy = (e.clientY - drag.current.startY) / scale;
        setOffset({ x: drag.current.ox + dx, y: drag.current.oy + dy });
      } else if (resize.current) {
        const r = resize.current;
        const dx = (e.clientX - r.startX) / scale;
        const dy = (e.clientY - r.startY) / scale;
        let newW = r.startW;
        let newH = r.startH;
        let newOx = r.startOx;
        let newOy = r.startOy;

        if (r.dir.includes("e")) newW = r.startW + dx;
        if (r.dir.includes("w")) { newW = r.startW - dx; newOx = r.startOx + dx; }
        if (r.dir.includes("s")) newH = r.startH + dy;
        if (r.dir.includes("n")) { newH = r.startH - dy; newOy = r.startOy + dy; }

        if (newW < MIN_WIDTH) {
          if (r.dir.includes("w")) newOx = r.startOx + (r.startW - MIN_WIDTH);
          newW = MIN_WIDTH;
        }
        if (newH < MIN_HEIGHT) {
          if (r.dir.includes("n")) newOy = r.startOy + (r.startH - MIN_HEIGHT);
          newH = MIN_HEIGHT;
        }

        // Compensate for flex centering shifting the window when size changes
        newOx += (newW - r.startW) / 2;
        newOy += (newH - r.startH) / 2;

        setSize({ w: newW, h: newH });
        setOffset({ x: newOx, y: newOy });
      }
    }
    function onUp() {
      drag.current = null;
      resize.current = null;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isMobile, scale]);

  const handleClose = useCallback(() => {
    if (isMobile) return;
    setWindowState("closed");
    window.close();
  }, [isMobile]);

  const handleMinimize = useCallback(() => {
    if (isMobile) return;
    setWindowState("minimizing");
  }, [isMobile]);

  const handleMaximize = useCallback(() => {
    if (isMobile) return;
    const el = wrapperRef.current;
    if (!el) return;

    // FLIP: First — capture current visual bounds
    const first = el.getBoundingClientRect();

    // Update layout synchronously
    flushSync(() => {
      if (isMaximized) {
        setOffset({ x: preMaxRef.current.x, y: preMaxRef.current.y });
        setSize(preMaxRef.current.size);
        setWindowState("normal");
      } else {
        preMaxRef.current = { x: offset.x, y: offset.y, size };
        setOffset({ x: 0, y: 0 });
        setWindowState("maximized");
      }
    });

    // FLIP: Last — capture new visual bounds
    const last = el.getBoundingClientRect();

    // FLIP: Invert — transform to make new layout look like old layout
    const sx = first.width / last.width;
    const sy = first.height / last.height;
    // `last` includes React's post-flushSync transform. Since the FLIP inverse
    // replaces (not composes with) that transform, we must add back the offset
    // React applied, otherwise the inverse lands at the wrong position.
    const reactOffset = isMaximized ? preMaxRef.current : { x: 0, y: 0 };
    const tx = (first.left - last.left) / scale + reactOffset.x;
    const ty = (first.top - last.top) / scale + reactOffset.y;

    el.style.transition = "none";
    el.style.transformOrigin = "top left";
    el.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;

    // Force reflow so browser registers the starting position
    el.getBoundingClientRect();

    // FLIP: Play — animate to final layout
    const finalTransform = isMaximized
      ? `translate(${preMaxRef.current.x}px, ${preMaxRef.current.y}px)`
      : "translate(0px, 0px)";

    el.style.transition = `transform ${MAXIMIZE_MS}ms ${MAXIMIZE_EASE}`;
    el.style.transform = finalTransform;

    const cleanup = () => {
      el.style.transition = "";
      el.style.transformOrigin = "";
      // Keep finalTransform instead of clearing — clearing causes React to
      // lose sync with the DOM (it won't reapply its inline style until the
      // next state change, so the window jumps to center).
      el.style.transform = finalTransform;
      el.removeEventListener("transitionend", cleanup);
    };
    el.addEventListener("transitionend", cleanup);
  }, [isMaximized, offset, isMobile, scale, size]);

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

  // Swipe gesture support for mobile
  useEffect(() => {
    if (!isMobile) return;
    const el = contentRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      // Only trigger if horizontal swipe is dominant
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        navigate(dx < 0 ? 1 : -1);
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile, navigate]);

  const ActiveComponent = tabComponents[activeTab];
  const showWindow = windowState === "normal" || windowState === "maximized"
    || windowState === "minimizing" || windowState === "restoring";

  // Compute window wrapper animation styles
  let wrapperTransform = `translate(${offset.x}px, ${offset.y}px)`;
  let wrapperTransition = "none";
  let wrapperOpacity: number | undefined;

  if (isMobile) {
    wrapperTransform = "none";
  } else if (windowState === "minimizing") {
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

  return (
    <div
      style={{
        height: isMobile ? "100%" : `calc(100vh / ${scale})`,
        width: isMobile ? "100%" : `calc(100vw / ${scale})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0C0E14",
        padding: isMaximized || isMobile ? 0 : "24px",
        transform: isMobile ? "none" : `scale(${scale})`,
        transformOrigin: "top left",
        position: "relative",
        overflow: isMobile ? "auto" : "hidden",
      }}
    >
      <BgLayer />

      {/* Dock icon (minimizing + minimized + restoring) — desktop only */}
      {!isMobile && (windowState === "minimizing" || windowState === "minimized" || windowState === "restoring") && (
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
          ref={wrapperRef}
          style={{
            transform: wrapperTransform,
            transition: wrapperTransition,
            opacity: wrapperOpacity,
            width: isMobile ? "100%" : isMaximized ? `calc(100vw / ${scale})` : size ? size.w : "100%",
            height: isMobile ? "100%" : isMaximized ? `calc(100vh / ${scale})` : size ? size.h : "auto",
            maxWidth: isMaximized || isMobile ? "none" : size ? "none" : 1200,
          }}
        >
          <TerminalChrome
            onTitleBarMouseDown={handleTitleBarMouseDown}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            isMaximized={isMaximized}
            isMobile={isMobile}
            size={size}
            onResizeHandleMouseDown={handleResizeMouseDown}
          >
            <TabBar
              tabs={[...tabs]}
              active={activeTab}
              onSelect={setActiveTab}
              isMobile={isMobile}
            />
            <div
              ref={contentRef}
              style={{
                flex: 1,
                overflow: "auto",
                padding: isMobile ? "16px" : "24px 32px",
                background: colors.bg,
              }}
            >
              <ActiveComponent />
            </div>
            <Footer isMobile={isMobile} />
          </TerminalChrome>
        </div>
      )}
    </div>
  );
}
