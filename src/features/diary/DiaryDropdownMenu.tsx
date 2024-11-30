    import {
        EllipsisVertical,
        IterationCw,
        X,
      } from "lucide-react"
      
      import { Button } from "@/components/ui/button"
      import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
      } from "@/components/ui/dropdown-menu"
import DiaryItemEditDialog from "./DiaryItemEditDialog"
import { useState } from "react"
      
      export const DiaryDropddownMenu = ({ action, setActions }) => {
        const [deleteDialog, setDeleteDialog] = useState(false);
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size={"icon"}
                  className={`absolute top-0 right-0`}
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-1">
                    <IterationCw />
                    <span>Modifier</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="gap-1"
                    onClick={() => setDeleteDialog(true)}
                  >
                    <X />
                    <span>Supprimer</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DiaryItemEditDialog action={action} setActions={setActions} openAlertDialog={deleteDialog} setOpenAlertDialog={setDeleteDialog} />
          </>
        );
        
      }