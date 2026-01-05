import nock from "nock";

nock.disableNetConnect();
// nock.enableNetConnect((host) => {
//   return (
//     host.includes("localhost") ||
//     host.includes("127.0.0.1") ||
//     host.match(/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/)
//   ); // Local IPs
// });
beforeAll(() => {
  nock.enableNetConnect((host) => {
    return host.includes("localhost") || host.includes("127.0.0.1");
  });

  nock("https://example.com")
    .persist()
    .post("/webhook")
    .reply(200, { ok: true });
});

afterAll(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
