# Online Payment Lookup - Phase 1 (Prototype)

A responsive React application for document lookup with simulated API responses.

## Features

- **Document Lookup Form**: Select document type (CC, CE, NIT, PASSPORT) and enter document number
- **Client-side Validation**: Real-time validation with inline error messages
- **Loading States**: Smooth loading experience with spinner
- **Simulated Results**: Mock API responses with 10% error rate for testing
- **Copy to Clipboard**: Easy copying of results for reference
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Internationalization**: Ready for multiple languages

## Tech Stack

- React 19 + Vite
- TypeScript
- TailwindCSS
- Zod (validation)
- React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # React components
│   ├── Form.tsx        # Document lookup form
│   ├── ResultCard.tsx  # Results display
│   └── Spinner.tsx     # Loading spinner
├── hooks/              # Custom React hooks
│   └── useTranslation.ts
├── lib/                # Utilities and logic
│   ├── types.ts        # TypeScript type definitions
│   ├── validation.ts   # Zod validation schemas
│   └── simulate.ts     # Mock API simulation
├── locales/            # Internationalization
│   └── en.json         # English translations
├── pages/              # Page components
│   └── Home.tsx        # Main page
└── styles/
    └── globals.css     # Global styles with TailwindCSS
```

## Usage

1. Select a document type from the dropdown
2. Enter a document number (minimum 5 characters, letters and numbers only)
3. Click "Consult" or press Enter
4. Wait for the simulated API response
5. View results with reference number and timestamp
6. Copy results or start a new query

## Phase 2 (Future)

This prototype is ready for Phase 2 integration with real API:

- Replace `simulateLookup()` with actual API calls
- Add environment variables for API configuration
- Implement feature flags for simulation vs real API

## Deployment

The project is configured for easy deployment on:

- **Vercel**: Use `vercel.json` configuration
- **Netlify**: Use `netlify.toml` configuration

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT