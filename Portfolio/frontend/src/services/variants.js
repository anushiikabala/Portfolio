export const zoomIn = (delay) => ({
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: delay,
      duration: 0.8,
      ease: "easeOut",
    },
  },
});
