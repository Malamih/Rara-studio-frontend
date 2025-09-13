export interface Portfolio {
  _id: string;
  name: string;
  image?: {
    public_id: string;
    url: string;
  };
  banner?: {
    public_id: string;
    url: string;
  };
  client: {
    _id: string;
    name: string;
    logo: {
      public_id: string;
      secure_url: string;
    };
  };
  insight?: string;
  description?: string;
  projectDate?: string;
  photography?: {
    _id: string;
    title: string;
    url: string;
    portfolio: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
  videography?: {
    _id: string;
    title: string;
    url: string;
    portfolio: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
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
export type GetAllPortfoliosResponse = PaginatedResponse<Portfolio>;

export type GetPortfolioByIdResponse = BaseResponse<Portfolio>;

export type CreatePortfolioResponse = BaseResponse<Portfolio>;

export type UpdatePortfolioResponse = BaseResponse<Portfolio>;

export type DeletePortfolioResponse = BaseResponse<null>;
