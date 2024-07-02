import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues } from "react-hook-form";
import { ControllerProps, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SelectFormFieldProps {
  children: React.ReactNode[];
  label: string;
  triggerPlaceholder: string;
}

function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: Omit<
  ControllerProps<TFieldValues, TName> & SelectFormFieldProps,
  "render"
>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={props.defaultValue}
            disabled={field.disabled || props.disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.triggerPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectFormField;
