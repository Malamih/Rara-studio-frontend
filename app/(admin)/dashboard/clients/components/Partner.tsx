import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/date";
import { queryClient } from "@/providers/queryProvider";
import { useDeletePartner } from "@/services/partners";
import { Partner as PartnerType } from "@/types/partners";
import { TrashIcon, Edit2Icon } from "lucide-react";
import Image from "next/image";
import { EditButton } from "./EditButton";

export const Partner = ({ data }: { data: PartnerType }) => {
  const { mutateAsync, isPending } = useDeletePartner(data?._id);

  const deletePartner = async () => {
    await mutateAsync().catch(() => {});
    await queryClient.invalidateQueries({ queryKey: ["partners"] });
  };

  return (
    <div className="partner relative flex flex-col border border-gray-700 bg-gray-900 text-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 p-4">
      {/* Logo */}
      <div className="logo w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden mb-4">
        {data?.logo?.secure_url ? (
          <Image
            src={data.logo.secure_url}
            alt={data.name}
            width={120}
            height={120}
            className="object-contain max-h-full"
          />
        ) : (
          <span className="text-gray-400 font-semibold">No Logo</span>
        )}
      </div>

      {/* Partner Info */}
      <div className="info flex flex-col items-start gap-2">
        <h3 className="text-xl font-bold truncate">{data?.name}</h3>

        {/* Projects count */}
        <p className="text-sm text-gray-300">
          {data?.projects?.length ?? 0} Project
          {data?.projects && data.projects.length !== 1 ? "s" : ""}
        </p>

        {/* Created date */}
        <p className="text-xs text-gray-500">
          Added {timeAgo(data?.createdAt)}
        </p>
      </div>

      {/* Actions */}
      <div className="actions absolute top-3 right-3 flex gap-2">
        <EditButton partner={data} />
        <Button
          variant="ghost"
          size="sm"
          onClick={deletePartner}
          disabled={isPending}
          className="text-red-500 hover:bg-red-600/20"
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
