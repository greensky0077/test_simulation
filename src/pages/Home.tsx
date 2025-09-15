import { useState } from 'react';
import { Form } from '../components/Form';
import { ResultCard } from '../components/ResultCard';
import { Spinner } from '../components/Spinner';
import { useTranslation } from '../hooks/useTranslation';
import { simulateLookup } from '../lib/simulate';
import type { LookupResult } from '../lib/types';
import type { LookupFormData } from '../lib/validation';

type AppState = 'idle' | 'loading' | 'result';

export const Home = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<AppState>('idle');
  const [result, setResult] = useState<LookupResult | null>(null);

  const handleSubmit = async (formData: LookupFormData) => {
    setState('loading');
    
    try {
      const lookupResult = await simulateLookup(formData);
      setResult(lookupResult);
      setState('result');
    } catch (error) {
      console.error('Lookup failed:', error);
      setResult({
        success: false,
        reference: `REF-${Date.now()}`,
        timestamp: new Date().toISOString(),
        query: formData,
        error: {
          code: 'UNKNOWN_ERROR',
          message: 'An unexpected error occurred'
        }
      });
      setState('result');
    }
  };

  const handleNewQuery = () => {
    setState('idle');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed px-2">
              Enter your document information to perform a secure lookup
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 md:p-8 transition-all duration-300">
            {state === 'idle' && (
              <Form onSubmit={handleSubmit} isLoading={false} />
            )}

            {state === 'loading' && (
              <Spinner />
            )}

            {state === 'result' && result && (
              <ResultCard result={result} onNewQuery={handleNewQuery} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
