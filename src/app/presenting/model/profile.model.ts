export interface Profile {
  id: number;
  userId: number;
  name: string;
  lastname: string;
  gender: 'male' | 'female';
  imageProfile: string;
  isPremium: boolean;
  dateExpiration: string;
}
