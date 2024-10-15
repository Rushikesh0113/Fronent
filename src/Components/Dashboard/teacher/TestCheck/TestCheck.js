import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../../Loading/Loading";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

const TestCheck = () => {
  const navigate=useNavigate()
  const [data, setData] = useState(null);
  const [responses, setResponses] = useState({});
  const [feedback, setFeedback] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [grade, setGrade] = useState("Not graded");
  const { id } = useParams();
  const [check,setcheck]=useState('')
  const [err,seterr]=useState('')
  useEffect(() => {
    const fetchData = async () => {
         axios.defaults.withCredentials = true;
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/physicaltest/answer-copies/${id}`
        )
        .then((res) => setData(res.data.data))
        .catch((err) => seterr("Some Error Caught"));
    };

    fetchData();
  }, [id]);

  const handleScoreChange = (questionId, value) => {
    const question = data.test.questions.find((q) => q._id === questionId);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: Math.max(0, Math.min(value, question.score)),
    }));
  };

  const handleMarkAsRight = (questionId) => {
    const question = data.test.questions.find((q) => q._id === questionId);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: question.score,
    }));
    setRecommendations((prevRecommendations) =>
      prevRecommendations.filter((rec) => rec.questionId !== questionId)
    );
  };

  const handleMarkAsWrong = (questionId) => {
    const question = data.test.questions.find((q) => q._id === questionId);
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: 0,
    }));
    setRecommendations((prevRecommendations) => [
      ...prevRecommendations,
      {
        questionId: question._id,
        topicId: question.topicId,
        score: question.score,
      },
    ]);
  };

  const handleSubmit = () => {
    let newTotalScore = 0;
    const totalPossibleScore = data.test.questions.reduce(
      (acc, question) => acc + question.score,
      0
    );

    data.test.questions.forEach((question) => {
      const userScore = responses[question._id] || 0;
      newTotalScore += userScore;
    });

    setTotalScore(newTotalScore);

    const percentage = (newTotalScore / totalPossibleScore) * 100;
    let newGrade = "Fail";
    if (percentage >= 90) {
      newGrade = "A+";
    } else if (percentage >= 80) {
      newGrade = "A";
    } else if (percentage >= 70) {
      newGrade = "B";
    } else if (percentage >= 60) {
      newGrade = "C";
    } else if (percentage >= 50) {
      newGrade = "D";
    } else if (percentage >= 35) {
      newGrade = "E";
    }

    setGrade(newGrade);

    const body = {
      answerCopyId: data._id,
      score: newTotalScore,
      recommendations,
      feedback: feedback || data.feedback,
      grade: newGrade
      
    };
    
    axios.defaults.withCredentials = true;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/physicaltest/answer-copies/grade`,
        body
      )
      .then((res) => {setcheck("Succesfully Graded the Submission");setTimeout(() => {
        navigate(-1)
      }, 2000);})
      .catch((err) => console.log(err));
    console.log(body);
  };
  console.log(data);

  if (!data) {
    return <Loading />;
  }

  const { test, pdfPath } = data;

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="flex-1">
        <div className="h-[600px] bg-muted rounded-lg overflow-hidden">
          <iframe
            src={pdfPath.startsWith('http://') ? pdfPath.replace('http://', 'https://') : pdfPath}
            title="Test PDF"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Assessment Questions for {test.name}
          </h2>
          <div className="grid gap-4">
            {test.questions.map((question) => (
              <div
                key={question._id}
                className="grid grid-cols-[1fr_80px_80px] items-center gap-4"
              >
                <p>{question.question}</p>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-right"
                  placeholder="Score"
                  type="number"
                  min={0}
                  max={question.score}
                  value={responses[question._id] || 0}
                  onChange={(e) =>
                    handleScoreChange(
                      question._id,
                      parseInt(e.target.value, 10)
                    )
                  }
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkAsRight(question._id)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-500 hover:bg-green-600 text-white w-8 h-8"
                  >
                    <TiTick />
                  </button>
                  <button
                    onClick={() => handleMarkAsWrong(question._id)}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-500 hover:bg-red-600 text-white w-8 h-8"
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-lg font-semibold">Grade: {grade}</div>
            <div className="text-md mt-2">
              Feedback:
              <textarea
                className="w-full h-20 mt-2 p-2 border border-input rounded-md"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Add your feedback here"
              />
            </div>
          </div>
          {check && <p className="text-green-500 ">{check}</p>}
          {err && <p className="text-red-500 ">{err}</p>}
          <button
            onClick={handleSubmit}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
          <div className="mt-4">
            <div className="text-lg font-semibold">
              Total Score: {totalScore}
            </div>
            <div className="text-lg font-semibold">
              Obtained/Total Marks: {totalScore} /{" "}
              {test.questions.reduce(
                (acc, question) => acc + question.score,
                0
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCheck;
