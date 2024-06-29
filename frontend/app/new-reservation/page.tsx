"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import DateTimeFormField from "./date-time-form-field";
import { TimePickerDemo } from "./time-picker-demo";
import * as DateFns from "date-fns";

const reservationFormSchema = z.object({
  dateTime: z.date(),
  duration: z.date().optional(),
  roomId: z.number().optional(),
  customerPhoneNumber: z.string().optional(),
  customerName: z.string().optional(),
});
type FormSchemaType = z.infer<typeof reservationFormSchema>;

function NewReservation() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      dateTime: new Date(),
      // duration: new Date(),
    },
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  // const [formAlertData, setFormAlertData] = useState<FormAlertProps>({
  //   message: "",
  //   type: "error",
  // });

  async function onSubmit(values: FormSchemaType) {
    setLoading(true);
    // setFormAlertData({ message: "", type: "error" });

    try {
      if (values.duration) {
        const dupDate = new Date(values.duration);
        dupDate.setHours(0, 0, 0, 0);
        const durationn = DateFns.intervalToDuration({
          start: dupDate,
          end: values.duration,
        });
        const endTime = DateFns.add(values.dateTime, { ...durationn });
        console.log({ endTime });
        console.log({ startTime: values.dateTime });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // const textFormFields = useMemo(
  //   () =>
  //     formValues.map((fieldProps, i) => (
  //       <FormField
  //         key={`${fieldProps.name}-${i}`}
  //         control={form.control}
  //         name={fieldProps.name}
  //         render={({ field }) => (
  //           <FormItem>
  //             <FormLabel>{fieldProps.label}</FormLabel>
  //             <FormControl>
  //               <Input
  //                 disabled={loading}
  //                 placeholder={fieldProps.placeholder}
  //                 type={fieldProps.type}
  //                 {...field}
  //               />
  //             </FormControl>
  //             <FormMessage />
  //           </FormItem>
  //         )}
  //       />
  //     )),
  //   [form.control, loading]
  // );

  return (
    <div className="container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/*====================================================*/}
          <DateTimeFormField form={form} />
          {/*====================================================*/}
          {/* <FormAlert {...formAlertData} /> */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} size="lg" className="w-full" type="submit">
            Book
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default NewReservation;
