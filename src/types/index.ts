export type User = {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string;
  quota_amount: number;
  status: string;
};

export type Stage = {
  id: string;
  name: string;
  display_order: number;
  win_probability: number;
};

export type Customer = {
  id: string;
  company_name: string;
  industry: string;
  contact_person: string;
};

export type Deal = {
  id: string;
  title: string;
  customer_id: string;
  owner_id: string;
  stage_id: string;
  amount: number;
  currency: string;
  status: 'open' | 'won' | 'lost';
  created_at: string;
  closed_at?: string;
  expected_close_date?: string;
};
