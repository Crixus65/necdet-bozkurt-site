"use client";

import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
}

export function useScrollSpy(options: ScrollSpyOptions = {}) {
  const { rootMargin = "-80px 0px -80% 0px" } = options;
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [rootMargin]);

  return activeSection;
}