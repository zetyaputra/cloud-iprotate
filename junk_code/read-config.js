const ConfigParser = require("configparser");
const { as } = require("tencentcloud-sdk-nodejs");

const config = new ConfigParser();

config.read("config.conf");

//get all config from config.conf
const confList = config.sections();
let tencentConfigList = [];
let cloudflareConfigList = [];

for (let i = 0; i < confList.length; i++) {
  const configName = confList[i];
  const configType = config.get(confList[i], "type").trim();
  console.log(`[${i}] configName: ${configName}, configType: ${configType}`);
  if (configType == "tencent") {
    console.log(`${configName} type is tencent`);
    tencentConfigList.push(`${configName}`);
  } else if (configType == "cloudflare") {
    console.log(`${configName} type is cloudflare`);
    cloudflareConfigList.push(`${configName}`);
  }
}

console.log(tencentConfigList);
console.log(cloudflareConfigList);
