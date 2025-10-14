import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsToggleProps {
  id: string;
  label: string;
  description: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function SettingsToggle({
  id,
  label,
  description,
  checked,
  disabled,
  onCheckedChange,
}: SettingsToggleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-base">
          {label}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}