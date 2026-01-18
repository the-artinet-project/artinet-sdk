
beforeAll(() => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
        throw new Error(`Unmocked fetch to: ${url}`);
      }
      return originalFetch(input, init);
    };
});
