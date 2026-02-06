import { FC, CSSProperties } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  textSize?: string;
  fontWeight?: string;
  textColor?: string;
  bgColor?: string;
}

interface CustomCSSProperties extends CSSProperties {
  '--after-duration': string;
  '--before-duration': string;
  '--after-shadow': string;
  '--before-shadow': string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  textSize = 'text-[clamp(2rem,8vw,6rem)]',
  fontWeight = 'font-black',
  textColor = 'text-white',
  bgColor = 'bg-transparent'
}) => {
  const inlineStyles: CustomCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none'
  };

  // Base classes - text color, size, weight
  const baseClasses = `${textColor} ${textSize} ${fontWeight} relative mx-auto select-none cursor-pointer`;

  // Pseudo element classes - use static classes that work with Tailwind
  // Background color will inherit from parent or use transparent
  const pseudoBaseClasses = 'after:absolute before:absolute after:top-0 before:top-0 after:overflow-hidden before:overflow-hidden after:[clip-path:inset(0_0_0_0)] before:[clip-path:inset(0_0_0_0)]';
  
  const pseudoClasses = !enableOnHover
    ? `${pseudoBaseClasses} after:content-[attr(data-text)] after:left-[10px] after:text-white before:content-[attr(data-text)] before:left-[-10px] before:text-white after:[text-shadow:var(--after-shadow)] after:animate-glitch-after before:[text-shadow:var(--before-shadow)] before:animate-glitch-before`
    : `${pseudoBaseClasses} after:content-[''] after:left-[10px] after:text-white before:content-[''] before:left-[-10px] before:text-white after:opacity-0 before:opacity-0 hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before`;

  const combinedClasses = `${baseClasses} ${pseudoClasses} ${className}`;

  return (
    <div style={inlineStyles} data-text={children} className={combinedClasses}>
      {children}
    </div>
  );
};

export default GlitchText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         glitch: {
//           "0%": { "clip-path": "inset(20% 0 50% 0)" },
//           "5%": { "clip-path": "inset(10% 0 60% 0)" },
//           "10%": { "clip-path": "inset(15% 0 55% 0)" },
//           "15%": { "clip-path": "inset(25% 0 35% 0)" },
//           "20%": { "clip-path": "inset(30% 0 40% 0)" },
//           "25%": { "clip-path": "inset(40% 0 20% 0)" },
//           "30%": { "clip-path": "inset(10% 0 60% 0)" },
//           "35%": { "clip-path": "inset(15% 0 55% 0)" },
//           "40%": { "clip-path": "inset(25% 0 35% 0)" },
//           "45%": { "clip-path": "inset(30% 0 40% 0)" },
//           "50%": { "clip-path": "inset(20% 0 50% 0)" },
//           "55%": { "clip-path": "inset(10% 0 60% 0)" },
//           "60%": { "clip-path": "inset(15% 0 55% 0)" },
//           "65%": { "clip-path": "inset(25% 0 35% 0)" },
//           "70%": { "clip-path": "inset(30% 0 40% 0)" },
//           "75%": { "clip-path": "inset(40% 0 20% 0)" },
//           "80%": { "clip-path": "inset(20% 0 50% 0)" },
//           "85%": { "clip-path": "inset(10% 0 60% 0)" },
//           "90%": { "clip-path": "inset(15% 0 55% 0)" },
//           "95%": { "clip-path": "inset(25% 0 35% 0)" },
//           "100%": { "clip-path": "inset(30% 0 40% 0)" },
//         },
//       },
//       animation: {
//         "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",
//         "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",
//       },
//     },
//   },
//   plugins: [],
// };
