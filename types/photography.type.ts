import { Portfolio } from "./portfolio.type";

export interface Photography {
  _id: string;
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  portfolio: Portfolio | string;
  createdAt: string;
  updatedAt: string;
}

// --- GET ALL RESPONSE ---
export interface GetAllPhotographiesResponse {
  payload: Photography[];
  message: string;
  total: number;
  page: number;
  lastPage: number;
}

// --- GET BY ID RESPONSE ---
export interface GetPhotographyByIdResponse {
  payload: Photography;
  message: string;
}

// --- CREATE RESPONSE ---
export interface CreatePhotographyResponse {
  payload: Photography;
  message: string;
}

// --- UPDATE RESPONSE ---
export interface UpdatePhotographyResponse {
  payload: Photography;
  message: string;
}

// --- DELETE RESPONSE ---
export interface DeletePhotographyResponse {
  payload: Photography;
  message: string;
}
