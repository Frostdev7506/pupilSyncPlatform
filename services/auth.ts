import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios'; // Import axios and AxiosError
// import { cookies } from 'next/headers'; // This import is not used here, usually for Server Components/Route Handlers

// --- Interfaces remain the same ---
export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: {
      pupilsyncId: string;
      userId: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      isVerified: boolean;
    };
  };
}

export interface InstitutionRegistrationData {
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  contactEmail: string;
  address: string;
  password: string;
}

// Add this interface for teacher registration
export interface TeacherRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subjectExpertise: string;
  qualification: string;
  profilePictureUrl?: string;
  institutions?: number[];
  primaryInstitutionId?: number | null;
}

// Create an axios instance (recommended for base URL and default config)
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Set the base URL here
  withCredentials: true, // Equivalent to fetch's 'credentials: include'
  headers: {
    'Content-Type': 'application/json', // Default Content-Type
  },
});

class AuthService {
  // No need for API_URL property if using axios instance baseURL

  async registerInstitution(data: InstitutionRegistrationData): Promise<AuthResponse> {
    try {
      // Use the apiClient instance
      // axios automatically stringifies the data object for JSON requests
      const response = await apiClient.post<AuthResponse>('/auth/register-institution', data);

      // axios resolves promises for 2xx status codes, data is in response.data
      const result = response.data;
      this.setToken(result.token);
      return result;

    } catch (error) {
      // axios throws an error for non-2xx status codes
      let errorMessage = 'Failed to register institution';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>; // Type assertion for better error data access
        // Try to get the error message from the server response
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          errorMessage = axiosError.message; // Fallback to axios error message
        }
      } else if (error instanceof Error) {
        errorMessage = error.message; // Handle non-axios errors
      }

      console.error("Registration Error:", error); // Log the full error for debugging
      throw new Error(errorMessage);
    }
  }

  async registerTeacher(data: TeacherRegistrationData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register-teacher', data);
      const result = response.data;
      this.setToken(result.token);
      return result;
    } catch (error) {
      let errorMessage = 'Failed to register teacher';

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        if (axiosError.response?.data?.message) {
          errorMessage = axiosError.response.data.message;
        } else if (axiosError.message) {
          errorMessage = axiosError.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Registration Error:", error);
      throw new Error(errorMessage);
    }
  }

  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    } else {
      // Handle server-side or environment where localStorage is not available
      // console.warn("localStorage is not available. Token not set.");
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}

export const authService = new AuthService();

// --- useRegisterInstitution hook remains the same ---
export const useRegisterInstitution = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, InstitutionRegistrationData>({
    mutationFn: (data) => authService.registerInstitution(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
      // Optional: You might want to invalidate other queries upon successful registration/login
      // queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      // Optional: Add specific UI feedback for errors here if needed
      console.error("Mutation Error:", error.message);
    }
  });
};
