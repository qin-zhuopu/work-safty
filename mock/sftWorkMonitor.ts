import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟公司数据
const mockCompany = {
  id: 1,
  addUser: {
    id: 1,
    ptype: 0,
    roles: "1",
    status: 1,
    uname: "admin",
    upass: "$2a$10$OBpxBxuSUb65HhmCY48Q0epPSjasTuqijHhEdsofvIISPTpygphyG",
    ushow: "总管理员"
  },
  address: "山东省德州市德城区实华南路6号",
  affiliation: "",
  area_code: "253000",
  asyncDoc: 2,
  asyncPosi: 1,
  asyncPrev: 0,
  asyncRiskDanger: 0,
  asyncRiskEvent: 1,
  asyncRiskJt: 0,
  asyncRiskMeasure: 1,
  asyncRiskMeasureJt: 0,
  asyncRiskRecord: 1,
  asyncRiskTask: 1,
  asyncRiskUnit: 1,
  asyncVideo: 1,
  city: "德州市",
  classification: "",
  com_code: "371400030",
  com_social_code: "913714006667053140",
  culture: "",
  deleteFlag: 0,
  devicePhoto: "",
  devicePhotoName: "",
  distance: 50,
  distance2: 1000,
  distanceLoc: 30.0,
  docType: 0,
  historicalEvolution: "",
  latitude: 37.516636,
  location:
    "http://10.32.164.35:9999/#/fromUrl?topage=bigscreennew&buildid=203733&showmenu=false&token=CD598878BBC0ED9B5750793A7E9304B4",
  location2:
    "http://222.133.40.170:9999/#/fromUrl?topage=bigscreennew&buildid=203733&showmenu=true&token=CD598878BBC0ED9B5750793A7E9304B4",
  location3d:
    "http://222.133.40.170:9999/#/fromUrl?topage=staff-on-duty/CallPolice/List?tabindex=0&buildid=203733&showmenu=false&token=CD598878BBC0ED9B5750793A7E9304B4",
  locationApi: "",
  loginImg: "",
  longitude: 116.367345,
  mainProcess: "德州实华化工有限公司",
  mainProcessPhoto: "",
  mainProcessPhotoName: "0539-2367889",
  mainRawMaterial: "",
  major: "李宝瑞",
  material: "电石和工业盐",
  name: "",
  otherRawMaterial: "",
  phone: "0534-2622704",
  planePhoto: "",
  planePhotoName:
    "http://58.58.47.114:7809/realtimeLocation_2d?xinruikcAuth=fe72128140244fdfa226211f3089623c",
  product: "PVC树脂，离子膜烧碱，液氯，双氧水",
  satellitePhoto:
    "甲基丙烯酸甲酯、丙烯酸正丁酯、苯乙烯、丙烯腈、液氯、乳化剂、聚乙烯",
  satellitePhotoName: "ACR、MC塑料助剂、副产品盐酸",
  scale: "聚合工艺、氯化工艺",
  technology: "离子膜烧碱、电石法PVC树脂、蒽醌法双氧水",
  token: "4899488080",
  vision: "唐传训",
  votype: 1,
  weekday: 0
};

// 模拟监控设备数据
const mockMonitorData = [
  { id: 1, name: "实华监控设备1", num: "22095715184", company: mockCompany },
  { id: 2, name: "实华监控设备2", num: "22095715204", company: mockCompany },
  { id: 3, name: "实华监控设备3", num: "22095715182", company: mockCompany },
  { id: 4, name: "实华监控设备4", num: "22095715205", company: mockCompany },
  { id: 5, name: "实华监控设备5", num: "22095715239", company: mockCompany },
  { id: 6, name: "实华监控设备6", num: "22125719063", company: mockCompany },
  { id: 7, name: "实华监控设备7", num: "22125718971", company: mockCompany },
  { id: 8, name: "实华监控设备8", num: "22125718980", company: mockCompany },
  { id: 9, name: "实华监控设备9", num: "22125719089", company: mockCompany },
  { id: 10, name: "实华监控设备10", num: "22125719086", company: mockCompany },
  { id: 11, name: "实华监控设备11", num: "22095715185", company: mockCompany },
  {
    id: 12,
    name: "实华监控设备12",
    num: "22095715206",
    company: mockCompany,
    chosen: true
  },
  { id: 13, name: "实华监控设备13", num: "22095715183", company: mockCompany },
  { id: 14, name: "实华监控设备14", num: "22095715207", company: mockCompany },
  { id: 15, name: "实华监控设备15", num: "22125719064", company: mockCompany },
  { id: 16, name: "实华监控设备16", num: "22125718972", company: mockCompany },
  { id: 17, name: "实华监控设备17", num: "22125718981", company: mockCompany },
  { id: 18, name: "实华监控设备18", num: "22125719090", company: mockCompany },
  {
    id: 19,
    name: "实华监控设备19",
    num: "22125719087",
    company: mockCompany,
    chosen: true
  },
  { id: 20, name: "实华监控设备20", num: "22095715186", company: mockCompany },
  { id: 21, name: "实华监控设备21", num: "22095715208", company: mockCompany },
  { id: 22, name: "实华监控设备22", num: "22095715184", company: mockCompany },
  { id: 23, name: "实华监控设备23", num: "22095715209", company: mockCompany },
  { id: 24, name: "实华监控设备24", num: "22125719065", company: mockCompany },
  { id: 25, name: "实华监控设备25", num: "22125718973", company: mockCompany },
  { id: 26, name: "实华监控设备26", num: "22125718982", company: mockCompany },
  { id: 27, name: "实华监控设备27", num: "22125719091", company: mockCompany },
  { id: 28, name: "实华监控设备28", num: "22125719088", company: mockCompany },
  { id: 29, name: "实华监控设备29", num: "22095715187", company: mockCompany },
  { id: 30, name: "实华监控设备30", num: "22095715210", company: mockCompany },
  { id: 31, name: "实华监控设备31", num: "22095715185", company: mockCompany },
  { id: 32, name: "实华监控设备32", num: "22095715211", company: mockCompany },
  { id: 33, name: "实华监控设备33", num: "22125719066", company: mockCompany },
  { id: 34, name: "实华监控设备34", num: "22125718974", company: mockCompany }
];

export default defineFakeRoute([
  {
    url: "/sft/work/monitor/list",
    method: "get",
    response: ({ query }) => {
      const page = parseInt(query.page as string) || 1;
      const size = parseInt(query.size as string) || 10;
      const name = (query.name as string) || "";

      // 过滤数据
      let filteredData = [...mockMonitorData];

      if (name) {
        filteredData = filteredData.filter(item => item.name?.includes(name));
      }

      // 分页
      const start = (page - 1) * size;
      const end = start + size;
      const pageData = filteredData.slice(start, end);

      return {
        success: true,
        t: {
          content: pageData,
          totalElements: filteredData.length,
          pageable: {
            offset: 0,
            pageNumber: page - 1,
            pageSize: size,
            paged: true,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true
            },
            unpaged: false
          },
          first: page === 1,
          last: end >= filteredData.length,
          number: page - 1,
          numberOfElements: pageData.length,
          size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true
          },
          empty: pageData.length === 0,
          totalPages: Math.ceil(filteredData.length / size)
        }
      };
    }
  }
]);
