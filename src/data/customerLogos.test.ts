import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CUSTOMER_LOGOS,
  getNextCarouselIndex,
  buildMarqueeTrack
} from './customerLogos';

test('CUSTOMER_LOGOS contains all 11 logos with valid local asset paths', () => {
  assert.equal(CUSTOMER_LOGOS.length, 11);
  const expectedNames = [
    'Trever',
    'LNJ Bhilwara Group',
    'PNB Gilts',
    'Aumyaa',
    'Factura.ai',
    'Maral Overseas',
    'OpenSSL',
    'OWASP',
    'Kubernetes',
    'Digitalearn',
    'IBM'
  ];
  assert.deepEqual(
    CUSTOMER_LOGOS.map((c) => c.name),
    expectedNames
  );
  for (const customer of CUSTOMER_LOGOS) {
    assert.ok(customer.logoUrl.startsWith('/assets/aistudio/'), `Invalid path for ${customer.name}`);
  }
});

test('getNextCarouselIndex wraps cleanly forward and backward', () => {
  assert.equal(getNextCarouselIndex(0, 1, 11), 1);
  assert.equal(getNextCarouselIndex(10, 1, 11), 0);
  assert.equal(getNextCarouselIndex(0, -1, 11), 10);
  assert.equal(getNextCarouselIndex(2, -3, 11), 10);
});

test('buildMarqueeTrack duplicates items for continuous marquee loop', () => {
  const track = buildMarqueeTrack(CUSTOMER_LOGOS, 2);
  assert.equal(track.length, 22);
  assert.equal(track[0].id, CUSTOMER_LOGOS[0].id);
  assert.equal(track[11].id, CUSTOMER_LOGOS[0].id);
});
