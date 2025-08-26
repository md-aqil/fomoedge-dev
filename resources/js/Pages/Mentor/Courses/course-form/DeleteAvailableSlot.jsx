import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "@inertiajs/react";
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
} from "@/shadcn/ui/alert-dialog";
import { Button } from "@/shadcn/ui/button";

export default function DeleteAvailableSlot({ id }) {
    const { delete: destroy } = useForm();

    const [open, setOpen] = React.useState(false);
    function submit(e) {
        e.preventDefault();
        destroy(route("admin.time-slots.destroy", id), {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" type="button">
                        <Trash className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete this Package Time Slot.?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to perform this action? This
                            can not be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <form onSubmit={submit}>
                            <Button variant="destructive" type="submit">
                                <Trash className="h-4 w-4 mr-2" /> Continue
                            </Button>
                        </form>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
