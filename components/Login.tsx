
import React, { useState } from 'react';

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const KeyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
    </svg>
);

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handlePhoneNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      console.log(`Sending OTP to ${phoneNumber}`);
      setIsOtpSent(true);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For this mock, we use a static OTP. In a real app, this would be verified with a backend service.
    if (otp === '123456') {
      onLogin();
    } else {
      alert('Invalid OTP. Please use 123456 for this demo.');
      setOtp('');
    }
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setPhoneNumber(value.slice(0, 10)); // Limit to 10 digits
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setOtp(value.slice(0, 6)); // Limit to 6 digits
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 animate-fade-in">
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
      `}</style>
      <div className="text-center max-w-lg w-full">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Welcome to
          <br />
          NEXUS GAMING ZONE
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Your ultimate destination for an unparalleled gaming experience.
        </p>

        <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-lg p-8 max-w-sm mx-auto w-full">
          {!isOtpSent ? (
            <div>
              <h2 className="text-xl font-bold text-center text-white mb-6">Login with your Phone</h2>
              <form onSubmit={handlePhoneNumberSubmit} className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone-number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-3"
                    placeholder="10-digit mobile number"
                    required
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  disabled={phoneNumber.length !== 10}
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Send OTP
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-center text-white mb-2">Enter OTP</h2>
              <p className="text-center text-sm text-gray-400 mb-6">
                Sent to +91 {phoneNumber}. (Hint: 123456)
              </p>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                       <KeyIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={handleOtpChange}
                      className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-3 tracking-[0.5em] text-center"
                      placeholder="_ _ _ _ _ _"
                      required
                      autoFocus
                    />
                </div>
                <button
                  type="submit"
                  disabled={otp.length !== 6}
                  className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Verify & Login
                </button>
              </form>
              <button
                onClick={() => setIsOtpSent(false)}
                className="w-full text-gray-300 hover:text-white text-sm mt-4 text-center"
              >
                Change Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
