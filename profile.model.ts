export interface Profile {
  id?: number;
  name: string;
  email: string; // unique key
  mobile: string;
  dob: string;
  age?: number;
  imageDataUrl: string | null;
}
