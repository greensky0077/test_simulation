import { useTranslation } from '../hooks/useTranslation';

export const Spinner = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-100 rounded-full animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-gray-700 font-medium text-base sm:text-lg mb-3" aria-live="polite">
          {t('spinner.loading')}
        </p>
        <div className="flex space-x-1 sm:space-x-2 justify-center">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};
