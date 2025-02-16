import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    y: -60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const neonPulse: Variants = {
  initial: {
    textShadow: "0 0 7px rgba(0,163,255,0.3), 0 0 10px rgba(0,163,255,0.3), 0 0 21px rgba(0,163,255,0.3)",
  },
  animate: {
    textShadow: [
      "0 0 7px rgba(0,163,255,0.3), 0 0 10px rgba(0,163,255,0.3), 0 0 21px rgba(0,163,255,0.3)",
      "0 0 10px rgba(0,163,255,0.6), 0 0 20px rgba(0,163,255,0.6), 0 0 30px rgba(0,163,255,0.6)",
      "0 0 7px rgba(0,163,255,0.3), 0 0 10px rgba(0,163,255,0.3), 0 0 21px rgba(0,163,255,0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const floatingAnimation: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

export const glowingBorder: Variants = {
  initial: {
    boxShadow: "0 0 10px rgba(0,163,255,0.3)",
  },
  animate: {
    boxShadow: [
      "0 0 10px rgba(0,163,255,0.3)",
      "0 0 20px rgba(0,163,255,0.6)",
      "0 0 10px rgba(0,163,255,0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const powerUpAnimation: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 360],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export const levelUpFlash: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: [0, 1, 0],
    scale: [0.3, 1.2, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const shakeAnimation: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [-2, 2, -2, 2, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const pixelateIn: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const gameCardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: "0 0 10px rgba(0,163,255,0.3)",
  },
  hover: {
    y: -10,
    boxShadow: [
      "0 10px 20px rgba(0,163,255,0.4)",
      "0 10px 30px rgba(255,0,0,0.4)",
    ],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const progressBarFill: Variants = {
  initial: {
    width: "0%",
  },
  animate: {
    width: "100%",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export const rotateAndScale: Variants = {
  initial: {
    rotate: 0,
    scale: 1,
  },
  animate: {
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export const bounceIn: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}; 