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
import { PenIcon } from "lucide-react";
import { useUpdateVideography } from "@/services/videography";
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
import { Videography } from "@/types/videography.type";
import { Portfolio } from "@/types/portfolio.type";

export const EditVideographyButton = ({
  videography,
}: {
  videography: Videography;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState<string>(videography.video);
  const [thumbnail, setThumbnail] = useState<string>(videography.thumbnail);
  const [title, setTitle] = useState<string>(videography.title);
  const [projectId, setProjectId] = useState<string>( // renamed
    videography.portfolio as string
  );
  const [fetcherKey, setFetcherKey] = useState<number>(0);

  const { data: projects } = useGetPortfolios({}); // renamed
  const { mutateAsync, isPending, error }: any = useUpdateVideography(
    videography._id
  );

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: any = {};
    if (title !== videography.title) payload.title = title;
    if (videoLink !== videography.video) payload.video = videoLink;
    if (thumbnail !== videography.thumbnail) payload.thumbnail = thumbnail;
    if (projectId !== (videography.portfolio as string))
      payload.portfolio = projectId; // backend field remains same
    await mutateAsync(payload)
      .then(() => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ["videographies"] });
      })
      .catch(() => {});
  };

  const hasProjects = (projects?.payload?.length ?? 0) > 0; // renamed

  useEffect(() => {
    if (!isOpen && videography?.portfolio) {
      setTitle(videography?.title);
      setVideoLink(videography?.video);
      setThumbnail(videography?.thumbnail);
      setProjectId((videography?.portfolio as Portfolio)._id);
      setFetcherKey((k) => k + 1); // remount VideoFetcher
    }
  }, [isOpen, videography]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <PenIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-auto custom-scroll-area">
        <DialogHeader>
          <DialogTitle>Edit Videography</DialogTitle>
          <DialogDescription>
            Update videography details. Changes will reflect in the list.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="mt-4 space-y-4">
          {/* Title */}
          <div className="space-y-1">
            <Label>Title</Label>
            <Input
              placeholder="Enter videography title"
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
              imageInputId={`videography-thumbnail-preview-${videography._id}`}
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

          {/* Project Select */}
          <div className="space-y-1">
            <Label>Project</Label>
            <Select
              defaultValue={projectId}
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
            {error?.fieldErrors?.portfolio && (
              <p className="text-red-500 text-sm">
                {error.fieldErrors.portfolio}
              </p>
            )}
          </div>

          <Button
            className="w-full mt-6"
            disabled={
              isPending || !hasProjects || !title || !videoLink || !projectId
            }
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
