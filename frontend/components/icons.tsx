import { cn } from "@/lib/utils";
import { Frown, Gamepad2, X, LoaderCircle } from "lucide-react";

interface CustomIconProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

function MainLogo({
  size = 32,
  strokeWidth = 2.5,
  className,
}: CustomIconProps) {
  return (
    <Gamepad2
      className={cn("text-primary/90", className)}
      strokeWidth={strokeWidth}
      size={size}
    />
  );
}

function RotatingLoaderCirle({
  size = 75,
  strokeWidth = 1.5,
  className,
}: CustomIconProps) {
  return (
    <LoaderCircle
      size={size}
      strokeWidth={strokeWidth}
      className={cn("animate-spin-slow-color-change", className)}
    />
  );
}

export const Icons = {
  logo: MainLogo,
  close: X,
  sad: Frown,
  loader: RotatingLoaderCirle,
};
