import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  value: string;
  label: string;
}

interface SettingsSelectProps {
  id: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
  options: SelectOption[];
  onValueChange?: (value: string) => void;
}

export function SettingsSelect({
  id,
  label,
  placeholder = "Selecione uma opção",
  defaultValue,
  value,
  disabled,
  options,
  onValueChange,
}: SettingsSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}