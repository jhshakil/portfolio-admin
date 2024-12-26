import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeletePopup from "@/components/DeletePopup";

import { TSkill } from "@/types";
import {
  useDeleteSkillMutation,
  useGetSkillsQuery,
} from "@/redux/features/skill/skillApi";
import CreateSkill from "@/components/skill/CreateSkill";
import UpdateSkill from "@/components/skill/UpdateSkill";

export default function Skill() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TSkill>();
  const { data: itemsData, isLoading } = useGetSkillsQuery(undefined);

  const [deleteItem] = useDeleteSkillMutation();

  if (isLoading) return <p>Loading ...</p>;

  const deleteProductData = () => {
    deleteItem(selectedItem);
  };

  return (
    <div className="px-2 md:px-8 py-12">
      <div className="flex justify-between border-b border-border pb-4">
        <h2 className="text-3xl font-bold">Skill List</h2>
        <CreateSkill />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your Skill.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Percentage</TableHead>
              <TableHead className="font-bold">Color</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsData?.data?.map((item: TSkill) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>

                <TableCell>{item.percentage}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>
                  <UpdateSkill skill={item} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none hover:bg-background relative"
                    onClick={() => {
                      setSelectedItem(item);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <Trash className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedItem && (
          <>
            <DeletePopup
              open={openDeleteDialog}
              closeDialog={() => setOpenDeleteDialog(false)}
              submitData={() => deleteProductData()}
            />
          </>
        )}
      </div>
    </div>
  );
}
