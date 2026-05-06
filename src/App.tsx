import React, { useMemo, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line
} from 'recharts';
import { 
  LayoutDashboard, Users, Calendar, BarChart3, Settings, HelpCircle, LogOut,
  Search, Bell, Mail, Plus, ArrowUpRight, ArrowDownRight, Briefcase, TrendingUp, Filter
} from 'lucide-react';

import { mockDeals, mockStages, mockUsers } from './data/mockData';
import { ChatWidget } from './components/ChatWidget';

function App() {
  const [sellerFilter, setSellerFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredDeals = useMemo(() => {
    return mockDeals.filter(deal => {
      if (sellerFilter && deal.owner_id !== sellerFilter) return false;
      if (dateFilter) {
        const dealYear = new Date(deal.created_at).getFullYear().toString();
        if (dateFilter !== dealYear) return false;
      }
      return true;
    });
  }, [sellerFilter, dateFilter]);

  // KPI Calculations
  const { totalRevenue, activeDeals, winRate, avgDealSize, totalClosed } = useMemo(() => {
    let revenue = 0;
    let active = 0;
    let wonCount = 0;
    let lostCount = 0;

    filteredDeals.forEach(deal => {
      if (deal.status === 'won') {
        revenue += deal.amount;
        wonCount++;
      } else if (deal.status === 'lost') {
        lostCount++;
      } else if (deal.status === 'open') {
        active++;
      }
    });

    const closed = wonCount + lostCount;
    const rate = closed > 0 ? (wonCount / closed) * 100 : 0;
    const avgSize = wonCount > 0 ? revenue / wonCount : 0;

    return {
      totalRevenue: revenue,
      activeDeals: active,
      winRate: rate,
      avgDealSize: avgSize,
      totalClosed: closed
    };
  }, [filteredDeals]);

  // Data for Bar Chart: Revenue by Stage
  const revenueByStage = useMemo(() => {
    const stageMap = new Map<string, { name: string, value: number, order: number }>();
    
    mockStages.forEach(stage => {
      stageMap.set(stage.id, { name: stage.name, value: 0, order: stage.display_order });
    });

    filteredDeals.forEach(deal => {
      if (stageMap.has(deal.stage_id)) {
        const current = stageMap.get(deal.stage_id)!;
        current.value += deal.amount;
      }
    });

    return Array.from(stageMap.values()).sort((a, b) => a.order - b.order);
  }, [filteredDeals]);

  // Data for Line Chart: Sales Evolution (monthly based on created_at for simplicity)
  const salesEvolution = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataMap = new Map<string, number>();

    filteredDeals.forEach(deal => {
      if (deal.status === 'won' && deal.closed_at) {
        const date = new Date(deal.closed_at);
        const key = `${months[date.getMonth()]} ${date.getFullYear().toString().substring(2)}`;
        dataMap.set(key, (dataMap.get(key) || 0) + deal.amount);
      }
    });

    // Sort chronologically (simple approach for mock data)
    return Array.from(dataMap.entries())
      .map(([name, value]) => ({ name, value }))
      .reverse(); // Simplified sorting assuming newest first in mock data
  }, [filteredDeals]);

  // Top Deals
  const topDeals = useMemo(() => {
    return [...filteredDeals]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 4);
  }, [filteredDeals]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
  };

  return (
    <React.Fragment>
      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon">
              <LayoutDashboard size={20} />
            </div>
            <span>CRM Dash</span>
          </div>

          <div className="nav-menu">
            <div className="nav-title">Menu</div>
            <a href="#" className="nav-item active">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item">
              <Briefcase size={20} />
              <span>Deals</span>
            </a>
            <a href="#" className="nav-item">
              <Calendar size={20} />
              <span>Calendar</span>
            </a>
            <a href="#" className="nav-item">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </a>
            <a href="#" className="nav-item">
              <Users size={20} />
              <span>Team</span>
            </a>
          </div>

          <div className="nav-menu" style={{ marginTop: 'auto' }}>
            <div className="nav-title">General</div>
            <a href="#" className="nav-item">
              <Settings size={20} />
              <span>Settings</span>
            </a>
            <a href="#" className="nav-item">
              <HelpCircle size={20} />
              <span>Help</span>
            </a>
            <a href="#" className="nav-item">
              <LogOut size={20} />
              <span>Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Header */}
          <header className="header">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search tasks, deals, users..." />
            </div>

            <div className="header-actions">
              <button className="icon-btn"><Mail size={18} /></button>
              <button className="icon-btn"><Bell size={18} /></button>
              <div className="user-profile">
                <img src={mockUsers[0].avatar_url} alt="User" className="avatar" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{mockUsers[0].full_name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Sales Manager</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">Overview of your team's performance and revenue.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-outline">Import Data</button>
              <button className="btn btn-primary"><Plus size={18} /> Add Deal</button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="filter-group">
              <Filter size={18} color="var(--text-secondary)" />
              <span className="filter-label">Filtros:</span>
            </div>
            
            <div className="filter-group">
              <select 
                className="filter-control"
                value={sellerFilter}
                onChange={(e) => setSellerFilter(e.target.value)}
              >
                <option value="">Todos los vendedores</option>
                {mockUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.full_name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <select 
                className="filter-control"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="">Todo el tiempo</option>
                <option value="2024">Año 2024</option>
                <option value="2023">Año 2023</option>
              </select>
            </div>
          </div>

          {/* KPIs */}
          <div className="kpi-grid">
            <div className="kpi-card highlight">
              <div className="kpi-header">
                <span className="kpi-title">Total Revenue</span>
                <div className="kpi-icon-wrapper"><ArrowUpRight size={18} /></div>
              </div>
              <div className="kpi-value">{formatCurrency(totalRevenue)}</div>
              <div className="kpi-trend">
                <TrendingUp size={14} className="trend-up" />
                <span className="trend-up" style={{ fontWeight: 500 }}>+12%</span>
                <span style={{ opacity: 0.8 }}>vs last month</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Active Deals</span>
                <div className="kpi-icon-wrapper" style={{ backgroundColor: '#DBEAFE', color: 'var(--accent-blue)' }}><Briefcase size={18} /></div>
              </div>
              <div className="kpi-value">{activeDeals}</div>
              <div className="kpi-trend">
                <ArrowUpRight size={14} className="trend-up" />
                <span className="trend-up" style={{ fontWeight: 500 }}>+4</span>
                <span style={{ color: 'var(--text-secondary)' }}>new this week</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Win Rate</span>
                <div className="kpi-icon-wrapper" style={{ backgroundColor: 'var(--accent-light-green)', color: 'var(--accent-dark-green)' }}><BarChart3 size={18} /></div>
              </div>
              <div className="kpi-value">{winRate.toFixed(1)}%</div>
              <div className="kpi-trend">
                <span style={{ color: 'var(--text-secondary)' }}>Based on {totalClosed} closed deals</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-header">
                <span className="kpi-title">Avg Deal Size</span>
                <div className="kpi-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}><TrendingUp size={18} /></div>
              </div>
              <div className="kpi-value">{formatCurrency(avgDealSize)}</div>
              <div className="kpi-trend">
                <ArrowDownRight size={14} className="trend-down" />
                <span className="trend-down" style={{ fontWeight: 500 }}>-2%</span>
                <span style={{ color: 'var(--text-secondary)' }}>vs last month</span>
              </div>
            </div>
          </div>

          {/* Charts & Lists */}
          <div className="charts-grid">
            <div className="chart-card">
              <h2 className="card-title">Revenue by Pipeline Stage</h2>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByStage} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)' }} dy={10} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'var(--text-secondary)' }}
                      tickFormatter={(value) => `€${value / 1000}k`}
                    />
                    <Tooltip 
                      cursor={{ fill: '#F3F4F6' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-card)' }}
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                      {
                        revenueByStage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.name === 'Closed Won' ? 'var(--accent-green)' : 
                            entry.name === 'Negotiation' ? 'var(--accent-orange)' : 
                            entry.name === 'Closed Lost' ? '#EF4444' :
                            'var(--accent-dark-green)'
                          } />
                        ))
                      }
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="chart-card">
                <h2 className="card-title">Sales Evolution</h2>
                <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesEvolution}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-card)' }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Line type="monotone" dataKey="value" stroke="var(--accent-blue)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="recent-deals-card" style={{ flex: 1 }}>
                <div className="deals-header">
                  <h2 className="card-title" style={{ marginBottom: 0 }}>Recent Deals</h2>
                  <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.85rem' }}>View All</button>
                </div>
                <div className="deals-list">
                  {topDeals.map(deal => (
                    <div className="deal-item" key={deal.id}>
                      <div className="deal-info">
                        <div className="deal-icon" style={{ 
                          backgroundColor: deal.status === 'won' ? 'var(--accent-light-green)' : deal.status === 'lost' ? '#FEE2E2' : '#F3F4F6',
                          color: deal.status === 'won' ? 'var(--accent-dark-green)' : deal.status === 'lost' ? '#DC2626' : 'var(--text-secondary)'
                        }}>
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <div className="deal-title">{deal.title}</div>
                          <div className="deal-subtitle">
                            {mockUsers.find(u => u.id === deal.owner_id)?.full_name} • 
                            {new Date(deal.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="deal-amount">{formatCurrency(deal.amount)}</div>
                        <div className={`deal-status status-${deal.status}`}>
                          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Chat Widget */}
        <ChatWidget />
      </div>
    </React.Fragment>
  );
}

export default App;
