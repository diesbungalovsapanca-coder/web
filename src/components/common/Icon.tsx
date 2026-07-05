import {
  Bath,
  CalendarCheck,
  Camera,
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
  Instagram: Camera,
  MapPin,
  Menu,
  MessageCircle,
  ParkingCircle: CircleParking,
  Play,
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
