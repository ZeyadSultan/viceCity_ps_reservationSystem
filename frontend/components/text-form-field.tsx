import { FieldValues } from "react-hook-form";
import { ControllerProps, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";

interface TextFormFieldProps {
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

function TextFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: Omit<ControllerProps<TFieldValues, TName> & TextFormFieldProps, "render">) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input
              disabled={props.disabled || field.disabled}
              type={props.type}
              placeholder={props.placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextFormField;
