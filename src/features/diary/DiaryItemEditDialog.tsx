import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { deleteOperation } from "@/api/api-services/operationsApi";
import { useToast } from "@/components/ui/use-toast";
import { Action } from "@radix-ui/react-toast";

interface Action {
  label: string;
  onClick: () => void;
}

interface DiaryItemEditDialogProps {
  action: Action;
  setActions: () => void
}

const DiaryItemEditDialog: React.FC<DiaryItemEditDialogProps> = ({
  action,
  setActions
}) => {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const deleteAction = async () => {
    try {
      setIsLoading(true);
      await deleteOperation(action.uuid);
      setActions((prev) => prev.filter((item) => action.uuid !== item.uuid));
      toast({
        title: "Action supprimée 👍",
        description: "L'action a été supprimée avec succès",
      });
    } catch (error) {
      console.error("can't delete the action", error);
      toast({
        title: "Un problème est survenu 😵",
        description: "Réessayer ulterieurmant",
      });
    } finally {
      setOpenAlertDialog(false);
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
      <AlertDialogTrigger>
        {" "}
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {}}
          className={`absolute top-2 right-2`}
        >
          <Trash2 size={"20"} strokeWidth={1.5} />
        </Button>
      </AlertDialogTrigger>{" "}
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer cette action ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement cette
            entrée de votre journal, y compris la photo associée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="destructive" onClick={deleteAction}>
            {isLoading &&  <Loader2 className="animate-spin mr-3" />}
            Supprimer
          </Button>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DiaryItemEditDialog;
