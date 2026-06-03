import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Map of routes to funderpro pages (local files)
const pageMap: Record<string, string> = {
  '/': '/funderpro/index.html',
  '/features': '/funderpro/features.html',
  '/challenges': '/funderpro/challenges.html',
  '/the-challenge': '/funderpro/the-challenge.html',
  '/trading-rules': '/funderpro/trading-rules.html',
  '/rewards-external': '/funderpro/rewards.html',
  '/careers': '/funderpro/careers.html',
  '/about': '/funderpro/about-us.html',
  '/contact': '/funderpro/contact-us.html',
  '/blog': '/funderpro/blog.html',
  '/products': '/funderpro/products-and-spreads.html',
  '/platforms': '/funderpro/trading-platforms.html',
  '/calendar': '/funderpro/economic-calendar.html',
  '/tools': '/funderpro/tools-for-traders.html',
  '/technology': '/funderpro/prop-trading-technology.html',
  '/affiliate': '/funderpro/become-affiliate.html',
  '/sitemap': '/funderpro/sitemap.html',
  '/terms': '/funderpro/terms-conditions.html',
  '/privacy': '/funderpro/privacy-notice.html',
  '/cookies': '/funderpro/cookies-policy.html',
  '/risk': '/funderpro/risk-disclaimer.html',
  '/general-terms': '/funderpro/general-terms-of-use.html',
};

export default function FunderproLanding() {
  const location = useLocation();
  const [pageSrc, setPageSrc] = useState('/funderpro/index.html');
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const path = location.pathname;
    const localPage = pageMap[path];
    if (localPage) {
      setPageSrc(localPage);
    } else {
      setPageSrc('/funderpro/index.html');
    }
    // Reset states
    setIframeLoaded(false);
    setIframeError(false);
  }, [location.pathname]);

  // Handle iframe load
  const handleIframeLoad = () => {
    loadTimeoutRef.current = setTimeout(() => {
      setIframeLoaded(true);
    }, 500);

    try {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow?.document) return;

      const doc = iframe.contentWindow.document;

      // Inject comprehensive interaction handler
      const existing = doc.getElementById('funderpro-interactive-handler');
      if (existing) existing.remove();

      const script = doc.createElement('script');
      script.id = 'funderpro-interactive-handler';
      script.textContent = `
        (function() {
          function processAll() {
            var elements = document.querySelectorAll('a, button, input, div, span, nav, [role="button"]');
            elements.forEach(function(el) {
              if (el.dataset.processed) return;
              el.dataset.processed = 'true';
              el.style.cursor = 'pointer';

              if (el.tagName === 'A') {
                var href = el.getAttribute('href') || '';
                var text = (el.textContent || '').toLowerCase().trim();

                if (href.includes('funderpro.com')) {
                  var path = href.split('funderpro.com')[1];
                  if (path && path.startsWith('/')) {
                    var routeMap = {
                      '/features': '/features', '/challenges': '/challenges',
                      '/the-challenge': '/the-challenge', '/trading-rules': '/trading-rules',
                      '/rewards': '/rewards-external', '/careers': '/careers',
                      '/about-us': '/about', '/contact-us': '/contact',
                      '/blog': '/blog', '/products': '/products',
                      '/platforms': '/platforms', '/economic-calendar': '/calendar',
                      '/tools': '/tools', '/technology': '/technology',
                      '/affiliate': '/affiliate', '/sitemap': '/sitemap',
                      '/terms': '/terms', '/privacy': '/privacy'
                    };
                    var mapped = routeMap[path] || path;
                    el.setAttribute('href', mapped);
                  }
                }

                if (text.includes('get started') || text.includes('get funded')) {
                  el.setAttribute('href', '/signup');
                }
                if (text.includes('login') || text.includes('sign in')) {
                  el.setAttribute('href', '/login');
                }
              }
            });

            var forms = document.querySelectorAll('form');
            forms.forEach(function(form) {
              form.addEventListener('submit', function(e) {
                e.preventDefault();
                window.location.href = '/signup';
              });
            });
          }

          processAll();
          setTimeout(processAll, 500);
          setTimeout(processAll, 1500);

          if (typeof MutationObserver !== 'undefined') {
            var observer = new MutationObserver(function() { processAll(); });
            observer.observe(document.body, { childList: true, subtree: true });
          }
        })();
      `;
      doc.head.appendChild(script);
    } catch (err) {
      // Cross-origin restriction
    }
  };

  // Handle iframe error
  const handleIframeError = () => {
    setIframeError(true);
  };

  // Fallback content when iframe fails
  const FallbackContent = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1527' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(15, 21, 39, 0.95)', borderBottom: '1px solid #263348' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/funderpro-logo.png" alt="FunderPro" className="h-10 w-auto" />
            <span className="text-xl font-bold text-white">FunderPro</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/features" className="text-sm transition-colors hover:text-white" style={{ color: '#e2f8ff' }}>Features</a>
            <a href="/challenges" className="text-sm transition-colors hover:text-white" style={{ color: '#e2f8ff' }}>Challenges</a>
            <a href="/pricing" className="text-sm transition-colors hover:text-white" style={{ color: '#e2f8ff' }}>Pricing</a>
            <a href="/about" className="text-sm transition-colors hover:text-white" style={{ color: '#e2f8ff' }}>About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold transition-colors" style={{ color: '#e2f8ff' }}>
              Login
            </Link>
            <Link to="/signup" className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: '#e42338' }}>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)', border: '1px solid rgba(0, 208, 132, 0.2)' }}>
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#00d084' }}></span>
            <span className="text-sm font-medium" style={{ color: '#00d084' }}>Now funding up to $200,000</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get Funded. Trade Big.
          </h1>
          <p className="text-xl mb-8" style={{ color: '#7f8bab' }}>
            Keep up to 90% of your profits. Pass our evaluation challenge and unlock instant funding.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90" style={{ backgroundColor: '#e42338' }}>
              Start Your Challenge
            </Link>
            <a href="/the-challenge" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-lg transition-all" style={{ backgroundColor: '#1c273e', color: '#e2f8ff' }}>
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6" style={{ backgroundColor: '#131b32' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Traders Choose FunderPro</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0f1527' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(228, 35, 56, 0.1)' }}>
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Up to $200,000</h3>
              <p style={{ color: '#7f8bab' }}>Get funded with up to $200,000 capital. No risk to your own money.</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0f1527' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(0, 208, 132, 0.1)' }}>
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">90% Profit Split</h3>
              <p style={{ color: '#7f8bab' }}>Keep 90% of your profits. The more you earn, the more you keep.</p>
            </div>
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#0f1527' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(226, 248, 255, 0.1)' }}>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Funding</h3>
              <p style={{ color: '#7f8bab' }}>Pass the challenge and get funded instantly. Start trading right away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Become a Funded Trader?</h2>
          <p className="text-lg mb-8" style={{ color: '#7f8bab' }}>Join thousands of traders who have achieved financial freedom with FunderPro.</p>
          <Link to="/signup" className="inline-block px-8 py-4 rounded-xl font-semibold text-white text-lg transition-all hover:opacity-90" style={{ backgroundColor: '#e42338' }}>
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6" style={{ backgroundColor: '#131b32', borderTop: '1px solid #263348' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/funderpro-logo.png" alt="FunderPro" className="h-8 w-auto" />
              <span className="text-lg font-semibold text-white">FunderPro</span>
            </div>
            <div className="flex items-center space-x-6 text-sm" style={{ color: '#7f8bab' }}>
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm" style={{ color: '#7f8bab' }}>
            © 2024 FunderPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="w-full min-h-screen">
      {/* Iframe to display funderpro pages */}
      <iframe
        ref={iframeRef}
        src={pageSrc}
        className="w-full min-h-screen border-0"
        title="FunderPro"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-top-navigation-by-user-activation"
        loading="lazy"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        style={{ display: iframeError ? 'none' : 'block' }}
      />

      {/* Show fallback if iframe fails */}
      {iframeError && <FallbackContent />}

      {/* Show loading state briefly */}
      {!iframeLoaded && !iframeError && (
        <div className="w-full min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f1527' }}>
          <div className="text-center">
            <img src="/funderpro-logo.png" alt="FunderPro" className="w-16 h-auto mx-auto mb-4 animate-pulse" />
            <div className="w-8 h-8 border-2 rounded-full mx-auto animate-spin" style={{ borderColor: '#e42338', borderTopColor: 'transparent' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}