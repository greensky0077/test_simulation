import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { lookupFormSchema, type LookupFormData } from '../lib/validation';
import type { DocumentType } from '../lib/types';

interface FormProps {
  onSubmit: (data: LookupFormData) => void;
  isLoading: boolean;
}

export const Form = ({ onSubmit, isLoading }: FormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<LookupFormData>({
    documentType: '' as DocumentType,
    documentNumber: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LookupFormData, string>>>({});

  const handleInputChange = (field: keyof LookupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = lookupFormSchema.parse(formData);
      setErrors({});
      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        const fieldErrors: Partial<Record<keyof LookupFormData, string>> = {};
        (error as any).issues.forEach((issue: any) => {
          fieldErrors[issue.path[0] as keyof LookupFormData] = issue.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <label 
          htmlFor="documentType" 
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {t('form.documentType.label')}
        </label>
        <div className="relative">
          <select
            id="documentType"
            value={formData.documentType}
            onChange={(e) => handleInputChange('documentType', e.target.value as DocumentType)}
            className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base ${
              errors.documentType 
                ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
                : 'border-gray-200 bg-white hover:border-blue-300 focus:border-blue-500'
            }`}
            disabled={isLoading}
            aria-describedby={errors.documentType ? 'documentType-error' : undefined}
          >
            <option value="">{t('form.documentType.placeholder')}</option>
            {Object.entries(t('form.documentType.options') as any).map(([value, label]) => (
              <option key={value} value={value}>
                {String(label)}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.documentType && (
          <p id="documentType-error" className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.documentType}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label 
          htmlFor="documentNumber" 
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {t('form.documentNumber.label')}
        </label>
        <input
          type="text"
          id="documentNumber"
          value={formData.documentNumber}
          onChange={(e) => handleInputChange('documentNumber', e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('form.documentNumber.placeholder')}
          className={`w-full px-3 py-3 sm:px-4 sm:py-4 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm sm:text-base ${
            errors.documentNumber 
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-200 bg-white hover:border-blue-300 focus:border-blue-500'
          }`}
          disabled={isLoading}
          aria-describedby={errors.documentNumber ? 'documentNumber-error' : undefined}
        />
        {errors.documentNumber && (
          <p id="documentNumber-error" className="mt-2 text-sm text-red-600 font-medium flex items-center" role="alert">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.documentNumber}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm sm:text-base"
      >
        <span className="flex items-center justify-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('result.loading')}
            </>
          ) : (
            <>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('form.submit')}
            </>
          )}
        </span>
      </button>
    </form>
  );
};
