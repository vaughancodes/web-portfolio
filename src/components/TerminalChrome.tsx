import type { ReactNode, MouseEventHandler, MouseEvent } from "react";
import { colors } from "../theme";

export function TerminalChrome({
  children,
  onTitleBarMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized,
  isMobile,
}: {
  children: ReactNode;
  onTitleBarMouseDown?: MouseEventHandler<HTMLDivElement>;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  isMobile?: boolean;
}) {
  const btnClick = (handler?: () => void) => (e: MouseEvent) => {
    e.stopPropagation();
    handler?.();
  };

  const fullscreen = isMaximized || isMobile;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: fullscreen ? "none" : 1200,
        height: fullscreen ? "100%" : "calc(100vh - 48px)",
        maxHeight: fullscreen ? "none" : 1000,
        display: "flex",
        flexDirection: "column",
        borderRadius: fullscreen ? 0 : 10,
        overflow: "hidden",
        border: `1px solid ${fullscreen ? "transparent" : colors.subtle}`,
        boxShadow: fullscreen
          ? "0 25px 60px rgba(0,0,0,0)"
          : "0 25px 60px rgba(0,0,0,0.5)",
        transition: isMobile
          ? "none"
          : "border-radius 350ms cubic-bezier(0.4,0,0.2,1), box-shadow 350ms cubic-bezier(0.4,0,0.2,1), border-color 350ms cubic-bezier(0.4,0,0.2,1)",
        background: colors.bg,
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={isMobile ? undefined : onTitleBarMouseDown}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: isMobile ? "10px 14px" : "12px 16px",
          background: colors.bgLight,
          borderBottom: `1px solid ${colors.subtle}`,
          userSelect: "none",
          cursor: isMobile ? "default" : isMaximized ? "default" : "grab",
        }}
      >
        {!isMobile && (
          <div style={{ display: "flex", gap: 8 }}>
            <div
              onClick={btnClick(onClose)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#EF4444",
                cursor: "pointer",
              }}
            />
            <div
              onClick={btnClick(onMinimize)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#FBBF24",
                cursor: "pointer",
              }}
            />
            <div
              onClick={btnClick(onMaximize)}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#10B981",
                cursor: "pointer",
              }}
            />
          </div>
        )}
        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: colors.dim,
            fontSize: isMobile ? 14 : 16,
          }}
        >
          daniel@vaughan.codes: ~
        </div>
        {!isMobile && <div style={{ width: 52 }} />}
      </div>
      {children}
    </div>
  );
}
