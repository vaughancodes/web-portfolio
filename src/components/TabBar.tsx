import { colors } from "../theme";
import type { TabName } from "../data";

interface TabBarProps {
  tabs: string[];
  active: TabName;
  onSelect: (tab: TabName) => void;
  isMobile?: boolean;
}

export function TabBar({ tabs, active, onSelect, isMobile }: TabBarProps) {
  return (
    <div
      style={{
        display: "flex",
        background: colors.bgLight,
        borderBottom: `2px solid ${colors.accent}`,
        flexShrink: 0,
        ...(isMobile
          ? {
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }
          : {}),
      }}
      // Hide scrollbar on webkit for mobile
      className={isMobile ? "mobile-tab-bar" : undefined}
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onSelect(tab as TabName)}
            style={{
              background: isActive ? colors.accent : "transparent",
              color: isActive ? colors.white : colors.muted,
              border: "none",
              padding: isMobile ? "8px 14px" : "10px 24px",
              fontFamily: "inherit",
              fontSize: isMobile ? 14 : 16,
              fontWeight: isActive ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!isActive)
                e.currentTarget.style.color = colors.text;
            }}
            onMouseLeave={(e) => {
              if (!isActive)
                e.currentTarget.style.color = colors.muted;
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
