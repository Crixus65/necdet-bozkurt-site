import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 42, text: "text-sm" },
  md: { icon: 42, text: "text-base" },
  lg: { icon: 42, text: "text-lg" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative shrink-0 overflow-hidden rounded-[8px] shadow-soft aspect-square"
        style={{ width: dimensions.icon, maxHeight: dimensions.icon }}
        aria-hidden="true"
      >
        <Image
          src="/mm-logo.png"
          alt=""
          width={dimensions.icon}
          height={dimensions.icon}
          className="size-full object-contain"
          priority
        />
      </div>

      {showText && (
        <span
          className={cn(
            "font-semibold text-foreground",
            dimensions.text,
          )}
        >
          SMMM Necdet Bozkurt
        </span>
      )}
    </div>
  );
}