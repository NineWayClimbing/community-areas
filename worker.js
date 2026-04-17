// Cloudflare Worker — CORS proxy for GitHub OAuth Device Flow
// Deploy: npx wrangler deploy worker.js --name community-areas-auth

const GITHUB_DEVICE_CODE_URL = 'https://github.com/login/device/code';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    let target;

    if (url.pathname === '/device/code') {
      target = GITHUB_DEVICE_CODE_URL;
    } else if (url.pathname === '/device/token') {
      target = GITHUB_TOKEN_URL;
    } else {
      return new Response('Not found', { status: 404, headers: CORS_HEADERS });
    }

    const body = await request.json();
    const resp = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await resp.text();
    return new Response(data, {
      status: resp.status,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  },
};
