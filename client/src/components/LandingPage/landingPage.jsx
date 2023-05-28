import React from "react"
import { Link } from "react-router-dom"
import style from "../LandingPage/landingPage.module.css"

export default function landingPage() {
    return (
        <div className={style.container} >
            <div>
                <Link to="/home">
                    <button>Go Home</button>
                </Link>
                <div>
                    <h1>Welcome to API C</h1>
                </div>
            </div>
        </div>

    )
}