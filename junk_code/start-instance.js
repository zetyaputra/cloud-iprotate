const tencentcloud = require("tencentcloud-sdk-nodejs");
require("dotenv").config();
const CvmClient = tencentcloud.cvm.v20170312.Client;

const tcSecretId = process.env.TENCENT_SECRET_ID;
const tcSecretKey = process.env.TENCENT_SECRET_KEY;
const clientConfig = {
  credential: {
    secretId: tcSecretId,
    secretKey: tcSecretKey,
  },
  region: "ap-jakarta",
  profile: {
    httpProfile: {
      endpoint: "cvm.tencentcloudapi.com",
    },
  },
};

const client = new CvmClient(clientConfig);
const params = {
  InstanceIds: [""],
};
client.StartInstances(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);
