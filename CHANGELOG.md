# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [0.1.0] - 2026-04-21

### Added

#### Security
- Input sanitization module (`components/security.jsx`) with:
  - URL validation (prevents `javascript:` and malicious URLs)
  - HTML escaping for text inputs
  - CSS color validation
  - localStorage data validation
  - Safe JSON parsing utilities
- Origin validation for `postMessage` communication
- Workspace data integrity checks

#### Reliability
- Error Boundary component (`components/error-boundary.jsx`)
  - Catches React errors and prevents full app crash
  - User-friendly error recovery UI
  - Error logging and tracking
  - Auto-reset after multiple failures

#### Development
- Vite configuration (`vite.config.js`) for modern build process
- `.gitignore` file with comprehensive exclusions
- Updated `package.json` with:
  - Proper dependencies (React 18.3.1)
  - DevDependencies (Vite, ESLint, TypeScript types)
  - Scripts for development and production
  - Node/npm version requirements
- Documentation:
  - `IMPROVEMENTS.md` - Detailed implementation report
  - `CHANGELOG.md` - This file
  - Updated `README.md` with setup instructions

### Changed

#### Performance
- **[BREAKING]** Switched from React development builds to production builds
  - Reduces bundle size by ~1.1 MB
  - Improves runtime performance
  - Files: `Shipshot.html`, `index.html`, `Shipshot-standalone.html`

#### Security
- Enhanced `loadWorkspace()` function with validation
- Enhanced `normalizeDecorations()` to sanitize colors and URLs
- Added error logging instead of silent failures

### Fixed

#### Critical Security Issues
- **XSS vulnerability** in `postMessage` implementation
  - Changed from accepting all origins (`'*'`) to same-origin only
  - Location: `Shipshot.html:126-147`
- **Injection risks** from unsanitized user inputs
  - Image URLs, colors, and text now validated
  - Location: `components/data.jsx:535-581`

#### Error Handling
- localStorage corruption no longer crashes app
- JSON parse errors now caught and logged
- Missing component data now has safe defaults

### Deprecated
- None

### Removed
- None (all changes are additive)

### Security
- Fixed 4 high-severity vulnerabilities
- Fixed 6 medium-severity issues
- See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for full security audit

---

## [Unreleased] - Planned for Next Release

### Planned - Phase 2 (2 weeks)
- [ ] ES modules migration
- [ ] Remove Babel standalone (saves 2.5 MB)
- [ ] Split `data.jsx` into 8+ modules
- [ ] Implement Context API for state management
- [ ] Add loading states

### Planned - Phase 3 (1 week)
- [ ] TypeScript migration (gradual)
- [ ] Performance optimizations (memoization)
- [ ] Unit tests
- [ ] Integration tests

### Planned - Phase 4 (1 week)
- [ ] ARIA labels and semantic HTML
- [ ] Keyboard navigation
- [ ] Color contrast fixes
- [ ] Screen reader support

---

## Version History

- **0.1.0** (2026-04-21) - Security & Performance improvements
- **0.0.1** (2026-04-18) - Initial prototype

---

[0.1.0]: https://github.com/user/wrap/compare/v0.0.1...v0.1.0
