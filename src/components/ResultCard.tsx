import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { LookupResult } from '../lib/types';

interface ResultCardProps {
  result: LookupResult;
  onNewQuery: () => void;
}

export const ResultCard = ({ result, onNewQuery }: ResultCardProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-3 sm:p-4 w-full max-w-full overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${result.success ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {t('result.title')}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 ${
              copied 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-blue-500/20 border border-gray-200'
            }`}
          >
            <span className="flex items-center justify-center">
              {copied ? (
                <>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Copied!</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">{t('result.copy')}</span>
                  <span className="sm:hidden">Copy</span>
                </>
              )}
            </span>
          </button>
          <button
            onClick={onNewQuery}
            className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">{t('result.newQuery')}</span>
              <span className="sm:hidden">New</span>
            </span>
          </button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Status */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
          <span className="text-xs sm:text-sm font-semibold text-gray-700">{t('result.status')}:</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            result.success 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <span className="flex items-center">
              {result.success ? (
                <>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t('result.success')}
                </>
              ) : (
                <>
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {t('result.error')}
                </>
              )}
            </span>
          </span>
        </div>

        {/* Reference */}
        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center mb-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {t('result.reference')}
          </span>
          <p className="text-xs text-gray-800 font-mono bg-white p-2 rounded border border-blue-100 break-all overflow-hidden">
            {result.reference}
          </p>
        </div>

        {/* Timestamp */}
        <div className="bg-gray-50 p-2 sm:p-3 rounded-lg border border-gray-200">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center mb-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('result.timestamp')}
          </span>
          <p className="text-xs text-gray-800 font-medium">
            {formatTimestamp(result.timestamp)}
          </p>
        </div>

        {/* Query */}
        <div className="bg-indigo-50 p-2 sm:p-3 rounded-lg border border-indigo-200">
          <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center mb-1">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('result.query')}
          </span>
          <div className="bg-white p-2 rounded border border-indigo-100">
            <pre className="text-xs text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap break-words">
              {JSON.stringify(result.query, null, 2)}
            </pre>
          </div>
        </div>

        {/* Data or Error */}
        {result.success && result.data && (
          <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center mb-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Response Data
            </span>
            <div className="bg-white p-2 rounded border border-green-100">
              <pre className="text-xs text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {!result.success && result.error && (
          <div className="bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 flex items-center mb-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Error Details
            </span>
            <div className="bg-white p-2 rounded border border-red-100">
              <pre className="text-xs text-red-800 font-mono overflow-x-auto whitespace-pre-wrap break-words">
                {JSON.stringify(result.error, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
