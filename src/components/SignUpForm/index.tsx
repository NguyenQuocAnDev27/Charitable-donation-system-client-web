'use client'; // Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { SignUpBody } from '@/interface';
import useSignUp from '@/store/hooks/useSignUp';

const SignupForm = () => {
  const { loading, error, success, signUp } = useSignUp();
  const router = useRouter(); // Initialize the router

  // Form state management
  const [formData, setFormData] = useState<SignUpBody>({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(formData);
  };

  // Redirect to sign-in page on successful sign-up
  useEffect(() => {
    if (success) {
      router.push('/signin'); // Navigate to the sign-in page
    }
  }, [success, router]);

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Sign up successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label
            htmlFor="fullName"
            className="mb-3 block text-sm text-dark dark:text-white"
          >
            Tên đầy đủ
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Nguyen Van A"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="mb-3 block text-sm text-dark dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className="mb-3 block text-sm text-dark dark:text-white"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              value={formData.password}
              onChange={handleChange}
              required
              className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12m0-2a2 2 0 110 4 2 2 0 010-4zm-6 0a6 6 0 0112 0v.001m0 0A6 6 0 015 12V12A6 6 0 0112 18m6 0a2 2 0 01-6 0"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6l4 4m0 0l4-4m0 0l4 4m0 0l4-4m0 0l-4 4m0 0l-4-4M4 6l4 4"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-8">
          <label
            htmlFor="phoneNumber"
            className="mb-3 block text-sm text-dark dark:text-white"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="0123456789"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng kí'}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
