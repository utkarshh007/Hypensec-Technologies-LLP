import test from 'node:test';
import assert from 'node:assert/strict';
import { CookiePreferences } from './CookieConsent';

test('CookiePreferences interface enforces essential boolean and ISO timestamp', () => {
  const prefs: CookiePreferences = {
    essential: true,
    performance: true,
    analytics: false,
    timestamp: new Date().toISOString()
  };

  assert.equal(prefs.essential, true);
  assert.equal(prefs.performance, true);
  assert.equal(prefs.analytics, false);
  assert.ok(prefs.timestamp);
});
