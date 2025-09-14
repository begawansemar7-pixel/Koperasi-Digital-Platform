import React from 'react';
import { MOCK_SAVINGS, MOCK_TRANSACTIONS } from '../constants';
import SavingsChart from '../components/SavingsChart';

interface SavingCardProps {
    title: string;
    amount: number;
    description: string;
}

const SavingCard: React.FC<SavingCardProps> = ({ title, amount, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 my-2">Rp{amount.toLocaleString('id-ID')}</p>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
);


const Savings: React.FC = () => {
  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;
  const savingsTransactions = MOCK_TRANSACTIONS.filter(
      tx => tx.description.toLowerCase().includes('simpanan') || tx.description.toLowerCase().includes('iuran')
  );

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold text-gray-800">Rincian Simpanan</h1>
        <p className="text-gray-500 mt-1">Pantau perkembangan simpanan Anda di koperasi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
            <SavingCard 
                title="Simpanan Pokok" 
                amount={MOCK_SAVINGS.principal}
                description="Dibayar sekali saat mendaftar sebagai anggota."
            />
             <SavingCard 
                title="Simpanan Wajib" 
                amount={MOCK_SAVINGS.mandatory}
                description="Dibayar rutin setiap bulan untuk memperkuat modal."
            />
             <SavingCard 
                title="Simpanan Sukarela" 
                amount={MOCK_SAVINGS.voluntary}
                description="Tabungan fleksibel yang bisa disetor dan ditarik kapan saja."
            />
        </div>
        
        <div className="lg:col-span-2">
            <SavingsChart data={MOCK_SAVINGS} />
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
           <h3 className="text-xl font-semibold text-gray-800 mb-6">Riwayat Transaksi Simpanan</h3>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {savingsTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(tx.date).toLocaleDateString('id-ID')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           {tx.type === 'credit' ? 'Setoran' : 'Penarikan'}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(Math.abs(tx.amount))}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
    </div>
  );
};

export default Savings;