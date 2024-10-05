export interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  createdAt?: string;  // Optional, as it might not be always used
  updatedAt?: string;  // Optional
  enabled?: boolean;   // Optional, depending on your API response
}