import { User, Stage, Customer, Deal } from '../types';

export const mockUsers: User[] = [
  { id: 'u1', full_name: 'Ana García', role: 'sales_rep', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', quota_amount: 50000, status: 'active' },
  { id: 'u2', full_name: 'Carlos Ruiz', role: 'sales_rep', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704e', quota_amount: 60000, status: 'active' },
  { id: 'u3', full_name: 'Elena Gómez', role: 'sales_rep', avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704f', quota_amount: 45000, status: 'active' }
];

export const mockStages: Stage[] = [
  { id: 's1', name: 'Prospect', display_order: 1, win_probability: 10 },
  { id: 's2', name: 'Lead', display_order: 2, win_probability: 30 },
  { id: 's3', name: 'Negotiation', display_order: 3, win_probability: 60 },
  { id: 's4', name: 'Closed Won', display_order: 4, win_probability: 100 },
  { id: 's5', name: 'Closed Lost', display_order: 5, win_probability: 0 }
];

export const mockCustomers: Customer[] = [
  { id: 'c1', company_name: 'TechSolutions SL', industry: 'Software', contact_person: 'David Martinez' },
  { id: 'c2', company_name: 'Global Corp', industry: 'Manufacturing', contact_person: 'Laura Torres' },
  { id: 'c3', company_name: 'Innovate INC', industry: 'Technology', contact_person: 'Javier Lopez' },
  { id: 'c4', company_name: 'NextGen Systems', industry: 'IT', contact_person: 'Sara Fernandez' },
  { id: 'c5', company_name: 'Alpha Industries', industry: 'Logistics', contact_person: 'Miguel Sanchez' }
];

// Generamos 25 deals variados
export const mockDeals: Deal[] = [
  { id: 'd1', title: 'Licencia Enterprise 2024', customer_id: 'c1', owner_id: 'u1', stage_id: 's4', amount: 25000, currency: 'EUR', status: 'won', created_at: '2023-10-01T10:00:00Z', closed_at: '2023-10-15T14:30:00Z' },
  { id: 'd2', title: 'Renovación Anual', customer_id: 'c2', owner_id: 'u2', stage_id: 's3', amount: 12000, currency: 'EUR', status: 'open', created_at: '2023-11-01T09:00:00Z', expected_close_date: '2023-11-30' },
  { id: 'd3', title: 'Implementación Cloud', customer_id: 'c3', owner_id: 'u3', stage_id: 's1', amount: 35000, currency: 'EUR', status: 'open', created_at: '2024-01-15T09:00:00Z', expected_close_date: '2024-03-01' },
  { id: 'd4', title: 'Soporte Premium', customer_id: 'c4', owner_id: 'u1', stage_id: 's4', amount: 8000, currency: 'EUR', status: 'won', created_at: '2023-09-10T09:00:00Z', closed_at: '2023-09-20T10:00:00Z' },
  { id: 'd5', title: 'Migración de Datos', customer_id: 'c5', owner_id: 'u2', stage_id: 's5', amount: 18000, currency: 'EUR', status: 'lost', created_at: '2023-08-01T09:00:00Z', closed_at: '2023-08-15T10:00:00Z' },
  { id: 'd6', title: 'Expansión de Licencias', customer_id: 'c1', owner_id: 'u3', stage_id: 's2', amount: 15000, currency: 'EUR', status: 'open', created_at: '2024-02-01T09:00:00Z', expected_close_date: '2024-02-28' },
  { id: 'd7', title: 'Auditoría de Seguridad', customer_id: 'c2', owner_id: 'u1', stage_id: 's4', amount: 22000, currency: 'EUR', status: 'won', created_at: '2023-11-10T09:00:00Z', closed_at: '2023-11-25T10:00:00Z' },
  { id: 'd8', title: 'Desarrollo a Medida', customer_id: 'c3', owner_id: 'u2', stage_id: 's3', amount: 45000, currency: 'EUR', status: 'open', created_at: '2024-01-20T09:00:00Z', expected_close_date: '2024-03-15' },
  { id: 'd9', title: 'Consultoría Estratégica', customer_id: 'c4', owner_id: 'u3', stage_id: 's4', amount: 30000, currency: 'EUR', status: 'won', created_at: '2023-12-01T09:00:00Z', closed_at: '2023-12-15T10:00:00Z' },
  { id: 'd10', title: 'Renovación Q1', customer_id: 'c5', owner_id: 'u1', stage_id: 's1', amount: 10000, currency: 'EUR', status: 'open', created_at: '2024-02-10T09:00:00Z', expected_close_date: '2024-03-30' },
  { id: 'd11', title: 'Integración CRM', customer_id: 'c1', owner_id: 'u2', stage_id: 's4', amount: 28000, currency: 'EUR', status: 'won', created_at: '2023-10-20T09:00:00Z', closed_at: '2023-11-05T10:00:00Z' },
  { id: 'd12', title: 'Capacitación Equipo', customer_id: 'c2', owner_id: 'u3', stage_id: 's2', amount: 5000, currency: 'EUR', status: 'open', created_at: '2024-02-15T09:00:00Z', expected_close_date: '2024-03-10' },
  { id: 'd13', title: 'Licencia Básica', customer_id: 'c3', owner_id: 'u1', stage_id: 's5', amount: 3000, currency: 'EUR', status: 'lost', created_at: '2023-07-01T09:00:00Z', closed_at: '2023-07-10T10:00:00Z' },
  { id: 'd14', title: 'Soporte 24/7', customer_id: 'c4', owner_id: 'u2', stage_id: 's3', amount: 12000, currency: 'EUR', status: 'open', created_at: '2024-01-05T09:00:00Z', expected_close_date: '2024-02-20' },
  { id: 'd15', title: 'Actualización Sistema', customer_id: 'c5', owner_id: 'u3', stage_id: 's4', amount: 16000, currency: 'EUR', status: 'won', created_at: '2023-09-25T09:00:00Z', closed_at: '2023-10-10T10:00:00Z' },
  { id: 'd16', title: 'Plan Anual Pro', customer_id: 'c1', owner_id: 'u1', stage_id: 's1', amount: 20000, currency: 'EUR', status: 'open', created_at: '2024-02-18T09:00:00Z', expected_close_date: '2024-04-15' },
  { id: 'd17', title: 'Mantenimiento Preventivo', customer_id: 'c2', owner_id: 'u2', stage_id: 's4', amount: 9000, currency: 'EUR', status: 'won', created_at: '2023-11-20T09:00:00Z', closed_at: '2023-12-05T10:00:00Z' },
  { id: 'd18', title: 'Módulo Analítica', customer_id: 'c3', owner_id: 'u3', stage_id: 's2', amount: 14000, currency: 'EUR', status: 'open', created_at: '2024-02-20T09:00:00Z', expected_close_date: '2024-03-25' },
  { id: 'd19', title: 'Servicios Profesionales', customer_id: 'c4', owner_id: 'u1', stage_id: 's5', amount: 25000, currency: 'EUR', status: 'lost', created_at: '2023-06-15T09:00:00Z', closed_at: '2023-07-01T10:00:00Z' },
  { id: 'd20', title: 'Renovación Q2', customer_id: 'c5', owner_id: 'u2', stage_id: 's3', amount: 11000, currency: 'EUR', status: 'open', created_at: '2024-01-10T09:00:00Z', expected_close_date: '2024-02-28' },
  { id: 'd21', title: 'App Móvil Custom', customer_id: 'c1', owner_id: 'u3', stage_id: 's4', amount: 35000, currency: 'EUR', status: 'won', created_at: '2023-10-15T09:00:00Z', closed_at: '2023-11-15T10:00:00Z' },
  { id: 'd22', title: 'Integración ERP', customer_id: 'c2', owner_id: 'u1', stage_id: 's1', amount: 40000, currency: 'EUR', status: 'open', created_at: '2024-02-25T09:00:00Z', expected_close_date: '2024-04-30' },
  { id: 'd23', title: 'Ampliación Servidores', customer_id: 'c3', owner_id: 'u2', stage_id: 's4', amount: 18000, currency: 'EUR', status: 'won', created_at: '2023-12-10T09:00:00Z', closed_at: '2023-12-20T10:00:00Z' },
  { id: 'd24', title: 'Licencia Test', customer_id: 'c4', owner_id: 'u3', stage_id: 's5', amount: 2000, currency: 'EUR', status: 'lost', created_at: '2023-05-01T09:00:00Z', closed_at: '2023-05-10T10:00:00Z' },
  { id: 'd25', title: 'Campaña Marketing App', customer_id: 'c5', owner_id: 'u1', stage_id: 's3', amount: 22000, currency: 'EUR', status: 'open', created_at: '2024-01-25T09:00:00Z', expected_close_date: '2024-03-10' }
];
