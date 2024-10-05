import { User, RegisterData, SigninData } from "@/interface"

// Hook return type for `useAuth`
export interface UseAuthResponse {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  signin: (data: SigninData) => Promise<void>;
  signout: () => void;
  isAuthenticated: () => boolean;
}