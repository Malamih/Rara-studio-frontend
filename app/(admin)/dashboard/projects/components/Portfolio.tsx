"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";
import { Portfolio as PortfolioType } from "@/types/portfolio.type";
import { useDeletePortfolio } from "@/services/portfolio";
import { EditPortfolioButton } from "./EditButton";

export const PortfolioCard = ({ portfolio }: { portfolio: PortfolioType }) => {
  const { mutate: deletePortfolio, isPending } = useDeletePortfolio();

  return (
    <div className="bg-white/5 w-[70%] min-w-xl flex-[1] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative flex flex-col">
      {/* Banner Image */}
      {portfolio.banner?.url ? (
        <Image
          src={portfolio.banner.url}
          alt={`${portfolio.name} Banner`}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400">
          No Banner
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 flex-[1]">
        {/* Project Info */}
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl">{portfolio.name}</h2>
          {portfolio.projectDate && (
            <span className="text-sm text-gray-400">
              Project Date:{" "}
              {new Date(portfolio.projectDate).toLocaleDateString()}
            </span>
          )}
          {portfolio.insight && (
            <p className="text-sm text-gray-300">{portfolio.insight}</p>
          )}
          {portfolio.description && (
            <p className="text-sm text-gray-400">{portfolio.description}</p>
          )}
        </div>

        {/* Client Info */}
        {portfolio.client && (
          <div className="flex items-center gap-2 mt-2">
            {portfolio.client.logo?.secure_url && (
              <Image
                src={portfolio.client.logo.secure_url}
                alt={`${portfolio.client.name} Logo`}
                width={40}
                height={40}
                className="rounded-sm object-cover"
              />
            )}
            <span className="text-sm text-gray-300">
              {portfolio.client.name}
            </span>
          </div>
        )}

        {/* Main Project Image */}
        {portfolio.image?.url && (
          <div className="w-full h-48 mt-2 relative rounded-md overflow-hidden">
            <Image
              src={portfolio.image.url}
              alt={`${portfolio.name} Image`}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Photography: {portfolio.photography?.length || 0}</span>
            <span>Videography: {portfolio.videography?.length || 0}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <EditPortfolioButton portfolio={portfolio} />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => deletePortfolio(portfolio._id)}
              disabled={isPending}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
