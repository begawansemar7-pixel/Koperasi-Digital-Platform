import React from 'react';
import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import FinancialChart from '../components/FinancialChart';
import { 
    MOCK_SAVINGS, 
    MOCK_TRANSACTIONS, 
    MOCK_LOYALTY_TRANSACTIONS,
    SAVINGS_ALLOCATION_PERCENTAGE,
    RUPIAH_PER_SHU_POINT,
    MOCK_LOANS
} from '../constants';
import { BanknotesIcon, ChartBarIcon, ArrowTrendingUpIcon, StarIcon, CreditCardIcon } from '../components/Icons';

const Dashboard: React.FC = () => {
  const totalSavings = MOCK_SAVINGS.principal + MOCK_SAVINGS.mandatory + MOCK_SAVINGS.voluntary;
  
  // Get SHU points directly from the transaction list for consistency
  const lastSHUTransaction = MOCK_LOYALTY_TRANSACTIONS.find(tx => tx.description.includes('SHU'));
  const lastSHUPoints = lastSHUTransaction ? lastSHUTransaction.points : 0;
  
  const projectedSHURupiah = 900000;
  const projectedSHUPoints = Math.floor(projectedSHURupiah / RUPIAH_PER_SHU_POINT);
  
  // Calculate shopping points for consistency with Loyalty page
  const totalEarned = MOCK_LOYALTY_TRANSACTIONS
    .filter(tx => tx.type === 'earned')
    .reduce((sum, tx) => sum + tx.points, 0);

  const totalRedeemedForRewards = MOCK_LOYALTY_TRANSACTIONS
    .filter(tx => tx.type === 'redeemed')
    .reduce((sum, tx) => sum + tx.points, 0); // This is a negative value

  // Calculate the earned portion for shopping points
  const shoppingPointsEarned = Math.floor(totalEarned * (1 - SAVINGS_ALLOCATION_PERCENTAGE));
  
  // Final balance cannot be negative
  const shoppingPoints = Math.max(0, shoppingPointsEarned + totalRedeemedForRewards);

  // Loan calculations
  const activeLoans = MOCK_LOANS.filter(loan => loan.status === 'Approved');
  const totalLoanAmount = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemainingBalance = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);

  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;
  const formatPoints = (points: number) => `${points.toLocaleString('id-ID')} Poin`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Simpanan" 
          value={formatCurrency(totalSavings)} 
          icon={BanknotesIcon}
          color="bg-green-500"
        />
        <DashboardCard 
          title="Poin SHU Diterima (2023)" 
          value={formatPoints(lastSHUPoints)}
          icon={ChartBarIcon}
          color="bg-blue-500"
        />
        <DashboardCard 
          title="Proyeksi Poin SHU (2024)" 
          value={formatPoints(projectedSHUPoints)}
          icon={ArrowTrendingUpIcon}
          color="bg-amber-500"
        />
         <DashboardCard 
          title="Poin Belanja Anda" 
          value={formatPoints(shoppingPoints)}
          icon={StarIcon}
          color="bg-purple-500"
        />
      </div>

      <div className="space-y-6">
        <FinancialChart />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaksi Terakhir</h3>
            <div className="space-y-4">
              {MOCK_TRANSACTIONS.slice(0, 5).map(tx => (
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
          
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Pinjaman Saya</h3>
                <CreditCardIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="space-y-3 text-sm flex-grow">
                <div className="flex justify-between">
                    <span className="text-gray-500">Total Pinjaman</span>
                    <span className="font-medium text-gray-800">{formatCurrency(totalLoanAmount)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Sisa Saldo</span>
                    <span className="font-medium text-gray-800">{formatCurrency(totalRemainingBalance)}</span>
                </div>
            </div>
            <Link to="/loans" className="mt-6 block w-full text-center py-2 px-4 bg-primary-50 text-primary font-semibold rounded-lg hover:bg-primary-100 transition-colors">
                Lihat Detail Pinjaman &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;