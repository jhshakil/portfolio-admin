import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import {
  useCreateProfileMutation,
  useGetProfilesQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileApi";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  designation: z.string().min(1, {
    message: "Designation is required",
  }),
  instruction: z.string().optional(),
  resumeLink: z.string().optional(),
  image: z.string().optional(),
  about: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  language: z.string().optional(),
  address: z.string().optional(),
});

const Profile = () => {
  const { data: ProfileData, isLoading } = useGetProfilesQuery(undefined);
  const [createProfile] = useCreateProfileMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [profileImage, setProfileImage] = useState("/fallback.png");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      designation: "",
      instruction: "",
      resumeLink: "",
      image: "",
      about: "",
      phoneNumber: "",
      email: "",
      language: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!isLoading && ProfileData.success) {
      form.reset({
        name: ProfileData?.data[0]?.name || "",
        designation: ProfileData?.data[0]?.designation || "",
        instruction: ProfileData?.data[0]?.instruction || "",
        resumeLink: ProfileData?.data[0]?.resumeLink || "",
        image: ProfileData?.data[0]?.image || "",
        about: ProfileData?.data[0]?.about || "",
        phoneNumber: ProfileData?.data[0]?.phoneNumber || "",
        email: ProfileData?.data[0]?.email || "",
        language: ProfileData?.data[0]?.language || "",
        address: ProfileData?.data[0]?.address || "",
      });
      if (ProfileData?.data[0]?.image) {
        setProfileImage(ProfileData?.data[0]?.image);
      }
    }
  }, [ProfileData]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (acceptedFiles[0]) {
      const imgRef = ref(imageUploadDB, `/files/${v4()}`);
      await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
        await getDownloadURL(imgData.ref).then((val) => {
          data.image = val;
          setProfileImage(val);
        });
      });
    }

    if (ProfileData.success) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.id = ProfileData?.data[0]?.id;
      const res = await updateProfile(data);
      if (res?.data) {
        toast("Profile Update SuccessFully");
      } else {
        toast("Profile Update Fail!");
      }
    } else {
      const res = await createProfile(data);
      if (res?.data) {
        toast("Profile Create SuccessFully");
      } else {
        toast("Profile Create Fail!");
      }
    }
  }

  return (
    <div className="p-11">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-3 justify-between gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Designation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instruction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instruction</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Instruction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 justify-between gap-6">
            <FormField
              control={form.control}
              name="resumeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Resume Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 justify-between gap-6">
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Your About" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Your Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 justify-between gap-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Language" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <p className="text-sm font-semibold">Image</p>
            <div className="grid grid-cols-3 justify-between gap-6 mt-2">
              <div className="w-72 h-72 overflow-hidden">
                <img
                  src={profileImage}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
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
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
