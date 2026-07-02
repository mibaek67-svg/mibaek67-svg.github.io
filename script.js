const questions = [
  {
    title: "오늘 냥이 모드는?",
    weight: 2,
    options: [
      { label: "바로 시작하기", primary: "confidence", secondary: "courage" },
      { label: "차분히 정리하기", primary: "calm", secondary: "worry" },
      { label: "길부터 확인하기", primary: "direction", secondary: "growth" },
      { label: "든든히 채우기", primary: "abundance", secondary: "rest" },
    ],
  },
  {
    title: "냥이한테 맡길 임무는?",
    weight: 3,
    options: [
      { label: "먼저 가서 길 보기", primary: "direction", secondary: "courage" },
      { label: "옆에서 같이 걷기", primary: "together", secondary: "protection" },
      { label: "생선 챙겨오기", primary: "abundance", secondary: "chance" },
      { label: "걱정 창고에 넣기", primary: "worry", secondary: "calm" },
    ],
  },
  {
    title: "지금 누르고 싶은 버튼은?",
    weight: 2,
    options: [
      { label: "시작 버튼", primary: "confidence", secondary: "courage" },
      { label: "정리 버튼", primary: "calm", secondary: "direction" },
      { label: "충전 버튼", primary: "rest", secondary: "joy" },
      { label: "보상 버튼", primary: "chance", secondary: "special" },
    ],
  },
  {
    title: "오늘 필요한 버프는?",
    weight: 4,
    options: [
      { label: "자신감 올리기", primary: "confidence", secondary: "dignity" },
      { label: "생각 정리하기", primary: "calm", secondary: "worry" },
      { label: "에너지 채우기", primary: "joy", secondary: "lightness" },
      { label: "좋은 기회 찾기", primary: "chance", secondary: "growth" },
    ],
  },
];

const results = {
  confidence: {
    title: "우주비행사 냥이",
    image: "assets/cats/01_confidence.png",
    message: "네 자리는 이미 준비되어 있다냥! 나랑 같이 가자냥!",
  },
  joy: {
    title: "훌라춤 냥이",
    image: "assets/cats/02_joy.png",
    message: "기쁨은 발끝부터 시작된다냥! 같이 하자냥!",
  },
  chance: {
    title: "행운 냥이",
    image: "assets/cats/03_chance.png",
    message: "네가 채울 수 있는 기회를 봐라냥! 내가 돕겠다냥!",
  },
  rest: {
    title: "잠자는 냥이",
    image: "assets/cats/04_rest.png",
    message: "쉬는 것도 나를 아끼는 거다냥! 쉬고 더 힘내보자냥!",
  },
  worry: {
    title: "오리 잠옷 냥이",
    image: "assets/cats/05_worry.png",
    message: "내일 걱정은 내일 냥이한테 맡겨라냥!",
  },
  together: {
    title: "포옹 냥이",
    image: "assets/cats/06_together.png",
    message: "혼자 버티지만 말라냥! 우리가 있다냥!",
  },
  courage: {
    title: "불꽃 대장 냥이",
    image: "assets/cats/07_courage.png",
    message: "두려워하지 말라냥! 걱정을 화르륵 태워주겠다냥!",
  },
  calm: {
    title: "얼음 마법사 냥이",
    image: "assets/cats/08_calm.png",
    message: "차분하면 더 잘 보인다냥! 내가 가라앉히겠다냥!",
  },
  direction: {
    title: "해적 냥이",
    image: "assets/cats/09_direction.png",
    message: "길은 이미 알고 있다냥! 나와 같이 다시 가자냥!",
  },
  abundance: {
    title: "생선 냥이",
    image: "assets/cats/10_abundance.png",
    message: "오늘도 생선 챙겨줘서 고맙다냥! 네 생선도 이미 있다냥!",
  },
  growth: {
    title: "당근 농부 냥이",
    image: "assets/cats/11_growth.png",
    message: "좋은 밭에 좋은 당근이 나온다냥! 밭을 같이 가꾸자냥!",
  },
  dignity: {
    title: "귀족 냥이",
    image: "assets/cats/12_dignity.png",
    message: "내면이 아름다운 사람이다냥! 같이 멋진 자세 잡자냥!",
  },
  special: {
    title: "유니콘 냥이",
    image: "assets/cats/13_special.png",
    message: "너만의 빛으로 세상을 비추라냥! 환히 빛날 거다냥!",
  },
  protection: {
    title: "대천사 냥이",
    image: "assets/cats/14_protection.png",
    message: "너를 지켜주겠다냥! 걱정하지 말라냥!",
  },
  lightness: {
    title: "풍선 냥이",
    image: "assets/cats/15_lightness.png",
    message: "가벼워야 더 높이 뜬다냥! 힘을 빼보자냥!",
  },
};

const screens = {
  start: document.querySelector("#start-screen"),
  quiz: document.querySelector("#quiz-screen"),
  loading: document.querySelector("#loading-screen"),
  result: document.querySelector("#result-screen"),
};

const startButton = document.querySelector("#start-button");
const retryButton = document.querySelector("#retry-button");
const shareButton = document.querySelector("#share-button");
const copyLinkButton = document.querySelector("#copy-link-button");
const kakaoButton = document.querySelector("#kakao-button");
const shareModal = document.querySelector("#share-modal");
const sharePreviewImage = document.querySelector("#share-preview-image");
const shareResultText = document.querySelector("#share-result-text");
const toast = document.querySelector("#toast");
const stepLabel = document.querySelector("#step-label");
const progressBar = document.querySelector("#progress-bar");
const questionTitle = document.querySelector("#question-title");
const optionList = document.querySelector("#option-list");
const resultTitle = document.querySelector("#result-title");
const resultImage = document.querySelector("#result-image");
const resultMessage = document.querySelector("#result-message");
const copyStatus = document.querySelector("#copy-status");
const previewCat = document.querySelector("#preview-cat");

const state = {
  step: 0,
  answers: [],
  resultKey: "",
};

const PUBLIC_BASE_URL = "https://mibaek67-svg.github.io/";
const KAKAO_JS_KEY = "8158f304dfe304fb6af8fe0d64558453";

const previewCatImages = [
  "assets/cats/01_confidence.png",
  "assets/cats/02_joy.png",
  "assets/cats/03_chance.png",
  "assets/cats/04_rest.png",
  "assets/cats/05_worry.png",
  "assets/cats/06_together.png",
  "assets/cats/07_courage.png",
  "assets/cats/08_calm.png",
  "assets/cats/09_direction.png",
  "assets/cats/10_abundance.png",
  "assets/cats/11_growth.png",
  "assets/cats/12_dignity.png",
  "assets/cats/13_special.png",
  "assets/cats/14_protection.png",
  "assets/cats/15_lightness.png",
];

let previewCatIndex = 0;
let toastTimer = 0;

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove("is-active"));
  screens[name].classList.add("is-active");
}

function startQuiz() {
  state.step = 0;
  state.answers = [];
  state.resultKey = "";
  copyStatus.textContent = "";
  showScreen("quiz");
  renderQuestion();
}

function resetToStart() {
  state.step = 0;
  state.answers = [];
  state.resultKey = "";
  copyStatus.textContent = "";
  closeShareModal();
  clearResultUrl();
  showScreen("start");
}

function rotatePreviewCat() {
  if (!previewCat) {
    return;
  }

  previewCatIndex = (previewCatIndex + 1) % previewCatImages.length;
  previewCat.classList.remove("is-switching");
  previewCat.src = previewCatImages[previewCatIndex];
  void previewCat.offsetWidth;
  previewCat.classList.add("is-switching");
}

function renderQuestion() {
  const question = questions[state.step];
  stepLabel.textContent = `${state.step + 1} / ${questions.length}`;
  progressBar.style.width = `${((state.step + 1) / questions.length) * 100}%`;
  questionTitle.textContent = question.title;
  optionList.innerHTML = "";

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.type = "button";
    button.textContent = option.label;
    button.addEventListener("click", () => chooseOption(index));
    optionList.appendChild(button);
  });
}

function chooseOption(optionIndex) {
  state.answers[state.step] = optionIndex;

  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
    return;
  }

  showScreen("loading");
  window.setTimeout(showResult, 620);
}

function showResult() {
  const resultKey = calculateResult();
  renderResult(resultKey);

  saveResultCount(resultKey);
  updateResultUrl(resultKey);
  showScreen("result");
}

function renderResult(resultKey) {
  const result = results[resultKey];
  state.resultKey = resultKey;

  resultTitle.textContent = result.title;
  resultImage.src = result.image;
  resultImage.alt = result.title;
  resultMessage.textContent = result.message;
  copyStatus.textContent = "";
}

function calculateResult() {
  const matrixResult = resolveByIntentAndMission();

  if (matrixResult) {
    return matrixResult;
  }

  const scores = Object.fromEntries(Object.keys(results).map((key) => [key, 0]));
  const pickedPrimary = {};

  questions.forEach((question, questionIndex) => {
    const option = question.options[state.answers[questionIndex]];
    const secondaryScore = question.weight >= 4 ? 2 : 1;
    scores[option.primary] += question.weight;
    scores[option.secondary] += secondaryScore;
    pickedPrimary[questionIndex] = option.primary;
  });

  const topScore = Math.max(...Object.values(scores));
  let candidates = Object.keys(scores).filter((key) => scores[key] === topScore);

  candidates = preferPrimary(candidates, pickedPrimary[3]);
  candidates = preferPrimary(candidates, pickedPrimary[1]);
  candidates = preferPrimary(candidates, pickedPrimary[0]);

  if (candidates.length === 1) {
    return candidates[0];
  }

  const counts = getResultCounts();
  candidates.sort((a, b) => (counts[a] || 0) - (counts[b] || 0));
  return candidates[0];
}

function resolveByIntentAndMission() {
  const missionIndex = state.answers[1];
  const intentIndex = state.answers[3];

  const matrix = [
    ["confidence", "dignity", "confidence", "courage"],
    ["direction", "protection", "calm", "worry"],
    ["lightness", "together", "joy", "rest"],
    ["growth", "special", "abundance", "chance"],
  ];

  return matrix[intentIndex]?.[missionIndex] || "";
}

function preferPrimary(candidates, key) {
  if (candidates.includes(key)) {
    return [key];
  }

  return candidates;
}

function getResultCounts() {
  try {
    return JSON.parse(localStorage.getItem("nyangBuffCounts") || "{}");
  } catch {
    return {};
  }
}

function saveResultCount(key) {
  const counts = getResultCounts();
  counts[key] = (counts[key] || 0) + 1;
  localStorage.setItem("nyangBuffCounts", JSON.stringify(counts));
}

async function copyShareLink() {
  const url = getResultUrl();

  try {
    await navigator.clipboard.writeText(url.toString());
    showToast("링크 복사 되었다냥<br />붙여 넣기 하면 된다냥!");
  } catch {
    showToast("복사가 막혔다냥<br />주소창 링크를 복사해달라냥.");
  }
}

function getResultUrl() {
  const url = new URL(PUBLIC_BASE_URL);

  if (state.resultKey) {
    url.searchParams.set("result", state.resultKey);
  }

  return url;
}

function updateResultUrl(resultKey) {
  const url = new URL(window.location.href);
  url.searchParams.set("result", resultKey);
  window.history.replaceState({}, "", url);
}

function clearResultUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("result");
  window.history.replaceState({}, "", url);
}

function openShareModal() {
  if (!state.resultKey) {
    return;
  }

  const result = results[state.resultKey];
  sharePreviewImage.src = result.image;
  sharePreviewImage.alt = result.title;
  shareResultText.textContent = `나는 ${result.title} 받았다냥!`;
  shareModal.classList.add("is-open");
  shareModal.setAttribute("aria-hidden", "false");
}

function closeShareModal() {
  shareModal.classList.remove("is-open");
  shareModal.setAttribute("aria-hidden", "true");
}

function showKakaoPending() {
  shareToKakao();
}

function initKakaoShare() {
  if (!window.Kakao || window.Kakao.isInitialized()) {
    return;
  }

  window.Kakao.init(KAKAO_JS_KEY);
}

function shareToKakao() {
  if (!state.resultKey) {
    return;
  }

  if (!window.Kakao || !window.Kakao.Share) {
    showToast("카카오톡 공유 준비가<br />아직 안 됐다냥.");
    return;
  }

  initKakaoShare();

  const result = results[state.resultKey];
  const resultUrl = getResultUrl().toString();
  const imageUrl = new URL(result.image, PUBLIC_BASE_URL).toString();

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: "오늘의 버프 냥이",
      description: `나는 ${result.title} 받았다냥!`,
      imageUrl,
      link: {
        mobileWebUrl: resultUrl,
        webUrl: resultUrl,
      },
    },
    buttons: [
      {
        title: "내 버프 냥이 보기",
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
    ],
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.innerHTML = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3000);
}

function loadResultFromUrl() {
  const resultKey = new URL(window.location.href).searchParams.get("result");

  if (!resultKey || !results[resultKey]) {
    showScreen("start");
    return;
  }

  renderResult(resultKey);
  showScreen("result");
}

startButton.addEventListener("click", startQuiz);
retryButton.addEventListener("click", resetToStart);
shareButton.addEventListener("click", openShareModal);
copyLinkButton.addEventListener("click", copyShareLink);
kakaoButton.addEventListener("click", showKakaoPending);
document.querySelectorAll("[data-close-share]").forEach((element) => {
  element.addEventListener("click", closeShareModal);
});

window.setInterval(rotatePreviewCat, 1200);

initKakaoShare();
loadResultFromUrl();
