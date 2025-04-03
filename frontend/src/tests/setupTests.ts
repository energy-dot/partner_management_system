import '@testing-library/jest-dom';

// TextEncoder/TextDecoderのポリフィル
class TextEncoderPolyfill {
  encode(text) {
    const encoder = new util.TextEncoder();
    return encoder.encode(text);
  }
}

class TextDecoderPolyfill {
  decode(buffer) {
    const decoder = new util.TextDecoder();
    return decoder.decode(buffer);
  }
}

// Node.js環境でTextEncoder/TextDecoderが定義されていない場合のポリフィル
if (typeof TextEncoder === 'undefined') {
  const util = require('util');
  global.TextEncoder = util.TextEncoder || TextEncoderPolyfill;
  global.TextDecoder = util.TextDecoder || TextDecoderPolyfill;
}

// matchMediaのモック
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

// フェッチのモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
) as jest.Mock;
