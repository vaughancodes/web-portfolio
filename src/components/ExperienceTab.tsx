import { experiences } from "../data";
import { colors } from "../theme";

export function ExperienceTab() {
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
        Work Experience
      </h2>

      {experiences.map((exp, i) => (
        <div key={i} style={{ marginBottom: i < experiences.length - 1 ? 8 : 0 }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: colors.green, fontWeight: 700 }}>●</span>
            <span style={{ color: colors.accent, fontWeight: 700 }}>
              {exp.title}
            </span>
          </div>

          {/* Company + Period */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingLeft: 20,
            }}
          >
            <span style={{ color: colors.dim }}>│</span>
            <span style={{ color: colors.secondary, fontWeight: 700 }}>
              {exp.company}
            </span>
            <span
              style={{
                background: colors.subtle,
                color: colors.white,
                fontWeight: 700,
                padding: "1px 8px",
                borderRadius: 3,
                fontSize: 13,
              }}
            >
              {exp.period}
            </span>
          </div>

          {/* Connecting line */}
          <div style={{ paddingLeft: 20, color: colors.dim }}>│</div>

          {/* Description */}
          <div style={{ paddingLeft: 20, display: "flex", gap: 8 }}>
            <span style={{ color: colors.dim }}>│</span>
            <span style={{ color: colors.text, fontStyle: "italic" }}>
              {exp.description}
            </span>
          </div>

          {/* Highlights */}
          {exp.highlights.map((h, j) => (
            <div
              key={j}
              style={{
                paddingLeft: 20,
                display: "flex",
                gap: 8,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: colors.dim }}>│</span>
              <span style={{ color: colors.green, fontWeight: 700 }}>▸</span>
              <span style={{ color: colors.muted, flex: 1 }}>{h}</span>
            </div>
          ))}

          {/* Timeline connector */}
          <div style={{ paddingLeft: 20, color: colors.dim }}>
            {i < experiences.length - 1 ? "│" : "╵"}
          </div>
        </div>
      ))}
    </div>
  );
}
