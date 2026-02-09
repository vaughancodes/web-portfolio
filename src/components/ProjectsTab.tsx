import { projects } from "../data";
import { colors } from "../theme";

export function ProjectsTab() {
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
        Projects
      </h2>

      {projects.map((proj, i) => (
        <div
          key={i}
          style={{
            border: `1px solid ${colors.subtle}`,
            borderRadius: 8,
            padding: "16px 20px",
            marginBottom: 16,
            maxWidth: 600,
          }}
        >
          <div style={{ color: colors.accent, fontWeight: 700, marginBottom: 8 }}>
            ◈{"  "}
            {proj.name}
          </div>

          <div style={{ color: colors.text, marginBottom: 12, lineHeight: 1.7 }}>
            {proj.description}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {proj.tech.map((t) => (
              <span
                key={t}
                style={{
                  background: colors.tagBg,
                  color: colors.secondary,
                  fontWeight: 700,
                  padding: "2px 10px",
                  borderRadius: 3,
                  fontSize: 14,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div>
            <span style={{ color: colors.dim }}>→ </span>
            <a
              href={`https://${proj.url}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: colors.secondary }}
            >
              {proj.url}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
