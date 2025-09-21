import 'next-auth';
import { User } from '@/lib/mock-data';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    walletBalance: number;
  }
  
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    phone: string;
    walletBalance: number;
  }
}