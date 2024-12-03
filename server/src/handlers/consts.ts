import {Request} from "express";

export type HandlerResponse = {
    status: number,
    message?: string
    data?: any
}
export type Pagination = {
    total_items: number,
    total_pages:   number,
    current_page: number,
    page_size: number
}
export interface ParsedQueryRequest extends Request {
    parsedQuery?: any; // Add parsedQuery as an optional property
  }