import ApiClient from "@/lib/apiClient";
import {
  GetAllEmployeesResponse,
  GetEmployeeByIdResponse,
  CreateEmployeeResponse,
  UpdateEmployeeResponse,
  DeleteEmployeeResponse,
} from "@/types/employees.type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetEmployees = ({ query }: { query?: Record<string, any> }) => {
  const endpoint = new ApiClient<any, GetAllEmployeesResponse>("/employees");
  return useQuery({
    queryKey: ["employees", query],
    queryFn: endpoint.get,
    meta: { params: { ...query } },
  });
};

export const useGetEmployeeById = (id: string) => {
  const endpoint = new ApiClient<null, GetEmployeeByIdResponse>(
    `/employees/${id}`
  );
  return useQuery({
    queryKey: ["employee", id],
    queryFn: endpoint.get,
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, CreateEmployeeResponse>(
    "/employees"
  );

  return useMutation({
    mutationFn: endpoint.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = (id: string) => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<FormData, UpdateEmployeeResponse>(
    `/employees/${id}`
  );

  return useMutation({
    mutationFn: endpoint.put,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employee", id] });
    },
  });
};
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const endpoint = new ApiClient<null, DeleteEmployeeResponse>("/employees");

  return useMutation({
    mutationFn: (id: string) => endpoint.delete(null, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
