import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/work/doc/monitor.json",
    method: "get",
    response: () => {
      return {
        IsHttps: 0,
        cmsserver: 1,
        result: 0,
        server: {
          clientIp: "58.58.47.142",
          clientIp2: "58.58.47.142",
          clientIp3: "",
          clientOtherPort: "",
          clientPort: 6604,
          deviceIp: "58.58.47.142",
          deviceIp2: "58.58.47.142",
          devicePort: 6602,
          lanip: "192.168.1.244",
          svrid: 3
        },
        monitors: [
          { num: "23116701244", name: "实华监控设备18（在线）", online: true },
          { num: "23116701245", name: "实华监控设备19（在线）", online: true },
          { num: "23116701246", name: "实华监控设备20（离线）", online: false },
          { num: "23116701247", name: "实华监控设备21（在线）", online: true },
          { num: "23116701248", name: "实华监控设备22（在线）", online: true },
          { num: "23116701249", name: "实华监控设备23（离线）", online: false }
        ]
      };
    }
  }
]);
