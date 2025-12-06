"use client";

import { useState, useEffect } from "react";
import "./random.css";

interface HistoryItem {
  name: string;
  timestamp: string;
}

const NAMES = [
  "이채현",
  "임현준",
  "정찬혁",
  "주민연",
  "홍옥비",
  "고현석",
  "박건남",
  "이모세",
  "이예린",
  "최태옥",
  "손은빈",
  "엄하늘",
  "윤홍서",
  "임희우",
  "정기범",
  "최현수",
  "김선민",
  "이용우",
  "이정한",
  "최용태",
  "최현도",
  "김성우",
  "오승환",
  "윤수한",
  "최지혁",
  "한영주",
];

export default function RandomPage() {
  const [drawnNames, setDrawnNames] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentDraw, setCurrentDraw] = useState<string | null>(null);

  // Enable scrolling for this page
  useEffect(() => {
    // Override the global overflow: hidden
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    return () => {
      // Restore original overflow when leaving the page
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDrawnNames = localStorage.getItem("drawnNames");
    const savedHistory = localStorage.getItem("drawHistory");

    if (savedDrawnNames) {
      setDrawnNames(JSON.parse(savedDrawnNames));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save to localStorage whenever drawnNames or history changes
  useEffect(() => {
    if (drawnNames.length > 0) {
      localStorage.setItem("drawnNames", JSON.stringify(drawnNames));
    }
  }, [drawnNames]);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("drawHistory", JSON.stringify(history));
    }
  }, [history]);

  const handleDraw = () => {
    if (isAnimating) return;

    const availableNames = NAMES.filter((name) => !drawnNames.includes(name));

    if (availableNames.length === 0) {
      alert("모든 이름이 뽑혔습니다!");
      return;
    }

    setIsAnimating(true);

    // Animation: show random names quickly
    let count = 0;
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      setCurrentDraw(availableNames[randomIndex]);
      count++;

      if (count >= 15) {
        clearInterval(animationInterval);

        // Final selection
        const selectedName =
          availableNames[Math.floor(Math.random() * availableNames.length)];
        setCurrentDraw(selectedName);

        // Update drawn names and history
        const newDrawnNames = [...drawnNames, selectedName];
        const newHistoryItem: HistoryItem = {
          name: selectedName,
          timestamp: new Date().toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };

        setDrawnNames(newDrawnNames);
        setHistory([newHistoryItem, ...history]);

        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    }, 60);
  };

  const handleReset = () => {
    if (window.confirm("모든 데이터를 초기화하시겠습니까?")) {
      setDrawnNames([]);
      setHistory([]);
      setCurrentDraw(null);
      localStorage.removeItem("drawnNames");
      localStorage.removeItem("drawHistory");
    }
  };

  const remainingCount = NAMES.length - drawnNames.length;

  return (
    <div className="random-container">
      <div className="random-content">
        {/* Title Section */}
        <div className="title-section">
          {/* <h1>이름 랜덤뽑기</h1> */}
          <div className="stats">
            <span className="remaining">남은 인원: {remainingCount}명</span>
            <span className="total">전체: {NAMES.length}명</span>
          </div>
        </div>

        {/* Main Content: Draw + Cards in 2 columns */}
        <div className="main-content">
          {/* Draw Result */}
          <div className="draw-section">
            <div
              className={`draw-result ${currentDraw ? "active" : ""} ${
                isAnimating ? "animating" : ""
              }`}
            >
              {currentDraw ? currentDraw : "?"}
            </div>
            <button
              className="draw-button"
              onClick={handleDraw}
              disabled={isAnimating || remainingCount === 0}
            >
              {isAnimating
                ? "뽑는 중..."
                : remainingCount === 0
                ? "모두 뽑음"
                : "뽑기"}
            </button>
            {drawnNames.length > 0 && (
              <button className="reset-button" onClick={handleReset}>
                초기화
              </button>
            )}
          </div>

          {/* Name Cards List */}
          <div className="cards-section">
            {/* <h2>이름 카드</h2> */}
            <div className="cards-grid">
              {NAMES.map((name, index) => (
                <div
                  key={index}
                  className={`name-card ${
                    drawnNames.includes(name) ? "drawn" : ""
                  }`}
                >
                  <div className="card-content">{name}</div>
                  {drawnNames.includes(name) && (
                    <div className="drawn-overlay"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="history-section">
          <h2>뽑기 기록</h2>
          {history.length === 0 ? (
            <p className="no-history">아직 뽑힌 이름이 없습니다.</p>
          ) : (
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-rank">{index + 1}</div>
                  <div className="history-name">{item.name}</div>
                  <div className="history-time">{item.timestamp}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
