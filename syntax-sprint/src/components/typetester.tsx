import * as React from 'react'
import logo from '../static/img/logo.svg';
import "../styles/main.css";
import {words} from "./words";

const TypeTester: React.FC = () => {
    const getGeneratedWords = () => {
        const result = [];
        for (let i = 0; i < 100; i++) {
            result.push(words[Math.floor(Math.random() * (words.length + 1))])
        }
        return result
    }

    return <React.Fragment>
        <div className="wrapper">
            <div className="title mt-10" style={{display: "flex", justifyContent: "center"}}>
                <img src={logo} alt="Syntax Sprint" className="logo" width={"20%"}/>
            </div>

            <div className="content" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <p className="text">
                    {getGeneratedWords().join(" ")}
                </p>

                <input type="text" className="text-field"/>
            </div>
        </div>
    </React.Fragment>
}

export default TypeTester;