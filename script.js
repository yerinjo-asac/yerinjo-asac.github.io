const projects = {
  animation: [
    {
      title: "Dingali",
      summary: "따뜻한 색감과 상징 그래픽을 활용한 메인 애니메이션 프로젝트.",
      role: "Direction / Motion",
      tools: "After Effects / Photoshop / Premiere Pro",
      year: "2025",
      accent: "pink",
      shape: "tall"
    },
    {
      title: "Cutweed",
      summary: "리듬감 있는 컷 편집과 질감 표현이 중심이 되는 모션 작업.",
      role: "Motion / Edit",
      tools: "Premiere Pro / After Effects",
      year: "2024",
      accent: "blue",
      shape: "wide"
    },
    {
      title: "You Killed Him",
      summary: "무드 중심의 프레임 연출과 강한 대비를 이용한 실험적 영상.",
      role: "Concept / Visual Design",
      tools: "Photoshop / Blender",
      year: "2024",
      accent: "paper",
      shape: "portrait"
    },
    {
      title: "What If?",
      summary: "스토리 흐름이 살아 있는 짧은 애니메이션 시퀀스 포맷.",
      role: "Storyboard / Motion",
      tools: "After Effects / Procreate",
      year: "2023",
      accent: "pink",
      shape: "square"
    }
  ],
  storyboard: [
    {
      title: "Furend",
      summary: "장면 단위 감정선과 컷 전환을 먼저 설계한 스토리보드 작업.",
      role: "Storyboarding",
      tools: "Photoshop / Procreate",
      year: "2025",
      accent: "paper",
      shape: "wide"
    },
    {
      title: "Treecare",
      summary: "브랜드 영상을 위한 정보 전달형 보드와 카메라 흐름 설계.",
      role: "Storyboard / Planning",
      tools: "Illustrator / Photoshop",
      year: "2024",
      accent: "blue",
      shape: "portrait"
    },
    {
      title: "Kopal",
      summary: "스타일 프레임과 연결되는 시퀀스형 장면 보드.",
      role: "Concept / Board",
      tools: "Photoshop",
      year: "2023",
      accent: "pink",
      shape: "square"
    }
  ],
  illustration: [
    {
      title: "My World of Imagination",
      summary: "포스터 감성의 일러스트 시리즈와 세계관 구축 중심 작업.",
      role: "Illustration",
      tools: "Photoshop / Procreate",
      year: "2025",
      accent: "pink",
      shape: "portrait"
    },
    {
      title: "Commission Works",
      summary: "클라이언트 커미션 기반의 다양한 톤 실험과 캐릭터 작업.",
      role: "Illustration / Client Work",
      tools: "Procreate / Photoshop",
      year: "2024",
      accent: "paper",
      shape: "wide"
    },
    {
      title: "Sketchbook",
      summary: "러프 드로잉, 아이디어 스케치, 레이아웃 탐색 기록.",
      role: "Sketch / Research",
      tools: "Pencil / Procreate",
      year: "2023",
      accent: "blue",
      shape: "square"
    }
  ]
};

const grid = document.getElementById("project-grid");
const panel = document.getElementById("project-panel");
const panelVisual = document.getElementById("panel-visual");
const panelTitle = document.getElementById("panel-title");
const panelSummary = document.getElementById("panel-summary");
const panelRole = document.getElementById("panel-role");
const panelTools = document.getElementById("panel-tools");
const panelYear = document.getElementById("panel-year");
const closeButton = document.getElementById("panel-close");
const tabButtons = document.querySelectorAll(".tab-button");

let currentTab = "animation";

function renderProjects(tab) {
  currentTab = tab;
  grid.innerHTML = "";

  projects[tab].forEach((project, index) => {
    const button = document.createElement("button");
    button.className = `project-card ${project.shape || "square"}`;
    button.dataset.accent = project.accent;
    button.type = "button";
    button.innerHTML = `
      <div class="project-thumb"></div>
      <div class="project-copy">
        <strong>${project.title}</strong>
        <span>${project.role}</span>
      </div>
    `;

    button.addEventListener("click", () => selectProject(project, button));
    grid.appendChild(button);

    if (index === 0) {
      selectProject(project, button);
    }
  });
}

function selectProject(project, activeButton) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.remove("active");
  });

  if (activeButton) {
    activeButton.classList.add("active");
  }

  panel.dataset.state = "open";
  panelTitle.textContent = project.title;
  panelSummary.textContent = project.summary;
  panelRole.textContent = project.role;
  panelTools.textContent = project.tools;
  panelYear.textContent = project.year;
  panelVisual.style.background = panelBackground(project.accent);
}

function panelBackground(accent) {
  if (accent === "blue") {
    return "linear-gradient(145deg, rgba(26, 87, 139, 0.96), rgba(38, 215, 248, 0.72)), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.18), transparent 28%)";
  }

  if (accent === "paper") {
    return "linear-gradient(145deg, rgba(255,248,239,0.94), rgba(240,220,188,0.96)), radial-gradient(circle at 70% 30%, rgba(255,107,44,0.18), transparent 28%)";
  }

  return "linear-gradient(145deg, rgba(243, 6, 95, 0.9), rgba(255, 107, 44, 0.86)), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.18), transparent 28%)";
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    renderProjects(button.dataset.tab);
  });
});

closeButton.addEventListener("click", () => {
  panel.dataset.state = "closed";
  document.querySelectorAll(".project-card").forEach((card) => {
    card.classList.remove("active");
  });
  panelTitle.textContent = "프로젝트를 선택해 주세요";
  panelSummary.textContent =
    "그리드에서 대표 이미지를 누르면 오른쪽 패널이 열리고, 프로젝트 설명과 역할, 제작 툴, 핵심 포인트를 바로 확인할 수 있습니다.";
  panelRole.textContent = "Motion / Design";
  panelTools.textContent = "After Effects / Photoshop";
  panelYear.textContent = "2026";
});

renderProjects(currentTab);
