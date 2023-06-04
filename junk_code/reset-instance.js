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

//loop for 10 times

(async () => {
  while (true) {
    let publicIp = "";
    let instanceDescribed = await client.DescribeInstances(params);
    while (true) {
      if (
        instanceDescribed.InstanceSet[0].InstanceState == "STARTING" ||
        instanceDescribed.InstanceSet[0].InstanceState == "STOPPING"
      ) {
        let time = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(`${time} | Instance is starting or stopping`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        instanceDescribed = await client.DescribeInstances(params);
      } else {
        break;
      }
    }
    if (instanceDescribed.InstanceSet[0].InstanceState == "RUNNING") {
      let time = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(`${time} | Instance is RUNNING`);
      publicIp = instanceDescribed.InstanceSet[0].PublicIpAddresses[0];
    }
    if (instanceDescribed.InstanceSet[0].InstanceState == "STOPPED") {
      await client.StartInstances(params);
      let time = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(`${time} | Instance is NOT RUNNING`);
      while (true) {
        if (instanceDescribed.InstanceSet[0].InstanceState == "RUNNING") {
          let time = moment().format("YYYY-MM-DD HH:mm:ss");
          console.log(`${time} | Instance is RUNNING`);
          publicIp = instanceDescribed.InstanceSet[0].PublicIpAddresses[0];
          break;
        } else {
          instanceDescribed = await client.DescribeInstances(params);
        }
      }
    }
    //save to a file time | ip address
    const time = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = `${time} | ${publicIp}`;
    console.log(data);
    fs.appendFile("ip-address.txt", `${data}\n`, (err) => {
      if (err) throw err;
    });
    await client.StopInstances(stopParams);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
})();
