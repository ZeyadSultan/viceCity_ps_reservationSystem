"use client";

import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import * as DateFns from "date-fns";

import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import DateTimeFormField from "@/components/forms/date-time-form-field";
import SelectFormField from "@/components/forms/select-form-field";
import TextFormField from "@/components/forms/text-form-field";

import { reserve, getRoomsReservations } from "@/orval/api/api";

const playstationOptionsSchema = z.object({
  // type: z.union([z.literal("ps4"), z.literal("ps5")]),
  controllers: z.union([z.literal("single"), z.literal("multi")]),
});

const reservationFormSchema = z.object({
  // startDateTime: z.date(),
  // endDateTime: z.date(),
  roomId: z.string(),
  customerPhoneNumber: z.string().optional(),
  customerName: z.string().optional(),
  playstationOptions: playstationOptionsSchema.optional(),
});
// .refine(
//   (data) => {
//     if (!DateFns.isAfter(data.endDateTime, data.startDateTime)) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "End date must be after start date",
//     path: ["endDateTime"],
//   }
// );
export type NewReservationFormSchema = z.infer<typeof reservationFormSchema>;

/**
 * TS hack to ensure prefillable data already exist in the reservationSchema
 * Add more literal values to make more PreFillableFields
 */
export type PreFillableFields = Partial<
  Pick<
    NewReservationFormSchema,
    "customerPhoneNumber" | "customerName" | "roomId"
  >
>;

interface NewReservationFormProps {
  randomNumber: number;
  preFilledData?: PreFillableFields;
}

// FIXME: Select component for the room Id selects a non existing roomId if supplied in url search params, this is considered user error and handeled good enough
function NewReservationForm({
  randomNumber,
  preFilledData,
}: NewReservationFormProps) {
  /**
   * Quick and dirty fix for the shadcn-ui select component preserving the selected value even after resetting
   * FIXME: find a better way to reset the select component
   */
  const [reRenderSelect, setReRenderSelect] = useState(new Date());
  const {
    isPending,
    error,
    data: rooms,
    refetch: refetchRooms,
    isFetched,
  } = useQuery({
    queryKey: ["availableRooms"],
    queryFn: async () => {
      const rooms = await getRoomsReservations();
      return rooms.filter((room) => !room.currentReservation);
    },
  });
  const form = useForm<NewReservationFormSchema>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      // startDateTime: new Date(),
      // endDateTime: new Date(),
      customerName: "",
      customerPhoneNumber: "",
      ...preFilledData,
    },
  });

  const chosenRoomId = form.watch("roomId");
  const isPlaystaion = useMemo(() => {
    if (!rooms) return false;
    const chosenRoom = rooms.find((room) => `${room.id}` === `${chosenRoomId}`);
    return (
      chosenRoom?.type === "PLAYSTATION_ROOM" ||
      chosenRoom?.type === "PLAYSTATION_PARTITION"
    );
  }, [chosenRoomId, isFetched]);
  useEffect(() => form.resetField("playstationOptions"), [isPlaystaion]);

  // const duration = useMemo(() => {
  //   const startDateTime = form.watch("startDateTime");
  //   const endDateTime = form.watch("endDateTime");
  //   const dur = DateFns.intervalToDuration({
  //     start: startDateTime,
  //     end: endDateTime,
  //   });
  //   return DateFns.formatDuration(dur);
  // }, [form.watch("startDateTime"), form.watch("endDateTime")]);

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  // const [formAlertData, setFormAlertData] = useState<FormAlertProps>({
  //   message: "",
  //   type: "error",
  // });

  async function onSubmit(values: NewReservationFormSchema) {
    setSubmitting(true);
    // setFormAlertData({ message: "", type: "error" });

    try {
      const _ = await reserve(parseInt(values.roomId), {
        reserverName: values.customerName,
        phoneNumber: values.customerPhoneNumber,
        multi: values.playstationOptions?.controllers === "multi",
      });

      await refetchRooms();
      form.reset();
      setReRenderSelect(new Date());

      toast({
        title: "Room Booked",
        description: `Room booked successfully`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || error?.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const playstationFormFields = (
    <>
      {/* <SelectFormField
        key={+reRenderSelect + "type"}
        control={form.control}
        name="playstationOptions.type"
        label="Playstation Type"
        triggerPlaceholder="Select PS Type"
        defaultValue="ps4"
        disabled={submitting}
      >
        <SelectItem value="ps4">PS4</SelectItem>
        <SelectItem value="ps5">PS5</SelectItem>
      </SelectFormField> */}
      <SelectFormField
        key={+reRenderSelect + "controllers"}
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

  // const datesFormInputs = ( <DateTimeFormField
  //   control={form.control}
  //   name="startDateTime"
  //   label="Start Date & Time"
  //   disabled={submitting}
  // />
  // {/*====================================================*/}
  // {/* <FormAlert {...formAlertData} /> */}
  // <DateTimeFormField
  //   control={form.control}
  //   name="endDateTime"
  //   label="End Date & Time"
  //   disabled={submitting}
  // />
  // {/*====================================================*/}
  // <FormItem>
  //   <FormLabel>Duration</FormLabel>
  //   <Input disabled type="text" value={duration} />
  // </FormItem>))

  return (
    <div className="container mx-auto py-10 max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/*====================================================*/}
          {/* {datesFormInputs} */}
          {/*====================================================*/}
          <SelectFormField
            key={+reRenderSelect + "roomId"}
            control={form.control}
            name="roomId"
            label="Available Rooms"
            triggerPlaceholder="Select Room"
            disabled={submitting}
          >
            {!rooms && (
              <SelectItem disabled value="No Available Rooms">
                No Available Rooms
              </SelectItem>
            )}
            {rooms?.map(
              (room, i) =>
                room?.id && (
                  <SelectItem key={i} value={room.id.toString()}>
                    {room.name}
                  </SelectItem>
                )
            )}
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
