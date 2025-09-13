"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";
import { useDeletePhotography } from "@/services/photography";
import { Photography } from "@/types/photography.type";
import { EditPhotographyButton } from "./EditButton";

export const PhotographyCard = ({ photo }: { photo: Photography }) => {
  const { mutate: deletePhoto, isPending } = useDeletePhotography();

  return (
    <div className="bg-white/5 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col">
      {/* Image */}
      {photo.image?.url ? (
        <Image
          src={photo.image.url}
          alt={photo.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-lg">{photo.title}</h2>
        <p className="text-sm text-gray-300">
          Project:{" "}
          {typeof photo.portfolio !== "string"
            ? photo?.portfolio?.name
            : "Unknown"}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-2">
          <EditPhotographyButton photography={photo} />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => deletePhoto(photo._id)}
            disabled={isPending}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
