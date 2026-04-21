const app = document.getElementById("app");

const store = {
  openTabs: [
    { key: "dashboard", label: "首页信息" },
    { key: "merchantList", label: "商户列表" },
    { key: "rechargeList", label: "充值列表" },
    { key: "userList", label: "用户管理" },
  ],
  route: parseRoute(),
  flash: "",
  activeUserTab: "profile",
  activeKycId: null,
  auditForm: {
    status: "approved",
    remark: "",
  },
  walletLimitEditMode: false,
  pendingWalletLimitConfig: null,
  walletLimitConfig: [
    {
      level: "Basic",
      balanceLimit: 5000,
      monthlyCashInLimit: 5000,
      monthlyPayoutLimit: 5000,
      note: "基础钱包，无需审核，适用于初始开户用户。",
    },
    {
      level: "Verified",
      balanceLimit: 50000,
      monthlyCashInLimit: 50000,
      monthlyPayoutLimit: 50000,
      note: "KYC 审核通过到 Verified 后生效。",
    },
    {
      level: "Fully Verified",
      balanceLimit: 100000,
      monthlyCashInLimit: 100000,
      monthlyPayoutLimit: 100000,
      note: "KYC 审核通过到 Fully Verified 后生效。",
    },
    {
      level: "Enhanced",
      balanceLimit: 500000,
      monthlyCashInLimit: 500000,
      monthlyPayoutLimit: 500000,
      note: "增强账户，按系统规则或后台受控操作生效。",
    },
  ],
  users: [
    {
      id: "U100001",
      phone: "9179515904",
      walletLevel: "Basic",
      walletBalance: 1520.75,
      status: "enabled",
      fullName: "Maria Santos",
      birthDate: "1996-03-17",
      nationality: "Philippines",
      email: "maria.santos@ipaydemo.ph",
      homeAddress: "1209 Taft Ave, Malate, Manila, Philippines",
      documentType: "Passport",
      documentNumber: "P88732019",
      facePhoto: true,
      idPhotoLabel: "Passport Front",
      lastUpdated: "2026-04-17 14:20:31",
      statusHistory: [
        { time: "2026-04-16 18:20:10", operator: "System", action: "创建钱包用户", remark: "初始状态：启用" },
      ],
      walletHistory: [
        { type: "Cash In", channel: "GCash", amount: 2000, createdAt: "2026-04-17 14:20:31", note: "-", balance: 1520.75 },
        { type: "Withdrawal", channel: "Bank", amount: -479.25, createdAt: "2026-04-17 15:12:08", note: "Manual settlement", balance: 1520.75 },
      ],
    },
    {
      id: "U100002",
      phone: "09467250765",
      walletLevel: "Verified",
      walletBalance: 5000.0,
      status: "enabled",
      fullName: "Juan Dela Cruz",
      birthDate: "1992-11-07",
      nationality: "Philippines",
      email: "juan.delacruz@ipaydemo.ph",
      homeAddress: "32 E. Rodriguez Sr. Ave, Quezon City, Philippines",
      documentType: "Driver's License",
      documentNumber: "N09-12-888771",
      facePhoto: true,
      idPhotoLabel: "Driver's License",
      lastUpdated: "2026-04-17 15:06:22",
      statusHistory: [
        { time: "2026-04-17 10:40:21", operator: "KYC Admin", action: "等级生效", remark: "Verified 审核通过后钱包等级更新" },
      ],
      walletHistory: [
        { type: "Cash In", channel: "7-Eleven", amount: 5000, createdAt: "2026-04-17 12:30:08", note: "-", balance: 5000.0 },
      ],
    },
    {
      id: "U100003",
      phone: "0995735712",
      walletLevel: "Fully Verified",
      walletBalance: 43220.21,
      status: "disabled",
      fullName: "Angela Reyes",
      birthDate: "1989-07-28",
      nationality: "Philippines",
      email: "angela.reyes@ipaydemo.ph",
      homeAddress: "76 Colon St, Cebu City, Philippines",
      documentType: "National ID",
      documentNumber: "PHL-8820-1182",
      facePhoto: false,
      idPhotoLabel: "National ID",
      lastUpdated: "2026-04-17 11:40:09",
      statusHistory: [
        { time: "2026-04-17 11:00:05", operator: "Risk Admin", action: "用户禁用", remark: "风控复核中，临时禁用" },
      ],
      walletHistory: [
        { type: "Cash In", channel: "Bank", amount: 20000, createdAt: "2026-04-16 18:00:22", note: "-", balance: 42020.21 },
        { type: "Withdrawal", channel: "Bank", amount: -800, createdAt: "2026-04-17 09:52:55", note: "Compliance check", balance: 43220.21 },
      ],
    },
    {
      id: "U100004",
      phone: "9453784225",
      walletLevel: "Enhanced",
      walletBalance: 213455.6,
      status: "cancelled",
      fullName: "Roberto Lim",
      birthDate: "1987-01-12",
      nationality: "Philippines",
      email: "roberto.lim@ipaydemo.ph",
      homeAddress: "Greenhills, San Juan, Metro Manila, Philippines",
      documentType: "UMID",
      documentNumber: "UM-338211-99",
      facePhoto: true,
      idPhotoLabel: "UMID",
      lastUpdated: "2026-04-15 19:44:40",
      statusHistory: [
        { time: "2026-04-15 19:44:40", operator: "System", action: "系统升级", remark: "满足规则后升级为 Enhanced" },
      ],
      walletHistory: [
        { type: "Cash In", channel: "Bank", amount: 150000, createdAt: "2026-04-11 10:00:00", note: "-", balance: 213455.6 },
      ],
    },
  ],
  kycRecords: [
    {
      id: "KYC20260417001",
      userId: "U100002",
      userName: "Juan Dela Cruz",
      phone: "09467250765",
      applyLevel: "Verified",
      currentLevel: "Basic",
      documentType: "Driver's License",
      documentNumber: "N09-12-888771",
      submittedAt: "2026-04-17 10:10:21",
      status: "pending",
      facePhoto: true,
      documentPhotoLabel: "Driver's License Photo",
      facePhotoLabel: "Selfie Face Match",
      remark: "",
      auditedAt: "",
      auditor: "",
      auditLogs: [
        { time: "2026-04-17 10:10:21", operator: "App User", action: "提交申请", remark: "发起 Verified KYC 申请" },
      ],
    },
    {
      id: "KYC20260417002",
      userId: "U100003",
      userName: "Angela Reyes",
      phone: "0995735712",
      applyLevel: "Fully Verified",
      currentLevel: "Verified",
      documentType: "National ID",
      documentNumber: "PHL-8820-1182",
      submittedAt: "2026-04-17 09:28:45",
      status: "approved",
      facePhoto: false,
      documentPhotoLabel: "National ID Photo",
      facePhotoLabel: "",
      remark: "资料清晰，信息一致",
      auditedAt: "2026-04-17 09:40:12",
      auditor: "KYC Admin A",
      auditLogs: [
        { time: "2026-04-17 09:28:45", operator: "App User", action: "提交申请", remark: "发起 Fully Verified KYC 申请" },
        { time: "2026-04-17 09:40:12", operator: "KYC Admin A", action: "审核通过", remark: "资料清晰，信息一致" },
      ],
    },
    {
      id: "KYC20260417003",
      userId: "U100001",
      userName: "Maria Santos",
      phone: "9179515904",
      applyLevel: "Verified",
      currentLevel: "Basic",
      documentType: "Passport",
      documentNumber: "P88732019",
      submittedAt: "2026-04-16 18:06:18",
      status: "rejected",
      facePhoto: true,
      documentPhotoLabel: "Passport Photo",
      facePhotoLabel: "Manual Face Photo",
      remark: "人脸照片与证件照不一致，请重新上传",
      auditedAt: "2026-04-16 18:22:59",
      auditor: "KYC Admin B",
      auditLogs: [
        { time: "2026-04-16 18:06:18", operator: "App User", action: "提交申请", remark: "发起 Verified KYC 申请" },
        { time: "2026-04-16 18:22:59", operator: "KYC Admin B", action: "审核拒绝", remark: "人脸照片与证件照不一致，请重新上传" },
      ],
    },
  ],
};

const routes = {
  dashboard: { title: "首页信息", crumbs: ["首页信息"] },
  merchantList: { title: "商户管理", crumbs: ["商户管理", "商户列表"] },
  rechargeList: { title: "交易管理", crumbs: ["交易管理", "充值列表"] },
  walletLimitConfig: { title: "系统管理", crumbs: ["系统管理", "用户钱包限额配置"] },
  userList: { title: "用户管理", crumbs: ["用户管理", "用户管理"] },
  kycAudit: { title: "用户管理", crumbs: ["用户管理", "用户认证审核管理"] },
  userDetail: { title: "用户详情", crumbs: ["用户管理", "用户详情"] },
};

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) {
    return { name: "userList", params: {} };
  }
  const [pathPart] = hash.split("?");
  const parts = pathPart.split("/").filter(Boolean);
  if (parts[0] === "users" && parts[1]) {
    return { name: "userDetail", params: { userId: parts[1] } };
  }
  if (parts[0] === "kyc") {
    return { name: "kycAudit", params: {} };
  }
  return { name: parts[0], params: {} };
}

function formatMoney(value) {
  return Number(value).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getLevelClass(level) {
  if (level === "Verified") return "verified";
  if (level === "Fully Verified") return "fully";
  if (level === "Enhanced") return "enhanced";
  return "";
}

function getUser(userId) {
  return store.users.find((user) => user.id === userId) || store.users[0];
}

function getLatestKycRecord(userId) {
  const records = store.kycRecords.filter((item) => item.userId === userId);
  if (!records.length) {
    return null;
  }
  return records
    .slice()
    .sort((a, b) => new Date(b.submittedAt.replace(/-/g, "/")) - new Date(a.submittedAt.replace(/-/g, "/")))[0];
}

function getApprovedKycRecord(userId) {
  const records = store.kycRecords.filter((item) => item.userId === userId && item.status === "approved");
  if (!records.length) {
    return null;
  }
  return records
    .slice()
    .sort((a, b) => new Date(b.submittedAt.replace(/-/g, "/")) - new Date(a.submittedAt.replace(/-/g, "/")))[0];
}

function getAuditTargetLevel(record) {
  if (!record) return "";
  if (record.applyLevel === "Verified") return "Verified";
  if (record.applyLevel === "Fully Verified") return "Fully Verified";
  return record.applyLevel;
}

function formatAuditAction(status) {
  if (status === "approved") return "审核通过";
  if (status === "rejected") return "审核拒绝";
  return "待审核";
}

function navigate(hash, options = {}) {
  if (options.userTab) {
    store.activeUserTab = options.userTab;
  }
  window.location.hash = hash;
}

function render() {
  store.route = parseRoute();
  const currentRoute = routes[store.route.name] || routes.userList;
  app.innerHTML = `
    <div class="layout">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar(currentRoute)}
        ${renderTabs()}
        <div class="content">
          ${store.flash ? `<div class="banner">${store.flash}</div>` : ""}
          ${renderPage()}
        </div>
      </main>
    </div>
    ${renderAuditModal()}
    ${renderWalletLimitConfirmModal()}
  `;
  bindEvents();
}

function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">IPAYS</div>
      <div class="nav-group">
        <div class="nav-group-title">首页信息 <small></small></div>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">商户管理 <small>⌄</small></div>
        <div class="nav-items">
          <a class="nav-item ${store.route.name === "merchantList" ? "active" : ""}" href="#merchantList">商户列表</a>
        </div>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">交易管理 <small>⌄</small></div>
        <div class="nav-items">
          <a class="nav-item ${store.route.name === "rechargeList" ? "active" : ""}" href="#rechargeList">充值列表</a>
        </div>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">话费充值管理 <small>⌄</small></div>
        <div class="nav-items">
          <a class="nav-item" href="#dashboard">渠道管理</a>
        </div>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">系统管理 <small>⌄</small></div>
        <div class="nav-items">
          <a class="nav-item" href="#dashboard">系统参数</a>
          <a class="nav-item ${store.route.name === "walletLimitConfig" ? "active" : ""}" href="#walletLimitConfig">用户钱包限额配置</a>
        </div>
      </div>
      <div class="nav-group">
        <div class="nav-group-title">用户管理 <small>⌄</small></div>
        <div class="nav-items">
          <a class="nav-item ${store.route.name === "userList" || store.route.name === "userDetail" ? "active" : ""}" href="#userList">用户管理</a>
          <a class="nav-item ${store.route.name === "kycAudit" ? "active" : ""}" href="#kyc">用户认证审核管理</a>
        </div>
      </div>
    </aside>
  `;
}

function renderTopbar(routeMeta) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <span class="burger">☰</span>
        <div class="crumbs">/ ${routeMeta.crumbs.join(" / ")}</div>
      </div>
      <div class="topbar-right">
        <span>⛶</span>
        <span>文A</span>
        <span class="avatar">SX</span>
      </div>
    </header>
  `;
}

function renderTabs() {
  const activeKey = store.route.name === "userDetail" ? "userList" : store.route.name;
  return `
    <div class="tabs-bar">
      ${store.openTabs
        .map(
          (tab) =>
            `<a class="page-tab ${tab.key === activeKey ? "active" : ""}" href="#${tab.key}">${tab.label}</a>`
        )
        .join("")}
      <a class="page-tab ${store.route.name === "walletLimitConfig" ? "active" : ""}" href="#walletLimitConfig">用户钱包限额配置</a>
      <a class="page-tab ${store.route.name === "kycAudit" ? "active" : ""}" href="#kyc">用户认证审核管理</a>
      ${store.route.name === "userDetail" ? `<span class="page-tab active">用户详情</span>` : ""}
    </div>
  `;
}

function renderPage() {
  switch (store.route.name) {
    case "merchantList":
      return renderPlaceholderPage("商户列表", "这里保留了原后台常见模块入口，方便后续继续扩展商户相关功能。");
    case "rechargeList":
      return renderRechargePage();
    case "walletLimitConfig":
      return renderWalletLimitConfigPage();
    case "kycAudit":
      return renderKycAuditPage();
    case "userDetail":
      return renderUserDetailPage();
    case "dashboard":
      return renderPlaceholderPage("首页信息", "后台壳子已经完成，后面可以继续往首页补统计组件和快捷入口。");
    default:
      return renderUserListPage();
  }
}

function renderPlaceholderPage(title, description) {
  return `
    <section class="card detail-card">
      <div class="detail-header">
        <div class="title-block">
          <h1>${title}</h1>
          <div class="title-meta"><span>${description}</span></div>
        </div>
      </div>
      <p class="empty-note">当前重点实现的是用户管理与 KYC 审核模块，其他菜单保留为同风格占位入口。</p>
    </section>
  `;
}

function renderWalletLimitConfigPage() {
  const isEditMode = store.walletLimitEditMode;
  return `
    <section class="card detail-card">
      <div class="section-title">用户钱包限额配置</div>
      <form id="walletLimitConfigForm">
        <table>
          <thead>
            <tr>
              <th>钱包等级</th>
              <th>钱包余额限额（PHP）</th>
              <th>月入账限额（PHP）</th>
              <th>月支出限额（PHP）</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            ${store.walletLimitConfig
              .map(
                (item, index) => `
              <tr>
                <td><span class="pill ${getLevelClass(item.level)}">${item.level}</span></td>
                <td><input name="balance-${index}" type="number" min="0" step="1" value="${item.balanceLimit}" ${isEditMode ? "" : "disabled"} /></td>
                <td><input name="cashIn-${index}" type="number" min="0" step="1" value="${item.monthlyCashInLimit}" ${isEditMode ? "" : "disabled"} /></td>
                <td><input name="payout-${index}" type="number" min="0" step="1" value="${item.monthlyPayoutLimit}" ${isEditMode ? "" : "disabled"} /></td>
                <td><input name="note-${index}" type="text" value="${item.note}" ${isEditMode ? "" : "disabled"} /></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <div class="action-row">
          ${
            isEditMode
              ? `<button class="btn primary" type="submit">保存配置</button>
                 <button class="btn ghost" type="button" data-wallet-limit-cancel="1">取消</button>`
              : `<button class="btn primary" type="button" data-wallet-limit-edit="1">修改</button>`
          }
          <span id="walletLimitError" class="error-text"></span>
        </div>
      </form>
    </section>
  `;
}

function renderWalletLimitConfirmModal() {
  if (!store.pendingWalletLimitConfig) {
    return "";
  }
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <strong>确认保存钱包限额配置</strong>
          <button class="close-btn" data-cancel-wallet-limit-confirm="1">×</button>
        </div>
        <div class="modal-body">
          <div class="log-list">
            ${store.pendingWalletLimitConfig
              .map(
                (item) => `
              <div class="log-item">
                <strong>${item.level}</strong>
                <p>钱包余额限额：${formatMoney(item.balanceLimit)} PHP</p>
                <p>月入账限额：${formatMoney(item.monthlyCashInLimit)} PHP</p>
                <p>月支出限额：${formatMoney(item.monthlyPayoutLimit)} PHP</p>
                <p>说明：${item.note || "-"}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn ghost" data-cancel-wallet-limit-confirm="1">取消</button>
          <button class="btn primary" data-confirm-wallet-limit-save="1">确认生效</button>
        </div>
      </div>
    </div>
  `;
}

function renderRechargePage() {
  return `
    <section class="card toolbar-card">
      <div class="filters">
        <div class="field"><label>商户号</label><select><option>请选择</option></select></div>
        <div class="field"><label>订单号码</label><input value="IPAYS004193093632068" /></div>
        <div class="field"><label>商户订单号</label><input placeholder="请输入" /></div>
        <div class="field"><label>用户手机号</label><input value="09467250765" /></div>
      </div>
      <div class="action-row">
        <button class="btn primary">查询</button>
        <button class="btn ghost">重置</button>
        <button class="btn ghost">导出</button>
      </div>
    </section>
    <section class="stats">
      <div class="card stat"><strong>200</strong><span>交易成功笔数</span></div>
      <div class="card stat"><strong>200</strong><span>总交易笔数</span></div>
      <div class="card stat"><strong>414,340.01</strong><span>交易成功金额 PHP</span></div>
      <div class="card stat"><strong>433,854.01</strong><span>总交易金额 PHP</span></div>
    </section>
    <section class="card table-card">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>商户号</th>
            <th>订单号码</th>
            <th>商户订单号</th>
            <th>还款码</th>
            <th>用户手机号</th>
            <th>状态</th>
            <th>交易时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${[1, 2, 3, 4, 5]
            .map(
              (row) => `
            <tr>
              <td>${row}</td>
              <td>${row % 2 ? "DragonPeso" : "TopPeso"}</td>
              <td>IPAYS0041930${row}632068</td>
              <td>phb20260417${row}5441652...</td>
              <td>9260002069${row}</td>
              <td>${row % 2 ? "09467250765" : "9179515904"}</td>
              <td><span class="status approved">支付成功</span></td>
              <td>2026-04-17 15:4${row}:17</td>
              <td><button class="btn link">详情</button></td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderUserListPage() {
  const enabledCount = store.users.filter((user) => user.status === "enabled").length;
  const verifiedCount = store.users.filter((user) => user.walletLevel !== "Basic").length;
  const totalBalance = store.users.reduce((sum, user) => sum + user.walletBalance, 0);
  return `
    <section class="card toolbar-card">
      <div class="filters">
        <div class="field">
          <label>用户 ID</label>
          <input placeholder="请输入用户ID" />
        </div>
        <div class="field">
          <label>手机号</label>
          <input placeholder="菲律宾手机号" />
        </div>
        <div class="field">
          <label>钱包等级</label>
          <select>
            <option>全部</option>
            <option>Basic</option>
            <option>Verified</option>
            <option>Fully Verified</option>
            <option>Enhanced</option>
          </select>
        </div>
        <div class="field">
          <label>状态</label>
          <select>
            <option>全部</option>
            <option>启用</option>
            <option>禁用</option>
            <option>注销</option>
          </select>
        </div>
        <div class="field">
          <label>用户姓名</label>
          <input placeholder="请输入用户姓名" />
        </div>
        <div class="field">
          <label>KYC状态</label>
          <select>
            <option>全部</option>
            <option>待审核 Pending Review</option>
            <option>审核通过 Approved</option>
            <option>审核拒绝 Rejected</option>
          </select>
        </div>
      </div>
      <div class="action-row">
        <button class="btn primary">查询</button>
        <button class="btn ghost">重置</button>
        <button class="btn ghost">导出</button>
      </div>
    </section>
    <section class="stats">
      <div class="card stat"><strong>${store.users.length}</strong><span>钱包用户总数</span></div>
      <div class="card stat"><strong>${enabledCount}</strong><span>启用用户数</span></div>
      <div class="card stat"><strong>${verifiedCount}</strong><span>已升级钱包数</span></div>
      <div class="card stat"><strong>${formatMoney(totalBalance)}</strong><span>总钱包余额 PHP</span></div>
    </section>
    <section class="card table-card">
      <table>
        <thead>
          <tr>
            <th>用户ID</th>
            <th>手机号</th>
            <th>用户姓名</th>
            <th>钱包等级</th>
            <th>KYC状态</th>
            <th>钱包余额</th>
            <th>用户状态</th>
            <th>最近更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${store.users
            .map(
              (user) => {
                const latestKyc = getLatestKycRecord(user.id);
                return `
            <tr>
              <td>${user.id}</td>
              <td>${user.phone}</td>
              <td>${user.fullName}</td>
              <td><span class="pill ${getLevelClass(user.walletLevel)}">${user.walletLevel}</span></td>
              <td>${latestKyc ? `<span class="status ${latestKyc.status}">${statusLabel(latestKyc.status)}</span>` : '<span class="helper">无申请记录</span>'}</td>
              <td>${formatMoney(user.walletBalance)}</td>
              <td><span class="status ${user.status}">${statusLabel(user.status)}</span></td>
              <td>${user.lastUpdated}</td>
              <td><button class="btn link" data-view-user="${user.id}">查看</button></td>
            </tr>`;
              }
            )
            .join("")}
        </tbody>
      </table>
      <div class="pagination">
        <span>每页 10 条</span>
        <span>共 ${store.users.length} 条</span>
      </div>
    </section>
  `;
}

function renderUserDetailPage() {
  const user = getUser(store.route.params.userId);
  return `
    <section class="card detail-card">
      <div class="action-row" style="margin-top:0; margin-bottom:18px;">
        <button class="btn primary" data-back-users="1">返回</button>
      </div>
      <div class="detail-header">
        <div class="title-block">
          <h1>${user.fullName}</h1>
          <div class="title-meta">
            <span>${user.id}</span>
            <span>${user.phone}</span>
            <span class="pill ${getLevelClass(user.walletLevel)}">${user.walletLevel}</span>
            <span class="status ${user.status}">${statusLabel(user.status)}</span>
          </div>
        </div>
      </div>
      <div class="subtabs">
        <button class="subtab ${store.activeUserTab === "profile" ? "active" : ""}" data-user-tab="profile">资料</button>
        <button class="subtab ${store.activeUserTab === "wallet" ? "active" : ""}" data-user-tab="wallet">钱包</button>
      </div>
      ${store.activeUserTab === "profile" ? renderUserProfileTab(user) : renderUserWalletTab(user)}
    </section>
  `;
}

function renderUserProfileTab(user) {
  const effectiveKyc = getApprovedKycRecord(user.id);
  const latestKyc = getLatestKycRecord(user.id);
  return `
    <form id="userProfileForm" data-user-id="${user.id}">
      <div class="section-title">当前生效信息</div>
      <div class="form-grid">
        <div class="field">
          <label>用户ID</label>
          <input name="id" value="${user.id}" disabled />
        </div>
        <div class="field">
          <label>手机号</label>
          <input name="phone" value="${user.phone}" />
        </div>
        <div class="field">
          <label>当前钱包等级</label>
          <input value="${user.walletLevel}" disabled />
        </div>
        <div class="field">
          <label>状态</label>
          <select name="status">
            <option value="enabled" ${user.status === "enabled" ? "selected" : ""}>启用</option>
            <option value="disabled" ${user.status === "disabled" ? "selected" : ""}>禁用</option>
            <option value="cancelled" ${user.status === "cancelled" ? "selected" : ""}>注销</option>
          </select>
        </div>
        <div class="field">
          <label>用户姓名</label>
          <input name="fullName" value="${user.fullName}" />
        </div>
        <div class="field">
          <label>出生日期</label>
          <input type="date" name="birthDate" value="${user.birthDate}" />
        </div>
        <div class="field">
          <label>国籍</label>
          <input name="nationality" value="${user.nationality}" />
        </div>
        <div class="field">
          <label>电子邮件</label>
          <input type="email" name="email" value="${user.email}" />
        </div>
        <div class="field full">
          <label>家庭地址</label>
          <textarea name="homeAddress">${user.homeAddress}</textarea>
        </div>
        <div class="field">
          <label>证件类型</label>
          <select name="documentType">
            ${["Passport", "National ID", "Driver's License", "UMID", "PRC ID"]
              .map((type) => `<option ${type === user.documentType ? "selected" : ""}>${type}</option>`)
              .join("")}
          </select>
        </div>
        <div class="field">
          <label>证件号码</label>
          <input name="documentNumber" value="${user.documentNumber}" />
        </div>
      </div>
      <div style="margin-top:20px;">
        <label style="display:block; margin-bottom:10px; color:#616874;">当前 KYC 生效资料</label>
        <div class="media-grid">
          <div class="photo-card">
            <div class="photo id-front"></div>
            <div style="margin-top:10px;">证件照片</div>
            <small>${user.idPhotoLabel}</small>
          </div>
          <div class="photo-card">
            <div class="photo ${user.facePhoto ? "face" : "empty"}"></div>
            <div style="margin-top:10px;">人脸照片</div>
            <small>${user.facePhoto ? "已上传人脸照片" : "当前未上传人脸照片"}</small>
          </div>
        </div>
      </div>
      <div class="section-title">KYC 申请记录</div>
      <div class="form-grid">
        <div class="field">
          <label>最近一次申请时间</label>
          <input value="${latestKyc ? latestKyc.submittedAt : "-"}" disabled />
        </div>
        <div class="field">
          <label>最近一次申请等级</label>
          <input value="${latestKyc ? latestKyc.applyLevel : "-"}" disabled />
        </div>
        <div class="field">
          <label>最近一次审核状态</label>
          <input value="${latestKyc ? statusLabel(latestKyc.status) : "-"}" disabled />
        </div>
        <div class="field">
          <label>拒绝原因</label>
          <input value="${latestKyc && latestKyc.status === "rejected" ? latestKyc.remark : "-"}" disabled />
        </div>
      </div>
      <div class="section-title">用户操作留痕</div>
      <div class="log-list">
        ${user.statusHistory
          .map(
            (item) => `
          <div class="log-item">
            <strong>${item.time} · ${item.action}</strong>
            <p>操作人：${item.operator}</p>
            <p>${item.remark}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="action-row">
        <button class="btn primary" type="submit">保存</button>
        <span id="profileError" class="error-text"></span>
      </div>
    </form>
  `;
}

function renderUserWalletTab(user) {
  return `
    <div class="wallet-summary">
      <div>
        <div>钱包概况</div>
        <strong>${formatMoney(user.walletBalance)}</strong>
      </div>
    </div>
    <section class="card table-card" style="padding:0;">
      <table>
        <thead>
          <tr>
            <th>类型</th>
            <th>渠道</th>
            <th>交易金额</th>
            <th>创建时间</th>
            <th>备注</th>
            <th>余额</th>
          </tr>
        </thead>
        <tbody>
          ${user.walletHistory
            .map(
              (item) => `
            <tr>
              <td>${item.type}</td>
              <td>${item.channel}</td>
              <td>${item.amount > 0 ? "+" : ""}${formatMoney(item.amount)}</td>
              <td>${item.createdAt}</td>
              <td>${item.note}</td>
              <td>${formatMoney(item.balance)}</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderKycAuditPage() {
  const pendingCount = store.kycRecords.filter((item) => item.status === "pending").length;
  return `
    <section class="card toolbar-card">
      <div class="filters">
        <div class="field">
          <label>申请单号</label>
          <input placeholder="请输入申请单号" />
        </div>
        <div class="field">
          <label>用户ID</label>
          <input placeholder="请输入用户ID" />
        </div>
        <div class="field">
          <label>认证等级</label>
          <select>
            <option>全部</option>
            <option>Verified</option>
            <option>Fully Verified</option>
          </select>
        </div>
        <div class="field">
          <label>审核状态</label>
          <select>
            <option>全部</option>
            <option>待审核</option>
            <option>通过</option>
            <option>拒绝</option>
          </select>
        </div>
      </div>
      <div class="action-row">
        <button class="btn primary">查询</button>
        <button class="btn ghost">重置</button>
      </div>
    </section>
    <section class="stats">
      <div class="card stat"><strong>${store.kycRecords.length}</strong><span>申请记录总数</span></div>
      <div class="card stat"><strong>${pendingCount}</strong><span>待审核</span></div>
      <div class="card stat"><strong>${store.kycRecords.filter((item) => item.status === "approved").length}</strong><span>审核通过</span></div>
      <div class="card stat"><strong>${store.kycRecords.filter((item) => item.status === "rejected").length}</strong><span>审核拒绝</span></div>
    </section>
    <section class="card table-card">
      <table>
        <thead>
          <tr>
            <th>申请单号</th>
            <th>用户ID</th>
            <th>用户姓名</th>
            <th>手机号</th>
            <th>当前等级</th>
            <th>申请等级</th>
            <th>证件类型</th>
            <th>证件号码</th>
            <th>人脸照片</th>
            <th>提交时间</th>
            <th>审核状态</th>
            <th>审核备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${store.kycRecords
            .map(
              (item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.userId}</td>
              <td>${item.userName}</td>
              <td>${item.phone}</td>
              <td><span class="pill ${getLevelClass(item.currentLevel)}">${item.currentLevel}</span></td>
              <td><span class="pill ${getLevelClass(item.applyLevel)}">${item.applyLevel}</span></td>
              <td>${item.documentType}</td>
              <td>${item.documentNumber}</td>
              <td>${item.facePhoto ? "已上传" : "未上传"}</td>
              <td>${item.submittedAt}</td>
              <td><span class="status ${item.status}">${statusLabel(item.status)}</span></td>
              <td>${item.remark || "-"}</td>
              <td>
                <button class="btn link" data-open-kyc="${item.id}">${item.status === "pending" ? "审核申请" : "查看详情"}</button>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAuditModal() {
  if (!store.activeKycId) {
    return "";
  }
  const record = store.kycRecords.find((item) => item.id === store.activeKycId);
  if (!record) {
    return "";
  }
  const isReadonly = record.status !== "pending";
  const targetLevel = getAuditTargetLevel(record);
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <strong>${isReadonly ? "KYC申请详情" : "KYC申请审核"}</strong>
          <button class="close-btn" data-close-modal="1">×</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <div class="field"><label>申请单号</label><input value="${record.id}" disabled /></div>
            <div class="field"><label>用户</label><input value="${record.userName} / ${record.userId}" disabled /></div>
            <div class="field"><label>当前等级</label><input value="${record.currentLevel}" disabled /></div>
            <div class="field"><label>申请等级</label><input value="${record.applyLevel}" disabled /></div>
            <div class="field"><label>证件类型</label><input value="${record.documentType}" disabled /></div>
            <div class="field"><label>证件号码</label><input value="${record.documentNumber}" disabled /></div>
            <div class="field"><label>手机号</label><input value="${record.phone}" disabled /></div>
            <div class="field"><label>提交时间</label><input value="${record.submittedAt}" disabled /></div>
            <div class="field full">
              <div class="section-title">照片资料</div>
              <div class="media-grid">
                <div class="photo-card">
                  <div class="photo id-front"></div>
                  <div style="margin-top:10px;">证件照片</div>
                  <small>${record.documentPhotoLabel || "已预留展示区"}</small>
                </div>
                <div class="photo-card">
                  <div class="photo ${record.facePhoto ? "face" : "empty"}"></div>
                  <div style="margin-top:10px;">人脸照片</div>
                  <small>${record.facePhoto ? record.facePhotoLabel || "已上传人脸照片" : "用户未上传，保留展示区域"}</small>
                </div>
              </div>
            </div>
            <div class="field">
              <label>${isReadonly ? "审核结果" : "审核动作"}</label>
              ${
                isReadonly
                  ? `<input value="${statusLabel(record.status)}" disabled />`
                  : `<select id="auditStatus">
                      <option value="approved" ${store.auditForm.status === "approved" ? "selected" : ""}>通过</option>
                      <option value="rejected" ${store.auditForm.status === "rejected" ? "selected" : ""}>拒绝</option>
                    </select>`
              }
            </div>
            <div class="field">
              <label>审核通过后等级</label>
              <input value="${targetLevel}" disabled />
            </div>
            <div class="field">
              <label>审核人</label>
              <input value="${record.auditor || "-"}" disabled />
            </div>
            <div class="field">
              <label>审核时间</label>
              <input value="${record.auditedAt || "-"}" disabled />
            </div>
            <div class="field full">
              <label>审核备注</label>
              <textarea id="auditRemark" placeholder="请输入审核说明" ${isReadonly ? "disabled" : ""}>${store.auditForm.remark}</textarea>
            </div>
          </div>
          <div class="section-title">审核留痕</div>
          <div class="log-list">
            ${record.auditLogs
              .map(
                (item) => `
              <div class="log-item">
                <strong>${item.time} · ${item.action}</strong>
                <p>操作人：${item.operator}</p>
                <p>${item.remark}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn ghost" data-close-modal="1">取消</button>
          ${isReadonly ? "" : `<button class="btn primary" data-save-kyc="${record.id}">确认提交</button>`}
        </div>
      </div>
    </div>
  `;
}

function statusLabel(status) {
  const map = {
    enabled: "启用",
    disabled: "禁用",
    cancelled: "注销",
    pending: "待审核 Pending Review",
    approved: "审核通过 Approved",
    rejected: "审核拒绝 Rejected",
  };
  return map[status] || status;
}

function bindEvents() {
  document.querySelectorAll("[data-view-user]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(`users/${button.dataset.viewUser}`, { userTab: "profile" });
    });
  });

  document.querySelectorAll("[data-back-users]").forEach((button) => {
    button.addEventListener("click", () => navigate("userList"));
  });

  document.querySelectorAll("[data-user-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeUserTab = button.dataset.userTab;
      render();
    });
  });

  document.querySelectorAll("[data-wallet-limit-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      store.walletLimitEditMode = true;
      render();
    });
  });

  document.querySelectorAll("[data-wallet-limit-cancel]").forEach((button) => {
    button.addEventListener("click", () => {
      store.walletLimitEditMode = false;
      render();
    });
  });

  const profileForm = document.getElementById("userProfileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const user = getUser(profileForm.dataset.userId);
      const formData = new FormData(profileForm);
      const phone = String(formData.get("phone")).trim();
      const email = String(formData.get("email")).trim();
      const errorNode = document.getElementById("profileError");

      if (!/^(09\d{9}|9\d{9})$/.test(phone)) {
        errorNode.textContent = "手机号格式不正确，需为 9 开头10位或 09 开头11位。";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorNode.textContent = "电子邮件格式不正确。";
        return;
      }

      Object.assign(user, {
        phone,
        status: String(formData.get("status")),
        fullName: String(formData.get("fullName")).trim(),
        birthDate: String(formData.get("birthDate")),
        nationality: String(formData.get("nationality")).trim(),
        email,
        homeAddress: String(formData.get("homeAddress")).trim(),
        documentType: String(formData.get("documentType")),
        documentNumber: String(formData.get("documentNumber")).trim(),
        lastUpdated: "2026-04-17 16:42:00",
      });
      user.statusHistory.unshift({
        time: "2026-04-17 16:42:00",
        operator: "Back Office Admin",
        action: "资料保存",
        remark: "更新用户基础资料与当前状态",
      });

      store.flash = `用户 ${user.id} 的资料已保存。`;
      render();
    });
  }

  const walletLimitConfigForm = document.getElementById("walletLimitConfigForm");
  if (walletLimitConfigForm) {
    walletLimitConfigForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(walletLimitConfigForm);
      const errorNode = document.getElementById("walletLimitError");
      errorNode.textContent = "";
      try {
        const nextConfig = store.walletLimitConfig.map((item, index) => {
          const balance = Number(formData.get(`balance-${index}`));
          const cashIn = Number(formData.get(`cashIn-${index}`));
          const payout = Number(formData.get(`payout-${index}`));
          const note = String(formData.get(`note-${index}`)).trim();

          if (
            Number.isNaN(balance) ||
            Number.isNaN(cashIn) ||
            Number.isNaN(payout) ||
            balance < 0 ||
            cashIn < 0 ||
            payout < 0
          ) {
            throw new Error("限额金额必须为大于等于 0 的数字。");
          }

          return {
            ...item,
            balanceLimit: balance,
            monthlyCashInLimit: cashIn,
            monthlyPayoutLimit: payout,
            note,
          };
        });

        store.pendingWalletLimitConfig = nextConfig;
        render();
      } catch (error) {
        errorNode.textContent = error.message;
      }
    });
  }

  document.querySelectorAll("[data-cancel-wallet-limit-confirm]").forEach((button) => {
    button.addEventListener("click", () => {
      store.pendingWalletLimitConfig = null;
      render();
    });
  });

  document.querySelectorAll("[data-confirm-wallet-limit-save]").forEach((button) => {
    button.addEventListener("click", () => {
      store.walletLimitConfig = store.pendingWalletLimitConfig;
      store.pendingWalletLimitConfig = null;
      store.walletLimitEditMode = false;
      store.flash = "用户钱包限额配置已确认生效。";
      render();
    });
  });

  document.querySelectorAll("[data-open-kyc]").forEach((button) => {
    button.addEventListener("click", () => {
      const record = store.kycRecords.find((item) => item.id === button.dataset.openKyc);
      store.activeKycId = button.dataset.openKyc;
      store.auditForm = {
        status: record.status === "pending" ? "approved" : record.status,
        remark: record.remark || "",
      };
      render();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      store.activeKycId = null;
      render();
    });
  });

  const auditStatus = document.getElementById("auditStatus");
  if (auditStatus) {
    auditStatus.addEventListener("change", (event) => {
      store.auditForm.status = event.target.value;
    });
  }

  const auditRemark = document.getElementById("auditRemark");
  if (auditRemark) {
    auditRemark.addEventListener("input", (event) => {
      store.auditForm.remark = event.target.value;
    });
  }

  document.querySelectorAll("[data-save-kyc]").forEach((button) => {
    button.addEventListener("click", () => {
      const record = store.kycRecords.find((item) => item.id === button.dataset.saveKyc);
      if (store.auditForm.status === "rejected" && !store.auditForm.remark.trim()) {
        store.flash = "审核拒绝时必须填写拒绝原因。";
        render();
        return;
      }
      record.status = store.auditForm.status;
      record.remark = store.auditForm.remark.trim();
      record.auditor = "Back Office Admin";
      record.auditedAt = "2026-04-17 16:50:00";
      record.auditLogs.push({
        time: record.auditedAt,
        operator: record.auditor,
        action: formatAuditAction(record.status),
        remark: record.remark || "审核通过",
      });
      const user = getUser(record.userId);
      if (store.auditForm.status === "approved") {
        user.walletLevel = getAuditTargetLevel(record);
      }
      user.lastUpdated = "2026-04-17 16:50:00";
      user.statusHistory.unshift({
        time: "2026-04-17 16:50:00",
        operator: record.auditor,
        action: "KYC审核完成",
        remark: `${record.applyLevel} 申请${store.auditForm.status === "approved" ? "审核通过，钱包等级同步更新" : "审核拒绝，等待用户重新提交"}`,
      });
      store.flash = `认证申请 ${record.id} 已更新为“${statusLabel(record.status)}”。`;
      store.activeKycId = null;
      render();
    });
  });
}

window.addEventListener("hashchange", render);
render();
