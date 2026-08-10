import React from 'react';
import { ShieldCheck, Users, Building2, DollarSign, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ADMIN_STATS } from '../data/mockData';

export default function AdminDashboard({ bookings, listings }) {
  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={28} color="var(--color-teal)" /> Admin Control Center
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
            Platform metrics, user safety moderation, and transaction logs.
          </p>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>TOTAL USERS</span>
            <Users size={20} color="var(--color-primary)" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '4px' }}>{ADMIN_STATS.totalUsers}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700 }}>{ADMIN_STATS.usersGrowth} this month</span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>ACTIVE LISTINGS</span>
            <Building2 size={20} color="var(--color-teal)" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '4px' }}>{ADMIN_STATS.totalListings}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700 }}>{ADMIN_STATS.listingsGrowth} this month</span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>COMPLETED BOOKINGS</span>
            <CheckCircle size={20} color="var(--color-green)" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '4px' }}>{ADMIN_STATS.totalBookings}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700 }}>{ADMIN_STATS.bookingsGrowth} this month</span>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>PLATFORM REVENUE</span>
            <DollarSign size={20} color="var(--color-teal)" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginTop: '4px', color: 'var(--color-teal)' }}>{ADMIN_STATS.totalRevenue}</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700 }}>{ADMIN_STATS.revenueGrowth} this month</span>
        </div>
      </div>

      {/* Safety Reports & Recent Bookings Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }} className="admin-split">
        {/* Recent Bookings Table */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Platform Transactions</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.6rem' }}>BOOKING ID</th>
                  <th style={{ padding: '0.6rem' }}>GUEST</th>
                  <th style={{ padding: '0.6rem' }}>HOST</th>
                  <th style={{ padding: '0.6rem' }}>AMOUNT</th>
                  <th style={{ padding: '0.6rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '0.75rem 0.6rem', fontWeight: 800, color: 'var(--color-teal)' }}>{b.id}</td>
                    <td style={{ padding: '0.75rem 0.6rem' }}>{b.guestName}</td>
                    <td style={{ padding: '0.75rem 0.6rem' }}>{b.hostName}</td>
                    <td style={{ padding: '0.75rem 0.6rem', fontWeight: 800 }}>${b.totalPrice.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem 0.6rem' }}>
                      <span className="badge-verified" style={{ fontSize: '0.75rem' }}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety & Moderation Panel */}
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={20} color="var(--color-red)" /> Safety Moderation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
              <span>Open Safety Reports</span>
              <strong style={{ color: 'var(--color-red)' }}>{ADMIN_STATS.openReports}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
              <span>Pending Identity Reviews</span>
              <strong>{ADMIN_STATS.pendingReviews}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}>
              <span>Flagged Listings</span>
              <strong>{ADMIN_STATS.flaggedListings}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
