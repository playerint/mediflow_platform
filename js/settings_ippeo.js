
const SECTIONS = {
  profile: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">👤 내 프로필</div>
    <div style="display:flex;gap:16px;align-items:center;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--gray-100)">
      <div style="width:60px;height:60px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;cursor:pointer" title="프로필 사진 변경">김</div>
      <div><div style="font-size:14px;font-weight:600;color:var(--navy)" id="profile-name-display">김운영</div><div style="font-size:12px;color:var(--gray-400)" id="profile-role-display"></div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">이름</div><input type="text" value="김운영"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">이메일</div><input type="email" value="admin@ippeo.co.kr"></div>
    </div>
    <div style="margin-top:12px"><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">현재 비밀번호</div><input type="password" placeholder="변경 시 입력"></div>
  </div>`,

  team: `<div class="card fade">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:15px;font-weight:700;color:var(--navy)">👥 팀 계정 관리</div>
      <button class="btn btn-primary" style="font-size:12px" onclick="alert('초대 이메일 발송')">+ 멤버 초대</button>
    </div>
    ${[
      {name:'김운영',email:'admin@ippeo.co.kr',role:'super',last:'방금'},
      {name:'이수진',email:'ops@ippeo.co.kr',role:'ops',last:'1시간 전'},
      {name:'박재무',email:'finance@ippeo.co.kr',role:'finance',last:'어제'},
    ].map(m=>`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-100)">
      <div style="width:34px;height:34px;border-radius:50%;background:var(--teal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${m.name.charAt(0)}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:500">${m.name}</div><div style="font-size:12px;color:var(--gray-400)">${m.email}</div></div>
      <span class="role-${m.role}">${m.role==='super'?'슈퍼 어드민':m.role==='ops'?'운영팀':'재무팀'}</span>
      <span style="font-size:12px;color:var(--gray-400)">${m.last}</span>
      <button class="btn btn-danger" style="font-size:12px;padding:3px 8px" onclick="alert('${m.name} 계정 관리')">관리</button>
    </div>`).join('')}
  </div>`,

  roles: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">🔐 권한 설정</div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="font-size:12px;color:var(--gray-400);text-align:left;padding:8px 12px;border-bottom:2px solid var(--gray-100)">메뉴</th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-super">슈퍼 어드민</span></th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-ops">운영팀</span></th>
            <th style="font-size:12px;padding:8px 12px;border-bottom:2px solid var(--gray-100)"><span class="role-finance">재무팀</span></th>
          </tr>
        </thead>
        <tbody>
          ${[
            ['대시보드','✓','✓','✓'],
            ['병원 관리','✓','✓','✗'],
            ['온보딩 관리','✓','✓','✗'],
            ['사이트 관리','✓','✓','✗'],
            ['CRM 관리','✓','✓','✗'],
            ['마케팅 관리','✓','✓','✗'],
            ['CS 관리','✓','✓','✗'],
            ['계약 관리','✓','✗','✓'],
            ['결제 관리','✓','✗','✓'],
            ['리포트','✓','✗','✓'],
            ['설정 (팀 관리)','✓','✗','✗'],
            ['설정 (본인 프로필)','✓','✓','✓'],
          ].map(r=>`<tr>
            <td style="font-size:13px;color:var(--gray-700);padding:10px 12px;border-bottom:1px solid var(--gray-100)">${r[0]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:var(--green);font-weight:700">${r[1]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:${r[2]==='✓'?'var(--green)':'var(--red)'};font-weight:700">${r[2]}</td>
            <td style="text-align:center;padding:10px 12px;border-bottom:1px solid var(--gray-100);color:${r[3]==='✓'?'var(--green)':'var(--red)'};font-weight:700">${r[3]}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`,

  notification: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">🔔 알림 설정</div>
    ${[
      ['컴플라이언스 위반 감지','즉시 알림'],['미납 병원 발생','D+1, D+7 알림'],
      ['CS 긴급 접수','즉시 알림'],['온보딩 단계 완료','완료 시 알림'],
      ['계약 만료 임박','30일·7일 전 알림'],['신규 병원 입점','즉시 알림'],
    ].map(([label,sub])=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--gray-100)">
      <div><div style="font-size:13px;font-weight:500;color:var(--gray-900)">${label}</div><div style="font-size:12px;color:var(--gray-400);margin-top:2px">${sub}</div></div>
      <label class="toggle-wrap"><input type="checkbox" checked><div class="toggle-track"></div><div class="toggle-thumb"></div></label>
    </div>`).join('')}
  </div>`,

  system: `<div class="card fade">
    <div style="font-size:15px;font-weight:700;color:var(--navy);margin-bottom:16px">⚙ 시스템 설정</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">플랫폼 이름</div><input type="text" value="ippeo Admin"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">대표 이메일</div><input type="email" value="admin@ippeo.co.kr"></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">Claude API 모델</div><select><option>claude-sonnet-4</option><option>claude-haiku-4-5</option></select></div>
      <div><div style="font-size:12px;font-weight:600;color:var(--gray-700);margin-bottom:5px">기본 언어</div><select><option>한국어</option><option>日本語</option><option>English</option></select></div>
    </div>
    <div style="background:var(--red-l);border:1px solid #FCA5A5;border-radius:var(--rl);padding:16px 20px">
      <div style="font-size:13px;font-weight:700;color:var(--red);margin-bottom:8px">⚠ 위험 구역</div>
      <div style="font-size:12px;color:#991B1B;margin-bottom:12px">모든 데이터를 초기화합니다. 이 작업은 되돌릴 수 없습니다.</div>
      <button class="btn btn-danger" onclick="alert('슈퍼 어드민 권한 확인 후 진행 가능합니다.')">시스템 초기화</button>
    </div>
  </div>`,
};

function showSec(key, btn) {
  document.querySelectorAll('.sn-item').forEach(i => i.classList.remove('active'));
  btn.classList.add('active');
  const el = document.getElementById('sec-content');
  el.innerHTML = SECTIONS[key] || '';
  // 프로필 섹션이면 현재 로그인 유저 정보 표시
  if (key === 'profile') {
    const user = getSession ? getSession() : null;
    if (user) {
      const el1 = document.getElementById('profile-name-display');
      const el2 = document.getElementById('profile-role-display');
      if (el1) el1.textContent = user.name;
      if (el2) el2.innerHTML = '<span class="role-'+user.role+'">'+(user.role==='super'?'슈퍼 어드민':user.role==='ops'?'운영팀':'재무팀')+'</span>';
    }
  }
}

showSec('profile', document.querySelector('.sn-item'));
