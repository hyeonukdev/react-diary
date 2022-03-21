import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  return (
    <div>
      <h1>Edit</h1>
      <p>This page is Edit</p>
      <button onClick={() => setSearchParams({ who: "tester" })}>
        작성자 바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 이동
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
