// Vercel serverless API handler for Signal
import { readFile } from 'fs/promises';
import { join } from 'path';

// Helper to send JSON responses
function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

// Helper to read request body
async function readJsonBody(req) {
  return req.body || {};
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path = [] } = req.query;
  const pathname = `/api/${Array.isArray(path) ? path.join('/') : path}`;

  try {
    // Health check
    if (req.method === 'GET' && pathname === '/api/health') {
      return sendJson(res, 200, {
        ok: true,
        service: 'signal-vercel-api',
        now: new Date().toISOString()
      });
    }

    // Apple App Store charts
    if (req.method === 'GET' && pathname === '/api/apple/charts') {
      const { chart = 'top-free', country = 'us', limit = '50' } = req.query;
      const numLimit = Math.min(Number(limit) || 50, 200);

      const chartUrl = `https://itunes.apple.com/${country}/rss/${chart}applications/limit=${numLimit}/json`;

      const response = await fetch(chartUrl, {
        headers: { 'User-Agent': 'Signal/1.0' }
      });

      if (!response.ok) {
        return sendJson(res, response.status, {
          error: 'Failed to fetch Apple charts'
        });
      }

      const data = await response.json();
      const apps = (data?.feed?.entry || []).map((entry, index) => ({
        position: index + 1,
        name: entry['im:name']?.label || '',
        artist: entry['im:artist']?.label || '',
        category: entry.category?.attributes?.label || '',
        appId: entry.id?.attributes?.['im:bundleId'] || '',
        icon: entry['im:image']?.[2]?.label || entry['im:image']?.[1]?.label || '',
        url: entry.link?.attributes?.href || '',
        price: entry['im:price']?.label || 'Free',
      }));

      return sendJson(res, 200, {
        chart,
        country,
        apps,
        total: apps.length,
        fetchedAt: new Date().toISOString(),
      });
    }

    // Idea Validator - Research endpoint
    if (req.method === 'POST' && pathname === '/api/idea-validator/research') {
      const payload = await readJsonBody(req);
      const idea = payload.idea || '';

      if (!idea || idea.length < 10) {
        return sendJson(res, 400, { error: 'Idea must be at least 10 characters' });
      }

      // Mock validation for now (you can integrate real AI/research later)
      const mockSignals = {
        idea,
        marketSize: 'Medium',
        competition: 'High',
        signals: [
          { type: 'reddit', text: 'Users discussing pain point', score: 0.8 },
          { type: 'appstore', text: 'Similar apps trending', score: 0.6 },
        ],
        score: 7.2,
        recommendation: 'Promising idea with strong demand signals',
        analyzedAt: new Date().toISOString(),
      };

      return sendJson(res, 200, mockSignals);
    }

    // Default 404
    return sendJson(res, 404, {
      error: 'API route not found',
      path: pathname
    });

  } catch (error) {
    console.error('API Error:', error);
    return sendJson(res, 500, {
      error: error.message || 'Internal server error'
    });
  }
}
