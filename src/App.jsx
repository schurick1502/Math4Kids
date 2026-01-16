import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import {
  Trophy, Star, Timer, Heart, Settings,
  Plus, Trash2, Gift, Frown, GraduationCap, Download, X, Users, User,
  Zap, Award, TrendingUp
} from 'lucide-react';

// Default data for rewards with ranking
const DEFAULT_REWARDS = [
  { person: 'Mom', reward: 'Dinner at McDonalds', rank: 1 },
  { person: 'Dad', reward: 'Go to the movies', rank: 2 },
  { person: 'Grandma', reward: 'Ice cream', rank: 3 },
  { person: 'Parents', reward: '30 min extra screen time', rank: 4 },
  { person: 'Mom', reward: 'Candy', rank: 5 }
];

const DEFAULT_PENALTIES = [
  'Do 10 funny jumping jacks',
  'Sing your favorite song',
  'Tell a joke',
  'Do 5 push-ups',
  'Dance for 30 seconds',
  'Make a funny face',
  'Hop 20 times on one leg',
  'Stand on one leg for 1 minute',
  'Do 3 somersaults'
];

// Extended device detection for performance optimization
const detectDevicePerformance = () => {
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = navigator.deviceMemory || 4;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const effectiveType = connection?.effectiveType || '4g';

  // Very slow devices: 2 cores or less, or less than 2GB RAM, or slow connection
  const isVeryLowEnd = isMobile && (hardwareConcurrency <= 2 || deviceMemory <= 2 || effectiveType === '2g' || effectiveType === 'slow-2g');

  // Slower devices: 4 cores or less, or less than 4GB RAM
  const isLowEnd = isMobile && (hardwareConcurrency <= 4 || deviceMemory <= 4);

  return { isVeryLowEnd, isLowEnd, isMobile };
};

// Generate floating elements data once (performance optimization)
const generateFloatingElements = () => {
  const device = detectDevicePerformance();

  // Very slow devices: No floating elements
  if (device.isVeryLowEnd) {
    return [];
  }

  const symbols = ['➕', '➖', '✖️', '➗', '🟰', '🎯', '⭐', '✨', '🌟', '💫'];
  const colors = ['text-yellow-300', 'text-pink-300', 'text-blue-300', 'text-purple-300', 'text-green-300'];

  // Reduce elements based on device performance
  const elementCount = device.isLowEnd ? 4 : 8;

  return Array.from({ length: elementCount }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const fontSize = Math.random() * 1.2 + 0.8; // Further reduced
    const delay = Math.random() * 5;
    const duration = Math.random() * 15 + 20; // Slower animations
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const color = colors[i % colors.length];

    return { left, top, fontSize, delay, duration, symbol, color };
  });
};

// Animated background component (memoized for performance)
const AnimatedBackground = memo(() => {
  const device = useMemo(() => detectDevicePerformance(), []);
  const floatingElements = useMemo(() => generateFloatingElements(), []);

  // Disable blur effects for very slow devices
  const blurClass = device.isVeryLowEnd ? 'blur-lg' : device.isLowEnd ? 'blur-xl' : 'blur-2xl';
  const blobOpacity = device.isVeryLowEnd ? 0.3 : device.isLowEnd ? 0.5 : 0.6;

  // Fewer blob elements for slower devices
  const showBlobs = !device.isVeryLowEnd;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Blur effects adjusted based on device performance */}
      {showBlobs && (
        <>
          <div className={`absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter ${blurClass} animate-blob`}
               style={{ opacity: blobOpacity, willChange: 'transform' }}></div>
          {!device.isLowEnd && (
            <>
              <div className={`absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter ${blurClass} animate-blob animation-delay-2000`}
                   style={{ opacity: blobOpacity, willChange: 'transform' }}></div>
              <div className={`absolute bottom-0 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter ${blurClass} animate-blob animation-delay-4000`}
                   style={{ opacity: blobOpacity, willChange: 'transform' }}></div>
            </>
          )}
        </>
      )}

      {floatingElements.map((elem, i) => (
        <div
          key={i}
          className={`absolute ${elem.color} animate-float`}
          style={{
            left: `${elem.left}%`,
            top: `${elem.top}%`,
            fontSize: `${elem.fontSize}rem`,
            animationDelay: `${elem.delay}s`,
            animationDuration: `${elem.duration}s`,
            opacity: 0.3,
            willChange: 'transform'
          }}
        >
          {elem.symbol}
        </div>
      ))}
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

function App() {
  // Game State
  const [gameState, setGameState] = useState('menu');
  const [gradeLevel, setGradeLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finalResult, setFinalResult] = useState(null);

  // Time tracking
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(null);

  // Settings
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  // Multiplayer State
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [player1, setPlayer1] = useState({ name: '', level: 1 });
  const [player2, setPlayer2] = useState({ name: '', level: 1 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);
  const [showHandover, setShowHandover] = useState(false);
  const [handoverTimer, setHandoverTimer] = useState(5);

  // Rewards & Penalties
  const [rewards, setRewards] = useState([]);
  const [penalties, setPenalties] = useState([]);
  const [newRewardPerson, setNewRewardPerson] = useState('');
  const [newRewardText, setNewRewardText] = useState('');
  const [newRewardRank, setNewRewardRank] = useState(3);
  const [newPenalty, setNewPenalty] = useState('');

  // PWA Install
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const inputRef = useRef(null);

  // Grade level settings
  const gradeLevelSettings = {
    1: {
      name: 'Grade 1',
      range: 10,
      ops: ['+', '-'],
      description: 'Addition and subtraction up to 10',
      color: 'green-400',
      targetTimePerQuestion: 15 // Target time in seconds
    },
    2: {
      name: 'Grade 2',
      range: 20,
      ops: ['+', '-'],
      description: 'Addition and subtraction up to 20',
      color: 'blue-400',
      targetTimePerQuestion: 12
    },
    3: {
      name: 'Times Tables',
      range: 12,
      ops: ['×'],
      description: 'Multiplication tables (1-12)',
      color: 'orange-500',
      targetTimePerQuestion: 8,
      special: '1x1'
    },
    4: {
      name: 'Grade 3',
      range: 100,
      ops: ['+', '-', '×'],
      description: 'Add, subtract up to 100',
      color: 'yellow-400',
      targetTimePerQuestion: 10
    },
    5: {
      name: 'Grade 4',
      range: 1000,
      ops: ['+', '-', '×', '÷'],
      description: 'All operations up to 1000',
      color: 'red-400',
      targetTimePerQuestion: 8
    },
    6: {
      name: 'Adults',
      range: 10000,
      ops: ['+', '-', '×', '÷', '%', 'rule-of-three'],
      description: 'Math + Percent + Rule of Three',
      color: 'purple-600',
      targetTimePerQuestion: 10,
      special: 'adults'
    }
  };

  // Scoring function (memoized with useCallback)
  const calculatePerformance = useCallback((correctAnswers, totalQuestions, totalSeconds, targetSecondsPerQuestion) => {
    const accuracyScore = (correctAnswers / totalQuestions) * 100;
    const targetTotalTime = totalQuestions * targetSecondsPerQuestion;
    const avgTimePerQuestion = totalSeconds / totalQuestions;

    // Time score: 100% if under target time, then linearly decreasing
    let timeScore = 100;
    if (totalSeconds > targetTotalTime) {
      const overtime = totalSeconds - targetTotalTime;
      timeScore = Math.max(0, 100 - (overtime / targetTotalTime) * 50);
    } else {
      // Bonus for faster time
      const timeSaved = targetTotalTime - totalSeconds;
      timeScore = Math.min(150, 100 + (timeSaved / targetTotalTime) * 50);
    }

    // Overall performance: 70% accuracy, 30% speed
    const overallScore = (accuracyScore * 0.7) + (timeScore * 0.3);

    // Determine rank based on overall score
    let performanceRank = 5;
    if (overallScore >= 95) performanceRank = 1; // Outstanding
    else if (overallScore >= 85) performanceRank = 2; // Very good
    else if (overallScore >= 75) performanceRank = 3; // Good
    else if (overallScore >= 65) performanceRank = 4; // Satisfactory
    else performanceRank = 5; // Needs practice

    return {
      accuracyScore: Math.round(accuracyScore),
      timeScore: Math.round(timeScore),
      overallScore: Math.round(overallScore),
      performanceRank,
      avgTimePerQuestion: avgTimePerQuestion.toFixed(1),
      targetTime: targetTotalTime
    };
  }, []);

  // LocalStorage functions
  const loadData = () => {
    try {
      const storedRewards = localStorage.getItem('rewards');
      const storedPenalties = localStorage.getItem('penalties');
      const storedQuestions = localStorage.getItem('numberOfQuestions');

      if (storedRewards) {
        setRewards(JSON.parse(storedRewards));
      } else {
        setRewards(DEFAULT_REWARDS);
        localStorage.setItem('rewards', JSON.stringify(DEFAULT_REWARDS));
      }

      if (storedPenalties) {
        setPenalties(JSON.parse(storedPenalties));
      } else {
        setPenalties(DEFAULT_PENALTIES);
        localStorage.setItem('penalties', JSON.stringify(DEFAULT_PENALTIES));
      }

      if (storedQuestions) {
        setNumberOfQuestions(parseInt(storedQuestions));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setRewards(DEFAULT_REWARDS);
      setPenalties(DEFAULT_PENALTIES);
    }
  };

  const saveRewards = (newRewards) => {
    try {
      localStorage.setItem('rewards', JSON.stringify(newRewards));
      setRewards(newRewards);
    } catch (error) {
      console.error('Error saving rewards:', error);
    }
  };

  const savePenalties = (newPenalties) => {
    try {
      localStorage.setItem('penalties', JSON.stringify(newPenalties));
      setPenalties(newPenalties);
    } catch (error) {
      console.error('Error saving penalties:', error);
    }
  };

  const saveNumberOfQuestions = (num) => {
    try {
      localStorage.setItem('numberOfQuestions', num.toString());
      setNumberOfQuestions(num);
    } catch (error) {
      console.error('Error saving number of questions:', error);
    }
  };

  // Question generation (memoized with useCallback)
  const generateQuestion = useCallback((level) => {
    const settings = gradeLevelSettings[level];
    const operation = settings.ops[Math.floor(Math.random() * settings.ops.length)];

    let num1, num2, answer, questionText;

    // Level 3: Times tables only
    if (level === 3) {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
      return { num1, num2, operation: '×', answer };
    }

    // Level 6: Adults with percent and rule of three
    if (level === 6 && (operation === '%' || operation === 'rule-of-three')) {
      if (operation === '%') {
        // Percentage calculation: "X% of Y"
        const percent = [5, 10, 15, 20, 25, 30, 40, 50, 75][Math.floor(Math.random() * 9)];
        const base = [10, 20, 50, 80, 100, 120, 150, 200, 250][Math.floor(Math.random() * 9)];
        answer = Math.round((percent / 100) * base);
        questionText = `${percent}% of ${base}`;
        return { questionText, answer, operation: '%', isSpecial: true };
      } else {
        // Rule of three: "X items for $Y, how much for Z items?"
        const baseAmount = Math.floor(Math.random() * 5) + 2; // 2-6 items
        const basePrice = (Math.floor(Math.random() * 8) + 1) * baseAmount; // Whole number prices
        const targetAmount = Math.floor(Math.random() * 8) + 3; // 3-10 items
        answer = Math.round((basePrice / baseAmount) * targetAmount);
        questionText = `${baseAmount} items = $${basePrice}, ${targetAmount} items`;
        return { questionText, answer, operation: 'rule-of-three', isSpecial: true };
      }
    }

    // Normal math operations
    if (operation === '+') {
      if (level <= 2) {
        num1 = Math.floor(Math.random() * settings.range) + 1;
        num2 = Math.floor(Math.random() * (settings.range - num1)) + 1;
      } else {
        num1 = Math.floor(Math.random() * settings.range) + 1;
        num2 = Math.floor(Math.random() * settings.range) + 1;
        while (num1 + num2 > settings.range) {
          num2 = Math.floor(Math.random() * settings.range) + 1;
        }
      }
      answer = num1 + num2;
    }
    else if (operation === '-') {
      num1 = Math.floor(Math.random() * settings.range) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }
    else if (operation === '×') {
      if (level === 4) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      } else if (level === 5) {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      } else if (level === 6) {
        num1 = Math.floor(Math.random() * 99) + 1;
        num2 = Math.floor(Math.random() * 99) + 1;
      } else {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      }
      answer = num1 * num2;
    }
    else if (operation === '÷') {
      if (level === 6) {
        const divisor = Math.floor(Math.random() * 20) + 2;
        const result = Math.floor(Math.random() * 50) + 1;
        num1 = divisor * result;
        num2 = divisor;
      } else {
        const divisor = Math.floor(Math.random() * 12) + 1;
        const result = Math.floor(Math.random() * 12) + 1;
        num1 = divisor * result;
        num2 = divisor;
      }
      answer = num1 / num2;
    }

    return { num1, num2, operation, answer };
  }, []);

  // Singleplayer game logic
  const startGame = (grade) => {
    setGradeLevel(grade);
    setGameState('playing');
    setIsMultiplayer(false);
    setQuestionNumber(1);
    setScore(0);
    setCurrentQuestion(generateQuestion(grade));
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback(null);
    setStartTime(Date.now());
    setCurrentQuestionStartTime(Date.now());
    setTotalTime(0);
  };

  // Multiplayer setup
  const startMultiplayerSetup = () => {
    setGameState('multiplayer-setup');
    setPlayer1({ name: '', level: 1 });
    setPlayer2({ name: '', level: 1 });
  };

  const startMultiplayerGame = () => {
    if (!player1.name || !player2.name) {
      alert('Please enter names for both players!');
      return;
    }

    setIsMultiplayer(true);
    setCurrentPlayer(1);
    setQuestionNumber(1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Time(0);
    setPlayer2Time(0);

    const level = player1.level;
    setGradeLevel(level);
    setCurrentQuestion(generateQuestion(level));
    setUserAnswer('');
    setShowFeedback(false);
    setFeedback(null);
    setStartTime(Date.now());
    setCurrentQuestionStartTime(Date.now());
    setGameState('playing');
  };

  const switchPlayer = () => {
    setShowHandover(true);
    setHandoverTimer(5);
    setGameState('handover');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (showFeedback || !userAnswer) return;

    const questionTime = (Date.now() - currentQuestionStartTime) / 1000;
    const isCorrect = parseInt(userAnswer) === currentQuestion.answer;

    if (isCorrect) {
      if (isMultiplayer) {
        if (currentPlayer === 1) {
          setPlayer1Score(player1Score + 1);
          setPlayer1Time(player1Time + questionTime);
        } else {
          setPlayer2Score(player2Score + 1);
          setPlayer2Time(player2Time + questionTime);
        }
      } else {
        setScore(score + 1);
      }
      setFeedback({ type: 'correct', time: questionTime });
    } else {
      if (isMultiplayer) {
        if (currentPlayer === 1) {
          setPlayer1Time(player1Time + questionTime);
        } else {
          setPlayer2Time(player2Time + questionTime);
        }
      }
      setFeedback({ type: 'wrong', correctAnswer: currentQuestion.answer, time: questionTime });
    }

    setShowFeedback(true);

    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setFeedback(null);
    setUserAnswer('');

    if (isMultiplayer) {
      const nextPlayer = currentPlayer === 1 ? 2 : 1;
      setCurrentPlayer(nextPlayer);

      const totalQuestionsAnswered = questionNumber;

      if (totalQuestionsAnswered >= numberOfQuestions * 2) {
        finishGame();
        return;
      }

      setQuestionNumber(totalQuestionsAnswered + 1);
      switchPlayer();
    } else {
      if (questionNumber >= numberOfQuestions) {
        finishGame();
        return;
      }

      setQuestionNumber(questionNumber + 1);
      setCurrentQuestion(generateQuestion(gradeLevel));
      setCurrentQuestionStartTime(Date.now());
    }
  };

  const cancelGame = () => {
    // Cancel game - return to menu without scoring
    setGameState('menu');
    setIsMultiplayer(false);
    setQuestionNumber(1);
    setScore(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Time(0);
    setPlayer2Time(0);
    setCurrentPlayer(1);
    setShowFeedback(false);
    setFeedback(null);
  };

  const finishGame = () => {
    const endTime = Date.now();
    const finalTotalTime = (endTime - startTime) / 1000;

    if (isMultiplayer) {
      const settings1 = gradeLevelSettings[player1.level];
      const settings2 = gradeLevelSettings[player2.level];

      const perf1 = calculatePerformance(player1Score, numberOfQuestions, player1Time, settings1.targetTimePerQuestion);
      const perf2 = calculatePerformance(player2Score, numberOfQuestions, player2Time, settings2.targetTimePerQuestion);

      setFinalResult({
        isMultiplayer: true,
        player1: {
          name: player1.name,
          score: player1Score,
          total: numberOfQuestions,
          time: player1Time,
          performance: perf1
        },
        player2: {
          name: player2.name,
          score: player2Score,
          total: numberOfQuestions,
          time: player2Time,
          performance: perf2
        },
        winner: perf1.overallScore > perf2.overallScore ? player1.name :
               perf2.overallScore > perf1.overallScore ? player2.name : 'Tie'
      });
    } else {
      const settings = gradeLevelSettings[gradeLevel];
      const performance = calculatePerformance(score, numberOfQuestions, finalTotalTime, settings.targetTimePerQuestion);

      // Reward or penalty based on rank
      let selectedRewardOrPenalty = null;

      if (performance.performanceRank <= 3 && rewards.length > 0) {
        // Good performance: reward matching the rank
        const suitableRewards = rewards.filter(r => r.rank === performance.performanceRank);
        if (suitableRewards.length > 0) {
          selectedRewardOrPenalty = suitableRewards[Math.floor(Math.random() * suitableRewards.length)];
        } else {
          // Fallback: next best reward
          const sortedRewards = [...rewards].sort((a, b) => a.rank - b.rank);
          selectedRewardOrPenalty = sortedRewards[0];
        }
      } else if (performance.performanceRank > 3 && penalties.length > 0) {
        selectedRewardOrPenalty = penalties[Math.floor(Math.random() * penalties.length)];
      }

      setFinalResult({
        isMultiplayer: false,
        score,
        total: numberOfQuestions,
        time: finalTotalTime,
        performance,
        selectedRewardOrPenalty
      });
    }

    setGameState('finished');
  };

  // Manage rewards
  const addReward = () => {
    if (newRewardPerson.trim() && newRewardText.trim()) {
      const updated = [...rewards, {
        person: newRewardPerson.trim(),
        reward: newRewardText.trim(),
        rank: newRewardRank
      }];
      saveRewards(updated);
      setNewRewardPerson('');
      setNewRewardText('');
      setNewRewardRank(3);
    }
  };

  const deleteReward = (index) => {
    const updated = rewards.filter((_, i) => i !== index);
    saveRewards(updated);
  };

  const addPenalty = () => {
    if (newPenalty.trim()) {
      const updated = [...penalties, newPenalty.trim()];
      savePenalties(updated);
      setNewPenalty('');
    }
  };

  const deletePenalty = (index) => {
    const updated = penalties.filter((_, i) => i !== index);
    savePenalties(updated);
  };

  // PWA Installation
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA was installed');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  // useEffect: Load data & PWA
  useEffect(() => {
    loadData();

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // useEffect: Handover timer (optimized - handoverTimer removed from dependencies)
  useEffect(() => {
    if (gameState !== 'handover') return;

    const timer = setInterval(() => {
      setHandoverTimer((prev) => {
        if (prev <= 1) {
          const level = currentPlayer === 1 ? player1.level : player2.level;
          setGradeLevel(level);
          setCurrentQuestion(generateQuestion(level));
          setShowHandover(false);
          setGameState('playing');
          setCurrentQuestionStartTime(Date.now());
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentPlayer, player1.level, player2.level, generateQuestion]);

  // useEffect: Auto-focus
  useEffect(() => {
    if (gameState === 'playing' && !showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, showFeedback, questionNumber]);

  // Render helper (memoized for performance)
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const getRankLabel = useCallback((rank) => {
    const labels = {
      1: { text: 'Outstanding', color: 'text-yellow-600', emoji: '🏆' },
      2: { text: 'Very Good', color: 'text-green-600', emoji: '🥈' },
      3: { text: 'Good', color: 'text-blue-600', emoji: '🥉' },
      4: { text: 'Satisfactory', color: 'text-orange-600', emoji: '⭐' },
      5: { text: 'Keep Practicing', color: 'text-gray-600', emoji: '💪' }
    };
    return labels[rank] || labels[5];
  }, []);

  const getRankBadge = useCallback((rank) => {
    const badges = {
      1: '🏆 Top Prize',
      2: '🥈 Great Reward',
      3: '🥉 Nice Reward',
      4: '⭐ Small Reward',
      5: '💪 Keep Trying'
    };
    return badges[rank] || badges[5];
  }, []);

  // Render functions
  const renderMenuScreen = () => (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <GraduationCap className="w-16 h-16 text-purple-600 mr-3" />
        <h1 className="text-5xl font-bold text-purple-600">
          Mental Math Fun!
        </h1>
      </div>

      <p className="text-gray-600 mb-8 text-lg">
        Speed + Accuracy = Better Rewards! 🎯⏱️
      </p>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎮 Choose Game Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setGameState('menu')}
            className="bg-blue-500 hover:scale-105 transform transition-all duration-200 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl"
          >
            <User className="w-12 h-12 mx-auto mb-2" />
            <div className="text-2xl font-bold">Single Player</div>
            <div className="text-sm opacity-90 mt-1">Time Challenge</div>
          </button>

          <button
            onClick={startMultiplayerSetup}
            className="bg-green-500 hover:scale-105 transform transition-all duration-200 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl"
          >
            <Users className="w-12 h-12 mx-auto mb-2" />
            <div className="text-2xl font-bold">Multiplayer</div>
            <div className="text-sm opacity-90 mt-1">Who's faster?</div>
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Difficulty Level (Single Player)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(gradeLevelSettings).map(([level, settings]) => (
          <button
            key={level}
            onClick={() => startGame(parseInt(level))}
            className="hover:scale-105 transform transition-all duration-200 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: settings.color === 'green-400' ? '#4ade80' :
                             settings.color === 'blue-400' ? '#60a5fa' :
                             settings.color === 'orange-500' ? '#f97316' :
                             settings.color === 'yellow-400' ? '#facc15' :
                             settings.color === 'red-400' ? '#f87171' :
                             settings.color === 'purple-600' ? '#9333ea' : '#60a5fa'
            }}
          >
            <div className="text-3xl font-bold mb-2">{settings.name}</div>
            <div className="text-sm opacity-90">{settings.description}</div>
            <div className="mt-3 flex items-center justify-center text-sm">
              <Zap className="w-4 h-4 mr-1" />
              Target: {settings.targetTimePerQuestion}s per question
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setGameState('settings')}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl transition-colors duration-200"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>

        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
          >
            <Download className="w-5 h-5" />
            Install App
          </button>
        )}
      </div>
    </div>
  );

  const renderMultiplayerSetup = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">🎮 Multiplayer Setup</h2>
        <button
          onClick={() => setGameState('menu')}
          className="text-gray-600 hover:text-gray-800"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">👤 Player 1</h3>
          <input
            type="text"
            value={player1.name}
            onChange={(e) => setPlayer1({ ...player1, name: e.target.value })}
            placeholder="Enter name"
            className="w-full border-2 border-blue-300 rounded-lg px-4 py-3 mb-4 text-lg focus:outline-none focus:border-blue-500"
          />
          <select
            value={player1.level}
            onChange={(e) => setPlayer1({ ...player1, level: parseInt(e.target.value) })}
            className="w-full border-2 border-blue-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
          >
            {Object.entries(gradeLevelSettings).map(([level, settings]) => (
              <option key={level} value={level}>
                {settings.name} - {settings.description}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold text-green-700 mb-4">👤 Player 2</h3>
          <input
            type="text"
            value={player2.name}
            onChange={(e) => setPlayer2({ ...player2, name: e.target.value })}
            placeholder="Enter name"
            className="w-full border-2 border-green-300 rounded-lg px-4 py-3 mb-4 text-lg focus:outline-none focus:border-green-500"
          />
          <select
            value={player2.level}
            onChange={(e) => setPlayer2({ ...player2, level: parseInt(e.target.value) })}
            className="w-full border-2 border-green-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-green-500"
          >
            {Object.entries(gradeLevelSettings).map(([level, settings]) => (
              <option key={level} value={level}>
                {settings.name} - {settings.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={startMultiplayerGame}
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white text-2xl font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-105"
      >
        🎮 Start Game!
      </button>
    </div>
  );

  const renderHandoverScreen = () => {
    const nextPlayer = currentPlayer === 1 ? player1 : player2;

    return (
      <div className="text-center">
        <div className="mb-8">
          <Users className="w-24 h-24 text-purple-600 mx-auto mb-4 animate-bounce" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Pass the Device!
          </h2>
          <p className="text-2xl text-gray-600 mb-6">
            Next player: <span className="font-bold text-purple-600">{nextPlayer.name}</span>
          </p>
        </div>

        <div className="bg-purple-100 rounded-3xl p-12 mb-6">
          <div className="text-8xl font-bold text-purple-600 mb-4">
            {handoverTimer}
          </div>
          <p className="text-xl text-gray-700">
            seconds until next question...
          </p>
        </div>

        <div className="text-lg text-gray-600">
          Level: <span className="font-bold">{gradeLevelSettings[nextPlayer.level].name}</span>
        </div>
      </div>
    );
  };

  // Calculations for playing screen memoized
  const playingScreenData = useMemo(() => {
    const settings = isMultiplayer
      ? gradeLevelSettings[currentPlayer === 1 ? player1.level : player2.level]
      : gradeLevelSettings[gradeLevel];

    const totalQuestions = isMultiplayer ? numberOfQuestions * 2 : numberOfQuestions;
    const progress = (questionNumber / totalQuestions) * 100;

    const currentPlayerName = isMultiplayer ? (currentPlayer === 1 ? player1.name : player2.name) : null;
    const currentScore = isMultiplayer ? (currentPlayer === 1 ? player1Score : player2Score) : score;

    const elapsedTime = isMultiplayer
      ? (currentPlayer === 1 ? player1Time : player2Time)
      : startTime ? (Date.now() - startTime) / 1000 : 0;

    return { settings, totalQuestions, progress, currentPlayerName, currentScore, elapsedTime };
  }, [isMultiplayer, currentPlayer, player1, player2, gradeLevel, numberOfQuestions, questionNumber, player1Score, player2Score, score, player1Time, player2Time, startTime]);

  const renderPlayingScreen = () => {
    const { settings, totalQuestions, progress, currentPlayerName, currentScore, elapsedTime } = playingScreenData;

    return (
      <div>
        {/* Cancel button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={cancelGame}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
            title="Cancel game"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>

        {isMultiplayer && (
          <div className="mb-4 bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-2xl">
            <div className="flex justify-between items-center">
              <div className={`${currentPlayer === 1 ? 'font-bold text-blue-700' : 'text-gray-600'}`}>
                👤 {player1.name}: {player1Score} ({formatTime(player1Time)})
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {currentPlayerName}'s turn!
              </div>
              <div className={`${currentPlayer === 2 ? 'font-bold text-green-700' : 'text-gray-600'}`}>
                👤 {player2.name}: {player2Score} ({formatTime(player2Time)})
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold text-gray-700">
            ⏱️ Time: {formatTime(elapsedTime)}
          </div>
          <div className="text-lg font-bold text-purple-600">
            Target: {settings.targetTimePerQuestion}s/question
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {questionNumber} of {totalQuestions}</span>
            <span>{currentScore} correct</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentQuestion && (
          <div className="text-center mb-8">
            {/* Special questions (Percent/Rule of Three) */}
            {currentQuestion.isSpecial ? (
              <div>
                <div className="text-4xl font-bold text-gray-800 mb-4">
                  {currentQuestion.operation === '%' ? '📊 Percentage' : '🔢 Rule of Three'}
                </div>
                <div className="text-5xl font-bold text-purple-600 mb-8">
                  {currentQuestion.questionText}
                </div>
                {currentQuestion.operation === 'rule-of-three' && (
                  <div className="text-2xl text-gray-600 mb-6">
                    = $ ?
                  </div>
                )}
              </div>
            ) : (
              /* Normal math questions */
              <div className="text-7xl font-bold text-gray-800 mb-8">
                {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={showFeedback}
                className="w-full text-4xl text-center border-4 border-purple-300 rounded-2xl px-4 py-4 mb-4 focus:outline-none focus:border-purple-500 disabled:bg-gray-100"
                placeholder="?"
                autoComplete="off"
              />

              <button
                type="submit"
                disabled={showFeedback || !userAnswer}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {showFeedback && feedback && (
          <div className={`text-center p-6 rounded-2xl ${
            feedback.type === 'correct' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            <div className="text-4xl mb-2">
              {feedback.type === 'correct' ? '✅ Correct!' : '❌ Wrong!'}
            </div>
            <div className="text-xl mb-2">
              Time: {feedback.time.toFixed(1)}s
            </div>
            {feedback.type !== 'correct' && (
              <div className="text-2xl">
                The correct answer is: <strong>{feedback.correctAnswer}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSettingsScreen = () => (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Settings</h2>
        <button
          onClick={() => setGameState('menu')}
          className="text-gray-600 hover:text-gray-800"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎯 Number of Questions</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="5"
            max="50"
            value={numberOfQuestions}
            onChange={(e) => saveNumberOfQuestions(parseInt(e.target.value) || 10)}
            className="w-32 border-2 border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:border-purple-500"
          />
          <span className="text-gray-600">questions per round</span>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="w-6 h-6 text-green-600" />
          <h3 className="text-2xl font-bold text-gray-800">Rewards with Ranking</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Rank 1 = Top Prize (best performance), Rank 5 = Smallest Reward
        </p>

        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {rewards.sort((a, b) => a.rank - b.rank).map((reward, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 p-3 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getRankBadge(reward.rank).split(' ')[0]}</span>
                <div>
                  <div className="font-bold text-green-700">{reward.person}: {reward.reward}</div>
                  <div className="text-xs text-gray-600">{getRankBadge(reward.rank)}</div>
                </div>
              </div>
              <button
                onClick={() => deleteReward(rewards.indexOf(reward))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={newRewardPerson}
            onChange={(e) => setNewRewardPerson(e.target.value)}
            placeholder="Person (e.g., Mom)"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <input
            type="text"
            value={newRewardText}
            onChange={(e) => setNewRewardText(e.target.value)}
            placeholder="Reward (e.g., Ice cream)"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
          />
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-semibold">Rank:</label>
            <select
              value={newRewardRank}
              onChange={(e) => setNewRewardRank(parseInt(e.target.value))}
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500"
            >
              <option value={1}>1 - Top Prize 🏆</option>
              <option value={2}>2 - Great Reward 🥈</option>
              <option value={3}>3 - Nice Reward 🥉</option>
              <option value={4}>4 - Small Reward ⭐</option>
              <option value={5}>5 - Mini Reward 💪</option>
            </select>
          </div>
          <button
            onClick={addReward}
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Reward
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Frown className="w-6 h-6 text-orange-600" />
          <h3 className="text-2xl font-bold text-gray-800">Tasks for Weak Performance</h3>
        </div>

        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {penalties.map((penalty, index) => (
            <div key={index} className="flex items-center justify-between bg-orange-50 p-3 rounded-xl">
              <span className="text-gray-700">{penalty}</span>
              <button
                onClick={() => deletePenalty(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <input
            type="text"
            value={newPenalty}
            onChange={(e) => setNewPenalty(e.target.value)}
            placeholder="New task"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
          />
          <button
            onClick={addPenalty}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );

  const renderFinishedScreen = () => {
    if (finalResult.isMultiplayer) {
      const rankLabel1 = getRankLabel(finalResult.player1.performance.performanceRank);
      const rankLabel2 = getRankLabel(finalResult.player2.performance.performanceRank);

      return (
        <div className="text-center">
          <div className="mb-6">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              🎮 Game Over!
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300">
              <div className="text-2xl font-bold mb-2">
                👤 {finalResult.player1.name}
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {finalResult.player1.performance.overallScore} Points
              </div>
              <div className="text-lg mb-2">
                {finalResult.player1.score} of {finalResult.player1.total} correct
              </div>
              <div className="text-lg mb-2">
                Time: {formatTime(finalResult.player1.time)} (avg {finalResult.player1.performance.avgTimePerQuestion}s)
              </div>
              <div className={`text-xl font-bold ${rankLabel1.color}`}>
                {rankLabel1.emoji} {rankLabel1.text}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300">
              <div className="text-2xl font-bold mb-2">
                👤 {finalResult.player2.name}
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {finalResult.player2.performance.overallScore} Points
              </div>
              <div className="text-lg mb-2">
                {finalResult.player2.score} of {finalResult.player2.total} correct
              </div>
              <div className="text-lg mb-2">
                Time: {formatTime(finalResult.player2.time)} (avg {finalResult.player2.performance.avgTimePerQuestion}s)
              </div>
              <div className={`text-xl font-bold ${rankLabel2.color}`}>
                {rankLabel2.emoji} {rankLabel2.text}
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-6 rounded-2xl mb-6">
            <div className="text-3xl font-bold text-yellow-800">
              {finalResult.winner === 'Tie'
                ? '🤝 It\'s a Tie!'
                : `🏆 ${finalResult.winner} wins!`}
            </div>
          </div>

          <button
            onClick={() => setGameState('menu')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-4 px-8 rounded-2xl transition-all duration-200 hover:scale-105"
          >
            Back to Main Menu
          </button>
        </div>
      );
    }

    const rankLabel = getRankLabel(finalResult.performance.performanceRank);

    return (
      <div className="text-center">
        <div className="mb-6">
          <Award className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-bounce" />

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Well Done! 🎉
          </h2>

          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl mb-4">
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {finalResult.performance.overallScore}
            </div>
            <div className="text-xl text-gray-700">Total Points</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-xl">
            <div className="text-3xl font-bold text-green-700">
              {finalResult.performance.accuracyScore}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
            <div className="text-xs text-gray-500 mt-1">
              {finalResult.score} of {finalResult.total}
            </div>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl">
            <div className="text-3xl font-bold text-blue-700">
              {finalResult.performance.timeScore}
            </div>
            <div className="text-sm text-gray-600">Speed</div>
            <div className="text-xs text-gray-500 mt-1">
              avg {finalResult.performance.avgTimePerQuestion}s
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <div className="text-lg text-gray-600 mb-2">
            Total time: <strong>{formatTime(finalResult.time)}</strong>
          </div>
          <div className="text-sm text-gray-500">
            Target was: {formatTime(finalResult.performance.targetTime)}
          </div>
        </div>

        <div className={`p-6 rounded-2xl mb-6 ${
          finalResult.performance.performanceRank <= 3 ? 'bg-gradient-to-br from-yellow-100 to-orange-100' : 'bg-orange-100'
        }`}>
          <div className={`text-3xl font-bold mb-3 ${rankLabel.color}`}>
            {rankLabel.emoji} {rankLabel.text}
          </div>

          {finalResult.selectedRewardOrPenalty && (
            <div className="text-xl mt-4">
              {finalResult.performance.performanceRank <= 3 ? (
                <>
                  <div className="font-bold mb-2">🎁 Your Reward:</div>
                  <div>
                    <span className="font-bold text-green-700">
                      {finalResult.selectedRewardOrPenalty.person}
                    </span>
                    {': '}
                    <span className="text-gray-700">
                      {finalResult.selectedRewardOrPenalty.reward}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {getRankBadge(finalResult.selectedRewardOrPenalty.rank)}
                  </div>
                </>
              ) : (
                <>
                  <div className="font-bold mb-2">🎯 Your Task:</div>
                  <div className="text-gray-700">{finalResult.selectedRewardOrPenalty}</div>
                  <div className="text-sm text-gray-600 mt-2">You'll do better next time! 💪</div>
                </>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setGameState('menu')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-2xl font-bold py-4 px-8 rounded-2xl transition-all duration-200 hover:scale-105"
        >
          Back to Main Menu
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto relative z-10">
        {gameState === 'menu' && renderMenuScreen()}
        {gameState === 'multiplayer-setup' && renderMultiplayerSetup()}
        {gameState === 'playing' && renderPlayingScreen()}
        {gameState === 'handover' && renderHandoverScreen()}
        {gameState === 'settings' && renderSettingsScreen()}
        {gameState === 'finished' && renderFinishedScreen()}
      </div>
    </div>
  );
}

export default App;
