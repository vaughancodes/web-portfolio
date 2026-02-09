import { colors } from "../theme";

export function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: "10px 16px",
        background: colors.bgLight,
        borderTop: `1px solid ${colors.subtle}`,
        flexShrink: 0,
        fontSize: 15,
      }}
    >
      <span>
        <span style={{ color: colors.accentDim, fontWeight: 700 }}>
          &larr;/&rarr;
        </span>
        <span style={{ color: colors.dim }}> navigate</span>
      </span>
      <span style={{ color: colors.dim }}>&bull;</span>
      <span>
        <span style={{ color: colors.accentDim, fontWeight: 700 }}>
          &uarr;/&darr;
        </span>
        <span style={{ color: colors.dim }}> scroll</span>
      </span>
      <span style={{ color: colors.dim }}>&bull;</span>
      <span>
        <span style={{ color: colors.accentDim, fontWeight: 700 }}>click</span>
        <span style={{ color: colors.dim }}> select</span>
      </span>
    </div>
  );
}
