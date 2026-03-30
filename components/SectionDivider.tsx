interface SectionDividerProps {
  type: "dark-to-light" | "light-to-dark" | "dark-line";
}

export default function SectionDivider({ type }: SectionDividerProps) {
  if (type === "dark-line") {
    return <div className="oz-divider-dark-line" />;
  }

  return (
    <div
      className={
        type === "dark-to-light"
          ? "oz-divider-dark-to-light"
          : "oz-divider-light-to-dark"
      }
      aria-hidden
    />
  );
}
