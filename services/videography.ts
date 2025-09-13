import ApiClient from "@/lib/apiClient";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  GetAllVideographiesResponse,
  GetVideographyByIdResponse,
  CreateVideographyResponse,
  UpdateVideographyResponse,
  DeleteVideographyResponse,
} from "@/types/videography.type";

export const useGetVideographies = ({
  query,
}: { query?: Record<string, any> } = {}) => {
  const endpoint = new ApiClient<any, GetAllVideographiesResponse>(
    "/videographies"
  );
  return useQuery({
    queryKey: ["videographies", query],
    queryFn: endpoint.get,
    meta: { params: { ...query } },
  });
};

export const useGetVideographyById = (id: string) => {
  const endpoint = new ApiClient<any, GetVideographyByIdResponse>(
    `/videographies/${id}`
  );
  return useQuery({
    queryKey: ["videography", id],
    queryFn: endpoint.get,
    enabled: !!id,
  });
};

export const useCreateVideography = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, CreateVideographyResponse>(
    "/videographies"
  );

  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videographies"] });
    },
  });
};

export const useUpdateVideography = (id: string) => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, UpdateVideographyResponse>(
    `/videographies/${id}`
  );

  return useMutation({
    mutationFn: endpoint.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videographies"] });
      queryClient.invalidateQueries({ queryKey: ["videography", id] });
    },
  });
};

export const useDeleteVideography = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<null, DeleteVideographyResponse>(
    "/videographies"
  );

  return useMutation({
    mutationFn: (id: string) => endpoint.delete(null, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videographies"] });
    },
  });
};
