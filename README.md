# BrailleSync - Web Application

A fully functional, production-ready web application for converting text, images, documents, and speech into Braille (Grade 1 & 2) with support for multiple languages.

## Features

- **Text to Braille**: Convert typed or pasted text to Braille
- **Image to Braille**: Upload images and use OCR to convert to Braille
- **File Processing**: Convert PDF and document files to Braille
- **Braille to Text**: Reverse translation from Braille Unicode to readable text
- **Smart Summarization**: Automatically condense long documents before translation
- **Multiple Output Formats**: Download results as .BRF, .TXT, or audio files
- **Grade 1 & 2 Support**: Choose between uncontracted and contracted Braille
- **Language Support**: English, Hindi, Marathi, Spanish, French
- **Translation History**: Track all your conversions with filterable history
- **User Preferences**: Customize default settings for language and Braille grade
- **Accessibility First**: High contrast theme, large readable fonts, keyboard navigation, screen reader support

## Tech Stack

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks + Context
- **API Client**: Axios/Fetch wrapper with JWT authentication
- **Authentication**: JWT tokens with secure storage
- **Responsive**: Mobile-first design for all devices
- **Accessibility**: WCAG 2.1 Level AA compliant

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see Backend Setup)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd braillesync
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables (see Environment Setup below)

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Backend API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.braillesync.example.com/api/v1

# Optional: Development redirect for auth
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### Environment Variables Reference

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for your FastAPI backend (required)
  - Production: `https://api.braillesync.example.com/api/v1`
  - Development: `http://localhost:8000/api/v1`

## Project Structure

\`\`\`
.
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles and design tokens
│   ├── auth/
│   │   ├── login/page.tsx       # Login page
│   │   └── register/page.tsx    # Registration page
│   ├── dashboard/page.tsx       # User dashboard
│   ├── translate/page.tsx       # Translation engine
│   ├── history/
│   │   ├── page.tsx             # History listing
│   │   └── [id]/page.tsx        # Translation details
│   └── settings/page.tsx        # User settings
├── components/
│   ├── auth/                     # Authentication components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── protected-route.tsx
│   ├── layout/                   # Layout components
│   │   ├── navbar.tsx
│   │   ├── main-layout.tsx
│   │   └── skip-link.tsx
│   ├── dashboard/                # Dashboard components
│   │   ├── quick-actions.tsx
│   │   └── recent-translations.tsx
│   ├── translation/              # Translation engine components
│   │   ├── input-tabs.tsx
│   │   ├── result-panel.tsx
│   │   └── tabs/
│   │       ├── text-tab.tsx
│   │       ├── image-tab.tsx
│   │       ├── file-tab.tsx
│   │       └── braille-tab.tsx
│   └── ui/                       # shadcn UI components
├── lib/
│   ├── api-client.ts            # API client with JWT handling
│   ├── auth.ts                  # Authentication utilities
│   └── types.ts                 # TypeScript interfaces
├── hooks/
│   ├── use-auth.ts              # Authentication hook
│   └── use-mobile.ts            # Mobile detection hook
└── README.md                     # This file
\`\`\`

## API Integration

The frontend connects to a FastAPI backend that handles:

- User authentication (login, register)
- OCR (Optical Character Recognition)
- Speech-to-Text / Text-to-Speech
- Text-to-Braille conversion
- Braille-to-Text reverse translation
- Summarization
- File processing (PDF, TXT, DOCX)

### Backend Endpoints

The app expects the following endpoints:

\`\`\`
POST   /auth/register           # Create new account
POST   /auth/login              # Login and get JWT token
GET    /auth/me                 # Get current user profile
PUT    /auth/me                 # Update user profile

POST   /translate/text          # Convert text to Braille
POST   /translate/image         # OCR and convert image to Braille
POST   /translate/file          # Convert document file to Braille
POST   /translate/audio         # Convert audio to Braille
POST   /translate/braille-to-text # Reverse translation

GET    /history                 # Get user's translation history
GET    /history/{id}            # Get specific translation details
\`\`\`

## Accessibility Features

BrailleSync is designed specifically for visually impaired users and meets WCAG 2.1 Level AA standards:

- **High Contrast Colors**: Navy blue (#001F3F) primary with amber (#FFB81C) accents
- **Large Text**: Minimum 16px font size for all readable text
- **Keyboard Navigation**: Full keyboard support throughout the app
  - Tab through interactive elements
  - Enter/Space to activate buttons
  - Arrow keys for selections
- **Screen Reader Support**: 
  - Semantic HTML with proper ARIA labels
  - Form labels clearly associated with inputs
  - Status messages announce translation completion/errors
  - Skip to main content link
- **Focus Indicators**: Visible 2px ring focus states on all interactive elements
- **Mobile Friendly**: Responsive design works on all screen sizes

## Authentication Flow

1. User navigates to `/auth/register` to create account
2. System stores JWT token in localStorage
3. Protected routes redirect unauthenticated users to login
4. Token automatically attached to all API requests
5. 401 responses clear token and redirect to login
6. User can logout from navbar dropdown menu

## Usage Examples

### Text to Braille
1. Go to /translate
2. Enter text in "Text" tab
3. Select language and Braille grade
4. Click "Translate to Braille"
5. Download result as .BRF or .TXT

### Image to Braille
1. Go to /translate
2. Switch to "Image" tab
3. Upload an image (JPG, PNG)
4. Click "Run OCR & Translate"
5. Wait for processing (typically under 30 seconds)
6. Download or play audio

### View History
1. Go to /history
2. Use filters to find specific translations
3. Click "View" to see full details
4. Re-download outputs as needed

### Customize Settings
1. Go to /settings
2. Change default language
3. Set preferred Braille grade
4. Enable/disable summarization
5. Click "Save Settings"

## Development

### Running Tests
\`\`\`bash
npm run test
\`\`\`

### Building for Production
\`\`\`bash
npm run build
npm run start
\`\`\`

### Code Quality
\`\`\`bash
npm run lint      # Run ESLint
npm run format    # Format with Prettier
\`\`\`

## Backend Configuration

To connect to your FastAPI backend, update the `.env.local`:

\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
\`\`\`

For production, use your deployed backend URL:
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=https://api.braillesync.example.com/api/v1
\`\`\`

## Security Considerations

- JWT tokens stored in localStorage (can be moved to secure cookies for higher security)
- All API calls include Authorization header with bearer token
- 401 responses automatically clear authentication
- HTTPS required in production
- CORS should be configured on backend
- Input validation on both client and server

## Performance Optimization

- Code splitting for faster initial load
- Image lazy loading
- Responsive images for mobile
- Optimized bundle size
- Server-side rendering for better SEO

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### "Cannot connect to API"
- Check if backend is running
- Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Ensure CORS is enabled on backend

### "Login failed"
- Verify credentials are correct
- Check backend is receiving requests
- Look at browser console for detailed errors

### "Translation taking too long"
- Large files may take longer to process
- Try with smaller content first
- Check backend server logs

## Future Enhancements

- Real-time collaboration features
- Advanced language support (Arabic, Asian languages)
- Batch processing for multiple files
- API for third-party integrations
- Mobile native app
- Offline mode support

## Support

For issues or questions:
1. Check this README
2. Review API client error logs
3. Contact support or file an issue

## License

[Your License Here]

## Contributing

[Contributing guidelines here]
