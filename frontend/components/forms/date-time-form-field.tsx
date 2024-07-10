import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import * as DateFns from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "../../app/new-reservation/time-picker-demo";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { ControllerProps, FieldPath } from "react-hook-form";

interface DateTimeFormFieldProps {
  label: string;
}

export default function DateTimeFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: Omit<
  ControllerProps<TFieldValues, TName> & DateTimeFormFieldProps,
  "render"
>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="text-left">{props.label}</FormLabel>
          <Popover>
            <FormControl>
              <PopoverTrigger suppressHydrationWarning asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    DateFns.format(field.value, "PPP HH:mm:ss")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
            </FormControl>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                fromDate={new Date()}
                initialFocus
              />
              <div className="p-3 border-t border-border">
                <TimePickerDemo setDate={field.onChange} date={field.value} />
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
