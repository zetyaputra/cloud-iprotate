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

const params = {
  InstanceIds: ["ins-rfcj55sf"],
};
//root async function
(async () => {
  const client = new CvmClient(clientConfig);
  let instanceDescribed = await client.DescribeInstances(params);
  console.log(instanceDescribed);
  /*while (true) {
    if (instanceDescribed.InstanceSet[0].InstanceState == "RUNNING") {
      console.log("Instance is running");
      break;
    } else {
      console.log("Instance is not running");
      instanceDescribed = await client.DescribeInstances(params);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  */
})();
