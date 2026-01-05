import nock from "nock";

beforeAll(() => {
  nock.disableNetConnect();
  nock.enableNetConnect((host) => {
    return host.includes("localhost") || host.includes("127.0.0.1");
  });
  nock("https://example.com")
    .persist()
    .post("/webhook")
    .reply(200, { ok: true });
  nock("https://notification-endpoint.example.com")
    .persist()
    .post("/webhook")
    .reply(200, { ok: true });
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
