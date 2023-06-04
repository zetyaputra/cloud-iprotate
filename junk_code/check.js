// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const CvmClient = tencentcloud.cvm.v20170312.Client;

// Required steps:
// Instantiate an authentication object. The Tencent Cloud account key pair `secretId` and `secretKey` need to be passed in as the input parameters
// This example uses the way to read from the environment variable, so you need to set these two values in the environment variable in advance
// You can also write the key pair directly into the code, but be careful not to copy, upload, or share the code to others
// Query the CAM key: https://console.tencentcloud.com/capi
const clientConfig = {
  credential: {
    secretId: "",
    secretKey: "",
  },
  region: "ap-jakarta",
  profile: {
    httpProfile: {
      endpoint: "cvm.tencentcloudapi.com",
    },
  },
};

// Instantiate an client object
// The second parameter is the region information. You can directly enter the string "ap-guangzhou" or import the preset constant
const client = new CvmClient(clientConfig);
const params = {
  InstanceIds: [""],
};
client.DescribeInstances(params).then(
  (data) => {
    console.log(data.InstanceSet[0]);
  },
  (err) => {
    console.error("error", err);
  }
);
