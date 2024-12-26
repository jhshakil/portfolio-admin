import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  closeDialog: () => void;
  submitData: () => void;
};

const DeletePopup = ({ open, closeDialog, submitData }: Props) => {
  const dialogClose = () => {
    closeDialog();
  };
  return (
    <Dialog open={open} onOpenChange={dialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Are you sure, you want to do this ?
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-6">
          <Button
            onClick={() => {
              submitData();
              dialogClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={dialogClose} variant="destructive">
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopup;
