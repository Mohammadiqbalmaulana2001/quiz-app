import { useEffect, useState} from "react";
// import axios from "axios";
import "./index.css";
import { TriviaData } from "./apis/quiz";

function App() {
  const triviaData = TriviaData
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(true);
  const [result, setResult] = useState({
      correctAnswer: 0,
      wrongAnswer: 0,
      totalAnswer: 0
    })

    async function combineAllAnswers() {
        let allAnswers = [];
        let correctAnswer = triviaData[currentQuestion].correct_answer
        triviaData[currentQuestion].incorrect_answers.map((answer) => {
          allAnswers.push(answer)
        });
        allAnswers.push(correctAnswer);
        allAnswers.sort(() => Math.random() - 0.5);
        setAllPossibleAnswers(allAnswers);
    }

    useEffect(() => {
      combineAllAnswers();
    }, []);
    
    const NextQuestion = () => {
      if (currentQuestion < triviaData.length) {
        setCurrentQuestion(currentQuestion + 1);
        combineAllAnswers();
        if (allPossibleAnswers[selectedAnswerIndex] === triviaData[currentQuestion].correct_answer) {
          setResult(prevResult => ({
            ...prevResult,
            correctAnswer: prevResult.correctAnswer + 1,
            totalAnswer: prevResult.totalAnswer + 1
          }));
        } else {
          setResult(prevResult => ({
            ...prevResult,
            totalAnswer: prevResult.totalAnswer + 1,
            wrongAnswer: prevResult.wrongAnswer + 1
          }));
        }
        setSelectedAnswerIndex(null);
      } else {
        setCurrentQuestion(0);
      }
    };
    

 function removeCharacters(question) {
    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
 }

 function clickAnswer(index) {
  setSelectedAnswerIndex(index)
  setSelectedAnswer(!selectedAnswer)
}
  return (
    <div className="bg-zinc-600 min-h-screen text-slate-50 flex justify-center py-16">
        <div className="flex flex-col space-y-6 w-5/12">
              <h1 className="text-xl py-4 px-10 flex flex-row justify-between rounded-xl bg-zinc-900 font-bold text-center">
                <span>Quiz App</span>
                <span>Score : {result.totalAnswer}</span>
              </h1>
            <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
                <div className="flex flex-col space-y-3">
                    <h2 className="text-lg font-bold">{removeCharacters(triviaData[currentQuestion].question)}</h2>
                    <ul className="flex flex-col space-y-3 list-none"> 
                      {allPossibleAnswers.map((answer, index) => (
                          <li onClick={()=> clickAnswer(index)}
                            className={selectedAnswerIndex === index ? 'answer-active' : 'answer'}
                            key={index}
                          >
                            {answer}
                          </li>
                      ))}
                    </ul>
                </div>
                <div className="flex flex-row justify-end pr-4">
                    <button onClick={NextQuestion} className="py-2 px-6 bg-sky-400 rounded-xl w-fit">Next</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App
