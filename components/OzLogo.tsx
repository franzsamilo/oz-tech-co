import React from "react";

type OzLogoProps = {
  size?: number;
  className?: string;
  variant?: "main" | "secondary";
};

export default function OzLogo({
  size = 44,
  className = "",
  variant = "secondary",
}: OzLogoProps) {
  const src = "/ozlogo.png";
  const dimension = `${size}px`;

  return (
    <img
      src={src}
      alt="OZ Tech logo"
      width={size}
      height={size}
      style={{ width: dimension, height: dimension }}
      className={className}
    />
  );
}
