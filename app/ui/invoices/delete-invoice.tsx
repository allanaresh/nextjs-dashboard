"use client";

import { useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ConfirmModal } from "../confirm-modal";
import { deleteInvoice } from "@/app/lib/actions";

export function DeleteInvoice({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!confirmed) {
      e.preventDefault(); // ⛔ block first submit
      setOpen(true); // open modal
    }
    // ✅ if confirmed === true → allow submit
  }

  function confirmDelete() {
    setConfirmed(true); // ✅ allow submit
    setOpen(false);
    formRef.current?.requestSubmit();
  }

  return (
    <>
      <form ref={formRef} action={deleteInvoiceWithId} onSubmit={handleSubmit}>
        <button
          suppressHydrationWarning
          type="submit"
          className="rounded-md border p-2 hover:bg-gray-100"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>

      <ConfirmModal
        open={open}
        title="Delete invoice"
        message="This action cannot be undone."
        onCancel={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
