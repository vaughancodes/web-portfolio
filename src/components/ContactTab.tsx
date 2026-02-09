import { contacts, urlFor } from "../data";
import { colors, contactLabelColors } from "../theme";
import { useIsMobile } from "../hooks/useIsMobile";

export function ContactTab() {
  const isMobile = useIsMobile();
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
        Get In Touch
      </h2>

      <p
        style={{
          color: colors.text,
          marginBottom: 20,
          maxWidth: 600,
          lineHeight: 1.7,
        }}
      >
        I'm always interested in hearing about new opportunities,
        collaborations, or just connecting with fellow engineers.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {contacts.map((c, i) => {
          const color = contactLabelColors[i % contactLabelColors.length];
          const url = urlFor(c.label, c.value);

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ color, fontWeight: 700, width: 18, textAlign: "center" }}>
                {c.icon}
              </span>
              <span
                className="contact-label"
                style={{
                  color,
                  fontWeight: 700,
                  width: 120,
                }}
              >
                {c.label}
              </span>
              {c.label === "Portfolio" ? (
                <span>
                  <a
                    href="https://vaughan.codes"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: colors.text, fontWeight: 700 }}
                  >
                    {c.value}
                  </a>
                  <span style={{ color: colors.dim }}>
                    {" ("}
                    <a
                      href="https://vaughan.codes"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: colors.text, fontWeight: 700 }}
                    >
                      HTTPS
                    </a>
                    {" or "}
                    <a
                      href="ssh://vaughan.codes"
                      style={{ color: colors.text, fontWeight: 700 }}
                    >
                      SSH
                    </a>
                    {")"}
                    {isMobile ? (
                      <div style={{ paddingLeft: 32, color: colors.dim }}>
                        {"// you're already here!"}
                      </div>
                    ) : (
                      <><span style={{ whiteSpace: "pre" }}>{"\t"}</span>{"// you're already here!"}</>
                    )}
                  </span>
                </span>
              ) : url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: colors.text, fontWeight: 700 }}
                >
                  {c.value}
                </a>
              ) : (
                <span style={{ color: colors.text, fontWeight: 700 }}>
                  {c.value}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <span style={{ color: colors.dim }}>Thanks for stopping by! </span>
        <span>👋</span>
      </div>
    </div>
  );
}
