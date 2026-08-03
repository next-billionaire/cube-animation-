import gsap from "gsap";

export const createIntroTimeline = (onComplete: () => void) => {
  const tl = gsap.timeline({
    onComplete,
    defaults: { ease: "power4.out" }
  });

  // Initial states
  tl.set("#main-content", { y: "100vh", opacity: 0 });
  
  // 0.5s: Soft light sweep passes horizontally
  tl.to(".light-sweep", {
    x: "100%",
    duration: 1.5,
    ease: "power2.inOut",
  }, 0.5);

  // 1.0s: The word 'brand' reveals
  tl.to(".brand-letter", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.2,
    stagger: 0.05,
    ease: "expo.out",
  }, 1.0);

  // 2.0s: The word 'masala' reveals beneath it
  tl.to(".masala-letter", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    color: "#DCA92A", // Golden color
    duration: 1.2,
    stagger: 0.05,
    ease: "back.out(1.2)", // Tiny overshoot
  }, 2.0);

  // 2.8s: The red dot appears
  tl.to(".red-dot", {
    scale: 1,
    duration: 0.4,
    ease: "back.out(1.5)", // Tiny scale pop
  }, 2.8);

  // Glow for 300ms on the red dot
  tl.to(".red-dot", {
    boxShadow: "0 0 20px 2px rgba(255, 0, 0, 0.6)",
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut",
  }, 2.9);

  // 3.2s: Tagline appears character-by-character, tracking expands
  tl.to(".tagline-letter", {
    opacity: 1,
    duration: 0.8,
    stagger: 0.03,
    ease: "power2.out",
  }, 3.2);

  tl.to(".tagline-wrapper", {
    letterSpacing: "0.2em",
    duration: 1.5,
    ease: "power2.out",
  }, 3.2);

  // 4.0s: Small breathing animation
  // We attach this to the logo wrapper specifically, not blocking the main timeline
  tl.add(() => {
    gsap.to(".logo-wrapper", {
      y: "-5px",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, 4.0);

  // 5.0s: Transition
  tl.to(".logo-wrapper", {
    y: "-20vh",
    scale: 0.9,
    opacity: 0.8,
    duration: 1.5,
    ease: "power3.inOut",
  }, 5.0);

  // Slide up the hero content
  tl.to("#main-content", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "expo.inOut",
  }, 5.0);
  
  // Fade out the intro overlay wrapper slowly
  tl.to(".intro-wrapper", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
  }, 5.5);

  return tl;
};
