import React, { useState } from 'react';
import { MOCK_LOANS } from '../constants';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon } from '../components/Icons';
import type { RepaymentInstallment } from '../types';


const RepaymentSchedule: React.FC<{ schedule: RepaymentInstallment[] }> = ({ schedule }) => {
    const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;
    const getStatusClass = (status: string) => status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

    return (
        <div className="p-4 bg-gray-50">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Jadwal Angsuran</h4>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tgl. Jatuh Tempo</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pokok</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bunga</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {schedule.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{new Date(item.dueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(item.principal)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(item.interest)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">{formatCurrency(item.total)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                        {item.status === 'Paid' ? 'Lunas' : 'Belum Lunas'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const Loans: React.FC = () => {
  const [expandedLoanId, setExpandedLoanId] = useState<string | null>(null);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('12');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid Off': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRowClick = (loanId: string) => {
    setExpandedLoanId(expandedLoanId === loanId ? null : loanId);
  };

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend.
    // For this demo, we'll just show a success message.
    setIsSubmitted(true);
    setLoanAmount('');
    setLoanTerm('12');
    setLoanPurpose('');

    setTimeout(() => {
        setIsSubmitted(false);
    }, 4000);
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Pinjaman & Pembiayaan</h1>
        <p className="text-gray-500 mt-1">Ajukan pinjaman dan lihat riwayat pembiayaan Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Ajukan Pinjaman Baru</h3>
           {isSubmitted && (
            <div className="mb-4 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-3"/>
                <p className="text-sm font-medium">Pengajuan pinjaman Anda telah berhasil dikirim!</p>
            </div>
          )}
          <form className="space-y-4" onSubmit={handleLoanSubmit}>
            <div>
              <label htmlFor="amount" className="text-sm font-medium text-gray-600">Jumlah Pinjaman</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input 
                    type="number" 
                    name="amount" 
                    id="amount" 
                    className="block w-full rounded-md border-gray-300 pl-8 pr-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                    placeholder="0"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    required
                />
              </div>
            </div>
            <div>
              <label htmlFor="term" className="text-sm font-medium text-gray-600">Jangka Waktu (Bulan)</label>
              <select 
                id="term" 
                name="term" 
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                required
              >
                <option>6</option>
                <option>12</option>
                <option>18</option>
                <option>24</option>
              </select>
            </div>
            <div>
              <label htmlFor="purpose" className="text-sm font-medium text-gray-600">Tujuan Pinjaman</label>
              <textarea 
                id="purpose" 
                name="purpose" 
                rows={3} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" 
                placeholder="Contoh: Modal usaha, biaya pendidikan..."
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                Kirim Pengajuan
              </button>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
           <h3 className="text-xl font-semibold text-gray-800 mb-6">Riwayat Pinjaman</h3>
           <div className="overflow-x-auto">
             <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sisa Saldo</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3"><span className="sr-only">Detail</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_LOANS.map((loan) => (
                    <React.Fragment key={loan.id}>
                        <tr onClick={() => loan.repaymentSchedule && handleRowClick(loan.id)} className={`${loan.repaymentSchedule ? 'cursor-pointer hover:bg-gray-50' : ''}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(loan.amount)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(loan.startDate).toLocaleDateString('id-ID')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(loan.remainingBalance)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(loan.status)}`}>
                                {loan.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {loan.repaymentSchedule && (
                                    expandedLoanId === loan.id ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>
                                )}
                            </td>
                        </tr>
                        {expandedLoanId === loan.id && loan.repaymentSchedule && (
                             <tr>
                                <td colSpan={5} className="p-0">
                                    <RepaymentSchedule schedule={loan.repaymentSchedule} />
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                  ))}
                </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;