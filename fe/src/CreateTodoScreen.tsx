import React, { useState } from "react";
import styled from "styled-components";
import { GiCancel } from "react-icons/gi";
import { createTodo } from "./api/API";
import Picker from "./Picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface iProps {
  toggle: any;
  setToggle: any;
}

const CreateTodoScreen: React.FC<iProps> = ({ toggle, setToggle }) => {
  const [text, setText] = useState("");
  const [timer, setTimer] = useState<number>(0);

  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, endDate]: any = dateRange;

  // console.log(dateRange);
  let xx = Date.parse(dateRange[1]!) - Date.parse(dateRange[0]!);
  console.log(xx / 86400000);

  return (
    <Container>
      <Card>
        <div
          onClick={() => {
            setToggle(false);
          }}
        >
          <GiCancel />
        </div>
        <Hold>
          <Text
            placeholder="Enter your task"
            value={text}
            onChange={(e: any) => {
              setText(e.target.value);
            }}
          />
          {/* <Timer
            type="number"
            placeholder="Enter time in minute"
            value={timer}
            onChange={(e: any) => {
              setTimer(e.target.value);
            }}
          /> */}

          <Timer
            placeholderText="Enter you task date deadline"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null] | any) => {
              setDateRange(update);
            }}
            isClearable={true}
          />

          <Button
            onClick={() => {
              let data = {
                task: text,
                time: dateRange,
              };
              createTodo(data);
              // setToggle(false);
            }}
          >
            Add To Do
          </Button>
        </Hold>
      </Card>

      <Main
        onClick={() => {
          setToggle(false);
        }}
      ></Main>
    </Container>
  );
};

export default CreateTodoScreen;

const Button = styled.div`
  background-color: purple;
  padding: 10px 15px;
  color: white;
  border-radius: 5px;
`;
const Timer = styled(DatePicker)`
  height: 50px;
  width: 310px;
  background-color: white;
  padding-left: 5px;
  border-radius: 5px;
`;
const Text = styled.textarea`
  padding: 10px;
  height: 50%;
  width: 100%;
  resize: none;
  border-radius: 5px;
`;
const Hold = styled.div`
  height: 90%;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
const Card = styled.div`
  position: absolute;
  z-index: 10;
  width: 500px;
  height: 400px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(144, 19, 254, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
