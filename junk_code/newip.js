const tencentcloud = require("tencentcloud-sdk-nodejs");
const fs = require("fs");
require("dotenv").config();
const moment = require("moment");
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
const stopParams = {
  InstanceIds: [""],
  StopType: "HARD",
  StoppedMode: "STOP_CHARGING",
};

const params = {
  InstanceIds: [""],
};

(async () => {
  let instanceDescribed = await client.DescribeInstances(params);
  let oldip = "";
  if (
    instanceDescribed.InstanceSet[0].PublicIpAddresses == null ||
    instanceDescribed.InstanceSet[0].PublicIpAddresses.length === 0
  ) {
    oldip = "";
  } else {
    oldip = instanceDescribed.InstanceSet[0].PublicIpAddresses[0];
  }
  console.log(`Old IP Address: ${oldip}`);
  let publicIp = "";
  if (instanceDescribed.InstanceSet[0].InstanceState == "RUNNING") {
    const stopInstance = await client.StopInstances(stopParams);
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(`${time} | Instance is RUNNING, stopping...`);
  } else if (instanceDescribed.InstanceSet[0].InstanceState == "STOPPED") {
    const startinstance = await client.StartInstances(params);
    let time = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(`${time} | Instance is NOT RUNNING, starting...`);
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));
  while (true) {
    instanceDescribed = await client.DescribeInstances(params);
    if (
      instanceDescribed.InstanceSet[0].InstanceState == "STARTING" ||
      instanceDescribed.InstanceSet[0].InstanceState == "STOPPING"
    ) {
      let time = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(`${time} | Instance is starting or stopping`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (instanceDescribed.InstanceSet[0].InstanceState == "STOPPED") {
      const startInstance = await client.StartInstances(params);
      let time = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(`${time} | Instance is NOT RUNNING, starting...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else if (instanceDescribed.InstanceSet[0].InstanceState == "RUNNING") {
      break;
    }
  }
  let time = moment().format("YYYY-MM-DD HH:mm:ss");
  console.log(`${time} | Instance is RUNNING`);
  publicIp = instanceDescribed.InstanceSet[0].PublicIpAddresses[0];

  console.log(`New IP Address: ${publicIp}`);
})();
