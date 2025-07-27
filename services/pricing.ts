import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./http-client";
import axios, { AxiosError } from "axios";

export type EntityType = "institution" | "student" | "teacher";

export interface PricingPlan {
  //   id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EntityPricingData {
  plans: PricingPlan[];
  faqs: FAQItem[];
}

class PricingService {
  /**
   * Get pricing data for a specific entity type
   * @param entityType The type of entity (institution, student, or teacher)
   */
  async getPricingData(entityType: EntityType): Promise<EntityPricingData> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: EntityPricingData;
      }>(`/pricing/${entityType}`);
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to fetch pricing data";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  }

  /**
   * Get all pricing data (Admin only)
   * @param token Authentication token
   */
  async getAllPricingData(
    token: string
  ): Promise<Record<string, EntityPricingData>> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: Record<string, EntityPricingData>;
      }>("/pricing", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      let errorMessage = "Failed to fetch all pricing data";

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      throw new Error(errorMessage);
    }
  }
}

export const pricingService = new PricingService();

// React Query hooks
export const usePricingData = (entityType: EntityType) => {
  return useQuery<EntityPricingData, Error>({
    queryKey: ["pricing", entityType],
    queryFn: () => pricingService.getPricingData(entityType),
    staleTime: 1000 * 60 * 60,
    retry: 2,
  });
};

export const useAllPricingData = (token: string | null) => {
  return useQuery<Record<string, EntityPricingData>, Error>({
    queryKey: ["allPricing"],
    queryFn: () => {
      if (!token) throw new Error("Authentication required");
      return pricingService.getAllPricingData(token);
    },
    enabled: !!token,
    retry: 2,
  });
};
