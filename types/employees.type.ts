export interface Employee {
  _id: string;
  name: string;
  position: string;
  caption: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseResponse<T = any> {
  message: string;
  payload?: T;
}

export interface PaginatedResponse<T = any> extends BaseResponse<T[]> {
  total: number;
  page: number;
  lastPage: number;
}

export type GetAllEmployeesResponse = PaginatedResponse<Employee>;

export type GetEmployeeByIdResponse = BaseResponse<Employee>;

export type CreateEmployeeResponse = BaseResponse<Employee>;

export type UpdateEmployeeResponse = BaseResponse<Employee>;

export type DeleteEmployeeResponse = BaseResponse<null>;
