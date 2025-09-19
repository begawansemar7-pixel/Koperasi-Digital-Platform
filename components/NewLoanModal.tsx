import React, { useState, useEffect } from 'react';
import { MOCK_USER } from '../constants';
import { InformationCircleIcon, XMarkIcon } from './Icons';

const formatCurrency = (amount: number) => `Rp${Math.round(amount).toLocaleString('id-ID')}`;

interface LoanFormData {
    amount: number;
    term: number;
    phone: string;
    address: string;
    loanPurpose: string;
    purposeDetails: string;
    agreement: boolean;
}

interface FormErrors {
    amount?: string;
    term?: string;
    phone?: string;
    address?: string;
    loanPurpose?: string;
    purposeDetails?: string;
    agreement?: string;
}

interface NewLoanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (amount: number, term: number) => void;
}

const NewLoanModal: React.FC<NewLoanModalProps> = ({ isOpen, onClose, onApply }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState<LoanFormData>({
        amount: 1000000,
        term: 12,
        phone: MOCK_USER.phone,
        address: MOCK_USER.address,
        loanPurpose: '',
        purposeDetails: '',
        agreement: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    const validate = (data: LoanFormData): FormErrors => {
        const newErrors: FormErrors = {};
        if (data.amount < 500000) newErrors.amount = "Jumlah pinjaman minimal Rp500.000.";
        if (data.term < 3 || data.term > 36) newErrors.term = "Jangka waktu harus antara 3 dan 36 bulan.";
        if (!/^08\d{8,11}$/.test(data.phone)) newErrors.phone = "Format nomor telepon tidak valid (contoh: 081234567890).";
        if (data.address.trim().length < 10) newErrors.address = "Alamat minimal 10 karakter.";
        if (!data.loanPurpose) newErrors.loanPurpose = "Tujuan pinjaman harus dipilih.";
        if (data.loanPurpose === 'Lainnya' && !data.purposeDetails.trim()) newErrors.purposeDetails = "Jelaskan tujuan lain Anda.";
        if (!data.agreement) newErrors.agreement = "Anda harus menyetujui syarat dan ketentuan.";
        return newErrors;
    };

    const isStepValid = (step: number): boolean => {
        const currentErrors = validate(formData);
        if (step === 1) return !currentErrors.amount && !currentErrors.term;
        if (step === 2) return !currentErrors.phone && !currentErrors.address;
        if (step === 3) return !currentErrors.loanPurpose && !currentErrors.purposeDetails && !currentErrors.agreement;
        return true; // Step 4 is review only
    };

    const isFormValid = (): boolean => {
        return Object.keys(validate(formData)).length === 0;
    }

    useEffect(() => {
        // Define loan parameters from the form state
        const principal = formData.amount;
        const numberOfPayments = formData.term;
        const monthlyInterestRate = 0.015; // 1.5% fixed monthly interest rate

        // Reset calculations if inputs are below the valid threshold
        if (principal < 500000 || numberOfPayments <= 0) {
            setMonthlyPayment(0);
            setTotalInterest(0);
            return;
        }

        // Calculate using the standard formula for an amortized loan (annuity)
        // M = P * [i(1+i)^n] / [(1+i)^n - 1]
        const rateFactor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const calculatedMonthlyPayment = (principal * monthlyInterestRate * rateFactor) / (rateFactor - 1);

        // Robustness check: Ensure the result is a finite number before updating state.
        // This prevents displaying NaN or Infinity in case of unexpected calculation issues.
        if (isFinite(calculatedMonthlyPayment)) {
            const totalPayment = calculatedMonthlyPayment * numberOfPayments;
            const calculatedTotalInterest = totalPayment - principal;

            setMonthlyPayment(calculatedMonthlyPayment);
            setTotalInterest(calculatedTotalInterest);
        } else {
            // Fallback in the unlikely event of a calculation error
            setMonthlyPayment(0);
            setTotalInterest(0);
        }
    }, [formData.amount, formData.term]);
    
    useEffect(() => {
        if (Object.keys(touched).length > 0) {
            setErrors(validate(formData));
        }
    }, [formData, touched]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'number' || type === 'range' ? Number(value) : value);
        setFormData(prev => ({ ...prev, [name]: finalValue }));
        if (touched[name]) {
             setErrors(validate({ ...formData, [name]: finalValue }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(validate(formData));
    };

    const handleNext = () => {
        const fieldsForStep: (keyof LoanFormData)[] = {
            1: ['amount', 'term'],
            2: ['phone', 'address'],
            3: ['loanPurpose', 'agreement', 'purposeDetails'],
        }[currentStep] as (keyof LoanFormData)[] || [];
        
        const newTouched = {...touched};
        fieldsForStep.forEach(field => newTouched[field] = true);
        setTouched(newTouched);

        const currentErrors = validate(formData);
        const stepHasError = fieldsForStep.some(field => !!currentErrors[field]);
        
        if (!stepHasError) {
            setCurrentStep(prev => prev + 1);
        }
    };
    
    const handleBack = () => setCurrentStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            onApply(formData.amount, formData.term);
        } else {
            alert('Harap perbaiki error pada formulir.');
        }
    };

    const renderFormField = (name: keyof LoanFormData, label: string, options: { type?: string; component?: 'textarea' | 'select', children?: React.ReactNode }) => {
        const showError = touched[name] && errors[name];
        const showSuccess = touched[name] && !errors[name];
        const inputClasses = `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors bg-white text-gray-900 ${
            showError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : showSuccess ? 'border-green-500 focus:ring-green-500 focus:border-green-500' 
            : 'border-gray-300 focus:ring-primary focus:border-primary'
        }`;

        let inputElement;
        if(options.component === 'textarea') {
            inputElement = <textarea id={name} name={name} value={String(formData[name])} onChange={handleChange} onBlur={handleBlur} className={inputClasses} rows={3} />;
        } else if (options.component === 'select') {
            inputElement = <select id={name} name={name} value={String(formData[name])} onChange={handleChange} onBlur={handleBlur} className={inputClasses}>{options.children}</select>;
        } else {
            inputElement = <input id={name} name={name} type={options.type || 'text'} value={String(formData[name])} onChange={handleChange} onBlur={handleBlur} className={inputClasses} />;
        }

        return (
            <div>
                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                <div className="mt-1">{inputElement}</div>
                {showError && <p className="mt-1 text-xs text-red-600">{errors[name]}</p>}
            </div>
        );
    };
    
    const stepTitles = ["Informasi Pinjaman", "Data Diri", "Tujuan & Persetujuan", "Konfirmasi"];

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="loanModalTitle"
        >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 id="loanModalTitle" className="text-xl font-bold text-gray-800">Form Pengajuan Pinjaman</h2>
                        <p className="text-sm text-gray-500">Langkah {currentStep} dari {totalSteps}: {stepTitles[currentStep-1]}</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200" aria-label="Tutup modal">
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="p-8 max-h-[60vh] overflow-y-auto">
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                {renderFormField('amount', 'Jumlah Pinjaman', { type: 'number' })}
                                <div>
                                    <label htmlFor="term" className="block text-sm font-medium text-gray-700">Jangka Waktu (Bulan)</label>
                                    <input id="term" name="term" type="range" value={formData.term} onChange={handleChange} onBlur={handleBlur} min="3" max="36" step="1" className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                                    <p className="text-sm text-gray-500 mt-1 text-center font-semibold">{formData.term} Bulan</p>
                                    {touched.term && errors.term && <p className="mt-1 text-xs text-red-600 text-center">{errors.term}</p>}
                                </div>
                                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                                    <p className="text-sm font-medium text-gray-600 text-center">Estimasi Angsuran Bulanan</p>
                                    <p className="text-4xl font-extrabold text-primary my-2 text-center">{formatCurrency(monthlyPayment)}</p>
                                    <div className="flex items-center justify-center text-xs text-gray-500 mt-4 group cursor-pointer">
                                        <p className="mr-1">Total Estimasi Bunga: {formatCurrency(totalInterest)}</p>
                                        <div className="relative">
                                            <InformationCircleIcon className="w-4 h-4" />
                                            <span className="absolute bottom-full mb-2 w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none left-1/2 -translate-x-1/2">
                                                Dihitung berdasarkan suku bunga 1.5% per bulan (18% APR).
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                                    <p className="mt-1 text-gray-800 font-semibold">{MOCK_USER.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Nomor Anggota</label>
                                    <p className="mt-1 text-gray-800 font-semibold">{MOCK_USER.memberId}</p>
                                </div>
                                {renderFormField('phone', 'Nomor Telepon', { type: 'tel' })}
                                {renderFormField('address', 'Alamat', { component: 'textarea' })}
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                {renderFormField('loanPurpose', 'Tujuan Pinjaman', { component: 'select', children: <>
                                    <option value="">-- Pilih Tujuan --</option>
                                    <option value="Modal Usaha">Modal Usaha</option>
                                    <option value="Pendidikan">Pendidikan</option>
                                    <option value="Kebutuhan Mendesak">Kebutuhan Mendesak</option>
                                    <option value="Lainnya">Lainnya</option>
                                </>})}
                                {formData.loanPurpose === 'Lainnya' && renderFormField('purposeDetails', 'Detail Tujuan Lainnya', { component: 'textarea' })}
                                <div className="flex items-start">
                                    <input id="agreement" name="agreement" type="checkbox" checked={formData.agreement} onChange={handleChange} onBlur={handleBlur} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"/>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="agreement" className="font-medium text-gray-700">Saya telah membaca dan menyetujui syarat & ketentuan pinjaman.</label>
                                        {touched.agreement && errors.agreement && <p className="mt-1 text-xs text-red-600">{errors.agreement}</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">Tinjau Pengajuan Anda</h3>
                                <div className="p-4 bg-gray-50 rounded-lg border divide-y">
                                    <div className="py-2 grid grid-cols-3"><span className="text-gray-500">Jumlah Pinjaman</span><span className="col-span-2 font-semibold">{formatCurrency(formData.amount)}</span></div>
                                    <div className="py-2 grid grid-cols-3"><span className="text-gray-500">Jangka Waktu</span><span className="col-span-2 font-semibold">{formData.term} Bulan</span></div>
                                    <div className="py-2 grid grid-cols-3"><span className="text-gray-500">Estimasi Angsuran</span><span className="col-span-2 font-semibold">{formatCurrency(monthlyPayment)} / bulan</span></div>
                                    <div className="py-2 grid grid-cols-3"><span className="text-gray-500">Tujuan</span><span className="col-span-2 font-semibold">{formData.loanPurpose}{formData.loanPurpose === 'Lainnya' && `: ${formData.purposeDetails}`}</span></div>
                                </div>
                                <p className="text-xs text-gray-500">Pastikan semua data yang Anda masukkan sudah benar sebelum mengirim pengajuan.</p>
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-between items-center">
                        <button type="button" onClick={handleBack} className={`px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 ${currentStep === 1 ? 'invisible' : ''}`}>Kembali</button>
                        
                        {currentStep < totalSteps && <button type="button" onClick={handleNext} disabled={!isStepValid(currentStep)} className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Lanjutkan</button>}
                        {currentStep === totalSteps && <button type="submit" disabled={!isFormValid()} className="px-6 py-2.5 text-sm font-semibold text-white bg-primary rounded-lg shadow-sm hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Kirim Pengajuan</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLoanModal;