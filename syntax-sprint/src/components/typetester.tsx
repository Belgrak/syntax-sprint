import * as React from 'react'
import logo from '../static/img/logo.svg';
import "../styles/main.css";
import {words} from "./words";
import {FormEvent, useEffect, useMemo, useState} from "react";

const TypeTester: React.FC = () => {
    const [seconds, setSeconds] = useState(60);
    const [isOnTimer, setIsOnTimer] = useState(false);
    const [curIndex, setCurIndex] = useState(0);
    const [curInput, setCurInput] = useState("");
    const [result, setResult] = useState(0);

    const getGeneratedWords = () => {
        const result = [];
        for (let i = 0; i < 100; i++) {
            let generatedWord = words[Math.floor(Math.random() * (words.length + 1))];
            while (!generatedWord) {
                generatedWord = words[Math.floor(Math.random() * (words.length + 1))];
            }
            result.push(generatedWord);
        }
        return result;
    }
    const wordsList = useMemo(() => getGeneratedWords(), []);

    useEffect(() => {
        if (!isOnTimer || !seconds) {
            setIsOnTimer(false);
            return;
        }

        const intervalId = setInterval(() => setSeconds(seconds - 1), 1000);

        return () => clearInterval(intervalId);
    }, [isOnTimer, seconds])

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        if (seconds != 60 && !isOnTimer) return;

        if (!isOnTimer) {
            document.getElementById(`p-${curIndex}`)!.style.backgroundColor = "#bebebe";
            setIsOnTimer(true);
        }

        setCurInput(event.currentTarget.value);
        const word = event.currentTarget.value;
        if (word[word.length - 1] == " ") {
            if (wordsList[curIndex] == curInput.trim()) {
                setResult(result + 1);
            }
            setCurInput("");
            if (curIndex == wordsList.length - 1) {
                setIsOnTimer(false);
                return;
            }
            document.getElementById(`p-${curIndex}`)!.style.backgroundColor = "white";
            document.getElementById(`p-${curIndex + 1}`)!.style.backgroundColor = "#bebebe";
            setCurIndex(curIndex + 1);
        }
    }

    return <div className="wrapper">
        <div className="title mt-10" style={{display: "flex", justifyContent: "center"}}>
            <img src={logo} alt="Syntax Sprint" className="logo"/>
        </div>

        <div className="content" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <article className="text">
                {wordsList.map((w, index) => <p className="text-element" key={`p-${index}`} id={`p-${index}`}>{w}</p>)}
            </article>
            {!isOnTimer && seconds != 60 ?
                <div className="result">
                    <p className="result-text">
                        Your result: {seconds ? Math.floor(result / seconds * 60) : result} programming WPM
                    </p>
                </div>
                : <></>}

            <p className="timer">
                {`${Math.floor(seconds / 60)}:${(seconds % 60 < 10 ? "0" : "") + (seconds % 60).toString()}`}
            </p>
            <div className="input_block" style={{display: "flex"}}>
                <input value={curInput} type="text" className="text-field" onInput={onChange}/>
                <button onClick={() => window.location.reload()}>🔄</button>
            </div>
        </div>
    </div>
}

export default TypeTester;