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
import {
  useDeleteSocialMutation,
  useGetSocialsQuery,
} from "@/redux/features/social/socialApi";
import { TSocial } from "@/types";
import CreateSocial from "@/components/social/CreateSocial";
import UpdateSocial from "@/components/social/UpdateSocial";

export default function Social() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TSocial>();
  const { data: itemsData, isLoading } = useGetSocialsQuery(undefined);

  const [deleteItem] = useDeleteSocialMutation();

  if (isLoading) return <p>Loading ...</p>;

  const deleteProductData = () => {
    deleteItem(selectedItem);
  };

  return (
    <div className="px-2 md:px-8 py-12">
      <div className="flex justify-between border-b border-border pb-4">
        <h2 className="text-3xl font-bold">Social List</h2>
        <CreateSocial />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your Social.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">url</TableHead>
              <TableHead className="font-bold">icon</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsData?.data?.map((item: TSocial) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>

                <TableCell>{item.url}</TableCell>
                <TableCell>{item.icon}</TableCell>
                <TableCell>
                  <UpdateSocial social={item} />
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
