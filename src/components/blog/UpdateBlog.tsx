import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useDropzone } from "react-dropzone";
import { Edit, UploadCloud } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateBlogMutation } from "@/redux/features/blog/blogApi";
import { TBlog } from "@/types";

const FormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z.string(),
  image: z.string().optional(),
});

type Props = {
  blog: TBlog;
};

export default function UpdateBlog({ blog }: Props) {
  const [open, setOpen] = useState(false);

  const [updateItem] = useUpdateBlogMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: blog.id,
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      image: blog.image || "",
    },
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (acceptedFiles[0]) {
      const imgRef = ref(imageUploadDB, `/files/${v4()}`);
      await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
        await getDownloadURL(imgData.ref).then((val) => (data.image = val));
      });
    }
    const res = await updateItem(data);

    if (res?.data) {
      toast("Blog update successfully");
      form.reset({
        title: "",
        slug: "",
        description: "",
        image: "",
      });
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button
          variant="outline"
          size="icon"
          className="border-none hover:bg-background relative"
        >
          <Edit className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Unique Slug Without Space"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Description" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-sm font-semibold">Image</p>
                <label
                  {...getRootProps()}
                  className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2"
                >
                  <div className=" text-center">
                    <div className=" border p-2 rounded-md max-w-min mx-auto">
                      <UploadCloud size={20} />
                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold">Drag files</span>
                    </p>
                    {acceptedFiles[0]?.name ? (
                      <p className="text-xs text-gray-500">
                        {acceptedFiles[0].name}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">
                        Click to upload files &#40;files should be under 10 MB
                        &#41;
                      </p>
                    )}
                  </div>
                </label>

                <Input
                  {...getInputProps()}
                  id="dropzone-file"
                  accept="image/png, image/jpeg"
                  type="file"
                  className="hidden"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
