"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import SelectFormField from "@/components/forms/select-form-field";
import TextFormField from "@/components/forms/text-form-field";

import { ROOM_TYPES, toSentenceCase } from "@/lib/utils";

import { createRoom } from "@/orval/api/api";

const roomFormSchema = z.object({
  name: z.string().min(1).max(255),
  available: z.boolean().optional(),
  type: z.enum(ROOM_TYPES),
  priceSingle: z.number({ coerce: true }).nonnegative(),
  priceMulti: z.number({ coerce: true }).nonnegative().optional(),
});

export type NewRoomFormSchema = z.infer<typeof roomFormSchema>;

// /**
//  * TS hack to ensure prefillable data already exist in the reservationSchema
//  * Add more literal values to make more PreFillableFields
//  */
// export type PreFillableFields = Partial<Pick<NewRoomFormSchema, "name">>;

type NewRoomFormProps = {
  dialogMode?: boolean;
  closeDialog?: () => void;
  // preFilledData?: PreFillableFields;
};

function NewRoomForm({ dialogMode = false, closeDialog }: NewRoomFormProps) {
  const [reRenderSelect, setReRenderSelect] = useState(new Date());
  const form = useForm<NewRoomFormSchema>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      // ...preFilledData,
    },
  });

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  // const [formAlertData, setFormAlertData] = useState<FormAlertProps>({
  //   message: "",
  //   type: "error",
  // });

  async function onSubmit(values: NewRoomFormSchema) {
    setSubmitting(true);
    // setFormAlertData({ message: "", type: "error" });

    try {
      const _ = await createRoom(values);

      form.reset();
      setReRenderSelect(new Date());

      toast({
        title: "Success",
        description: "Successfully created a new room",
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
      if (dialogMode && closeDialog) {
        closeDialog();
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* <FormAlert {...formAlertData} /> */}
        <SelectFormField
          key={reRenderSelect + "room_type"}
          control={form.control}
          name="type"
          label="Room Type"
          triggerPlaceholder="Select Room Type"
          disabled={submitting}
        >
          {ROOM_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {toSentenceCase(type)}
            </SelectItem>
          ))}
        </SelectFormField>
        {/*====================================================*/}
        <TextFormField
          control={form.control}
          name="name"
          label="Room Name"
          placeholder="Room 1"
          disabled={submitting}
        />
        {/*====================================================*/}
        <FormField
          control={form.control}
          name="priceSingle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Price/Hour - Single"}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  step={0.01}
                  disabled={submitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceMulti"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Price/Hour - Multi (Optional)"}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  step={0.01}
                  disabled={submitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={submitting}
          size="lg"
          className="w-full"
          type="submit"
        >
          Create
        </Button>
        {dialogMode && closeDialog && (
          <Button
            disabled={submitting}
            size="lg"
            className="w-full"
            type="button"
            variant="secondary"
            onClick={() => closeDialog()}
          >
            Close
          </Button>
        )}
      </form>
    </Form>
  );
}

export default NewRoomForm;
