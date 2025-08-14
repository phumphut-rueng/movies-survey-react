import movies from "./data/movies";
import { useState } from "react";

function SurveyForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [summary, setSummary] = useState(false);


  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [optionError, setOptionError] = useState('');


  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  function handleSubmit (event){
    event.preventDefault();
    let errors = false;
    if(!name){
      setNameError('กรุณากรอกชื่อ');
      errors = true;
    } else{
      setNameError ('');
    }
    if(!email){
      setEmailError ('กรุณากรอกอีเมล');
      errors = true;
    }else if(!isValidEmail.test(email)){
      setEmailError ('รูปแบบอีเมลไม่ถูกต้อง');
      errors = true;
      setSummary(true);
    } else{
      setEmailError ('');
    }

    if(!selectedOption){
      setOptionError ('กรุณาเลือกภาพยนตร์');
      errors = true;
    } else{
      setOptionError ('');
    }
    if(!errors){
      setSummary(true);
    }
  }

  return (
    <div className="flex flex-col items-center ">
      <form onSubmit={handleSubmit}>
        <h1 className="flex text-3xl font-bold underline justify-center mt-10 ">
          แบบสำรวจความชอบภาพยนตร์
        </h1>
        <div className="flex flex-col  w-4xl">
          <label className="mt-5 font-bold" htmlFor="name">
            ชื่อ :
          </label>
          <input
            className ={`border-2 w-2x ${nameError ? 'border-red-500' : ''}`}
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          {nameError && <h2 className="text-red-500">{nameError}</h2>}

          <label className="font-bold" htmlFor="email">
            Email :
          </label>
          <input
            className={`border-2 ${emailError ? "border-red-500" : ""}`}
            type="text"
            id="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          {emailError && <h2 className="text-red-500">{emailError}</h2>}

          {movies.map((movie) => (
            <label key={movie.title} className="block">
              <input
                type="radio"
                name="option"
                value={movie.title}
                checked={movie.title === selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
              />
              {movie.title} ({movie.year}) — {movie.director}
            </label>
          ))}
          {optionError && <h2 className="text-red-500">{optionError}</h2>}

          <label className="font-bold mt-5" htmlFor="comment">
            แสดงความคิดเห็น(ถ้ามี) :
          </label>
          <textarea
            className="border-2 "
            type="text"
            id="comment"
            name="comment"
            placeholder="แสดงความคิดเห็น"
            onChange={(event) => setComments(event.target.value)}
            value={comments}
            rows={4}
            cols={30}
          />
        </div>
        <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" 
          type="submit"
          >
          ส่ง
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          type="button"
          onClick={() => {
            setName('');
            setEmail('');
            setSelectedOption('');
            setComments('');
            setNameError('');
            setEmailError('');
            setOptionError('');
            setSummary(false);
          }}
          >
          รีเซ็ต
        </button>
      </div>
      </form>
      {summary && <div className="flex flex-col w-4xl bg-gray-100 mt-5">
        <h1 className="font-bold underline">แบบสํารวจความชอบภาพยนตร์</h1>
        <h2 className="font-bold">ชื่อ : {name}</h2>
        <h2 className="font-bold">อีเมล : {email}</h2>
        <h2 className="font-bold">ภาพยนตร์ : {selectedOption}</h2>
        <h2 className="font-bold">ความคิดเห็น : {comments}</h2>
      </div>}
    </div>
  );
}

export default SurveyForm;
