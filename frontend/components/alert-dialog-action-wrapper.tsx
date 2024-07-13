"use client";
//FIXME: choosing any other action like "cancel" will not do the onConfirm actions
import React, { JSXElementConstructor } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AlertDialogActionWrapperProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  actionButtonLabel?: string;
  onConfirm?: () => void;
  afterClose?: () => void;
  destructive?: true;
};

function AlertDialogActionWrapper({
  trigger,
  title,
  description,
  onConfirm,
  afterClose,
  destructive,
  actionButtonLabel = "Continue",
}: AlertDialogActionWrapperProps) {
  const [open, setOpen] = React.useState(false);

  const handleOnConfirm = (
    e: React.SyntheticEvent<HTMLButtonElement, Event>
  ) => {
    e.preventDefault();
    onConfirm?.();
    setOpen(false);
    afterClose?.();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(_) => afterClose?.()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => handleOnConfirm(e)}
            className={
              destructive &&
              "bg-destructive text-destructive-foreground hover:bg-destructive hover:brightness-125"
            }
          >
            {actionButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogActionWrapper;
