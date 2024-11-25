import React from 'react';

import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';

interface Action {
    label: string;
    onClick: () => void;
}

interface DiaryItemEditDialogProps {
    action: Action;
}

const DiaryItemEditDialog: React.FC<DiaryItemEditDialogProps> = ({ action }) => {
    return (
        <AlertDialog>
        <AlertDialogTrigger>            <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => {}}
            className={`absolute top-2 right-2`}
          >
            <Trash2 size={"20"} strokeWidth={1.5} />
          </Button></AlertDialogTrigger>	<AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette action ?</AlertDialogTitle>
            <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement cette entrée de votre journal, y compris la photo associée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="destructive">Supprimer</Button>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
};

export default DiaryItemEditDialog;