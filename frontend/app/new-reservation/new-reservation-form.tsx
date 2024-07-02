"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState, useTransition } from "react";
import { ControllerProps, FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import DateTimeFormField from "../../components/forms/date-time-form-field";
import { TimePickerDemo } from "./time-picker-demo";
import * as DateFns from "date-fns";

import { Room } from "@/schemas";
import SelectFormField from "@/components/forms/select-form-field";
import { SelectItem } from "@/components/ui/select";
import TextFormField from "@/components/forms/text-form-field";

const playstationOptionsSchema = z.object({
  type: z.union([z.literal("ps4"), z.literal("ps5")]),
  controllers: z.union([z.literal("single"), z.literal("multi")]),
});

const reservationFormSchema = z.object({
  dateTime: z.date(),
  duration: z.date().optional(),
  roomId: z.string(),
  customerPhoneNumber: z.string().optional(),
  customerName: z.string().optional(),
  playstationOptions: playstationOptionsSchema.optional(),
});
type FormSchemaType = z.infer<typeof reservationFormSchema>;

interface NewReservationFormProps {
  rooms: Room[];
  randomNumber: number;
}

function NewReservationForm({ rooms, randomNumber }: NewReservationFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      dateTime: new Date(),
    },
  });
  const chosenRoomId = form.watch("roomId");
  const isPlaystaion = useMemo(
    () =>
      rooms.find((room) => `${room.id}` === `${chosenRoomId}`)?.type ===
      "playstaion",
    [chosenRoomId]
  );
  useEffect(() => form.resetField("playstationOptions"), [isPlaystaion]);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  // const [formAlertData, setFormAlertData] = useState<FormAlertProps>({
  //   message: "",
  //   type: "error",
  // });

  async function onSubmit(values: FormSchemaType) {
    setSubmitting(true);
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
      }
      console.log({ ...values });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const playstationFormFields = (
    <>
      <SelectFormField
        control={form.control}
        name="playstationOptions.type"
        label="Playstation Type"
        triggerPlaceholder="Select PS Type"
        defaultValue="ps4"
        disabled={submitting}
      >
        <SelectItem value="ps4">PS4</SelectItem>
        <SelectItem value="ps5">PS5</SelectItem>
      </SelectFormField>
      <SelectFormField
        control={form.control}
        name="playstationOptions.controllers"
        label="Controllers"
        triggerPlaceholder="Select Controllers"
        defaultValue="single"
        disabled={submitting}
      >
        <SelectItem value="single">Single</SelectItem>
        <SelectItem value="multi">Multi</SelectItem>
      </SelectFormField>
    </>
  );

  return (
    <div className="container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/*====================================================*/}
          <DateTimeFormField
            control={form.control}
            name="dateTime"
            label="Date & Time"
            disabled={submitting}
          />
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
          {/*====================================================*/}
          <SelectFormField
            control={form.control}
            name="roomId"
            label="Room ID"
            triggerPlaceholder="Select Room"
            disabled={submitting}
          >
            {rooms?.map((room, i) => (
              <SelectItem key={i} value={room.id.toString()}>
                {room.name}
              </SelectItem>
            ))}
          </SelectFormField>
          {/*====================================================*/}
          {isPlaystaion && playstationFormFields}
          {/*====================================================*/}
          <TextFormField
            control={form.control}
            name="customerPhoneNumber"
            label="Customer Phone Number"
            placeholder={`01${Math.floor(randomNumber * 1000000000)}`}
          />
          {/*====================================================*/}
          <TextFormField
            control={form.control}
            name="customerName"
            label="Customer Name"
            placeholder="John Doe"
          />
          <Button
            disabled={submitting}
            size="lg"
            className="w-full"
            type="submit"
          >
            Book
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default NewReservationForm;
