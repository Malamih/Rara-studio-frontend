import ApiClient from "@/lib/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetAllPhotographiesResponse,
  GetPhotographyByIdResponse,
  CreatePhotographyResponse,
  UpdatePhotographyResponse,
  DeletePhotographyResponse,
} from "@/types/photography.type";

// --- GET ALL ---
export const useGetPhotographies = ({
  query,
}: { query?: Record<string, any> } = {}) => {
  const endpoint = new ApiClient<any, GetAllPhotographiesResponse>(
    "/photographies"
  );
  return useQuery({
    queryKey: ["photographies", query],
    queryFn: endpoint.get,
    meta: { params: { ...query } },
  });
};

// --- GET BY ID ---
export const useGetPhotographyById = (id: string) => {
  const endpoint = new ApiClient<any, GetPhotographyByIdResponse>(
    `/photographies/${id}`
  );
  return useQuery({
    queryKey: ["photography", id],
    queryFn: endpoint.get,
    enabled: !!id,
  });
};

// --- CREATE ---
export const useCreatePhotography = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, CreatePhotographyResponse>(
    "/photographies"
  );

  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photographies"] });
    },
  });
};

// --- UPDATE ---
export const useUpdatePhotography = (id: string) => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, UpdatePhotographyResponse>(
    `/photographies/${id}`
  );

  return useMutation({
    mutationFn: endpoint.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photographies"] });
      queryClient.invalidateQueries({ queryKey: ["photography", id] });
    },
  });
};

// --- DELETE ---
export const useDeletePhotography = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<null, DeletePhotographyResponse>(
    "/photographies"
  );

  return useMutation({
    mutationFn: (id: string) => endpoint.delete(null, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photographies"] });
    },
  });
};
