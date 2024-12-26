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

import { TExperience } from "@/types";
import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from "@/redux/features/experience/experienceApi";
import CreateExperience from "@/components/experience/CreateExperience";
import UpdateExperience from "@/components/experience/updateExperience";

export default function Experience() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TExperience>();
  const { data: itemsData, isLoading } = useGetExperiencesQuery(undefined);

  const [deleteItem] = useDeleteExperienceMutation();

  if (isLoading) return <p>Loading ...</p>;

  const deleteProductData = () => {
    deleteItem(selectedItem);
  };

  return (
    <div className="px-2 md:px-8 py-12">
      <div className="flex justify-between border-b border-border pb-4">
        <h2 className="text-3xl font-bold">Experience List</h2>
        <CreateExperience />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your experience.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Company Name</TableHead>
              <TableHead className="font-bold">Duration</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Designation</TableHead>
              <TableHead className="font-bold">Priority</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsData?.data?.map((item: TExperience) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.companyName}
                </TableCell>
                <TableCell>
                  <p className="max-w-[300px] line-clamp-3 overflow-hidden">
                    {item.description}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="max-w-[300px] line-clamp-3 overflow-hidden">
                    {item.duration}
                  </p>
                </TableCell>

                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.priority}</TableCell>
                <TableCell>
                  <UpdateExperience experience={item} />
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
