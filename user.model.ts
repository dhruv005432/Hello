export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
  dob: string;
  age?: number;
  imageDataUrl: string | null;
}
