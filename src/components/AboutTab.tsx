import { profile, asciiBanner, bannerColors } from "../data";
import { colors } from "../theme";

export function AboutTab() {
  return (
    <div>
      {/* ASCII Banner */}
      <pre
        style={{
          fontSize: "clamp(11px, 1.8vw, 18px)",
          lineHeight: 1.2,
          margin: 0,
          marginBottom: 16,
        }}
      >
        {asciiBanner.map((line, i) => (
          <div key={i} style={{ color: bannerColors[i % bannerColors.length] }}>
            {line}
          </div>
        ))}
      </pre>

      {/* Role + Location */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ color: colors.green, fontWeight: 700 }}>
          {profile.role}
        </span>
        <span style={{ color: colors.dim }}>{"  \u25C6  "}</span>
        <span style={{ color: colors.secondary, fontWeight: 700 }}>
          {profile.location}
        </span>
      </div>

      {/* Bio box */}
      <div
        style={{
          border: `1px solid ${colors.subtle}`,
          borderRadius: 8,
          padding: "16px 20px",
          maxWidth: 720,
          color: colors.text,
          lineHeight: 1.7,
        }}
      >
        {profile.bio}
      </div>
    </div>
  );
}
