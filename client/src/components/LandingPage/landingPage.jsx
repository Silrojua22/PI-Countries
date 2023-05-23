import React from "react"
import { Link } from "react-router-dom"

export default function landingPage() {
    return (
        <div>
            <div>
                <h1>
                    Welcome to api countries!
                </h1>
            </div>
            <div>
            <Link to = "/home">
                <button>Go Home</button>
                </Link>
            </div>
        </div>
        
    )
}