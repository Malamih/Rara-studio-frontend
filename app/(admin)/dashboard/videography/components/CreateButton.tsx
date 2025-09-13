"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/dashboard/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { PlusIcon } from "lucide-react";
import { useCreateVideography } from "@/services/videography";
import { useGetPortfolios } from "@/services/portfolio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/providers/queryProvider";
import { VideoFetcher } from "@/components/ui/dashboard/VideoFetcher";
import Image from "next/image";

export const CreateVideographyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [projectId, setProjectId] = useState<string>(""); // renamed
  const [fetcherKey, setFetcherKey] = useState<number>(0);

  const { data: projects } = useGetPortfolios({}); // renamed
  const { mutateAsync, isPending, error }: any = useCreateVideography();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      title,
      video: videoLink,
      thumbnail,
      portfolio: projectId, // backend field stays the same
    };

    await mutateAsync(payload)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["videographies"] });
      })
      .catch(() => {});
  };

  const hasProjects = (projects?.payload?.length ?? 0) > 0; // renamed

  useEffect(() => {
    if (!isOpen) {
      setVideoLink("");
      setThumbnail("");
      setTitle("");
      setProjectId("");
      setFetcherKey((k) => k + 1);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon className="mr-2 w-4 h-4" />
          Add Videography
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Add New Videography</DialogTitle>
          <DialogDescription>
            Fill out the videography details, fetch a Vimeo video, and select a
            project. The thumbnail is automatically extracted and cannot be
            changed manually.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="mt-4 space-y-4">
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              variant={error?.fieldErrors?.title && "destructive"}
            />
            {error?.fieldErrors?.title && (
              <p className="text-red-500 text-sm">{error.fieldErrors.title}</p>
            )}
          </div>

          {/* Video Fetcher */}
          <div className="space-y-2">
            <VideoFetcher
              key={fetcherKey}
              buttonContent="Fetch Video"
              label="Vimeo Video"
              thumbnail={false}
              imageInputId="videography-thumbnail-preview"
              imageInputName="thumbnail"
              setVideoLink={setVideoLink}
              setThumbnail={setThumbnail}
            />

            {thumbnail && (
              <div className="mt-2 w-full h-48 relative rounded-lg overflow-hidden border border-gray-300">
                <Image
                  src={thumbnail}
                  alt="Video Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {error?.fieldErrors?.video && (
              <p className="text-red-500 text-sm">{error.fieldErrors.video}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Project</Label>
            <Select
              value={projectId}
              onValueChange={setProjectId}
              required
              disabled={!hasProjects}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    hasProjects ? "Select a project" : "No projects available"
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-full">
                {projects?.payload?.map((p: any) => (
                  <SelectItem key={p._id} value={p._id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!hasProjects && (
              <p className="text-gray-400 text-sm mt-1">
                You need to create a project first.
              </p>
            )}
          </div>

          <Button
            className="w-full mt-6"
            disabled={
              isPending || !hasProjects || !videoLink || !title || !projectId
            }
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
