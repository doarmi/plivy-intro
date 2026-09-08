# PLIVY Intro

> **Music, made personal.**\
> PLIVY의 핵심 경험을 스크롤 인터랙션으로 소개하고 실제 PLIVY 앱으로
> 연결하는 인터랙티브 랜딩 페이지입니다.

## 프로젝트 소개

PLIVY Intro는 음악 다이어리 커뮤니티 **PLIVY**의 서비스 컨셉을 설명하기
위한 소개 페이지입니다.

기능을 텍스트로 나열하기보다 사용자가 페이지를 직접 스크롤하며\
**음악 감상 → 순간 기록 → 새로운 음악 발견 → 같은 음악으로 연결되는
이야기 → PLIVY 시작**\
순서로 서비스 경험을 이해할 수 있도록 구성했습니다.

------------------------------------------------------------------------

## 주요 구성

### 1. Scroll Scrub Intro

-   스크롤 위치와 MP4 영상의 재생 위치를 연결한 인트로
-   스크롤 진행도에 따른 영상 Zoom / Fade 연출
-   구간별 카피와 브랜드 요소 전환
-   영상 이후 이미지 장면으로 자연스럽게 연결

### 2. Now Playing

-   `Honest — NOTD & Lou Elliotte` 재생 화면 연출
-   Play / Pause 상태 UI
-   Play 선택 시 `SCROLL TO LISTEN` 가이드 표시
-   재생 시작 위치부터 페이지 스크롤량을 계산해 3:01 길이의 가상 재생
    Progress UI 표시

> 실제 음원을 재생하는 음악 플레이어가 아니라, 스크롤과 음악 감상 경험을
> 연결하기 위한 인터랙션입니다.

### 3. Record

-   음악과 함께한 순간을 기록하는 PLIVY의 핵심 경험 소개
-   음악 / 사진 / 장소 / 시간 / 메모 / 태그 형태의 기록 카드 표현
-   한강 산책 기록을 예시 콘텐츠로 구성

### 4. Discover

-   다른 사용자의 기록을 통해 새로운 음악과 취향을 발견하는 경험 표현
-   장르별 음악 카드 구성
-   `IntersectionObserver`를 활용한 순차 등장 효과
-   Hover 기반 탐색 UI

### 5. Connect

-   하나의 음악에 서로 다른 사용자의 이야기가 연결되는 구조 시각화
-   중앙 음악 카드와 3개의 사용자 Story 연결
-   SVG Path를 활용한 네트워크 라인
-   화면 진입 시 인터랙션 활성화

### 6. Final CTA

-   `START WITH PLIVY` 최종 CTA
-   PLIVY QR 이미지 제공
-   QR 클릭 시 실제 PLIVY 서비스로 이동
-   `PLIVY © 2026` Footer

------------------------------------------------------------------------

## Navigation

상단 Navigation을 통해 주요 구간으로 이동할 수 있습니다.

-   `PLIVY` --- 페이지 최상단으로 Smooth Scroll
-   `ABOUT`
-   `EXPERIENCE`
-   `START`

------------------------------------------------------------------------

## Tech Stack

  -----------------------------------------------------------------------
  구분                                기술
  ----------------------------------- -----------------------------------
  Frontend                            React, TypeScript

  Build                               Vite

  Styling                             CSS

  Interaction                         Native Scroll Event,
                                      IntersectionObserver,
                                      requestAnimationFrame

  Media                               HTML5 Video

  Deploy                              Vercel
  -----------------------------------------------------------------------

### package.json에 포함된 추가 패키지

`gsap`, `three`가 dependency에 포함되어 있지만, **현재 전달받은 `src`
코드에서는 직접 import하여 사용하고 있지 않습니다.**\
따라서 실제 구현 기술과 설치 dependency를 구분해 표기했습니다.

------------------------------------------------------------------------

## 프로젝트 구조

``` text
PLIVY-INTRO/
├── public/
│   ├── assets/
│   │   ├── plivy-qr.png
│   │   └── record-hangang.png
│   └── scrub/
│       ├── plivy-intro-A.webp
│       ├── plivy-intro-AB.mp4
│       ├── plivy-intro-B.webp
│       └── plivy-intro-C.webp
├── src/
│   ├── components/
│   │   └── ScrollPlayer.tsx
│   ├── sections/
│   │   ├── ScrollScrubIntro.tsx
│   │   ├── NowPlaying.tsx
│   │   ├── Record.tsx
│   │   ├── Discover.tsx
│   │   ├── Connect.tsx
│   │   ├── FinalCTA.tsx
│   │   └── Hero.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
└── package.json
```

> `Hero.tsx`는 소스에 존재하지만 현재 `App.tsx`의 실제 렌더링 흐름에서는
> 사용되지 않습니다.

------------------------------------------------------------------------

## 핵심 인터랙션 구현

### Scroll-based Video Scrubbing

`ScrollScrubIntro`에서 현재 섹션의 스크롤 진행도를 계산하고, 해당 값을
영상의 `currentTime`과 연결했습니다.

이를 통해 사용자가 영상을 자동으로 시청하는 대신 **직접 스크롤하면서
장면을 진행하는 경험**을 구현했습니다.

### Scroll Player

Now Playing의 Play 버튼을 누르면 `plivy-play` Custom Event가 발생합니다.

`ScrollPlayer`는 이벤트가 발생한 위치를 시작점으로 저장한 뒤 남은
페이지의 스크롤 거리를 0\~100%로 변환해 가상의 3:01 재생 시간과 Progress
Bar를 표시합니다.

### Viewport Interaction

Discover와 Connect 섹션은 `IntersectionObserver`를 사용해 사용자가 해당
영역에 진입했을 때 콘텐츠가 나타나도록 구성했습니다.

------------------------------------------------------------------------

## PLIVY 연결

Final CTA의 QR 이미지를 클릭하면 실제 PLIVY 서비스로 이동합니다.

**PLIVY App**\
https://plivy-jzov.vercel.app/

------------------------------------------------------------------------

## 실행 방법

``` bash
npm install
npm run dev
```

Production build:

``` bash
npm run build
```

Build 결과를 로컬에서 확인하려면:

``` bash
npm run preview
```

------------------------------------------------------------------------

## 구현 범위

이 저장소는 **PLIVY 앱 본체가 아니라 PLIVY를 소개하기 위한 별도의 랜딩
페이지**입니다.

따라서 로그인, 게시물 작성, 저장, 알림 등의 PLIVY 앱 기능을 이
프로젝트에서 직접 구현한 것으로 표기하지 않았습니다.\
이 페이지에서는 PLIVY의 핵심 경험을 시각적으로 소개하고 실제 앱으로
연결하는 역할에 집중했습니다.

------------------------------------------------------------------------

## 제작 의도

서비스 소개 페이지에서도 단순한 기능 설명보다 사용자가 직접 경험하며
PLIVY의 컨셉을 이해할 수 있도록 하는 것을 목표로 했습니다.

특히 스크롤을 음악의 재생 흐름과 연결해 **"음악과 함께한 순간을
기록한다"**는 PLIVY의 정체성을 인터랙션으로 전달하고자 했습니다.
