import React, { useState, useEffect } from 'react';
import { MOCK_LOANS, MOCK_USER, MOCK_MEMBERS } from '../constants';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, InformationCircleIcon } from '../components/Icons';
import LoanDetail from '../components/LoanDetail';
import type { Loan, RepaymentInstallment } from '../types';

// Extend the Loan type for our application details
interface SubmittedLoan extends Loan {
  purpose: string;
  memberId: string;
  memberName: string;
}

const formatCurrency = (amount: number) => `Rp${amount.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const ANNUAL_INTEREST_RATE_PERCENT = 18;
const MONTHLY_INTEREST_RATE = ANNUAL_INTEREST_RATE_PERCENT / 12; // 1.5
const MONTHLY_INTEREST_RATE_DECIMAL = MONTHLY_INTEREST_RATE / 100; // 0.015

const calculateRepaymentSchedule = (amount: number, term: number, startDate: string): RepaymentInstallment[] => {
    const schedule: RepaymentInstallment[] = [];
    
    const i = MONTHLY_INTEREST_RATE_DECIMAL;
    const n = term;
    const p = amount;
    const monthlyPayment = p * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    
    let currentBalance = amount;

    if (!isFinite(monthlyPayment)) {
      const principalPerMonth = p / n;
      for (let j = 1; j <= n; j++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + j);
        schedule.push({
            dueDate: dueDate.toISOString().split('T')[0],
            principal: principalPerMonth,
            interest: 0,
            total: principalPerMonth,
            status: 'Upcoming',
        });
      }
      return schedule;
    }

    for (let i = 1; i <= term; i++) {
        const interest = currentBalance * MONTHLY_INTEREST_RATE_DECIMAL;
        const principal = monthlyPayment - interest;
        
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i);

        schedule.push({
            dueDate: dueDate.toISOString().split('T')[0],
            principal: principal,
            interest: interest,
            total: monthlyPayment,
            status: 'Upcoming',
        });
        currentBalance -= principal;
    }
    return schedule;
};


const ConfirmationView: React.FC<{ loan: SubmittedLoan, onBack: () => void }> = ({ loan, onBack }) => {
    return (
        <div>
            <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg flex items-center">
                <CheckCircleIcon className="h-6 w-6 mr-3 flex-shrink-0"/>
                <div>
                    <h4 className="font-bold">Pengajuan Terkirim!</h4>
                    <p className="text-sm">Pengajuan Anda sedang kami proses. Berikut adalah rincian dan estimasi jadwal angsuran Anda.</p>
                </div>
            </div>

            <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Nomor Anggota</span>
                    <span className="font-medium text-gray-800">{loan.memberId}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Nama Anggota</span>
                    <span className="font-medium text-gray-800">{loan.memberName}</span>
                </div>
                 <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Jumlah Pinjaman</span>
                    <span className="font-medium text-gray-800">{formatCurrency(loan.amount)}</span>
                </div>
                 <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Jangka Waktu</span>
                    <span className="font-medium text-gray-800">{loan.termMonths} Bulan</span>
                </div>
                 <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Tanggal Mulai</span>
                    <span className="font-medium text-gray-800">{new Date(loan.startDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                 <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Tujuan</span>
                    <span className="font-medium text-gray-800">{loan.purpose}</span>
                </div>
            </div>
            
            <h4 className="text-md font-semibold text-gray-700 mb-3">Estimasi Jadwal Angsuran</h4>
            <div className="overflow-x-auto max-h-60 border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tempo</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Pokok</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Bunga</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loan.repaymentSchedule?.map((item, index) => (
                            <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap">{new Date(item.dueDate).toLocaleDateString('id-ID')}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(item.principal)}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{formatCurrency(item.interest)}</td>
                                <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-800">{formatCurrency(item.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pt-6">
              <button onClick={onBack} className="w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary/90 transition-colors">
                Ajukan Pinjaman Lain
              </button>
            </div>
        </div>
    );
};


const Stepper: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["Detail Pinjaman", "Informasi Anggota", "Konfirmasi"];
    return (
        <div className="mb-8">
            <ol className="flex items-center w-full">
                {steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <li className={`flex items-center ${index + 1 <= currentStep ? 'text-primary' : 'text-gray-500'}`}>
                           <span className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                                {index + 1 < currentStep ? <CheckCircleIcon className="w-5 h-5"/> : index + 1}
                           </span>
                           <span className="ml-2 text-sm font-medium hidden sm:inline-flex">{step}</span>
                        </li>
                        {index < steps.length - 1 && (
                             <li className={`flex-auto border-t-2 transition-colors duration-500 mx-2 ${index + 1 < currentStep ? 'border-primary' : 'border-gray-200'}`}></li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </div>
    );
};

const Loans: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>(MOCK_LOANS);
  const [expandedLoanId, setExpandedLoanId] = useState<string | null>(null);
  
  // Form State
  const [currentStep, setCurrentStep] = useState(1);
  const [memberId, setMemberId] = useState(MOCK_USER.memberId);
  const [selectedMemberName, setSelectedMemberName] = useState(MOCK_USER.name);
  const [loanAmount, setLoanAmount] = useState('5000000');
  const [loanTerm, setLoanTerm] = useState('12');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [loanPurpose, setLoanPurpose] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [submittedLoanDetails, setSubmittedLoanDetails] = useState<SubmittedLoan | null>(null);

  // Calculated State
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const amount = parseFloat(loanAmount);
    const term = parseInt(loanTerm, 10);

    if (amount > 0 && term > 0) {
        const i = MONTHLY_INTEREST_RATE_DECIMAL;
        const n = term;
        const p = amount;
        const monthlyPaymentCalc = p * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        
        if (isFinite(monthlyPaymentCalc)) {
            setMonthlyPayment(monthlyPaymentCalc);
            const totalPayment = monthlyPaymentCalc * n;
            setTotalInterest(totalPayment - p);
        } else {
            setMonthlyPayment(p / n);
            setTotalInterest(0);
        }
    } else {
        setMonthlyPayment(0);
        setTotalInterest(0);
    }
  }, [loanAmount, loanTerm]);


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
  
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
        case 'memberId':
            return !value.trim() ? 'Anggota wajib dipilih.' : null;
        case 'loanAmount':
            const amount = parseFloat(value);
            if (!value || isNaN(amount) || amount < 500000) return 'Jumlah pinjaman minimal Rp500.000.';
            if (amount > 20000000) return 'Jumlah pinjaman maksimal Rp20.000.000.';
            return null;
        case 'startDate':
            if (!value) return 'Tanggal mulai wajib diisi.';
            if (new Date(value) < new Date(new Date().toDateString())) return 'Tanggal mulai tidak boleh di masa lalu.';
            return null;
        case 'loanPurpose':
            return !value.trim() ? 'Tujuan pinjaman wajib diisi.' : null;
        default:
            return null;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedMember = MOCK_MEMBERS.find(m => m.memberId === selectedId);
    setMemberId(selectedId);
    setSelectedMemberName(selectedMember ? selectedMember.name : '');
    
    // Clear error on valid selection
    const error = validateField('memberId', selectedId);
    setErrors(prev => ({ ...prev, memberId: error }));
  };

  const validateStep = (step: number): boolean => {
    let hasErrors = false;
    const currentErrors = { ...errors };

    if (step === 1) {
        const amountError = validateField('loanAmount', loanAmount);
        const purposeError = validateField('loanPurpose', loanPurpose);
        currentErrors.loanAmount = amountError;
        currentErrors.loanPurpose = purposeError;
        if (amountError || purposeError) hasErrors = true;
    } else if (step === 2) {
        const memberIdError = validateField('memberId', memberId);
        const startDateError = validateField('startDate', startDate);
        currentErrors.memberId = memberIdError;
        currentErrors.startDate = startDateError;
        if (memberIdError || startDateError) hasErrors = true;
    }
    
    setErrors(currentErrors);
    return !hasErrors;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
        setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) && !validateStep(2)) return;

    const amount = parseFloat(loanAmount);
    const term = parseInt(loanTerm, 10);
    const estimatedSchedule = calculateRepaymentSchedule(amount, term, startDate);
    
    const newLoanApplication: SubmittedLoan = {
        id: `APP-${Date.now()}`,
        amount,
        termMonths: term,
        interestRate: MONTHLY_INTEREST_RATE,
        startDate: startDate,
        status: 'Pending',
        remainingBalance: amount,
        repaymentSchedule: estimatedSchedule,
        purpose: loanPurpose,
        memberId: memberId,
        memberName: selectedMemberName,
    };

    setSubmittedLoanDetails(newLoanApplication);
  };

  const resetForm = () => {
    setSubmittedLoanDetails(null);
    setCurrentStep(1);
    setLoanAmount('5000000');
    setLoanTerm('12');
    setLoanPurpose('');
    setMemberId(MOCK_USER.memberId);
    setSelectedMemberName(MOCK_USER.name);
    setStartDate(new Date().toISOString().split('T')[0]);
    setErrors({});
  };

  const handleMarkAsPaid = (loanId: string, installmentIndex: number) => {
    setLoans(currentLoans => {
      const newLoans = currentLoans.map(loan => {
        if (loan.id === loanId && loan.repaymentSchedule?.[installmentIndex]?.status === 'Upcoming') {
          const installmentToPay = loan.repaymentSchedule[installmentIndex];
          const newSchedule = loan.repaymentSchedule.map((inst, idx) => 
            idx === installmentIndex ? { ...inst, status: 'Paid' as const } : inst
          );
          const newRemainingBalance = loan.remainingBalance - installmentToPay.principal;

          return {
            ...loan,
            repaymentSchedule: newSchedule,
            remainingBalance: newRemainingBalance < 0 ? 0 : newRemainingBalance,
          };
        }
        return loan;
      });
      return newLoans;
    });
    alert('Pembayaran berhasil dicatat!');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
            {submittedLoanDetails ? (
                <ConfirmationView loan={submittedLoanDetails} onBack={resetForm} />
            ) : (
                <>
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Ajukan Pinjaman Baru</h3>
                <Stepper currentStep={currentStep} />
                <form className="space-y-4" onSubmit={handleLoanSubmit} noValidate>
                    {/* Step 1: Loan Details */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="text-sm font-medium text-gray-600">Jumlah Pinjaman</label>
                                <div className="relative mt-1">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">Rp</span>
                                    </div>
                                    <input type="number" name="loanAmount" id="amount" className={`block w-full rounded-md border-gray-300 pl-8 pr-2 focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900 ${errors.loanAmount ? 'border-red-500' : ''}`} placeholder="5000000" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} onBlur={handleBlur} required step="100000" min="500000" max="20000000"/>
                                </div>
                                <input type="range" min="500000" max="20000000" step="100000" value={loanAmount || 500000} onChange={(e) => setLoanAmount(e.target.value)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-3 accent-primary"/>
                                {errors.loanAmount && <p className="mt-1 text-xs text-red-600">{errors.loanAmount}</p>}
                            </div>
                            <div>
                                <label htmlFor="term" className="text-sm font-medium text-gray-600">Jangka Waktu (Bulan)</label>
                                <select id="term" name="loanTerm" className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm bg-white text-gray-900" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} required>
                                    <option>6</option>
                                    <option>12</option>
                                    <option>18</option>
                                    <option>24</option>
                                </select>
                            </div>

                            <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg space-y-3">
                                <h4 className="text-md font-semibold text-gray-700 text-center">Estimasi Kalkulasi</h4>
                                <div className="border-t border-primary-200 pt-3">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-medium text-gray-600">Angsuran / Bulan</span>
                                        <span className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-medium text-gray-600">Total Bunga</span>
                                        <span className="text-lg font-semibold text-gray-800">{formatCurrency(totalInterest)}</span>
                                    </div>
                                </div>
                                <div className="relative group flex items-center justify-center pt-2">
                                    <p className="text-xs text-gray-500">
                                        Estimasi berdasarkan suku bunga {ANNUAL_INTEREST_RATE_PERCENT}% per tahun.
                                    </p>
                                    <InformationCircleIcon className="w-4 h-4 ml-1.5 text-gray-400 cursor-pointer" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 bg-gray-700 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-center shadow-lg">
                                        Suku bunga tahunan ini dibagi 12 untuk mendapatkan suku bunga bulanan, yang digunakan untuk menghitung porsi bunga dari angsuran Anda.
                                        <svg className="absolute text-gray-700 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xmlSpace="preserve">
                                            <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="purpose" className="text-sm font-medium text-gray-600">Tujuan Pinjaman</label>
                                <textarea id="purpose" name="loanPurpose" rows={3} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900 ${errors.loanPurpose ? 'border-red-500' : ''}`} placeholder="Contoh: Modal usaha, biaya pendidikan..." value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} onBlur={handleBlur} required></textarea>
                                {errors.loanPurpose && <p className="mt-1 text-xs text-red-600">{errors.loanPurpose}</p>}
                            </div>
                        </div>
                    )}
                    {/* Step 2: Member Information */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                             <div>
                                <label htmlFor="memberId" className="text-sm font-medium text-gray-600">Pilih Anggota</label>
                                <select 
                                    name="memberId" 
                                    id="memberId" 
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900 ${errors.memberId ? 'border-red-500' : ''}`} 
                                    value={memberId} 
                                    onChange={handleMemberChange}
                                    onBlur={handleBlur}
                                    required
                                >
                                    {MOCK_MEMBERS.map(member => (
                                    <option key={member.id} value={member.memberId}>
                                        {member.memberId} - {member.name}
                                    </option>
                                    ))}
                                </select>
                                {errors.memberId && <p className="mt-1 text-xs text-red-600">{errors.memberId}</p>}
                                {selectedMemberName && (
                                    <p className="mt-2 text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
                                        Nama Anggota: <span className="font-semibold">{selectedMemberName}</span>
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="startDate" className="text-sm font-medium text-gray-600">Tanggal Mulai Pinjaman</label>
                                <input type="date" name="startDate" id="startDate" className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white text-gray-900 ${errors.startDate ? 'border-red-500' : ''}`} value={startDate} onChange={(e) => setStartDate(e.target.value)} onBlur={handleBlur} required/>
                                {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
                            </div>
                        </div>
                    )}
                    {/* Step 3: Confirmation */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800">Ringkasan Pengajuan</h4>
                            <div className="space-y-2 text-sm border p-4 rounded-lg bg-gray-50">
                                <div className="flex justify-between"><span className="text-gray-500">Nomor Anggota</span><span className="font-medium text-gray-800">{memberId}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Nama Anggota</span><span className="font-medium text-gray-800">{selectedMemberName}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Jumlah Pinjaman</span><span className="font-medium text-gray-800">{formatCurrency(parseFloat(loanAmount))}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Jangka Waktu</span><span className="font-medium text-gray-800">{loanTerm} Bulan</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Tanggal Mulai</span><span className="font-medium text-gray-800">{new Date(startDate).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
                                <div className="flex justify-between text-right"><span className="text-gray-500 shrink-0 mr-4">Tujuan</span><span className="font-medium text-gray-800">{loanPurpose}</span></div>
                                <div className="flex justify-between pt-2 border-t mt-2"><span className="text-gray-500">Estimasi Angsuran</span><span className="font-bold text-primary">{formatCurrency(monthlyPayment)} / bulan</span></div>
                            </div>
                             <p className="text-xs text-gray-500">Dengan menekan tombol "Kirim Pengajuan", Anda menyetujui syarat dan ketentuan yang berlaku.</p>
                        </div>
                    )}
                    
                    <div className="pt-4 flex justify-between items-center">
                        {currentStep > 1 ? (
                             <button type="button" onClick={prevStep} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
                                Kembali
                            </button>
                        ) : <div />}
                       
                        {currentStep < 3 && (
                             <button type="button" onClick={nextStep} className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-secondary/90 transition-colors">
                                Lanjutkan
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button type="submit" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors">
                                Kirim Pengajuan
                            </button>
                        )}
                    </div>
                </form>
                </>
            )}
            </div>
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
                  {loans.map((loan) => (
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
                        {expandedLoanId === loan.id && (
                             <tr>
                                <td colSpan={5} className="p-0">
                                    <LoanDetail loan={loan} onMarkAsPaid={handleMarkAsPaid} />
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