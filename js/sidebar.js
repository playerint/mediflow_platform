
(function(){
  var inHtml = location.pathname.includes('/html/');
  var p    = inHtml ? '' : 'html/';
  var home = inHtml ? '../index.html' : 'index.html';

  // 전체 메뉴 정의 (key → 권한 체크에 사용)
  var MENUS = [
    { t:'logo' },
    { t:'sec', lb:'메인' },
    { t:'a', key:'dashboard',  href:home,                              ic:'⊞', lb:'대시보드' },
    { t:'sec', lb:'병원 관리' },
    { t:'a', key:'hospitals',  href:p+'hospital_list.html',            ic:'🏥', lb:'병원 목록', badge:'2', bc:'amber' },
    { t:'a', key:'onboarding', href:p+'onboarding_list.html',          ic:'🚀', lb:'온보딩 관리', badge:'3', bc:'' },
    { t:'sec', lb:'운영' },
    { t:'a', key:'site',       href:p+'site_management.html',          ic:'🌐', lb:'사이트 관리' },
    { t:'a', key:'crm',        href:p+'crm_management.html',           ic:'💬', lb:'CRM 관리', badge:'5', bc:'' },
    { t:'a', key:'marketing',  href:p+'marketing.html',                ic:'📣', lb:'마케팅 관리' },
    { t:'a', key:'cs',         href:p+'cs_management.html',            ic:'🎧', lb:'CS 관리', badge:'7', bc:'' },
    { t:'sec', lb:'비즈니스' },
    { t:'a', key:'contract',   href:p+'contract_management.html',      ic:'📋', lb:'계약 관리' },
    { t:'a', key:'billing',    href:p+'billing_management.html',       ic:'💳', lb:'결제 관리', badge:'2', bc:'red' },
    { t:'a', key:'reports',    href:p+'reports.html',                  ic:'📊', lb:'리포트' },
    { t:'sec', lb:'시스템' },
    { t:'a', key:'settings',   href:p+'settings.html',                 ic:'⚙',  lb:'설정' },
  ];

  var ROLE_MENUS = {
    super:   'all',
    ops:     ['dashboard','hospitals','onboarding','site','crm','marketing','cs','settings'],
    finance: ['dashboard','contract','billing','reports','settings'],
  };

  function canShow(key, role) {
    var allowed = ROLE_MENUS[role];
    if (!allowed || allowed === 'all') return true;
    return allowed.indexOf(key) > -1;
  }

  function build(active, user) {
    var role = user ? user.role : 'super';
    var name = user ? user.name : '관리자';
    var roleCls = role === 'super' ? 'role-super' : role === 'ops' ? 'role-ops' : 'role-finance';
    var roleLabel = role === 'super' ? '슈퍼 어드민' : role === 'ops' ? '운영팀' : '재무팀';

    var h = '';
    h += '<div class="sidebar-logo">'
       + '<div class="logo-mark">MEDI<span>FLOW</span></div>'
       + '<div class="logo-sub">글로벌 메디컬 플로우</div>'
       + '</div>';

    MENUS.forEach(function(n){
      if (n.t === 'sec') {
        h += '<div class="nav-section">'+n.lb+'</div>';
        return;
      }
      if (n.t === 'a') {
        if (!canShow(n.key, role)) return; // 권한 없으면 숨김
        var on = active === n.key;
        var badge = n.badge ? ' <span class="nav-badge'+(n.bc?' '+n.bc:'')+'">'+n.badge+'</span>' : '';
        h += '<a class="nav-item'+(on?' active':'')+'" href="'+n.href+'">'
           + '<span>'+n.ic+'</span> '+n.lb+badge
           + '</a>';
      }
    });

    h += '<div class="sidebar-footer">'
       + '<div class="sf-user">'
       + '<div class="sf-avatar">'+name.charAt(0)+'</div>'
       + '<div style="flex:1;min-width:0">'
       + '<div class="sf-name" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">'
       + name
       + '<span class="'+roleCls+'">'+roleLabel+'</span>'
       + '</div>'
       + '</div></div>'
       + '<button class="sf-logout" onclick="logout()">🚪 로그아웃</button>'
       + '</div>';

    return h;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var mount = document.getElementById('sidebar-mount');
    if (!mount) return;
    var active = mount.getAttribute('data-active') || 'dashboard';

    // 인증 체크 (login.html 제외)
    if (!location.pathname.includes('login.html')) {
      var user = getSession ? getSession() : null;
      if (!user) { location.href = location.pathname.includes('/html/') ? '../login.html' : 'login.html'; return; }

      var aside = document.createElement('aside');
      aside.className = 'sidebar';
      aside.innerHTML = build(active, user);
      mount.parentNode.replaceChild(aside, mount);

      // 권한에 따라 접근 불가 페이지 체크
      var roleMenus = ROLE_MENUS[user.role];
      if (roleMenus !== 'all' && active !== 'dashboard' && roleMenus.indexOf(active) === -1) {
        document.querySelector('.main').innerHTML =
          '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:12px">'
          + '<div style="font-size:40px">🔒</div>'
          + '<div style="font-size:16px;font-weight:600;color:#1A2642">접근 권한이 없습니다</div>'
          + '<div style="font-size:13px;color:#6B7280">이 페이지는 '+roleLabel+'에게 허용되지 않습니다.</div>'
          + '<a href="'+home+'" class="btn btn-primary" style="margin-top:8px">대시보드로 이동</a>'
          + '</div>';
      }
    }
  });
})();
