import { LucideIcon, MessageSquareDot } from "lucide-react";
import { Home } from "lucide-react";
import { Flame } from "lucide-react";

const ICON_SOURCE_MAP: Record<string, LucideIcon> = {
  home: Home,
  flame: Flame,
  notification: MessageSquareDot,
};

interface Icon {
  name: keyof typeof ICON_SOURCE_MAP;
  className?: string;

  size?: number;
}

const Icon = ({ name, className, size }: Icon) => {
  const RequiredIcon = ICON_SOURCE_MAP[name];
  return (
    <>
      <RequiredIcon className={className} size={size || 24} />
    </>
  );
};

export default Icon;
