const axios = require("axios");
const { SocksProxyAgent } = require("socks-proxy-agent");

const localPort = 1081;
const proxy = `socks5://localhost:${localPort}`;

const agent = new SocksProxyAgent(proxy);
(async () => {
  const response = await axios.request({
    url: "http://fake.chiacloud.farm/ip",
    method: "GET",
    httpsAgent: agent,
    httpAgent: agent,
  });
  console.log(response.data);
})();
