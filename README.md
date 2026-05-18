# 코인북 — 내 암호화폐 포트폴리오

> 해킹 걱정 없이 내 기기에서만 관리하는 코인 포트폴리오 앱

## ✨ 특징

- **완전 프라이빗** — 보유량·매입가가 서버로 절대 전송되지 않음
- **오프라인 지원** — 앱 설치 후 인터넷 없이도 기존 데이터 열람 가능  
- **실시간 시세** — CoinGecko 공개 API로 1분마다 KRW 가격 갱신
- **PWA** — 아이폰/안드로이드 홈화면에 설치해 앱처럼 사용

---

## 📲 아이폰 홈화면에 추가하는 방법

1. **Safari**로 배포된 URL을 열기 (Chrome에서는 홈화면 추가 불가)
2. 하단 **공유 버튼** (□↑) 탭
3. **"홈 화면에 추가"** 탭
4. 이름 확인 후 **추가** 탭
5. 홈화면에서 앱 아이콘으로 실행!

---

## 🚀 GitHub Pages 배포 방법

### 방법 1 — GitHub 웹사이트에서 직접 업로드

1. [github.com](https://github.com) 로그인
2. 우상단 **+** → **New repository**
3. Repository name: `coinbook` (또는 원하는 이름)
4. **Public** 선택 → **Create repository**
5. **uploading an existing file** 클릭
6. 이 폴더의 파일들을 모두 드래그&드롭
7. **Commit changes** 클릭
8. 저장소 **Settings** → **Pages** → Source: **main branch / root** → **Save**
9. 몇 분 후 `https://[username].github.io/coinbook/` 접속!

### 방법 2 — Git CLI

```bash
cd crypto-portfolio
git init
git add .
git commit -m "feat: coinbook PWA"
git branch -M main
git remote add origin https://github.com/[username]/coinbook.git
git push -u origin main
```

그 다음 GitHub Settings → Pages → Deploy from branch → main → Save

---

## 📁 파일 구조

```
crypto-portfolio/
├── index.html      # 메인 앱 (전체 UI + 로직)
├── manifest.json   # PWA 설정
├── sw.js           # 서비스워커 (오프라인 캐시)
├── icon-192.png    # 앱 아이콘 (홈화면용)
├── icon-512.png    # 앱 아이콘 (대형)
└── README.md       # 이 파일
```

---

## 🔒 프라이버시

| 데이터 | 저장 위치 | 외부 전송 |
|--------|-----------|-----------|
| 보유 수량 | 내 기기 localStorage | ❌ 없음 |
| 평균 매입가 | 내 기기 localStorage | ❌ 없음 |
| 코인 종류 ID | 내 기기 localStorage | ✅ 시세 조회시 (코인 ID만) |
| KRW 시세 | CoinGecko API | — |

---

## 💡 사용법

1. **+ 버튼** → 코인 검색 → 수량·매입가 입력 → 저장
2. **코인 행 탭** → 상세 정보·수정·삭제
3. **아래로 당기기** → 시세 새로고침
4. **설정** → 백업(JSON 내보내기) / 복원

---

MIT License
