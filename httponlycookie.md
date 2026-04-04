![HttpOnlyCookieAuthFlow](https://github.com/user-attachments/assets/efcae265-01d5-48f9-b83f-ba48fb6a4906)
<svg width="680" viewBox="0 0 680 980" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
    <style>
      text { font-family: sans-serif; fill: #1a1a1a; }
      .th { font-size: 13px; font-weight: 600; }
      .ts { font-size: 11px; font-weight: 400; }
      .arr { stroke: #888; stroke-width: 1.5; fill: none; }
      .section-bg { fill: #f3f3f0; }
      /* Node colors */
      .c-gray rect   { fill: #f1efe8; stroke: #888780; }
      .c-purple rect { fill: #eeedfe; stroke: #7f77dd; }
      .c-teal rect   { fill: #e1f5ee; stroke: #1d9e75; }
      .c-amber rect  { fill: #faeeda; stroke: #ba7517; }
      .c-red rect    { fill: #fcebeb; stroke: #e24b4a; }
      .c-blue rect   { fill: #e6f1fb; stroke: #378add; }
      .c-gray text   { fill: #444441; }
      .c-purple text { fill: #3c3489; }
      .c-teal text   { fill: #0f6e56; }
      .c-amber text  { fill: #633806; }
      .c-red text    { fill: #791f1f; }
      .c-blue text   { fill: #0c447c; }
    </style>
  </defs>

  <rect width="680" height="980" fill="#ffffff"/>

  <!-- 圖例 -->
  <rect x="40" y="14" width="10" height="10" rx="2" fill="#EF9F27"/>
  <text class="ts" x="56" y="23" fill="#1a1a1a">Login Token (JWT) 2天</text>
  <rect x="240" y="14" width="10" height="10" rx="2" fill="#1D9E75"/>
  <text class="ts" x="256" y="23" fill="#1a1a1a">Refresh Token 180天</text>
  <rect x="440" y="14" width="10" height="10" rx="2" fill="#378ADD"/>
  <text class="ts" x="456" y="23" fill="#1a1a1a">HttpOnly Cookie</text>

  <!-- Step 1 -->
  <rect class="section-bg" x="40" y="38" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="53" fill="#666">Step 1 — 登入</text>

  <g class="c-gray"><rect x="40" y="70" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="92" text-anchor="middle" dominant-baseline="central">Client (React)</text></g>
  <line x1="190" y1="85" x2="330" y2="85" stroke="#EF9F27" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="78" text-anchor="middle" fill="#BA7517">POST /auth/login</text>
  <line x1="330" y1="99" x2="190" y2="99" stroke="#EF9F27" stroke-width="1.5" fill="none" stroke-dasharray="5 4" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="113" text-anchor="middle" fill="#BA7517">← { token: JWT }</text>
  <g class="c-purple"><rect x="330" y="70" width="160" height="44" rx="8" stroke-width="0.5"/><text class="th" x="410" y="92" text-anchor="middle" dominant-baseline="central">Server (.NET API)</text></g>
  <line x1="410" y1="114" x2="410" y2="148" stroke="#1D9E75" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="510" y="130" fill="#0F6E56">Set-Cookie: refresh_token</text>
  <text class="ts" x="510" y="145" fill="#0F6E56">HttpOnly; Secure</text>
  <g class="c-teal"><rect x="330" y="148" width="160" height="40" rx="8" stroke-width="0.5"/><text class="th" x="410" y="168" text-anchor="middle" dominant-baseline="central">瀏覽器 Cookie</text></g>
  <g class="c-amber"><rect x="40" y="148" width="150" height="40" rx="8" stroke-width="0.5"/><text class="th" x="115" y="162" text-anchor="middle" dominant-baseline="central">localStorage /</text><text class="th" x="115" y="178" text-anchor="middle" dominant-baseline="central">memory</text></g>
  <line x1="115" y1="114" x2="115" y2="148" stroke="#EF9F27" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="130" y="134" fill="#BA7517">存 JWT</text>

  <!-- Step 2 -->
  <rect class="section-bg" x="40" y="208" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="223" fill="#666">Step 2 — 一般 API 請求（JWT 有效期內）</text>

  <g class="c-gray"><rect x="40" y="242" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="264" text-anchor="middle" dominant-baseline="central">Client (React)</text></g>
  <line x1="190" y1="264" x2="330" y2="264" stroke="#EF9F27" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="255" text-anchor="middle" fill="#BA7517">Authorization: Bearer JWT</text>
  <g class="c-purple"><rect x="330" y="242" width="160" height="44" rx="8" stroke-width="0.5"/><text class="th" x="410" y="264" text-anchor="middle" dominant-baseline="central">Server (.NET API)</text></g>
  <line x1="490" y1="264" x2="530" y2="264" stroke="#E24B4A" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <g class="c-red"><rect x="530" y="242" width="110" height="44" rx="8" stroke-width="0.5"/><text class="th" x="585" y="258" text-anchor="middle" dominant-baseline="central">Blacklist</text><text class="ts" x="585" y="276" text-anchor="middle" dominant-baseline="central">驗證 JWT</text></g>
  <line x1="530" y1="272" x2="490" y2="272" stroke="#E24B4A" stroke-width="1.5" fill="none" stroke-dasharray="4 3" marker-end="url(#arrow)"/>
  <text class="ts" x="510" y="288" text-anchor="middle" fill="#A32D2D">通過 / 拒絕</text>

  <!-- Step 3 -->
  <rect class="section-bg" x="40" y="310" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="325" fill="#666">Step 3 — JWT 過期，Refresh Token 換新</text>

  <g class="c-gray"><rect x="40" y="344" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="360" text-anchor="middle" dominant-baseline="central">Client (React)</text><text class="ts" x="115" y="378" text-anchor="middle" dominant-baseline="central">偵測到 401</text></g>
  <g class="c-teal"><rect x="40" y="414" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="430" text-anchor="middle" dominant-baseline="central">瀏覽器 Cookie</text><text class="ts" x="115" y="448" text-anchor="middle" dominant-baseline="central">自動帶入</text></g>
  <line x1="115" y1="388" x2="115" y2="414" stroke="#1D9E75" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <line x1="190" y1="436" x2="330" y2="436" stroke="#1D9E75" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="427" text-anchor="middle" fill="#0F6E56">POST /auth/refresh</text>
  <text class="ts" x="260" y="451" text-anchor="middle" fill="#0F6E56">Cookie 自動夾帶</text>
  <g class="c-purple"><rect x="330" y="414" width="160" height="44" rx="8" stroke-width="0.5"/><text class="th" x="410" y="436" text-anchor="middle" dominant-baseline="central">Server (.NET API)</text></g>
  <line x1="490" y1="430" x2="530" y2="430" stroke="#378ADD" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <g class="c-blue"><rect x="530" y="414" width="110" height="44" rx="8" stroke-width="0.5"/><text class="th" x="585" y="430" text-anchor="middle" dominant-baseline="central">DB</text><text class="ts" x="585" y="448" text-anchor="middle" dominant-baseline="central">驗證 + 輪換</text></g>
  <line x1="530" y1="442" x2="490" y2="442" stroke="#378ADD" stroke-width="1.5" fill="none" stroke-dasharray="4 3" marker-end="url(#arrow)"/>
  <g class="c-red"><rect x="530" y="344" width="110" height="44" rx="8" stroke-width="0.5"/><text class="th" x="585" y="360" text-anchor="middle" dominant-baseline="central">Blacklist</text><text class="ts" x="585" y="378" text-anchor="middle" dominant-baseline="central">加入舊 JWT</text></g>
  <line x1="585" y1="414" x2="585" y2="388" stroke="#E24B4A" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="620" y="404" fill="#A32D2D">廢棄</text>
  <line x1="330" y1="422" x2="190" y2="366" stroke="#EF9F27" stroke-width="1.5" fill="none" stroke-dasharray="5 4" marker-end="url(#arrow)"/>
  <text class="ts" x="225" y="390" fill="#BA7517">← { token: 新 JWT }</text>
  <line x1="330" y1="448" x2="190" y2="448" stroke="#1D9E75" stroke-width="1.5" fill="none" stroke-dasharray="5 4" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="466" text-anchor="middle" fill="#0F6E56">Set-Cookie: 新 refresh_token</text>

  <!-- Step 4 -->
  <rect class="section-bg" x="40" y="490" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="505" fill="#666">Step 4 — 登出</text>

  <g class="c-gray"><rect x="40" y="524" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="546" text-anchor="middle" dominant-baseline="central">Client (React)</text></g>
  <line x1="190" y1="546" x2="330" y2="546" stroke="#888" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="260" y="537" text-anchor="middle" fill="#555">POST /auth/logout</text>
  <text class="ts" x="260" y="561" text-anchor="middle" fill="#555">Bearer JWT + Cookie</text>
  <g class="c-purple"><rect x="330" y="524" width="160" height="44" rx="8" stroke-width="0.5"/><text class="th" x="410" y="546" text-anchor="middle" dominant-baseline="central">Server (.NET API)</text></g>
  <line x1="490" y1="536" x2="530" y2="518" stroke="#E24B4A" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <g class="c-red"><rect x="530" y="500" width="110" height="44" rx="8" stroke-width="0.5"/><text class="th" x="585" y="516" text-anchor="middle" dominant-baseline="central">Blacklist</text><text class="ts" x="585" y="534" text-anchor="middle" dominant-baseline="central">JWT 立即失效</text></g>
  <line x1="490" y1="554" x2="530" y2="568" stroke="#378ADD" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <g class="c-blue"><rect x="530" y="558" width="110" height="44" rx="8" stroke-width="0.5"/><text class="th" x="585" y="574" text-anchor="middle" dominant-baseline="central">DB</text><text class="ts" x="585" y="592" text-anchor="middle" dominant-baseline="central">清除 RefreshToken</text></g>
  <g class="c-teal"><rect x="40" y="594" width="150" height="44" rx="8" stroke-width="0.5"/><text class="th" x="115" y="610" text-anchor="middle" dominant-baseline="central">瀏覽器 Cookie</text><text class="ts" x="115" y="628" text-anchor="middle" dominant-baseline="central">清除 Cookie</text></g>
  <line x1="330" y1="554" x2="190" y2="610" stroke="#1D9E75" stroke-width="1.5" fill="none" marker-end="url(#arrow)"/>
  <text class="ts" x="222" y="580" fill="#0F6E56">Set-Cookie: 清空</text>

  <!-- 安全特性 -->
  <rect class="section-bg" x="40" y="658" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="673" fill="#666">HttpOnly Cookie 三大安全屬性</text>

  <g class="c-teal"><rect x="40" y="692" width="178" height="66" rx="8" stroke-width="0.5"/><text class="th" x="129" y="714" text-anchor="middle" dominant-baseline="central">HttpOnly</text><text class="ts" x="129" y="734" text-anchor="middle" dominant-baseline="central">JS 無法讀取 Cookie</text><text class="ts" x="129" y="750" text-anchor="middle" dominant-baseline="central">防止 XSS 竊取 Token</text></g>
  <g class="c-blue"><rect x="251" y="692" width="178" height="66" rx="8" stroke-width="0.5"/><text class="th" x="340" y="714" text-anchor="middle" dominant-baseline="central">Secure</text><text class="ts" x="340" y="734" text-anchor="middle" dominant-baseline="central">僅 HTTPS 傳輸</text><text class="ts" x="340" y="750" text-anchor="middle" dominant-baseline="central">防止中間人攻擊</text></g>
  <g class="c-purple"><rect x="462" y="692" width="178" height="66" rx="8" stroke-width="0.5"/><text class="th" x="551" y="714" text-anchor="middle" dominant-baseline="central">SameSite=Strict</text><text class="ts" x="551" y="734" text-anchor="middle" dominant-baseline="central">跨站請求不帶 Cookie</text><text class="ts" x="551" y="750" text-anchor="middle" dominant-baseline="central">防止 CSRF 攻擊</text></g>

  <!-- 比較表 -->
  <rect class="section-bg" x="40" y="778" width="600" height="22" rx="4"/>
  <text class="ts" x="50" y="793" fill="#666">與 localStorage 方案比較</text>

  <rect x="40" y="812" width="600" height="140" rx="4" fill="none" stroke="#ccc" stroke-width="0.5"/>
  <rect x="40" y="812" width="600" height="28" rx="4" fill="#f3f3f0"/>
  <text class="ts" x="130" y="830" text-anchor="middle" fill="#555">項目</text>
  <text class="ts" x="330" y="830" text-anchor="middle" fill="#555">localStorage</text>
  <text class="ts" x="530" y="830" text-anchor="middle" fill="#555">HttpOnly Cookie</text>
  <line x1="220" y1="812" x2="220" y2="952" stroke="#ccc" stroke-width="0.5"/>
  <line x1="430" y1="812" x2="430" y2="952" stroke="#ccc" stroke-width="0.5"/>
  <line x1="40" y1="840" x2="640" y2="840" stroke="#ccc" stroke-width="0.5"/>
  <text class="ts" x="130" y="857" text-anchor="middle" fill="#1a1a1a">JS 可讀取</text>
  <text class="ts" x="330" y="857" text-anchor="middle" fill="#A32D2D">✗ 可以</text>
  <text class="ts" x="530" y="857" text-anchor="middle" fill="#0F6E56">✓ 不行</text>
  <line x1="40" y1="868" x2="640" y2="868" stroke="#ccc" stroke-width="0.5"/>
  <text class="ts" x="130" y="885" text-anchor="middle" fill="#1a1a1a">XSS 可竊取</text>
  <text class="ts" x="330" y="885" text-anchor="middle" fill="#A32D2D">✗ 可以</text>
  <text class="ts" x="530" y="885" text-anchor="middle" fill="#0F6E56">✓ 不行</text>
  <line x1="40" y1="896" x2="640" y2="896" stroke="#ccc" stroke-width="0.5"/>
  <text class="ts" x="130" y="913" text-anchor="middle" fill="#1a1a1a">CSRF 風險</text>
  <text class="ts" x="330" y="913" text-anchor="middle" fill="#0F6E56">✓ 無</text>
  <text class="ts" x="530" y="913" text-anchor="middle" fill="#BA7517">△ 需 SameSite</text>
  <line x1="40" y1="924" x2="640" y2="924" stroke="#ccc" stroke-width="0.5"/>
  <text class="ts" x="130" y="941" text-anchor="middle" fill="#1a1a1a">跨域複雜度</text>
  <text class="ts" x="330" y="941" text-anchor="middle" fill="#0F6E56">✓ 簡單</text>
  <text class="ts" x="530" y="941" text-anchor="middle" fill="#BA7517">△ 需設定 CORS</text>
  <line x1="40" y1="952" x2="640" y2="952" stroke="#ccc" stroke-width="0.5"/>
</svg>
