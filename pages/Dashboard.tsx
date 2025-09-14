
import React from 'react';
import DashboardCard from '../components/DashboardCard';
import FinancialChart from '../components/FinancialChart';
import { MOCK_SAVINGS, MOCK_TRANSACTIONS } from '../constants';
import { BanknotesIcon, ChartBarIcon, ArrowTrendingUpIcon } from '../components/Icons';

const Dashboard: React.FC = () => {
  const totalSavings = MOCK_SAVINGS.principal + MOCK_SAVINGS.mandatory + MOCK_SAVINGS.voluntary;
  const lastSHU = 750000;
  const projectedSHU = 900000;

  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 md:hidden">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Simpanan" 
          value={formatCurrency(totalSavings)} 
          icon={BanknotesIcon}
          color="bg-green-500"
        />
        <DashboardCard 
          title="SHU Diterima (2023)" 
          value={formatCurrency(lastSHU)}
          icon={ChartBarIcon}
          color="bg-blue-500"
        />
        <DashboardCard 
          title="Proyeksi SHU (2024)" 
          value={formatCurrency(projectedSHU)}
          icon={ArrowTrendingUpIcon}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinancialChart />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaksi Terakhir</h3>
          <div className="space-y-4">
            {MOCK_TRANSACTIONS.map(tx => (
              <div key={tx.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">{tx.description}</p>
                  <p className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                </div>
                <p className={`font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(tx.amount))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
