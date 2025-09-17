import React, { useState, useEffect } from 'react';
import DigitalMemberCard from '../components/DigitalMemberCard';
import { MOCK_USER } from '../constants';
import type { User } from '../types';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<User>(MOCK_USER);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: keyof User, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim().length < 3 ? 'Nama lengkap minimal 3 karakter.' : null;
      case 'memberId':
        return !/^KOP-MP-\d{4}-\d{3}$/.test(value) ? 'Format Nomor Anggota: KOP-MP-YYYY-XXX.' : null;
      case 'joinDate':
        return isNaN(new Date(value).getTime()) ? 'Tanggal tidak valid.' : null;
      case 'avatarUrl':
        try {
          new URL(value);
          return null;
        } catch (_) {
          return 'URL Avatar tidak valid.';
        }
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Format email tidak valid.' : null;
      case 'phone':
        return !/^08\d{8,11}$/.test(value) ? 'Format nomor telepon tidak valid (contoh: 081234567890).' : null;
      case 'address':
        return value.trim().length < 10 ? 'Alamat minimal 10 karakter.' : null;
      case 'bankAccount':
        return value.trim().length < 5 ? 'Rekening bank tidak boleh kosong.' : null;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Initial validation check on mount
    const initialErrors: { [key: string]: string | null } = {};
    let formIsValid = true;
    (Object.keys(formData) as Array<keyof User>).forEach(key => {
        const error = validateField(key, String(formData[key]));
        initialErrors[key] = error;
        if (error !== null) {
            formIsValid = false;
        }
    });
    setErrors(initialErrors);
    setIsFormValid(formIsValid);
  }, []);

  useEffect(() => {
    // Check form validity whenever errors change
    const formHasErrors = Object.values(errors).some(error => error !== null);
    setIsFormValid(!formHasErrors);
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof User;
    setFormData(prev => ({ ...prev, [key]: value }));
    const error = validateField(key, value);
    setErrors(prev => ({ ...prev, [key]: error }));
     if (!touched[key]) {
      setTouched(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const key = name as keyof User;
    setTouched(prev => ({ ...prev, [key]: true }));
    const error = validateField(key, value);
    setErrors(prev => ({ ...prev, [key]: error }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched to show errors on submit attempt
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (isFormValid) {
      // In a real app, you would send the data to a server
      alert('Perubahan berhasil disimpan!');
      // MOCK_USER = formData; // This would be an API call
    } else {
      alert('Harap perbaiki error pada form sebelum menyimpan.');
    }
  };

  const DetailRow: React.FC<{ label: string; name: keyof User; inputType?: string; isTextArea?: boolean }> = ({ label, name, inputType = 'text', isTextArea = false }) => {
    const showError = touched[name] && errors[name];
    const showSuccess = touched[name] && !errors[name];

    const inputClasses = `
      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors bg-white text-gray-900
      ${showError 
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
        : showSuccess
        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
        : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
      }
    `;

    return (
      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
        <dt className="text-sm font-medium text-gray-600 self-center">{label}</dt>
        <dd className="mt-1 flex flex-col text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {isTextArea ? (
              <textarea 
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3} 
                className={inputClasses}
                aria-invalid={!!showError}
                aria-describedby={showError ? `${name}-error` : undefined}
              />
            ) : (
              <input
                type={inputType}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClasses}
                aria-invalid={!!showError}
                aria-describedby={showError ? `${name}-error` : undefined}
              />
            )}
          {showError && <p id={`${name}-error`} className="mt-1 text-xs text-red-600">{errors[name]}</p>}
        </dd>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DigitalMemberCard user={formData} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Detail Keanggotaan</h3>
          <p className="text-sm text-gray-500 mb-6">Pastikan data Anda selalu valid dan terkini.</p>
          <form onSubmit={handleFormSubmit} noValidate>
            <dl className="divide-y divide-gray-200">
              <DetailRow label="Nama Lengkap" name="name" />
              <DetailRow label="Nomor Anggota" name="memberId" />
              <DetailRow label="Tanggal Bergabung" name="joinDate" inputType="date" />
              <DetailRow label="URL Avatar" name="avatarUrl" inputType="url" />
              <DetailRow label="Alamat Email" name="email" inputType="email" />
              <DetailRow label="Nomor Telepon" name="phone" inputType="tel" />
              <DetailRow label="Alamat" name="address" isTextArea />
              <DetailRow label="Rekening Bank" name="bankAccount" />
            </dl>
            <div className="pt-6 text-right">
               <button type="submit" disabled={!isFormValid} className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;