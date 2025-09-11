"use client";

import { useEffect } from "react";

export function InteractionEffects() {
  useEffect(() => {
    const cursor = document.querySelector(".cursor") as HTMLElement;
    const cursorDot = document.querySelector(".cursor-dot") as HTMLElement;
    const interactiveElements = document.querySelectorAll(
      "a, button, .interactive-hover, .glass, .pill"
    );

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let dotX = 0,
      dotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);
    };
    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      dotX += (mouseX - dotX) * 0.7;
      dotY += (mouseY - dotY) * 0.7;

      if (cursor && cursorDot) {
        cursor.style.transform = `translate3d(${cursorX - cursor.clientWidth / 2}px, ${cursorY - cursor.clientHeight / 2}px, 0)`;
        cursorDot.style.transform = `translate3d(${dotX - cursorDot.clientWidth / 2}px, ${dotY - cursorDot.clientHeight / 2}px, 0)`;
      }
      requestAnimationFrame(animateCursor);
    };

    const handleMouseEnter = () => cursor?.classList.add("hover");
    const handleMouseLeave = () => cursor?.classList.remove("hover");

    window.addEventListener("mousemove", handleMouseMove);
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor border-primary/80 pointer-events-none fixed z-[9999] h-[30px] w-[30px] rounded-full border transition-transform duration-100 ease-linear"></div>
      <div className="cursor-dot bg-primary pointer-events-none fixed z-[9999] h-2 w-2 rounded-full transition-transform duration-50 ease-linear"></div>
    </>
  );
}
