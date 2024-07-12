import React, { JSXElementConstructor, useCallback, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogFormWrapperProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  FormComponent: JSXElementConstructor<{
    dialogMode: boolean;
    closeDialog: () => void;
  }>;
  afterSubmit?: () => void;
};

function DialogFormWrapper({
  trigger,
  FormComponent,
  title,
  description,
  afterSubmit,
}: DialogFormWrapperProps) {
  const [isOpen, setisOpen] = useState(false);
  const closeDialog = useCallback(() => setisOpen(false), []);
  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <FormComponent
          dialogMode
          closeDialog={() => {
            afterSubmit?.();
            closeDialog();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

export default DialogFormWrapper;
