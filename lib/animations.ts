export const riseVariant = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const revealVariant = {
  initial: { opacity: 0, clipPath: "inset(50% 50% 50% 50%)" },
  whileInView: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const slideVariant = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const staggerDelay = (index: number) => ({
  transition: { delay: index * 0.08 },
});
