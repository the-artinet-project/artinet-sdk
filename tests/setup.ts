// import nock from "nock";

beforeAll(() => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      const url = typeof input === 'string' ? input : input.url;
      if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
        throw new Error(`Unmocked fetch to: ${url}`);
      }
      return originalFetch(input, init);
    };
  // nock.disableNetConnect();
  // nock.enableNetConnect((host) => {
  //   return host.includes("localhost") || host.includes("127.0.0.1");
  // });
  // nock("https://example.com")
  //   .persist()
  //   .post("/webhook")
  //   .reply(200, { ok: true });
  // nock("https://notification-endpoint.example.com")
  //   .persist()
  //   .post("/webhook")
  //   .reply(200, { ok: true });
});

afterAll(() => {
  // nock.cleanAll();
  // nock.enableNetConnect();
});
