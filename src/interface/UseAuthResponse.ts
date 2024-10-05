import { User, RegisterData, SigninBody } from "@/interface"

// Hook return type for `useAuth`
export interface UseAuthResponse {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  signin: (data: SigninBody) => Promise<void>;
  signout: () => void;
  isAuthenticated: () => boolean;
}