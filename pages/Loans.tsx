import React, { useState } from 'react';
import { MOCK_LOANS } from '../constants';
import type { Loan, RepaymentInstallment } from '../types';
import LoanDetail from '../components/LoanDetail';
import NewLoanModal from '../components/NewLoanModal';
import { ChevronDownIcon, ChevronUpIcon, InformationCircleIcon, CheckCircleIcon, XCircleIcon, CreditCardIcon } from '../components/Icons';

const formatCurrency = (amount: number) => `Rp${Math.round(amount).toLocaleString('id-ID')}`;

const getStatusStyles = (status: Loan['status']) => {
    switch (status) {
        case 'Approved': return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <InformationCircleIcon className="w-5 h-5 mr-1" /> };
        case 'Paid Off': return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircleIcon className="w-5 h-5 mr-1" /> };
        case 'Pending': return { bg: 'bg-amber-100', text: 'text-amber-800', icon: <InformationCircleIcon className="w-5 h-5 mr-1" /> };
        case 'Rejected': return { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircleIcon className="w-5 h-5 mr-1" /> };
        default: return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <InformationCircleIcon className="w-5 h-5 mr-1" /> };
    }
};

const Loans: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>(MOCK_LOANS);
    const [expandedLoanId, setExpandedLoanId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const activeLoans = loans.filter(loan => loan.status === 'Approved');
    const totalActiveLoanAmount = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalRemainingBalance = activeLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);

    const handleToggleDetail = (loanId: string) => {
        setExpandedLoanId(prevId => (prevId === loanId ? null : loanId));
    };

    const handleMarkAsPaid = (loanId: string, installmentIndex: number) => {
        if (!window.confirm('Apakah Anda yakin ingin menandai angsuran ini sebagai lunas?')) return;
        
        setLoans(prevLoans => {
            return prevLoans.map(loan => {
                if (loan.id === loanId && loan.repaymentSchedule) {
                    const updatedSchedule = loan.repaymentSchedule.map((inst, index): RepaymentInstallment => 
                        index === installmentIndex ? { ...inst, status: 'Paid' } : inst
                    );
                    const installment = loan.repaymentSchedule[installmentIndex];

                    if (installment && installment.status === 'Upcoming') {
                        const newRemainingBalance = loan.remainingBalance - installment.principal;
                        const isPaidOff = newRemainingBalance <= 0 && updatedSchedule.every(i => i.status === 'Paid');
                        
                        return {
                            ...loan,
                            remainingBalance: Math.max(0, newRemainingBalance),
                            repaymentSchedule: updatedSchedule,
                            status: isPaidOff ? 'Paid Off' : loan.status,
                        };
                    }
                }
                return loan;
            });
        });
    };
    
    const handleApplyForLoan = (amount: number, term: number) => {
        const newLoan: Loan = {
            id: `LOAN${Date.now()}`,
            amount,
            interestRate: 1.5,
            termMonths: term,
            startDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
            remainingBalance: amount,
        };
        setLoans(prevLoans => [newLoan, ...prevLoans]);
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Ringkasan Pinjaman Anda</h2>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
                             <p>Total Pinjaman Aktif: <span className="font-semibold text-gray-800">{formatCurrency(totalActiveLoanAmount)}</span></p>
                             <p>Total Sisa Tagihan: <span className="font-semibold text-red-600">{formatCurrency(totalRemainingBalance)}</span></p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 sm:mt-0 w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors"
                    >
                        Ajukan Pinjaman Baru
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 px-2">Daftar Pinjaman</h3>
                {loans.length > 0 ? (
                    loans.map(loan => {
                        const statusStyle = getStatusStyles(loan.status);
                        const isExpanded = expandedLoanId === loan.id;

                        return (
                            <div key={loan.id} className="bg-white rounded-2xl shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                                <button onClick={() => handleToggleDetail(loan.id)} className="w-full text-left p-6 flex justify-between items-center">
                                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500">ID Pinjaman</p>
                                            <p className="font-semibold text-gray-700">{loan.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Jumlah Pinjaman</p>
                                            <p className="font-semibold text-gray-700">{formatCurrency(loan.amount)}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-xs text-gray-500">Sisa Tagihan</p>
                                            <p className="font-semibold text-gray-700">{formatCurrency(loan.remainingBalance)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Status</p>
                                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                                                {statusStyle.icon}
                                                {loan.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        {isExpanded ? <ChevronUpIcon className="w-6 h-6 text-gray-500" /> : <ChevronDownIcon className="w-6 h-6 text-gray-500" />}
                                    </div>
                                </button>
                                {isExpanded && (
                                    <LoanDetail loan={loan} onMarkAsPaid={handleMarkAsPaid} />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-8 text-center border-2 border-dashed border-gray-200">
                        <CreditCardIcon className="w-16 h-16 mx-auto text-gray-300" />
                        <h4 className="mt-4 text-xl font-semibold text-gray-700">Anda Belum Memiliki Pinjaman</h4>
                        <p className="mt-2 text-gray-500">Ajukan pinjaman pertama Anda untuk modal usaha, pendidikan, atau kebutuhan lainnya.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors"
                        >
                            Ajukan Pinjaman Pertama Anda
                        </button>
                    </div>
                )}
            </div>
            <NewLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onApply={handleApplyForLoan} />
        </div>
    );
};

export default Loans;