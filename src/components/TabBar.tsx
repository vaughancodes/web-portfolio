import { colors } from "../theme";
import type { TabName } from "../data";

interface TabBarProps {
  tabs: string[];
  active: TabName;
  onSelect: (tab: TabName) => void;
}

export function TabBar({ tabs, active, onSelect }: TabBarProps) {
  return (
    <div
      style={{
        display: "flex",
        background: colors.bgLight,
        borderBottom: `2px solid ${colors.accent}`,
        flexShrink: 0,
      }}
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
              padding: "10px 24px",
              fontFamily: "inherit",
              fontSize: 16,
              fontWeight: isActive ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              letterSpacing: "0.02em",
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
