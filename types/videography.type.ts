// src/types/videography.type.ts

import { Portfolio } from "./portfolio.type";

// --- Base Type ---
export interface Videography {
  _id: string;
  title: string;
  portfolio: string | Portfolio; // can be populated or just ID
  video: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

// --- GET ALL ---
export interface GetAllVideographiesResponse {
  message: string;
  payload: Videography[];
  total?: number; // optional, if you return pagination info
  lastPage?: number;
}

// --- GET BY ID ---
export interface GetVideographyByIdResponse {
  message: string;
  payload: Videography;
}

// --- CREATE ---
export interface CreateVideographyResponse {
  message: string;
  payload: Videography;
}

// --- UPDATE ---
export interface UpdateVideographyResponse {
  message: string;
  payload: Videography;
}

// --- DELETE ---
export interface DeleteVideographyResponse {
  message: string;
  payload: { _id: string };
}
