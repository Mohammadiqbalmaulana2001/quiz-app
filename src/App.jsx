import { useEffect, useRef, useState } from "react";
import { TriviaData } from "./apis/quiz";
import "./index.css";

function App() {
  const triviaData = TriviaData;
   // React HOOK
   const [showResult, setShowResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [result, setResult] = useState({
    correctAnswer: 0,
    wrongAnswer: 0,
    totalAnswer: 0
  });

  const [timer, setTimer] = useState("00:00");
  const Ref = useRef(null);

  useEffect(() => {
    combineAllAnswers();
    console.log(triviaData[currentQuestion].incorrect_answers)
    console.log(currentQuestion)

    clearTimer(getDateTime());
  }, []);

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds }
  };

  const startTimer = (endTime) => {
    let { total, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
      setTimer((minutes > 9 ? minutes : '0'+minutes) + ':' + (seconds > 9 ? seconds : '0'+seconds))
    }
  };

  const clearTimer = (e) => {
    setTimer("15:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => { startTimer(e) }, 1000);
    Ref.current = id;
 }

  const getDateTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 900);
    return deadline;
  };

  const clickOnReset = () => { clearTimer(getDateTime());}

  function combineAllAnswers() {
    let allAnswers = [];
    let correctAnswer = triviaData[currentQuestion].correct_answer;
    triviaData[currentQuestion].incorrect_answers.map((answer) => { allAnswers.push(answer) });
    allAnswers.push(correctAnswer);
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  const NextQuestion = () => {
    if (currentQuestion !== triviaData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      combineAllAnswers();
      setResult(({ correctAnswer, wrongAnswer, totalAnswer }) => (
        answerCorrect ?  {
            correctAnswer: correctAnswer + 1,
            wrongAnswer,
            totalAnswer: totalAnswer + 1,
          } : {
            correctAnswer,
            wrongAnswer: wrongAnswer + 1,
            totalAnswer: totalAnswer + 1,
          }
      ));
      setSelectedAnswerIndex(null);
    } else {
      setShowResult(true)
    }
    console.log(currentQuestion);
  };

  function removeCharacters(question) {
    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  function clickAnswer(answer, index) {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(true);
    if (answer === triviaData[currentQuestion].correct_answer) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
    console.log(answer);
    console.log(answerCorrect);
  }

  return (
    <div className="bg-zinc-600 min-h-screen text-slate-50 flex justify-center py-16">
      {!showResult ? (
          <div className="flex flex-col space-y-6 w-5/12">
          <h1 className="py-4 px-10 flex flex-row justify-between rounded-xl bg-zinc-900 items-center  text-center">
            <span className="text-3xl text-sky-400 font-black">Quiz App</span>
            <div className="flex flex-col space-y-2 text-sm">
              <p>Total Jawaban: {result.totalAnswer}</p> 
              <p>Jawaban Salah: {result.wrongAnswer}</p> 
              <p>Jawaban Benar: {result.correctAnswer}</p> 
            </div>
          </h1>
          <p>{timer}</p>
          <button className="p-2 bg-zinc-800" onClick={clickOnReset}>Reset</button>
          <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
            <div className="flex flex-col space-y-3">
              <h2 className="text-lg font-bold">{removeCharacters(triviaData[currentQuestion].question)}</h2>
              <ul className="flex flex-col space-y-3 list-none">
                {allPossibleAnswers.map((answer, index) => (
                  <li onClick={() => clickAnswer(answer, index)} // diubah dari clickAnswer(index)
                    className={selectedAnswerIndex === index ? 'answer-active' : 'answer'}
                    key={index}
                  >
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row justify-end pr-4">
              <button onClick={NextQuestion} className="py-2 px-6 bg-sky-400 hover:bg-sky-600 rounded-xl w-fit">Berikutnya</button> 
            </div>
          </div>
        </div>
      ) :
      (
        <div>
          tess
        </div>
      )}
    </div>
  );
}

export default App;
