import React, { useState } from "react";
import {
  Activity,
  Dumbbell,
  Zap,
  TrendingUp,
  User,
  ChevronLeft,
  Calendar,
  Save,
  Award,
  Lock,
  Key,
  X,
  LayoutDashboard,
  Trophy,
  Flame,
  Medal,
  Users,
  Crown,
} from "lucide-react";

// --- 데이터 및 상수 정의 ---
const CLASSES = Array.from({ length: 11 }, (_, i) => i + 1);
const NUMBERS = Array.from({ length: 34 }, (_, i) => i + 1);

const CATEGORIES = [
  {
    id: "cardio",
    name: "심폐지구력",
    item: "셔틀런",
    unit: "회",
    icon: Activity,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    id: "strength",
    name: "근력·근지구력",
    item: "윗몸말아올리기",
    unit: "회",
    icon: Dumbbell,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: "power",
    name: "순발력",
    item: "제자리멀리뛰기",
    unit: "cm",
    icon: Zap,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    id: "flexibility",
    name: "유연성",
    item: "앉아윗몸앞으로굽히기",
    unit: "cm",
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    id: "body",
    name: "신체조성",
    item: "BMI",
    unit: "",
    icon: User,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

// 중학교 1학년(13세) PAPS 기준표 (학교건강검사규칙 별표4 기준)
const PAPS_STANDARDS = {
  M: {
    cardio: [
      { min: 64, max: 73, g: 1, sMin: 16, sMax: 20 },
      { min: 50, max: 63.99, g: 2, sMin: 12, sMax: 15 },
      { min: 36, max: 49.99, g: 3, sMin: 8, sMax: 11 },
      { min: 20, max: 35.99, g: 4, sMin: 4, sMax: 7 },
      { min: 15, max: 19.99, g: 5, sMin: 0, sMax: 3 },
    ],
    strength: [
      { min: 55, max: 130, g: 1, sMin: 16, sMax: 20 },
      { min: 33, max: 54.99, g: 2, sMin: 12, sMax: 15 },
      { min: 14, max: 32.99, g: 3, sMin: 8, sMax: 11 },
      { min: 5, max: 13.99, g: 4, sMin: 4, sMax: 7 },
      { min: 0, max: 4.99, g: 5, sMin: 0, sMax: 3 },
    ],
    power: [
      { min: 212, max: 230, g: 1, sMin: 16, sMax: 20 },
      { min: 178, max: 211.99, g: 2, sMin: 12, sMax: 15 },
      { min: 159, max: 177.99, g: 3, sMin: 8, sMax: 11 },
      { min: 130, max: 158.99, g: 4, sMin: 4, sMax: 7 },
      { min: 122, max: 129.99, g: 5, sMin: 0, sMax: 3 },
    ],
    flexibility: [
      { min: 10.0, max: 25.0, g: 1, sMin: 16, sMax: 20 },
      { min: 6.0, max: 9.99, g: 2, sMin: 12, sMax: 15 },
      { min: 2.0, max: 5.99, g: 3, sMin: 8, sMax: 11 },
      { min: -4.0, max: 1.99, g: 4, sMin: 4, sMax: 7 },
      { min: -5.1, max: -4.1, g: 5, sMin: 0, sMax: 3 },
    ],
    body: [
      { min: 15.4, max: 23.2, g: 1, sMin: 20, sMax: 20 },
      { min: 23.3, max: 24.9, g: 2, sMin: 15, sMax: 15 },
      { min: 14.0, max: 15.3, g: 2, sMin: 15, sMax: 15 },
      { min: 25.0, max: 26.9, g: 3, sMin: 10, sMax: 10 },
      { min: 12.0, max: 13.9, g: 3, sMin: 10, sMax: 10 },
      { min: 27.0, max: 29.9, g: 4, sMin: 5, sMax: 5 },
      { min: 10.0, max: 11.9, g: 4, sMin: 5, sMax: 5 },
      { min: -1000, max: 9.9, g: 5, sMin: 0, sMax: 0 },
      { min: 30.0, max: 1000, g: 5, sMin: 0, sMax: 0 },
    ],
  },
  F: {
    cardio: [
      { min: 35, max: 70, g: 1, sMin: 16, sMax: 20 },
      { min: 25, max: 34.99, g: 2, sMin: 12, sMax: 15 },
      { min: 19, max: 24.99, g: 3, sMin: 8, sMax: 11 },
      { min: 14, max: 18.99, g: 4, sMin: 4, sMax: 7 },
      { min: 10, max: 13.99, g: 5, sMin: 0, sMax: 3 },
    ],
    strength: [
      { min: 58, max: 80, g: 1, sMin: 16, sMax: 20 },
      { min: 43, max: 57.99, g: 2, sMin: 12, sMax: 15 },
      { min: 22, max: 42.99, g: 3, sMin: 8, sMax: 11 },
      { min: 7, max: 21.99, g: 4, sMin: 4, sMax: 7 },
      { min: 0, max: 6.99, g: 5, sMin: 0, sMax: 3 },
    ],
    power: [
      { min: 190, max: 200, g: 1, sMin: 16, sMax: 20 },
      { min: 176, max: 189.99, g: 2, sMin: 12, sMax: 15 },
      { min: 145, max: 175.99, g: 3, sMin: 8, sMax: 11 },
      { min: 128, max: 144.99, g: 4, sMin: 4, sMax: 7 },
      { min: 100, max: 127.99, g: 5, sMin: 0, sMax: 3 },
    ],
    flexibility: [
      { min: 15.0, max: 28.0, g: 1, sMin: 16, sMax: 20 },
      { min: 11.0, max: 14.99, g: 2, sMin: 12, sMax: 15 },
      { min: 8.0, max: 10.99, g: 3, sMin: 8, sMax: 11 },
      { min: 2.0, max: 7.99, g: 4, sMin: 4, sMax: 7 },
      { min: -1000, max: 1.99, g: 5, sMin: 0, sMax: 3 },
    ],
    body: [
      { min: 15.2, max: 22.1, g: 1, sMin: 20, sMax: 20 },
      { min: 22.2, max: 24.7, g: 2, sMin: 15, sMax: 15 },
      { min: 13.5, max: 15.1, g: 2, sMin: 15, sMax: 15 },
      { min: 24.8, max: 27.0, g: 3, sMin: 10, sMax: 10 },
      { min: 11.5, max: 13.4, g: 3, sMin: 10, sMax: 10 },
      { min: 27.1, max: 29.9, g: 4, sMin: 5, sMax: 5 },
      { min: 10.0, max: 11.4, g: 4, sMin: 5, sMax: 5 },
      { min: -1000, max: 9.9, g: 5, sMin: 0, sMax: 0 },
      { min: 30.0, max: 1000, g: 5, sMin: 0, sMax: 0 },
    ],
  },
};

export default function App() {
  // --- 상태 관리 ---
  const [step, setStep] = useState(1); // 1: 반 선택, 2: 번호 선택, 3: 비밀번호 확인, 4: 메인 대시보드
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  // 기록 저장 상태 (메모리 구조)
  const [records, setRecords] = useState({});
  const [passwords, setPasswords] = useState({});
  const [genders, setGenders] = useState({});

  // 입력 폼 상태
  const [inputDate, setInputDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [inputValue, setInputValue] = useState("");
  const [inputDistance, setInputDistance] = useState(20);

  // 비밀번호 관련 상태
  const [inputPwd, setInputPwd] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [showPwdChange, setShowPwdChange] = useState(false);
  const [newPwd, setNewPwd] = useState("");

  // 랭킹 필터 상태
  const [rankCategory, setRankCategory] = useState("total"); // 'total' 또는 카테고리 ID
  const [rankGender, setRankGender] = useState("all"); // 'all', 'M', 'F'

  // --- 함수 정의 ---
  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setStep(2);
  };

  const handleSelectNumber = (num) => {
    setSelectedNumber(num);
    setIsTeacherMode(false);
    setStep(3);
  };

  const handleSelectTeacher = () => {
    setIsTeacherMode(true);
    setStep(3);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (isTeacherMode) {
      if (inputPwd === "971129") {
        setStep(4);
        setActiveTab("summary");
        setInputPwd("");
        setPwdError("");
      } else {
        setPwdError("교사용 마스터 비밀번호가 틀렸습니다.");
      }
    } else {
      const studentKey = `${selectedClass}-${selectedNumber}`;
      const correctPwd = passwords[studentKey] || "1234";
      if (inputPwd === correctPwd || inputPwd === "971129") {
        setStep(4);
        setInputPwd("");
        setPwdError("");
      } else {
        setPwdError("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(newPwd)) {
      setPwdError("비밀번호는 숫자 4자리여야 합니다.");
      return;
    }
    const studentKey = `${selectedClass}-${selectedNumber}`;
    setPasswords((prev) => ({ ...prev, [studentKey]: newPwd }));
    setShowPwdChange(false);
    setNewPwd("");
    setPwdError("");
  };

  const handleLogout = () => {
    setStep(1);
    setSelectedClass(null);
    setSelectedNumber(null);
    setIsTeacherMode(false);
    setInputPwd("");
    setPwdError("");
  };

  const calculateGrade = (
    categoryId,
    value,
    distance = 20,
    genderInput = null
  ) => {
    const studentKey = `${selectedClass}-${selectedNumber}`;
    const gender = genderInput || genders[studentKey];
    if (!gender) return null;

    let effectiveValue = parseFloat(value);
    if (categoryId === "cardio" && distance) {
      effectiveValue = effectiveValue * (distance / 20);
    }

    const standards = PAPS_STANDARDS[gender][categoryId];
    let matched = standards.find(
      (s) => effectiveValue >= s.min && effectiveValue <= s.max
    );

    if (!matched) {
      if (effectiveValue > standards[0].max) matched = standards[0];
      else if (effectiveValue < standards[standards.length - 1].min)
        matched = standards[standards.length - 1];
      else return null;
    }

    let calculatedScore = matched.sMax;
    if (matched.sMin !== matched.sMax) {
      const ratio =
        (effectiveValue - matched.min) / (matched.max - matched.min);
      calculatedScore = Math.round(
        matched.sMin + ratio * (matched.sMax - matched.sMin)
      );
      calculatedScore = Math.max(
        matched.sMin,
        Math.min(matched.sMax, calculatedScore)
      );
    }

    return {
      grade: matched.g,
      score: calculatedScore,
      effective: effectiveValue,
    };
  };

  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!inputValue) return;

    const studentKey = `${selectedClass}-${selectedNumber}`;
    const activeCategoryItem = CATEGORIES.find((c) => c.id === activeTab).item;

    const existingRecords = records[studentKey]?.[activeCategoryItem] || [];
    const hasRecordToday = existingRecords.some((r) => r.date === inputDate);

    if (hasRecordToday) {
      alert(
        "⚠️ 해당 날짜에는 이미 기록이 작성되어 있습니다. 하루에 한 번만 입력 가능합니다."
      );
      return;
    }

    setRecords((prev) => {
      const studentRecords = prev[studentKey] || {};
      const categoryRecords = studentRecords[activeCategoryItem] || [];
      return {
        ...prev,
        [studentKey]: {
          ...studentRecords,
          [activeCategoryItem]: [
            ...categoryRecords,
            {
              id: Date.now(),
              date: inputDate,
              value: parseFloat(inputValue),
              distance: activeTab === "cardio" ? parseInt(inputDistance) : null,
            },
          ].sort((a, b) => new Date(b.date) - new Date(a.date)),
        },
      };
    });

    setInputValue("");
  };

  const handleDeleteRecord = (recordId) => {
    const studentKey = `${selectedClass}-${selectedNumber}`;
    const activeCategoryItem = CATEGORIES.find((c) => c.id === activeTab).item;
    setRecords((prev) => {
      const studentRecords = prev[studentKey] || {};
      const categoryRecords = studentRecords[activeCategoryItem] || [];
      return {
        ...prev,
        [studentKey]: {
          ...studentRecords,
          [activeCategoryItem]: categoryRecords.filter(
            (r) => r.id !== recordId
          ),
        },
      };
    });
  };

  const getCurrentRecords = () => {
    if (!selectedClass || !selectedNumber) return [];
    const studentKey = `${selectedClass}-${selectedNumber}`;
    const activeCategoryItem = CATEGORIES.find((c) => c.id === activeTab)?.item;
    return records[studentKey]?.[activeCategoryItem] || [];
  };

  // 1학년 전체 랭킹 연산 데이터 생성
  const getLeaderboardData = () => {
    let list = [];
    for (let c = 1; c <= 11; c++) {
      for (let n = 1; n <= 34; n++) {
        const studentKey = `${c}-${n}`;
        const gender = genders[studentKey];
        if (!gender) continue; // 성별 선택이 필수 기준

        if (rankCategory === "total") {
          // 종합랭킹: 5개 종목 점수 총합
          let totalScore = 0;
          let measuredCount = 0;
          CATEGORIES.forEach((cat) => {
            const studentRecords = records[studentKey]?.[cat.item] || [];
            if (studentRecords.length > 0) {
              const latest = studentRecords[0];
              const gradeInfo = calculateGrade(
                cat.id,
                latest.value,
                latest.distance,
                gender
              );
              if (gradeInfo) {
                totalScore += gradeInfo.score;
                measuredCount++;
              }
            }
          });
          if (measuredCount > 0) {
            list.push({
              classNum: c,
              studNum: n,
              gender,
              value: totalScore,
              isCount: measuredCount,
            });
          }
        } else {
          // 개별 종목 랭킹 (신체조성 제외)
          if (rankCategory === "body") continue;
          const targetCategory = CATEGORIES.find(
            (cat) => cat.id === rankCategory
          );
          if (!targetCategory) continue;

          const studentRecords =
            records[studentKey]?.[targetCategory.item] || [];
          if (studentRecords.length > 0) {
            const latest = studentRecords[0];
            const gradeInfo = calculateGrade(
              targetCategory.id,
              latest.value,
              latest.distance,
              gender
            );
            list.push({
              classNum: c,
              studNum: n,
              gender,
              value: latest.value,
              effective: gradeInfo ? gradeInfo.effective : latest.value,
              grade: gradeInfo ? gradeInfo.grade : null,
              unit: targetCategory.unit,
            });
          }
        }
      }
    }

    // 성별 필터링
    if (rankGender !== "all") {
      list = list.filter((item) => item.gender === rankGender);
    }

    // 정렬 (유연성, 제자리멀리뛰기, 윗몸일으키기, 셔틀런 모두 내림차순 우위)
    list.sort((a, b) => {
      const valA = rankCategory === "total" ? a.value : a.effective;
      const valB = rankCategory === "total" ? b.value : b.effective;
      return valB - valA;
    });

    // 노출 등수 제한 (성별 필터 유무에 따름)
    const limit = rankGender === "all" ? 100 : 50;
    return list.slice(0, limit);
  };

  // --- UI 화면 분기 처리 ---

  // 1. 반 선택 화면
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              🏃‍♂️ PAPS 측정 기록장
            </h1>
            <p className="text-gray-500 font-semibold">1학년 몇 반인가요?</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {CLASSES.map((cls) => (
              <button
                key={cls}
                onClick={() => handleSelectClass(cls)}
                className="py-4 bg-blue-50 hover:bg-blue-500 hover:text-white text-blue-700 rounded-xl font-bold text-lg transition-all shadow-sm active:scale-95"
              >
                {cls}반
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. 번호 선택 화면
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setStep(1)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 text-center pr-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {selectedClass}반
              </h1>
              <p className="text-gray-500 font-semibold">번호를 선택하세요</p>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3 mb-6">
            {NUMBERS.map((num) => (
              <button
                key={num}
                onClick={() => handleSelectNumber(num)}
                className="py-3 bg-green-50 hover:bg-green-500 hover:text-white text-green-700 rounded-lg font-bold text-base transition-all shadow-sm active:scale-95"
              >
                {num}번
              </button>
            ))}
          </div>
          <div className="border-t pt-4 text-center">
            <button
              onClick={handleSelectTeacher}
              className="w-full py-3 bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-700 rounded-xl font-bold transition-all shadow-sm"
            >
              👨‍🏫 {selectedClass}반 교사용 종합 보기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. 비밀번호 확인 화면
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setStep(2)}
              className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 text-center pr-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {isTeacherMode
                  ? `${selectedClass}반 교사용`
                  : `${selectedClass}반 ${selectedNumber}번`}
              </h1>
              <p className="text-gray-500 font-semibold">
                비밀번호를 입력하세요
              </p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={isTeacherMode ? 6 : 4}
                required
                placeholder={
                  isTeacherMode
                    ? "마스터 비밀번호 6자리"
                    : "초기 비밀번호: 1234"
                }
                value={inputPwd}
                onChange={(e) =>
                  setInputPwd(e.target.value.replace(/[^0-9]/g, ""))
                }
                className="w-full pl-10 pr-3 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-center text-xl placeholder:text-sm placeholder:font-medium tracking-[0.2em] font-bold"
              />
            </div>
            {pwdError && (
              <p className="text-red-500 text-sm text-center font-bold">
                {pwdError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-lg"
            >
              접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 4. 메인 대시보드 화면
  const activeCategory =
    CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];
  const currentRecords = getCurrentRecords();
  const studentKey = `${selectedClass}-${selectedNumber}`;
  const currentGender = genders[studentKey];

  return (
    <div className="min-h-screen bg-gray-100 pb-20 relative">
      {/* 비밀번호 변경 모달 */}
      {showPwdChange && (
        <div className="fixed inset-0 bg-black/50 z-[110] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Key size={18} className="text-blue-600" />
                비밀번호 변경
              </h3>
              <button
                onClick={() => {
                  setShowPwdChange(false);
                  setPwdError("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleChangePassword}
              className="p-6 flex flex-col gap-4"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 text-center">
                  새 비밀번호 (숫자 4자리)
                </label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength="4"
                  required
                  value={newPwd}
                  onChange={(e) =>
                    setNewPwd(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full px-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-center text-2xl tracking-[0.5em] font-bold"
                  placeholder="0000"
                />
              </div>
              {pwdError && (
                <p className="text-red-500 text-sm text-center font-bold">
                  {pwdError}
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors text-lg"
              >
                변경 저장
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 최상단 헤더 */}
      <header className="bg-white shadow-md w-full">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <Award className="text-blue-600" size={28} />
            <h1 className="text-2xl font-black text-gray-800">
              {isTeacherMode
                ? `👨‍🏫 ${selectedClass}반 교사용 종합`
                : `1학년 ${selectedClass}반 ${selectedNumber}번`}
            </h1>
            {!isTeacherMode && (
              <div className="relative inline-block ml-2">
                <select
                  value={currentGender || ""}
                  onChange={(e) =>
                    setGenders((prev) => ({
                      ...prev,
                      [studentKey]: e.target.value,
                    }))
                  }
                  className="appearance-none bg-blue-50 border border-blue-200 text-blue-800 text-sm font-bold rounded-lg focus:ring-2 focus:ring-blue-500 block pl-3 pr-8 py-2 outline-none shadow-sm hover:bg-blue-100 cursor-pointer"
                >
                  <option value="" disabled>
                    성별 선택하기 ▾
                  </option>
                  <option value="M">남학생</option>
                  <option value="F">여학생</option>
                </select>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isTeacherMode && (
              <button
                onClick={() => {
                  setNewPwd("");
                  setPwdError("");
                  setShowPwdChange(true);
                }}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full transition-colors flex items-center gap-1 shadow-sm"
              >
                <Key size={16} />
                <span>비밀번호 변경</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-gray-500 hover:text-gray-800 bg-gray-100 border px-4 py-2 rounded-full transition-colors shadow-sm"
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 상단 탭 대시보드 내비게이션 (PC화면 맞춤 잘림 방지) */}
        <div className="max-w-6xl mx-auto px-2 border-t border-gray-100">
          <div className="flex flex-wrap md:flex-nowrap justify-center py-2.5 gap-2 overflow-x-auto hide-scrollbar">
            {!isTeacherMode &&
              CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-white" : cat.color}
                    />
                    <span className="font-bold text-sm">{cat.name}</span>
                  </button>
                );
              })}

            {/* 종합 결과 탭 */}
            <button
              onClick={() => setActiveTab("summary")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === "summary"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <LayoutDashboard
                size={18}
                className={
                  activeTab === "summary" ? "text-white" : "text-blue-500"
                }
              />
              <span className="font-bold text-sm">
                {isTeacherMode ? "반 전체 결과" : "종합 결과"}
              </span>
            </button>

            {/* 명예의 전당 탭 */}
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === "leaderboard"
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Trophy
                size={18}
                className={
                  activeTab === "leaderboard" ? "text-white" : "text-yellow-500"
                }
              />
              <span className="font-bold text-sm">명예의 전당</span>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* CASE A: 명예의 전당 탭 */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-yellow-50 rounded-full mb-3 text-yellow-500">
                <Crown size={48} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-gray-800">
                1학년 전체 명예의 전당
              </h2>
              <p className="text-gray-500 mt-1 font-medium">
                1반부터 11반까지 랭킹에 도전해 보세요! 🥇
              </p>
            </div>

            {/* 랭킹 정렬 선택 필터 상자 (한눈에 알아보기 쉽게 2단 레이아웃 배치) */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-8 flex flex-col gap-4">
              {/* 1단: 측정 종목 선택 (신체조성은 랭킹에서 제외) */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setRankCategory("total")}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    rankCategory === "total"
                      ? "bg-blue-600 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  🏅 종합 점수 랭킹
                </button>
                {CATEGORIES.filter((c) => c.id !== "body").map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setRankCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      rankCategory === cat.id
                        ? "bg-blue-600 text-white"
                        : "bg-white border text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat.item}
                  </button>
                ))}
              </div>

              {/* 2단: 성별 필터링 */}
              <div className="flex gap-2 justify-center border-t pt-3 border-gray-200">
                <button
                  onClick={() => setRankGender("all")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rankGender === "all"
                      ? "bg-gray-800 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  전체보기
                </button>
                <button
                  onClick={() => setRankGender("M")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rankGender === "M"
                      ? "bg-blue-500 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  남학생 (상위 50위)
                </button>
                <button
                  onClick={() => setRankGender("F")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rankGender === "F"
                      ? "bg-rose-500 text-white"
                      : "bg-white border text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  여학생 (상위 50위)
                </button>
              </div>
            </div>

            {/* 랭킹 실시간 결과창 */}
            {(() => {
              const list = getLeaderboardData();
              if (list.length === 0) {
                return (
                  <div className="text-center py-20 bg-gray-50 rounded-xl text-gray-400 font-bold border-2 border-dashed">
                    아직 기록 및 성별이 등록된 학생이 없습니다.
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  {/* 최상위 1, 2, 3위 명예의 카드 연출 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* 2위 카드 */}
                    {list[1] && (
                      <div className="bg-gradient-to-b from-slate-50 to-slate-100 border-2 border-slate-300 rounded-2xl p-6 text-center order-2 md:order-1 relative shadow-md">
                        <Medal
                          className="mx-auto text-slate-400 mb-2"
                          size={36}
                        />
                        <span className="text-xs font-extrabold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">
                          2ND PLACE
                        </span>
                        <h4 className="text-xl font-black text-gray-800 mt-3">
                          {list[1].classNum}반 {list[1].studNum}번
                        </h4>
                        <p className="text-slate-500 text-xs font-bold mt-1">
                          ({list[1].gender === "M" ? "남학생" : "여학생"})
                        </p>
                        <div className="text-2xl font-black text-slate-700 mt-4">
                          {list[1].value}{" "}
                          {rankCategory === "total" ? "점" : list[1].unit}
                        </div>
                      </div>
                    )}
                    {/* 1위 카드 (왕관과 함께 크게 부각) */}
                    {list[0] && (
                      <div className="bg-gradient-to-b from-amber-50 to-yellow-100 border-4 border-yellow-400 rounded-2xl p-8 text-center order-1 md:order-2 relative shadow-xl transform scale-105">
                        <Crown
                          className="mx-auto text-yellow-500 mb-1"
                          size={48}
                        />
                        <span className="text-sm font-black text-yellow-700 bg-yellow-300 px-4 py-1 rounded-full">
                          1ST PLACE
                        </span>
                        <h4 className="text-2xl font-black text-gray-900 mt-4">
                          {list[0].classNum}반 {list[0].studNum}번
                        </h4>
                        <p className="text-yellow-600 text-xs font-bold mt-1">
                          ({list[0].gender === "M" ? "남학생" : "여학생"})
                        </p>
                        <div className="text-3xl font-black text-yellow-800 mt-4">
                          {list[0].value}{" "}
                          {rankCategory === "total" ? "점" : list[0].unit}
                        </div>
                      </div>
                    )}
                    {/* 3위 카드 */}
                    {list[2] && (
                      <div className="bg-gradient-to-b from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-6 text-center order-3 relative shadow-md">
                        <Medal
                          className="mx-auto text-orange-400 mb-2"
                          size={36}
                        />
                        <span className="text-xs font-extrabold text-orange-600 bg-orange-200 px-3 py-1 rounded-full">
                          3RD PLACE
                        </span>
                        <h4 className="text-xl font-black text-gray-800 mt-3">
                          {list[2].classNum}반 {list[2].studNum}번
                        </h4>
                        <p className="text-orange-500 text-xs font-bold mt-1">
                          ({list[2].gender === "M" ? "남학생" : "여학생"})
                        </p>
                        <div className="text-2xl font-black text-orange-700 mt-4">
                          {list[2].value}{" "}
                          {rankCategory === "total" ? "점" : list[2].unit}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 전체 4위 이하 리스트 테이블 */}
                  <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm font-bold">
                          <th className="py-3 px-4">순위</th>
                          <th className="py-3 px-4">학반</th>
                          <th className="py-3 px-4">성별</th>
                          <th className="py-3 px-4 text-right">기록</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {list.map((item, index) => {
                          const isMe =
                            item.classNum === selectedClass &&
                            item.studNum === selectedNumber;
                          return (
                            <tr
                              key={index}
                              className={`hover:bg-gray-50 transition-colors ${
                                isMe ? "bg-blue-50/50 font-bold" : ""
                              }`}
                            >
                              <td className="py-3 px-4">
                                {index + 1 === 1
                                  ? "👑 1"
                                  : index + 1 === 2
                                  ? "🥈 2"
                                  : index + 1 === 3
                                  ? "🥉 3"
                                  : `${index + 1}위`}
                              </td>
                              <td className="py-3 px-4">
                                {item.classNum}반 {item.studNum}번{" "}
                                {isMe && (
                                  <span className="ml-1 text-xs text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded">
                                    나
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-xs font-bold text-gray-500">
                                {item.gender === "M" ? "남학생" : "여학생"}
                              </td>
                              <td className="py-3 px-4 text-right font-bold text-gray-800">
                                {item.value}{" "}
                                {rankCategory === "total" ? "점" : item.unit}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* CASE B: 종합 결과 탭 (교사 뷰 / 학생 개인 종합 뷰) */}
        {activeTab === "summary" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            {isTeacherMode ? (
              // 👨‍🏫 교사용 학급 일괄 결과 화면
              <div>
                <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
                  <span>📊 {selectedClass}반 전체 최근 기록 현황</span>
                </h2>
                <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                  <table className="w-full text-center border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm font-bold border-b border-gray-200">
                        <th className="py-3 px-4 border-r">번호</th>
                        <th className="py-3 px-4 border-r">성별</th>
                        {CATEGORIES.map((cat) => (
                          <th key={cat.id} className="py-3 px-4 border-r">
                            {cat.item}
                          </th>
                        ))}
                        <th className="py-3 px-4 font-black text-blue-600">
                          총합 점수
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {NUMBERS.map((num) => {
                        const sKey = `${selectedClass}-${num}`;
                        const gender = genders[sKey];

                        let totalSum = 0;
                        let measureCount = 0;

                        return (
                          <tr
                            key={num}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3.5 px-4 font-bold border-r text-gray-700">
                              {num}번
                            </td>
                            <td className="py-3.5 px-4 border-r text-xs">
                              {gender ? (
                                gender === "M" ? (
                                  "남"
                                ) : (
                                  "여"
                                )
                              ) : (
                                <span className="text-gray-300">-</span>
                              )}
                            </td>
                            {CATEGORIES.map((cat) => {
                              const sRecords = records[sKey]?.[cat.item] || [];
                              const latest = sRecords[0];
                              const gradeInfo =
                                latest && gender
                                  ? calculateGrade(
                                      cat.id,
                                      latest.value,
                                      latest.distance,
                                      gender
                                    )
                                  : null;

                              if (gradeInfo) {
                                totalSum += gradeInfo.score;
                                measureCount++;
                              }

                              return (
                                <td
                                  key={cat.id}
                                  className="py-3.5 px-4 border-r text-sm"
                                >
                                  {latest ? (
                                    <div className="flex flex-col items-center">
                                      <span className="font-bold text-gray-800">
                                        {latest.value}
                                        {cat.unit}
                                      </span>
                                      {gradeInfo && (
                                        <span className="text-[10px] text-blue-600 font-semibold mt-0.5">
                                          ({gradeInfo.grade}급/{gradeInfo.score}
                                          점)
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-300">-</span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="py-3.5 px-4 font-extrabold text-blue-600">
                              {measureCount === 5 ? (
                                `${totalSum}점`
                              ) : (
                                <span className="text-gray-400 font-medium text-xs">
                                  측정중({measureCount}/5)
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // 🏃‍♂️ 학생 개인의 '종합 결과' 화면
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <LayoutDashboard className="text-blue-600" /> 나의 종합 결과
                </h2>

                {!currentGender && (
                  <div className="mb-6 text-sm text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200 font-semibold">
                    ⚠️ 상단에서 성별을 선택하셔야 정확한 종합 점수와 등급을
                    확인할 수 있습니다.
                  </div>
                )}

                {(() => {
                  const summaryData = CATEGORIES.map((cat) => {
                    const studentRecords =
                      records[studentKey]?.[cat.item] || [];
                    const latest = studentRecords[0] || null;
                    let gradeInfo = null;
                    if (latest && currentGender) {
                      gradeInfo = calculateGrade(
                        cat.id,
                        latest.value,
                        latest.distance
                      );
                    }
                    return { ...cat, latest, gradeInfo };
                  });

                  const totalScore = summaryData.reduce(
                    (sum, curr) => sum + (curr.gradeInfo?.score || 0),
                    0
                  );
                  const measuredCount = summaryData.filter(
                    (d) => d.latest
                  ).length;

                  let overallGrade = 5;
                  if (totalScore >= 80) overallGrade = 1;
                  else if (totalScore >= 60) overallGrade = 2;
                  else if (totalScore >= 40) overallGrade = 3;
                  else if (totalScore >= 20) overallGrade = 4;

                  return (
                    <>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center mb-8 border border-blue-200 shadow-sm">
                        <h3 className="text-lg font-bold text-blue-800 mb-2">
                          PAPS 최종 종합 등급
                        </h3>
                        <div className="flex items-end justify-center gap-2">
                          <span className="text-5xl font-black text-blue-600">
                            {measuredCount === 5 && currentGender
                              ? overallGrade
                              : "-"}
                          </span>
                          <span className="text-2xl font-bold text-blue-800 pb-1">
                            등급
                          </span>
                        </div>
                        <div className="text-blue-700 font-bold mt-3 text-lg bg-white inline-block px-4 py-1 rounded-full shadow-sm">
                          총점:{" "}
                          {measuredCount === 5 && currentGender
                            ? `${totalScore}점`
                            : "측정 진행중..."}
                        </div>
                        {measuredCount < 5 && (
                          <p className="text-sm text-blue-500 mt-4 font-semibold">
                            {5 - measuredCount}개 종목을 더 측정하면 종합 등급이
                            계산됩니다.
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {summaryData.map((data) => {
                          const Icon = data.icon;
                          return (
                            <div
                              key={data.id}
                              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
                            >
                              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                                <Icon size={22} className={data.color} />
                                <span className="font-bold text-gray-700">
                                  {data.name}
                                </span>
                              </div>
                              {data.latest ? (
                                <div className="mt-auto">
                                  <div className="text-2xl font-bold text-gray-800 mb-2">
                                    {data.latest.value}{" "}
                                    <span className="text-sm font-medium text-gray-500">
                                      {data.unit}
                                    </span>
                                  </div>
                                  {data.gradeInfo && (
                                    <div className="flex gap-2">
                                      <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md border border-blue-200">
                                        {data.gradeInfo.grade}등급
                                      </span>
                                      <span className="text-xs font-bold px-2.5 py-1 bg-green-100 text-green-700 rounded-md border border-green-200">
                                        {data.gradeInfo.score}점
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="mt-auto text-sm text-gray-400 font-semibold bg-gray-50 px-3 py-2 rounded-lg inline-block self-start">
                                  기록 없음
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* CASE C: 개별 종목 측정 페이지 */}
        {activeTab !== "summary" && activeTab !== "leaderboard" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* 현재 종목 타이틀 영역 */}
            <div
              className={`${activeCategory.bg} p-6 text-center border-b border-gray-100`}
            >
              <activeCategory.icon
                className={`mx-auto mb-3 ${activeCategory.color}`}
                size={40}
              />
              <h2 className="text-2xl font-bold text-gray-800">
                {activeCategory.item}
              </h2>
              <p className="text-gray-600 mt-1 font-semibold">
                {activeCategory.name}
              </p>
            </div>

            <div className="p-6">
              {/* BMI 탭 전용: 계산 공식 알림 추가 */}
              {activeTab === "body" && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="font-bold text-blue-800 text-base mb-1">
                    💡 신체조성(BMI) 직접 계산해보기
                  </h3>
                  <p className="text-sm text-blue-700 leading-relaxed font-semibold">
                    BMI = 체중(kg) ÷ (키(m) × 키(m))
                    <br />
                    <span className="text-xs text-blue-500">
                      예시: 키 150cm (1.5m), 체중 45kg인 경우 → 45 ÷ (1.5 × 1.5)
                      = 20
                    </span>
                  </p>
                </div>
              )}

              {/* 기록 입력 폼 */}
              <form
                onSubmit={handleSaveRecord}
                className="flex flex-col sm:flex-row gap-3 mb-8 bg-gray-50 p-4 rounded-xl"
              >
                <div className="flex-1 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      required
                      value={inputDate}
                      onChange={(e) => setInputDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-semibold"
                    />
                  </div>

                  {activeTab === "cardio" && (
                    <div className="relative flex-1 flex items-center">
                      <select
                        value={inputDistance}
                        onChange={(e) => setInputDistance(e.target.value)}
                        className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-gray-700 cursor-pointer"
                      >
                        {Array.from({ length: 11 }, (_, i) => 10 + i).map(
                          (d) => (
                            <option key={d} value={d}>
                              {d}m 거리
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}

                  <div className="relative flex-1 flex items-center">
                    <input
                      type="number"
                      step={activeTab === "body" ? "0.1" : "1"}
                      required
                      placeholder={`기록 입력`}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold text-lg"
                    />
                    <span className="absolute right-4 text-gray-500 font-bold">
                      {activeCategory.unit}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <Save size={20} />
                  <span>기록하기</span>
                </button>
              </form>

              {/* 기록 히스토리 목록 */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-blue-500" />
                  나의 연습 기록{" "}
                  <span className="text-xs text-red-500 font-bold">
                    (하루에 한 번만 등록 가능)
                  </span>
                </h3>

                {!currentGender && (
                  <div className="mb-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200 font-semibold">
                    ⚠️ 상단에서 성별을 선택하시면 PAPS 등급과 점수를 자동으로
                    확인할 수 있습니다.
                  </div>
                )}

                {currentRecords.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500 font-semibold">
                    아직 기록이 없습니다.
                    <br />
                    위에서 첫 연습 결과를 기록해보세요!
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {currentRecords.map((record, index) => {
                      const gradeInfo = calculateGrade(
                        activeTab,
                        record.value,
                        record.distance
                      );

                      return (
                        <li
                          key={record.id}
                          className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-300 transition-colors gap-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md font-bold whitespace-nowrap">
                                {record.date}
                              </span>
                              {index === 0 && (
                                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md whitespace-nowrap">
                                  최근 기록
                                </span>
                              )}
                            </div>
                            {gradeInfo && (
                              <div className="flex gap-1">
                                <span
                                  className={`text-xs font-bold px-2 py-1 rounded-md text-white ${
                                    gradeInfo.grade <= 3
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                                  }`}
                                >
                                  {gradeInfo.grade}등급
                                </span>
                                <span className="text-xs font-bold px-2 py-1 rounded-md bg-green-100 text-green-700">
                                  {gradeInfo.score}점
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                            <div className="text-right">
                              <div className="text-xl font-extrabold text-gray-800">
                                {record.value}{" "}
                                <span className="text-base font-bold text-gray-500">
                                  {activeCategory.unit}
                                </span>
                              </div>
                              {activeTab === "cardio" && record.distance && (
                                <div className="text-xs text-gray-500 mt-1 font-semibold">
                                  ({record.distance}m 기준)
                                  {record.distance !== 20 &&
                                    gradeInfo &&
                                    ` → 20m 환산: 약 ${Math.round(
                                      gradeInfo.effective
                                    )}회`}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              className="text-gray-400 hover:text-red-500 p-2 transition-colors ml-2"
                              title="삭제"
                            >
                              ✕
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}
