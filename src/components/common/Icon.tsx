import {
  Bath,
  CalendarCheck,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleParking,
  Flame,
  Heart,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThermometerSun,
  Trees,
  Utensils,
  Waves,
  Wifi,
  X
} from "lucide-react";
import type { LucideProps } from "lucide-react";

function InstagramIcon({ size = 24, color = "currentColor", strokeWidth = 2, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill={color} stroke="none" />
    </svg>
  );
}

const icons = {
  Bath,
  CalendarCheck,
  Car,
  CircleParking,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Home,
  Instagram: InstagramIcon,
  MapPin,
  Menu,
  MessageCircle,
  ParkingCircle: CircleParking,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  ThermometerSun,
  Trees,
  Utensils,
  Waves,
  Wifi,
  X
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Sparkles;
  return <Component aria-hidden="true" {...props} />;
}

export const iconOptions = Object.keys(icons).sort();
