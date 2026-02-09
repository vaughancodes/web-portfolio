import { skillGroups } from "../data";
import { colors, categoryColors } from "../theme";

export function SkillsTab() {
  return (
    <div>
      <h2
        style={{
          color: colors.accent,
          fontWeight: 700,
          textDecoration: "underline",
          textUnderlineOffset: 4,
          marginBottom: 20,
          fontSize: 20,
        }}
      >
        Skills & Technologies
      </h2>

      {skillGroups.map((group, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div
            style={{
              color: categoryColors[i % categoryColors.length],
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            ■ {group.category}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              paddingLeft: 8,
            }}
          >
            {group.skills.map((sk) => (
              <span
                key={sk}
                style={{
                  background: colors.tagBg,
                  color: colors.secondary,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 3,
                  fontSize: 14,
                }}
              >
                {sk}
              </span>
            ))}
          </div>

          {i < skillGroups.length - 1 && (
            <div
              style={{
                color: colors.dim,
                marginTop: 12,
                paddingLeft: 8,
                letterSpacing: 2,
                fontSize: 13,
              }}
            >
              {"·".repeat(40)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
