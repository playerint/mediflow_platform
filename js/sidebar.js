
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
    { t:'a', key:'notifications', href:p+'notifications.html',          ic:'🔔', lb:'알림', badge:'5', bc:'' },
    { t:'a', key:'settings',   href:p+'settings.html',                 ic:'⚙',  lb:'설정' },
  ];

  var ROLE_MENUS = {
    super:   'all',
    ops:     ['dashboard','hospitals','onboarding','site','crm','marketing','cs','notifications','settings'],
    finance: ['dashboard','contract','billing','reports','notifications','settings'],
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

    // 로고 (좌측)
    h += '<div class="sidebar-logo">'
       + '<div class="logo-mark">MEDI<span>FLOW</span></div>'
       + '</div>';

    // 네비 링크 (수평, 그룹 구분선 포함)
    h += '<div class="topnav-links">';
    var groups = [];
    var cur = [];
    MENUS.forEach(function(n){
      if (n.t === 'sec') {
        if (cur.length) groups.push(cur);
        cur = [];
        return;
      }
      if (n.t === 'a') {
        // 알림·설정은 우측 유저 영역에 아이콘으로 표시 — 메인 nav에서 제외
        if (n.key === 'notifications' || n.key === 'settings') return;
        if (canShow(n.key, role)) cur.push(n);
      }
    });
    if (cur.length) groups.push(cur);

    groups.forEach(function(grp, gi){
      if (gi > 0) h += '<div class="topnav-sep"></div>';
      grp.forEach(function(n){
        var on = active === n.key;
        var badge = n.badge ? ' <span class="nav-badge'+(n.bc?' '+n.bc:'')+'">'+n.badge+'</span>' : '';
        h += '<a class="nav-item'+(on?' active':'')+'" href="'+n.href+'">'
           + '<span>'+n.ic+'</span> '+n.lb+badge
           + '</a>';
      });
    });
    h += '</div>';

    // 유저 정보 (우측) — 알림·설정 아이콘 포함
    var notiHref    = inHtml ? 'notifications.html' : 'html/notifications.html';
    var settingsHref = inHtml ? 'settings.html'     : 'html/settings.html';
    var notiActive  = active === 'notifications';
    var setActive   = active === 'settings';
    h += '<div class="topnav-user">'
       + '<a class="topnav-icon-btn'+(notiActive?' active':'')+'" href="'+notiHref+'" title="알림">🔔<span class="icon-badge">5</span></a>'
       + '<a class="topnav-icon-btn'+(setActive?' active':'')+'" href="'+settingsHref+'" title="설정">⚙</a>'
       + '<div class="sf-avatar">'+name.charAt(0)+'</div>'
       + '<div class="sf-name">'+name+'</div>'
       + '<span class="'+roleCls+'">'+roleLabel+'</span>'
       + '<button class="sf-logout" onclick="logout()">🚪 로그아웃</button>'
       + '</div>';

    return h;
  }

  document.addEventListener('DOMContentLoaded', function(){
    var mount = document.getElementById('sidebar-mount');
    if (!mount) return;
    var active = mount.getAttribute('data-active') || 'dashboard';

    var user = (typeof getSessionOrDefault === 'function') ? getSessionOrDefault() : { name:'김운영', role:'super' };
    if (!user) user = { name:'김운영', role:'super' };

    var aside = document.createElement('aside');
    aside.className = 'sidebar';
    aside.innerHTML = build(active, user);
    mount.parentNode.replaceChild(aside, mount);
  });
})();
