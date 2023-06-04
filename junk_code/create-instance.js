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
  InstanceChargeType: "POSTPAID_BY_HOUR",
  Placement: {
    Zone: "ap-jakarta-1",
    ProjectId: 0,
  },
  InstanceType: "S5.MEDIUM2",
  ImageId: "img-22trbn9x",
  SystemDisk: {
    DiskType: "CLOUD_BSSD",
    DiskSize: 20,
  },
  VirtualPrivateCloud: {
    VpcId: "DEFAULT",
    SubnetId: "DEFAULT",
    AsVpcGateway: false,
  },
  InternetAccessible: {
    InternetChargeType: "TRAFFIC_POSTPAID_BY_HOUR",
    InternetMaxBandwidthOut: 10,
    PublicIpAssigned: true,
  },
  InstanceCount: 1,
  InstanceName: "rotate-server-iddd",
  LoginSettings: {
    KeyIds: [""],
  },
  SecurityGroupIds: [""],
  EnhancedService: {
    SecurityService: {
      Enabled: true,
    },
    MonitorService: {
      Enabled: true,
    },
  },
  DisableApiTermination: false,
};

client.RunInstances(params).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.error("error", err);
  }
);
