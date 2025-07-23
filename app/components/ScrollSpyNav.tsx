"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export interface Section {
  id: string;
  label: string;
}

interface ScrollSpyNavProps {
  sections: Section[];
}

export default function ScrollSpyNav({ sections }: ScrollSpyNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-4 top-[10dvh] z-50 flex flex-col gap-4 text-sm font-michroma">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={clsx(
            "transition-colors duration-300 px-3 py-1 rounded-full",
            activeId === id
              ? "bg-[#D2FA52] text-[#101B08]"
              : "text-[#B1BD93] hover:text-[#101B08]",
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
