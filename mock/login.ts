import { defineFakeRoute } from "vite-plugin-fake-server/client";

export default defineFakeRoute([
  // 登录接口
  {
    url: "/sft/sys/user/login",
    method: "post",
    response: ({ body }) => {
      const { uname, upass } = body as { uname?: string; upass?: string };

      if (uname === "admin" && upass === "admin123") {
        return {
          success: true,
          data: {
            avatar: "https://avatars.githubusercontent.com/u/44761321",
            username: "admin",
            nickname: "管理员",
            roles: ["admin"],
            permissions: ["*:*:*"],
            accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
            refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
            expires: "2030/10/30 00:00:00"
          }
        };
      } else {
        return {
          success: false,
          message: "用户名或密码错误"
        };
      }
    }
  },
  // 验证码接口 - 返回 SVG 图片
  {
    url: "/sft/pub/data/captcha",
    method: "get",
    response: () => {
      // 生成随机验证码
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let code = "";
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // 生成简单的 SVG 验证码
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">
          <rect width="120" height="40" fill="#f0f0f0"/>
          <text x="10" y="28" font-family="Arial" font-size="20" font-weight="bold" fill="#333">${code[0]}</text>
          <text x="35" y="28" font-family="Arial" font-size="20" font-weight="bold" fill="#666">${code[1]}</text>
          <text x="60" y="28" font-family="Arial" font-size="20" font-weight="bold" fill="#999">${code[2]}</text>
          <text x="85" y="28" font-family="Arial" font-size="20" font-weight="bold" fill="#333">${code[3]}</text>
          <line x1="0" y1="10" x2="120" y2="10" stroke="#ddd" stroke-width="1"/>
          <line x1="0" y1="30" x2="120" y2="30" stroke="#ddd" stroke-width="1"/>
        </svg>
      `;

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml"
        }
      });
    }
  }
]);
