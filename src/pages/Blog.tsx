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
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";
import CreateBlog from "@/components/blog/CreateBlog";
import UpdateBlog from "@/components/blog/UpdateBlog";

export default function Blog() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TBlog>();
  const { data: itemData, isLoading } = useGetBlogsQuery(undefined);

  const [deleteItem] = useDeleteBlogMutation();

  if (isLoading) return <p>Loading ...</p>;

  const deleteProductData = () => {
    deleteItem(selectedItem);
  };

  return (
    <div className="px-2 md:px-8 py-12">
      <div className="flex justify-between border-b border-border pb-4">
        <h2 className="text-3xl font-bold">Blog List</h2>
        <CreateBlog />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your blog.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Image</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemData?.data?.map((item: TBlog) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <p className="max-w-[300px] line-clamp-3 overflow-hidden">
                    {item.description}
                  </p>
                </TableCell>
                <TableCell>
                  <img
                    width={50}
                    height={50}
                    src={item.image}
                    alt="item image"
                  />
                </TableCell>

                <TableCell>
                  <UpdateBlog blog={item} />
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
