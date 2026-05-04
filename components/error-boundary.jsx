/* Error Boundary Component */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
      confirmReset: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Log error for debugging (could be sent to error tracking service)
    try {
      const errorLog = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      };
      console.error('Error details:', errorLog);
    } catch (loggingError) {
      console.error('Failed to log error:', loggingError);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      confirmReset: false
    });

    // Optionally reload the page if errors persist
    if (this.state.errorCount > 3) {
      window.location.reload();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  openResetConfirm = () => {
    this.setState({ confirmReset: true });
  };

  closeResetConfirm = () => {
    this.setState({ confirmReset: false });
  };

  confirmResetAppData = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorCount, confirmReset } = this.state;
      const { fallback } = this.props;

      // Allow custom fallback UI
      if (fallback) {
        return fallback({ error, errorInfo, errorCount, onReset: this.handleReset });
      }

      // Default fallback UI
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-0, #0a0b0d)',
          padding: '20px'
        }}>
          <div className="card" style={{
            maxWidth: '600px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>⚠️</div>

            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--text-1, #f3f4f6)',
              marginBottom: '12px'
            }}>
              Something went wrong
            </h1>

            <p style={{
              fontSize: '14px',
              color: 'var(--text-2, #b5b9c0)',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              The application encountered an unexpected error. Don't worry, your data is safe in browser storage.
            </p>

            {error && (
              <details style={{
                textAlign: 'left',
                marginBottom: '24px',
                padding: '16px',
                background: 'var(--bg-2, #14161a)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--text-3, #7f848d)',
                fontFamily: 'monospace'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '12px', color: 'var(--text-2)' }}>
                  Error details
                </summary>
                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  <strong>Error:</strong> {error.message}
                  {error.stack && (
                    <>
                      <br /><br />
                      <strong>Stack trace:</strong>
                      <br />
                      {error.stack}
                    </>
                  )}
                </div>
              </details>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn primary"
                onClick={this.handleReset}
              >
                Try again
              </button>

              <button
                className="btn"
                onClick={this.handleReload}
              >
                Reload page
              </button>

              {errorCount > 2 && (
                <button
                  className="btn"
                  onClick={this.openResetConfirm}
                  style={{ borderColor: 'var(--danger, #ff4444)' }}
                >
                  Reset app data
                </button>
              )}
            </div>

            {confirmReset && (
              <div style={{
                marginTop: '16px',
                padding: '16px',
                borderRadius: '10px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.08)',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-1, #f3f4f6)' }}>
                  Clear local app data?
                </div>
                <div style={{
                  marginTop: '6px',
                  fontSize: '12px',
                  color: 'var(--text-3, #7f848d)',
                  lineHeight: '1.5'
                }}>
                  This removes the saved browser workspace and reloads the app. Use it only if the workspace is stuck in a broken state.
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                  <button className="btn" onClick={this.closeResetConfirm}>
                    Cancel
                  </button>
                  <button className="btn" onClick={this.confirmResetAppData} style={{ borderColor: 'var(--danger, #ff4444)', color: 'var(--danger, #ff4444)' }}>
                    Clear and reload
                  </button>
                </div>
              </div>
            )}

            {errorCount > 1 && (
              <p style={{
                marginTop: '16px',
                fontSize: '12px',
                color: 'var(--text-3, #7f848d)'
              }}>
                Errors occurred: {errorCount} time{errorCount > 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export to global namespace
Object.assign(window, { ErrorBoundary });
