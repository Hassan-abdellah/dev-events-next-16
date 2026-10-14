import { Field, FieldError, FieldLabel } from "../ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectRootChangeEventDetails } from "@base-ui/react";

interface textFieldProps {
  id: string;
  label: string;
  invalid?: boolean;
  error?: string;
  name: string;
  value: string;
  handleChange: (
    val: string | null,
    eventDetail: SelectRootChangeEventDetails,
  ) => void;

  options: { value: string; label: string }[];
}
const SelectField = ({
  id,
  label,
  error,
  invalid = false,
  name,
  value,
  options,
  handleChange,
}: textFieldProps) => {
  return (
    <>
      <Field data-invalid={invalid}>
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <Select name={name} value={value} onValueChange={handleChange}>
          <SelectTrigger
            id={id}
            aria-invalid={invalid}
            className="min-w-30 bg-dark-200 py-4.5 text-white"
          >
            <SelectValue placeholder="Select" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-dark-200 text-white">
            <SelectItem value="auto">Auto</SelectItem>
            <SelectSeparator />
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {invalid && <FieldError errors={[{ message: error }]} />}
      </Field>
    </>
  );
};

export default SelectField;
