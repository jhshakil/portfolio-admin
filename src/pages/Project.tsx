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
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "@/redux/features/project/projectApi";
import { TProject } from "@/types";
import CreateProject from "@/components/project/CreateProject";
import UpdateProject from "@/components/project/UpdateProject";

export default function Project() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject>();
  const { data: projectData, isLoading } = useGetProjectsQuery(undefined);

  const [deleteProject] = useDeleteProjectMutation();

  if (isLoading) return <p>Loading ...</p>;

  const deleteProductData = () => {
    deleteProject(selectedProject);
  };

  return (
    <div className="px-2 md:px-8 py-12">
      <div className="flex justify-between border-b border-border pb-4">
        <h2 className="text-3xl font-bold">Project List</h2>
        <CreateProject />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your project.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Title</TableHead>
              <TableHead className="font-bold">Sub Title</TableHead>
              <TableHead className="font-bold">Image</TableHead>
              <TableHead className="font-bold">Technology</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData?.data?.map((project: TProject) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.title}</TableCell>
                <TableCell>
                  <p className="max-w-[300px] line-clamp-3 overflow-hidden">
                    {project.description}
                  </p>
                </TableCell>
                <TableCell>{project.subTitle}</TableCell>
                <TableCell>
                  <img
                    width={50}
                    height={50}
                    src={project.image}
                    alt="project image"
                  />
                </TableCell>
                <TableCell>{project.technology}</TableCell>

                <TableCell>
                  <UpdateProject project={project} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-none hover:bg-background relative"
                    onClick={() => {
                      setSelectedProject(project);
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
        {selectedProject && (
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
