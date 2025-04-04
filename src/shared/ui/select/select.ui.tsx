"use client";

import React, { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}
interface SelectProps {
  label: string;
  options: Option[];
  onChange?: (option: Option) => void; 
}

export const Select: React.FC<SelectProps> = ({ label, options }) => {
  const [isOpen, setIsOpen] = useState(false); // Gérer l'ouverture du menu
  const [selectedOption, setSelectedOption] = useState<Option | null>(null); // Gérer l'option sélectionnée
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom",
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false); // Fermer le menu après la sélection
  };

  useEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("resize", calculateDropdownPosition);
      return () =>
        window.removeEventListener("resize", calculateDropdownPosition);
    }
  }, [isOpen]);

  const calculateDropdownPosition = () => {
    const selectElement = selectRef.current;
    if (selectElement) {
      const rect = selectElement.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < 400 && options.length >= 4) {
        setDropdownPosition("top");
        setMaxHeight(spaceAbove - 16);
      } else {
        setDropdownPosition("bottom");
        setMaxHeight(spaceBelow - 16);
      }
    }
  };

  return (
    <div
      ref={selectRef}
      className="relative w-full bg-white h-16 border border-dark-200 rounded-lg text-subtitle2"
      onClick={handleToggle}
    >
      {/* Label affiché */}
      <div
        className="flex items-center h-full px-8 cursor-pointer justify-between"
        data-label={label}
      >
        <span
          className={`text-dark-600 ${
            selectedOption ? "opacity-100" : "opacity-50"
          }`}
        >
          {selectedOption ? selectedOption.label : label}
        </span>
        <span className="after:content-arrow-down after:absolute after:right-8 after:top-1/4" />
      </div>

      {/* Menu déroulant */}
      {isOpen && (
        <ul
          className={`absolute ${
            dropdownPosition === "bottom" ? "top-full" : "bottom-full"
          } left-1/2 transform -translate-x-1/2 w-5/6 origin-center mt-4 z-50 flex flex-col justify-center bg-white border border-dark-200 rounded-lg shadow-lg z-10 overflow-y-auto`}
          style={{
            maxHeight: `${maxHeight}px`,
            boxSizing: "border-box", // Inclut la bordure et le padding dans le calcul de la taille
            padding: "0", // Enlève les marges internes pour éviter d'être bloqué en haut
          }}
        >
          {options.map((option, index) => (
            <li
              key={`${option.value}-${index}`} // Combinaison de value et index pour garantir l'unicité
              onClick={() => handleOptionSelect(option)}
              className="px-8 py-4 hover:bg-dark-100 cursor-pointer text-dark-600 after:content-['']"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
