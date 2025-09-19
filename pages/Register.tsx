import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    savingPlan: 'Paket Dasar (Pokok + Wajib)',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (data: typeof formData): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};
    if (data.name.trim().length < 3) newErrors.name = 'Nama lengkap minimal 3 karakter.';
    if (data.address.trim().length < 10) newErrors.address = 'Alamat minimal 10 karakter.';
    if (!/^08\d{8,11}$/.test(data.phone)) newErrors.phone = 'Format nomor telepon tidak valid (contoh: 081234567890).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = 'Format email tidak valid.';
    if (data.password.length < 8) newErrors.password = 'Kata sandi minimal 8 karakter.';
    if (data.password !== data.confirmPassword) newErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok.';
    return newErrors;
  };

  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      alert('Pendaftaran berhasil! Silakan masuk.');
      navigate('/login');
    } else {
      // Mark all fields as touched to show errors on submit attempt
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
    }
  };

  const renderFormField = (name: keyof typeof formData, label: string, options: { type?: string; component?: 'textarea' | 'select', placeholder?: string, children?: React.ReactNode }) => {
    const showError = touched[name] && errors[name];
    const showSuccess = touched[name] && !errors[name];

    const inputClasses = `
      w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition-colors bg-white text-gray-900 placeholder-gray-400
      ${showError 
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
        : showSuccess
        ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
        : 'border-gray-300 focus:ring-primary focus:border-primary'
      }
    `;

    let inputElement;
    if (options.component === 'textarea') {
      inputElement = <textarea id={name} name={name} value={formData[name]} onChange={handleChange} onBlur={handleBlur} rows={2} required className={inputClasses} placeholder={options.placeholder} />;
    } else if (options.component === 'select') {
      inputElement = <select id={name} name={name} value={formData[name]} onChange={handleChange} required className={`${inputClasses} text-base`}>{options.children}</select>;
    } else {
      inputElement = <input id={name} name={name} type={options.type || 'text'} value={formData[name]} onChange={handleChange} onBlur={handleBlur} required className={inputClasses} placeholder={options.placeholder} />;
    }

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="mt-1">
          {inputElement}
        </div>
        {showError && <p id={`${name}-error`} className="mt-1 text-xs text-red-600">{errors[name]}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        <div className="hidden md:block md:w-1/2 relative">
             <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://picsum.photos/seed/registerpage/800/1200"
                alt="Smiling farmer"
             />
             <div className="absolute inset-0 bg-primary opacity-70"></div>
             <div className="relative p-12 text-white flex flex-col justify-end h-full">
                <h3 className="text-3xl font-bold">Satu Langkah Menuju Kesejahteraan.</h3>
                <p className="mt-4">Dengan menjadi anggota, Anda turut serta dalam memajukan perekonomian desa dan menikmati manfaat kebersamaan.</p>
             </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-center md:text-left mb-8">
                <Link to="/" className="inline-flex items-center space-x-2">
                    <svg xmlns="http://www.w.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 11.55C9.64 9.35 6.48 8 3 8v11c3.48 0 6.64 1.35 9 3.55 2.36-2.19 5.52-3.55 9-3.55V8c-3.48 0-6.64 1.35-9 3.55z" opacity=".3"/><path d="M12 15.05c-2.36-2.2-5.52-3.55-9-3.55v1.5c2.9 0 5.54 1.1 7.5 2.85V8c-3.48 0-6.64 1.35-9 3.55v11c3.48 0 6.64-1.35 9-3.55 2.36 2.2 5.52 3.55 9 3.55V11.55c-3.48 0-6.64 1.35-9 3.5z"/>
                    </svg>
                    <span className="text-xl font-bold text-gray-800">Koperasi Digital Merah Putih</span>
                </Link>
                <h2 className="mt-6 text-3xl font-bold text-gray-900">Bergabung dengan Koperasi</h2>
                <p className="mt-2 text-sm text-gray-600">Lengkapi data diri Anda untuk menjadi anggota.</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {renderFormField('name', 'Nama Lengkap', { placeholder: 'Budi Santoso' })}
                {renderFormField('address', 'Alamat Lengkap', { component: 'textarea', placeholder: 'Jl. Merdeka No. 17, Desa Merah Putih' })}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFormField('phone', 'Nomor Telepon', { type: 'tel', placeholder: '081234567890' })}
                  {renderFormField('email', 'Alamat Email', { type: 'email', placeholder: 'anda@email.com' })}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFormField('password', 'Kata Sandi', { type: 'password', placeholder: '********' })}
                    {renderFormField('confirmPassword', 'Konfirmasi Kata Sandi', { type: 'password', placeholder: '********' })}
                </div>

                {renderFormField('savingPlan', 'Pilihan Simpanan Awal', { component: 'select', children: (
                  <>
                    <option>Paket Dasar (Pokok + Wajib)</option>
                    <option>Paket Plus (Pokok + Wajib + Sukarela Rp100.000)</option>
                    <option>Paket Premium (Pokok + Wajib + Sukarela Rp500.000)</option>
                  </>
                )})}

                <div className="pt-2">
                    <button type="submit" disabled={!isFormValid} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Daftar
                    </button>
                </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                    Masuk di sini
                </Link>
            </p>
        </div>

      </div>
    </div>
  );
};

export default Register;