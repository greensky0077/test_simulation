export type DocumentType = 'CC' | 'CE' | 'NIT' | 'PASSPORT';

export interface LookupPayload {
  documentType: DocumentType;
  documentNumber: string;
}

export interface LookupResult {
  success: boolean;
  reference: string;
  timestamp: string;
  query: LookupPayload;
  data?: {
    status: string;
    message: string;
    details?: Record<string, any>;
  };
  error?: {
    code: string;
    message: string;
  };
}
