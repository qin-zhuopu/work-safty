import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  {
    url: "/sft/sys/dept/all.json",
    method: "get",
    response: () => {
      return {
        success: true,
        t: [
          {
            id: 1,
            name: "实华化工有限公司",
            open: true,
            perId: 0,
            value: 1,
            children: [
              {
                id: 2,
                name: "德州实华化工有限公司",
                open: false,
                parentName: "实华化工有限公司",
                perId: 0,
                value: 2,
                children: [
                  {
                    id: 3,
                    name: "公司领导",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 3,
                    children: []
                  },
                  {
                    id: 4,
                    name: "办公室（党委办公室）",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 4,
                    children: [
                      {
                        id: 2483,
                        name: "保卫管理办公室",
                        open: false,
                        parentName: "办公室（党委办公室）",
                        perId: 0,
                        value: 2483,
                        children: []
                      },
                      {
                        id: 2484,
                        name: "后勤保障办公室",
                        open: false,
                        parentName: "办公室（党委办公室）",
                        perId: 0,
                        value: 2484,
                        children: []
                      },
                      {
                        id: 2485,
                        name: "行政（党委）办公室",
                        open: false,
                        parentName: "办公室（党委办公室）",
                        perId: 0,
                        value: 2485,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 8,
                    name: "人力资源部",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 8,
                    children: []
                  },
                  {
                    id: 9,
                    name: "HSE管理部",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 9,
                    children: [
                      {
                        id: 2486,
                        name: "安全管理办公室",
                        open: false,
                        parentName: "HSE管理部",
                        perId: 0,
                        value: 2486,
                        children: []
                      },
                      {
                        id: 2487,
                        name: "环保管理办公室",
                        open: false,
                        parentName: "HSE管理部",
                        perId: 0,
                        value: 2487,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 19,
                    name: "聚氯乙烯车间",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 19,
                    children: [
                      {
                        id: 47,
                        name: "合成工段",
                        open: false,
                        parentName: "聚氯乙烯车间",
                        perId: 0,
                        value: 47,
                        children: []
                      },
                      {
                        id: 52,
                        name: "聚合工段",
                        open: false,
                        parentName: "聚氯乙烯车间",
                        perId: 0,
                        value: 52,
                        children: []
                      },
                      {
                        id: 62,
                        name: "聚氯乙烯维修工段",
                        open: false,
                        parentName: "聚氯乙烯车间",
                        perId: 0,
                        value: 62,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 20,
                    name: "电解车间",
                    open: false,
                    parentName: "德州实华化工有限公司",
                    perId: 0,
                    value: 20,
                    children: [
                      {
                        id: 75,
                        name: "离子膜工段",
                        open: false,
                        parentName: "电解车间",
                        perId: 0,
                        value: 75,
                        children: []
                      },
                      {
                        id: 76,
                        name: "氯氢处理及氯化氢工段",
                        open: false,
                        parentName: "电解车间",
                        perId: 0,
                        value: 76,
                        children: []
                      },
                      {
                        id: 80,
                        name: "盐水工段",
                        open: false,
                        parentName: "电解车间",
                        perId: 0,
                        value: 80,
                        children: []
                      }
                    ]
                  },
                  {
                    id: 24,
                    name: "泰安分公司",
                    open: false,
                    parentName: "实华化工有限公司",
                    perId: 0,
                    value: 24,
                    children: [
                      {
                        id: 103,
                        name: "电仪维工段",
                        open: false,
                        parentName: "泰安分公司",
                        perId: 0,
                        value: 103,
                        children: []
                      },
                      {
                        id: 104,
                        name: "公用工程工段（泰安）",
                        open: false,
                        parentName: "泰安分公司",
                        perId: 0,
                        value: 104,
                        children: []
                      }
                    ]
                  }
                ]
              },
              {
                id: 2434,
                name: "承包商",
                open: false,
                parentName: "实华化工有限公司",
                perId: 0,
                value: 2434,
                children: [
                  {
                    id: 2459,
                    name: "济宁兰博生物科技有限公司",
                    open: false,
                    parentName: "承包商",
                    perId: 0,
                    value: 2459,
                    children: []
                  },
                  {
                    id: 2460,
                    name: "沧州市瑞星清洗防腐有限公司",
                    open: false,
                    parentName: "承包商",
                    perId: 0,
                    value: 2460,
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      };
    }
  },
  {
    url: "/sft/sys/user/list.json",
    method: "get",
    response: ({
      query
    }: {
      query: {
        page?: string;
        size?: string;
        deptId?: string;
        pname?: string;
        status?: string;
      };
    }) => {
      const page = Number(query.page) || 1;
      const size = Number(query.size) || 10;

      const allUsers = [
        {
          id: 1,
          ushow: "张三",
          uname: "zhangsan",
          telephone: "13800138001",
          status: "1",
          job: "安全员",
          roles: "1,2",
          remark: "备注1"
        },
        {
          id: 2,
          ushow: "李四",
          uname: "lisi",
          telephone: "13800138002",
          status: "1",
          job: "操作员",
          roles: "1",
          remark: "备注2"
        },
        {
          id: 3,
          ushow: "王五",
          uname: "wangwu",
          telephone: "13800138003",
          status: "2",
          job: "技术员",
          roles: "2",
          remark: "备注3"
        },
        {
          id: 4,
          ushow: "赵六",
          uname: "zhaoliu",
          telephone: "13800138004",
          status: "1",
          job: "工程师",
          roles: "1,2,3",
          remark: "备注4"
        },
        {
          id: 5,
          ushow: "孙七",
          uname: "sunqi",
          telephone: "13800138005",
          status: "1",
          job: "主任",
          roles: "3",
          remark: "备注5"
        },
        {
          id: 6,
          ushow: "周八",
          uname: "zhouba",
          telephone: "13800138006",
          status: "3",
          job: "操作员",
          roles: "1",
          remark: "备注6"
        },
        {
          id: 7,
          ushow: "吴九",
          uname: "wujiu",
          telephone: "13800138007",
          status: "1",
          job: "安全员",
          roles: "2",
          remark: "备注7"
        },
        {
          id: 8,
          ushow: "郑十",
          uname: "zhengshi",
          telephone: "13800138008",
          status: "1",
          job: "操作员",
          roles: "1",
          remark: "备注8"
        },
        {
          id: 9,
          ushow: "陈一",
          uname: "chenyi",
          telephone: "13800138009",
          status: "2",
          job: "技术员",
          roles: "1,2",
          remark: "备注9"
        },
        {
          id: 10,
          ushow: "林二",
          uname: "liner",
          telephone: "13800138010",
          status: "1",
          job: "工程师",
          roles: "3",
          remark: "备注10"
        },
        {
          id: 11,
          ushow: "黄三",
          uname: "huangsan",
          telephone: "13800138011",
          status: "1",
          job: "操作员",
          roles: "1",
          remark: "备注11"
        },
        {
          id: 12,
          ushow: "刘四",
          uname: "lius",
          telephone: "13800138012",
          status: "1",
          job: "安全员",
          roles: "2",
          remark: "备注12"
        }
      ];

      let filteredUsers = [...allUsers];

      if (query.pname) {
        filteredUsers = filteredUsers.filter(u =>
          u.ushow.includes(query.pname || "")
        );
      }
      if (query.status) {
        filteredUsers = filteredUsers.filter(u => u.status === query.status);
      }

      const totalElements = filteredUsers.length;
      const start = (page - 1) * size;
      const content = filteredUsers.slice(start, start + size);

      return {
        success: true,
        t: {
          totalElements,
          content
        }
      };
    }
  }
]);
