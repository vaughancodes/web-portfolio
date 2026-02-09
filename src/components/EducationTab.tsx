import { education } from "../data";
import { colors } from "../theme";

export function EducationTab() {
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
        Education & Certifications
      </h2>

      {education.map((edu, i) => (
        <div key={i}>
          <div>
            <span style={{ marginRight: 8 }}>🎓</span>
            <span style={{ color: colors.accent, fontWeight: 700 }}>
              {edu.degree}
            </span>
          </div>

          <div style={{ paddingLeft: 28, marginTop: 4 }}>
            <span style={{ color: colors.secondary, fontWeight: 700 }}>
              {edu.institution}
            </span>
            <span style={{ color: colors.dim, marginLeft: 10 }}>
              ({edu.period})
            </span>
          </div>

          <div
            style={{
              paddingLeft: 28,
              marginTop: 4,
              color: colors.muted,
            }}
          >
            {edu.details}
          </div>
        </div>
      ))}
    </div>
  );
}
