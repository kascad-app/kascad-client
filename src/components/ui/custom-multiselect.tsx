import * as React from "react";
import { Check } from "lucide-react";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9`}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={
            selected.length === 0
              ? "text-muted-foreground"
              : "text-foreground line-clamp-1 flex items-center gap-2"
          }
        >
          {selected.length > 0
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : placeholder || "Sélectionner..."}
        </span>
        <svg className="size-4 opacity-50 ml-2" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-popover text-popover-foreground border rounded-md shadow-md max-h-60 overflow-auto animate-in fade-in-0 zoom-in-95 p-1">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                className={`relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none transition-colors
                  ${isSelected ? "bg-black text-white" : "bg-white text-black"}
                  hover:bg-black hover:text-white focus:bg-black focus:text-white
                  data-[disabled]:pointer-events-none data-[disabled]:opacity-50`}
                data-selected={isSelected}
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggleOption(opt.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleOption(opt.value);
                  }
                }}
              >
                <span className="flex-1 line-clamp-1 flex items-center gap-2">
                  {opt.label}
                </span>
                {isSelected && (
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
