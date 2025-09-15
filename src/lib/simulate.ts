import type { LookupPayload, LookupResult } from './types';

export const simulateLookup = async (payload: LookupPayload): Promise<LookupResult> => {
  // Random delay between 900-1500ms
  const delay = Math.random() * 600 + 900;
  
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // 10% chance of error
  const isError = Math.random() < 0.1;
  
  const reference = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const timestamp = new Date().toISOString();
  
  if (isError) {
    return {
      success: false,
      reference,
      timestamp,
      query: payload,
      error: {
        code: 'SIMULATION_ERROR',
        message: 'Simulated error occurred during lookup'
      }
    };
  }
  
  return {
    success: true,
    reference,
    timestamp,
    query: payload,
    data: {
      status: 'FOUND',
      message: 'Document found in system',
      details: {
        documentType: payload.documentType,
        documentNumber: payload.documentNumber,
        verified: true,
        lastUpdated: new Date().toISOString(),
        additionalInfo: {
          region: 'Colombia',
          status: 'Active',
          verificationLevel: 'High'
        }
      }
    }
  };
};
