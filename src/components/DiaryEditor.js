import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_description: "완전 좋음",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_description: "좋음",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_description: "그럭저럭",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_description: "나쁨",
  },
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_description: "끔찍함",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
        </section>
        <section>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem key={it.emotion_id} {...it} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;