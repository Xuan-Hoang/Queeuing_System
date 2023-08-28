export interface NumberLevel {
  id: string;
  numberOrder: number;
  customer: string;
  service: string;
  issuanceDate: Date;
  expiryDate: Date;
  status?: string;
  source: string;
  email: string;
}
