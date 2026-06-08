export const navEaseOut = [0.22, 1, 0.36, 1] as const;
export const navEaseIn = [0.4, 0, 0.72, 0] as const;

export const navOpenSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 36,
  mass: 0.82,
};

export const navLayoutSpring = {
  type: "spring" as const,
  stiffness: 340,
  damping: 34,
  mass: 0.88,
};

export const navCloseTransition = {
  duration: 0.18,
  ease: navEaseIn,
};

export const navChevronSpring = {
  type: "spring" as const,
  stiffness: 520,
  damping: 30,
  mass: 0.45,
};

export const NAV_DROPDOWN_CLOSE_DELAY_MS = 200;
