import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/data/gds/data",
    method: "get",
    response: ({ query }) => {
      const page = Number(query.page || 0);
      const size = Number(query.size || 10);

      return {
        success: true,
        t: {
          content: [
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030012G0002",
                comId: 1,
                high: 50.0,
                id: 82,
                low: 0.0,
                lower: 0.0,
                max: 55.0,
                min: 0.0,
                name: "稀品储槽V401-B",
                tag: "371400030012G0002WD001",
                type: "罐",
                unit: "℃",
                upper: 100.0
              },
              id: 646035,
              status: 4,
              t: 1737767040000,
              v: -0.04015
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030010G0004",
                comId: 1,
                high: 1850.0,
                id: 105,
                low: -5.0,
                lower: -5.0,
                max: 2600.0,
                min: -5.0,
                name: "液氯储槽V604-D",
                tag: "371400030010G0004YW002",
                type: "罐",
                unit: "mm",
                upper: 2600.0
              },
              id: 646034,
              status: 3,
              t: 1730097060000,
              v: 1940.637207
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030008Q0002",
                comId: 1,
                high: 3.6,
                id: 68,
                low: -2.0,
                lower: -2.0,
                max: 7.2,
                min: -2.0,
                name: "2#回收单体气柜西单体气体报警-AGT_3105",
                tag: "371400030008Q0002QT001",
                type: "气体检测",
                unit: "PPM",
                upper: 75.0
              },
              id: 646033,
              status: 4,
              t: 1731108060000,
              v: -12.5
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0003",
                comId: 1,
                high: 25.0,
                id: 12,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "9#槽北面氢气报警-AGT_2027",
                tag: "371400030007Q0003QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646031,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0026",
                comId: 1,
                high: 25.0,
                id: 35,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "11#槽北面氢气报警-AGT_2028",
                tag: "371400030007Q0026QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646030,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0002",
                comId: 1,
                high: 25.0,
                id: 11,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "13#槽北面氢气报警-AGT_2029",
                tag: "371400030007Q0002QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646029,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0001",
                comId: 1,
                high: 25.0,
                id: 10,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "540巡检室1#点火柜上方氢气报警-AGT_4007",
                tag: "371400030007Q0001QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646028,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0005",
                comId: 1,
                high: 25.0,
                id: 14,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "540巡检室3.4#点火柜上方氢气报警-AGT_4008",
                tag: "371400030007Q0005QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646027,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0018",
                comId: 1,
                high: 25.0,
                id: 27,
                low: -2.0,
                lower: -2.0,
                max: 50.0,
                min: -2.0,
                name: "氯化氢9#炉一楼平台氢气报警-AGT_4051",
                tag: "371400030007Q0018QT001",
                type: "气体检测",
                unit: "%LEL",
                upper: 100.0
              },
              id: 646026,
              status: 4,
              t: 1687922040000,
              v: -25.0
            },
            {
              delMarks: 1,
              gdsDevice: {
                addr: "371400030007Q0023",
                comId: 1,
                high: 1.0,
                id: 32,
                low: -2.0,
                lower: -2.0,
                max: 2.0,
                min: -2.0,
                name: "氯化氢9#炉一楼平台氯气报警-AGT_4054",
                tag: "371400030007Q0023QT001",
                type: "气体检测",
                unit: "PPM",
                upper: 10.0
              },
              id: 646025,
              status: 3,
              t: 1750414440000,
              v: 1.8075
            }
          ],
          empty: false,
          first: true,
          last: false,
          number: page,
          numberOfElements: size,
          pageable: {
            offset: page * size,
            pageNumber: page,
            pageSize: size,
            paged: true,
            sort: {
              empty: false,
              sorted: true,
              unsorted: false
            },
            unpaged: false
          },
          size: size,
          sort: {
            empty: false,
            sorted: true,
            unsorted: false
          },
          totalElements: 615664,
          totalPages: 61567
        }
      };
    }
  }
]);
