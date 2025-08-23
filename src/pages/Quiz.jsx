import quizData from "./Question.js";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Quiz.css";

const API_URL = import.meta.env.VITE_API_URL;

function Quiz() {
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const quizCompleted = localStorage.getItem("quizCompleted");
  const [answear, setAnswear] = useState([]);

  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  //TODO: vytvor si premennu do ktorej to budeš ukladat
  const next = (e) => {
    e.preventDefault();

    if (chosen === quizData[index].correctIndex) {
      setScore(score + 10);
    }
    setAnswear([...answear, chosen]);
    setShowAnswer(true);

    setTimeout(async() => {
      const i = index + 1;

      if (i < quizData.length) {
        setIndex(i);
        setChosen(null);
        setShowAnswer(false);
      } else {
        setFinished(true);
        localStorage.setItem("quizCompleted", "true");
        localStorage.setItem("score", score);
        const username = localStorage.getItem("username");
        console.log(username,score)
        //TODO: Posli data do backendu ked si dokončila quiz
        await fetch(`${API_URL}/savequiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            score,
          }),
        });

        //TODO: taktiez aktualizuj premmenu tu ked niekto dokonči quiz aby sa aj lokalne hned upravili data podobne ako sme to robili pri tom ako sa pridavali fotky
      }
    }, 500);
  };

  useEffect(() => {
    const loadLeaderBoard = () => {
      //TODO: ziskaj data z backendu ako pri fotkach.
    };
    if (quizCompleted) {
      setFinished(true);
      setScore(Number(localStorage.getItem("score")));
    } else {
      const loadInfo = JSON.parse(localStorage.getItem("progress"));
      if (loadInfo) {
        setAnswear(loadInfo.answear);
        setIndex(loadInfo.index);
        setScore(Number(localStorage.getItem("score")));
      }
    }
  }, []);

  const handleBack = () => {
    localStorage.setItem("progress", JSON.stringify({ answear, index }));
    localStorage.setItem("score", score);
    navigate("/");
  };

  return (
    <div>
      <div>
        <button className="back" onClick={handleBack}>
          Zpět
        </button>
      </div>

      {/* TODO: zobraz leaderboard sortnut si to možes bud tu alebo na backende a prijat už sortnute data */}
      <Form className="form">
        {finished ? (
          <div className="vysledek">
            Gratuluji! Získal/a jsi {score} bodů z {quizData.length * 10} ♥
          </div>
        ) : (
          <div>
            <div className="nazev">{quizData[index].question}</div>

            {quizData[index].options.map((option, i) => (
              <div key={`inline-radio-${i}`} className="que">
                <Form.Check
                  inline={false}
                  label={option}
                  name={`q-${index}`}
                  type="radio"
                  checked={chosen === i}
                  onChange={() => setChosen(i)}
                  className={
                    showAnswer && i === quizData[index].correctIndex
                      ? "correct-answer"
                      : ""
                  }
                />
              </div>
            ))}
            <div className="button-wrapper">
              <button className="buttonik" onClick={next}>
                Další
              </button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Quiz;
