import React from "react";

type OzLogoProps = {
  size?: number;
  className?: string;
};

export default function OzLogo({ size = 44, className = "" }: OzLogoProps) {
  const stroke = "#1e3a5f";
  const accent = "#c48a3f";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="OZ Tech logo"
      role="img"
      className={className}
    >
      <rect width="64" height="64" rx="14" fill="#F8FAFC"/>
      <circle cx="22" cy="32" r="12" stroke="#1E3A5F" strokeWidth="6"/>
      <path d="M34 22H52L34 42H52" stroke="#1E3A5F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 14V10" stroke="#C48A3F" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}
