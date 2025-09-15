import React from 'react';
import type { Loan, RepaymentInstallment } from '../types';

const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`;

interface RepaymentScheduleTableProps {
    schedule: RepaymentInstallment[];
    loanId: string;
    onMarkAsPaid: (loanId: string, installmentIndex: number) => void;
}

const RepaymentScheduleTable: React.FC<RepaymentScheduleTableProps> = ({ schedule, loanId, onMarkAsPaid }) => {
    const getStatusClass = (status: string) => status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

    return (
        <div>
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
                            <tr 
                                key={index} 
                                onClick={() => item.status === 'Upcoming' && onMarkAsPaid(loanId, index)}
                                className={item.status === 'Upcoming' ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                            >
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{new Date(item.dueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(item.principal)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{formatCurrency(item.interest)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-800">{formatCurrency(item.total)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                        {item.status === 'Paid' ? 'Lunas' : 'Akan Datang'}
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

interface LoanDetailProps {
    loan: Loan;
    onMarkAsPaid: (loanId: string, installmentIndex: number) => void;
}

const LoanDetail: React.FC<LoanDetailProps> = ({ loan, onMarkAsPaid }) => {
    if (!loan.repaymentSchedule) {
        return (
             <div className="p-4 bg-gray-50 text-center text-gray-500">
                Jadwal pembayaran tidak tersedia untuk pinjaman ini.
            </div>
        );
    }
    
    const paidAmount = loan.amount - loan.remainingBalance;
    const progressPercentage = loan.amount > 0 ? (paidAmount / loan.amount) * 100 : 0;

    return (
        <div className="p-6 bg-gray-50 border-t-4 border-primary-100">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
                <div>
                    <p className="text-sm text-gray-500">Total Pinjaman</p>
                    <p className="font-semibold text-gray-800 text-lg">{formatCurrency(loan.amount)}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-500">Suku Bunga</p>
                    <p className="font-semibold text-gray-800 text-lg">{loan.interestRate}% / bln</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-500">Jangka Waktu</p>
                    <p className="font-semibold text-gray-800 text-lg">{loan.termMonths} Bulan</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-500">Tanggal Mulai</p>
                    <p className="font-semibold text-gray-800 text-lg">{new Date(loan.startDate).toLocaleDateString('id-ID')}</p>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-gray-700">Progress Pelunasan</span>
                    <span className="text-sm font-medium text-primary">{`${Math.round(progressPercentage)}%`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                        className="bg-primary h-4 rounded-full transition-all duration-500" 
                        style={{ width: `${progressPercentage}%` }}
                        aria-valuenow={progressPercentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                        aria-label="Loan repayment progress"
                    ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>Terbayar: {formatCurrency(paidAmount)}</span>
                    <span>Total: {formatCurrency(loan.amount)}</span>
                </div>
            </div>

            <RepaymentScheduleTable schedule={loan.repaymentSchedule} loanId={loan.id} onMarkAsPaid={onMarkAsPaid} />
        </div>
    );
};

export default LoanDetail;