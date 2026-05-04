# Signal — App Store Growth Intelligence

Generate professional App Store screenshots with AI-powered design templates.

## 🚀 Quick Start

### Current Setup (Without Build Process)

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://127.0.0.1:3000
   ```

### Future Setup (With Vite Build - Coming Soon)

```bash
npm install
npm run dev     # Runs Vite + server concurrently
npm run build   # Build for production
```

## 📁 Project Structure

```
/wrap
├── components/           # React components
│   ├── data.jsx         # Data models & workspace logic
│   ├── security.jsx     # Input sanitization utilities
│   ├── error-boundary.jsx  # Error handling
│   ├── icons.jsx        # Icon components
│   ├── credits.js       # Credits system
│   ├── screenshot.jsx   # Screenshot rendering
│   ├── shell.jsx        # App shell (sidebar, topbar)
│   ├── home.jsx         # Home screen
│   ├── projects.jsx     # Projects list
│   ├── project-screens.jsx  # Project editor
│   └── other-screens.jsx    # Templates, Assets, etc.
├── Shipshot.html        # Main app entry point
├── index.html           # GitHub Pages entry
├── Shipshot-standalone.html  # Single-file build
├── styles.css           # Design system & styles
├── server.mjs           # Node.js API server
├── vite.config.js       # Vite configuration (future)
├── package.json         # Dependencies & scripts
└── .shipshot-runtime/   # Runtime data (gitignored)

## ✨ Recent Improvements (v0.1.0)

### Security
- ✅ Fixed critical postMessage XSS vulnerability
- ✅ Added input sanitization for URLs, colors, and text
- ✅ Enhanced localStorage validation

### Performance
- ✅ Switched to React production builds (~1.1 MB saved)
- ✅ Added Vite configuration for future optimization (~97% total reduction)

### Reliability
- ✅ Added Error Boundary to prevent crashes
- ✅ Improved error logging throughout app

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for full details.

## 🛠️ Development

### Scripts

```bash
npm run dev          # Start development server
npm run dev:vite     # Start Vite only (future)
npm run dev:server   # Start API server only
npm run build        # Build for production (future)
npm run lint         # Run ESLint (future)
```

### API Server

The server runs on `http://127.0.0.1:3000` and provides:

- **Static file serving**: HTML, CSS, JS, JSX
- **API endpoints**:
  - `GET /api/health` - Health check
  - `GET /api/jobs` - List render jobs
  - `GET /api/jobs/:id` - Get job details
  - `POST /api/render-pack` - Create render pack
  - `POST /api/upload/app-store-connect` - Prepare App Store upload
  - `POST /api/upload/google-play` - Prepare Play Store upload
  - `POST /api/idea-validator/research` - Validate app ideas with real market data

### Optional: Enable X/Twitter Posts in Idea Validator

To get real X/Twitter posts showing user pain points:

1. **Get X API Bearer Token**:
   - Go to [https://developer.twitter.com/](https://developer.twitter.com/)
   - Create a project and app
   - Generate a Bearer Token

2. **Set environment variable**:
   ```bash
   export X_BEARER_TOKEN="your_bearer_token_here"
   npm run dev
   ```

3. **Or add to `.env` file** (recommended):
   ```bash
   echo "X_BEARER_TOKEN=your_bearer_token_here" >> .env
   ```

**Note**: The Idea Validator works without this token but will only show Reddit posts. With the token, you'll get X posts + Reddit posts for richer insights.

## 🔒 Security Features

The app includes comprehensive security measures:

- **XSS Protection**: Input sanitization for user-generated content
- **Origin Validation**: Secure postMessage communication
- **URL Filtering**: Prevents `javascript:` and malicious data URLs
- **Color Validation**: CSS injection prevention
- **localStorage Validation**: Corrupt data handling

## 🐛 Known Issues

- Babel standalone still loaded in browser (2.5 MB overhead)
- 35+ font families loaded simultaneously
- No unit/integration tests yet

## 📋 Roadmap

### Phase 1 ✅ (Completed)
- Security fixes
- Performance improvements
- Error boundaries
- Build setup

### Phase 2 (2 weeks)
- ES modules migration
- Remove Babel standalone
- Split `data.jsx` into modules
- Context API for state management

### Phase 3 (1 week)
- TypeScript migration
- Loading states
- Performance optimizations

### Phase 4 (1 week)
- Accessibility improvements
- Keyboard navigation
- ARIA labels

## 📄 License

Private - All rights reserved

## 🤝 Contributing

This is a prototype project. Improvements and suggestions are welcome.

---

**Version**: 0.1.0
**Last Updated**: 2026-04-21
