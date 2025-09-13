import { Portfolio } from "./portfolio.type";

type Partner = {
  _id: string;
  name: string;
  logo: {
    public_id: string;
    secure_url: string;
    _id: string;
  };
  projects?: Portfolio[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PartnersResponse = {
  payload: Partner[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
};

type PartnerResponse = {
  payload: Partner;
  message: string;
  total: number;
  page: number;
  lastPage: number;
};

export type { Partner, PartnersResponse, PartnerResponse };
