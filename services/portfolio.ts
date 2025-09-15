import ApiClient from "@/lib/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetAllPortfoliosResponse,
  GetPortfolioByIdResponse,
  CreatePortfolioResponse,
  UpdatePortfolioResponse,
  DeletePortfolioResponse,
} from "@/types/portfolio.type";

// --- GET ALL ---
export const useGetPortfolios = ({
  query,
}: {
  query?: Record<string, any>;
}) => {
  const endpoint = new ApiClient<any, GetAllPortfoliosResponse>("/portfolios");
  return useQuery({
    queryKey: ["portfolios", query],
    queryFn: endpoint.get,
    meta: { params: { ...query } },
  });
};

// --- GET BY ID ---
export const useGetPortfolioById = (id: string) => {
  const endpoint = new ApiClient<null, GetPortfolioByIdResponse>(
    `/portfolios/${id}`
  );
  return useQuery({
    queryKey: ["portfolio", id],
    queryFn: endpoint.get,
    enabled: !!id,
  });
};

// --- CREATE ---
export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, CreatePortfolioResponse>(
    "/portfolios"
  );

  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

// --- UPDATE ---
export const useUpdatePortfolio = (id: string) => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, UpdatePortfolioResponse>(
    `/portfolios/${id}`
  );

  return useMutation({
    mutationFn: endpoint.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio", id] });
    },
  });
};

// --- DELETE ---
export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<null, DeletePortfolioResponse>("/portfolios");

  return useMutation({
    mutationFn: (id: string) => endpoint.delete(null, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useTogglePortfolioSelection = (id: string) => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<null, any>(
    `portfolios/${id}/toggle-selection`
  );

  return useMutation({
    mutationFn: endpoint.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};

export const useGetSelectedPortfolio = () => {
  const endpoint = new ApiClient<null, GetPortfolioByIdResponse>(
    "/portfolios/selected"
  );

  return useQuery({
    queryKey: ["portfolio", "selected"],
    queryFn: endpoint.get,
    staleTime: 1000 * 60, // optional: cache for 1 minute
    retry: false,
  });
};
