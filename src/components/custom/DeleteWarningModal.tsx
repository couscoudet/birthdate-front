import { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type propType = {
  children: ReactNode;
  item: { name: string; id: number };
  deleteItem: (id: number) => void;
};

const DeleteWarningModal = ({ children, item, deleteItem }: propType) => {
  return (
    <Dialog>
      {children}
      <DialogContent className=" bg-gradient-to-b from-violet-900 to-fuchsia-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-thin font-display mb-2">
            Es-tu certain de vouloir supprimer définitivement :{" "}
            <span className="font-sans">{item.name}</span>
          </DialogTitle>
          <DialogClose asChild>
            <Button
              id={item.id.toString()}
              className="bg-red-500 shadow-inner shadow-red-200 m-3 p-2"
              onClick={(e) => deleteItem(+(e.target as HTMLButtonElement).id)}
            >
              Oui Supprimer
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="shadow-inner shadow-fuchsia-200 m-3 p-2">
              Annuler
            </Button>
          </DialogClose>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarningModal;
