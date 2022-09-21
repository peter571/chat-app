import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();

  return (
    <form className="auth__form">
      <div className="div-container">
        <h1 className="logo text-center">Register</h1>
        <input
          className="form__input py-2"
          type="text"
          placeholder="Username"
        />
        <input
          className="form__input py-2"
          type="email"
          placeholder="Enter email"
        />
        <input
          className="form__input py-2"
          type="password"
          placeholder="Password"
        />
        <input
          className="form__input py-2"
          type="password"
          placeholder="Confirm password"
        />
        <button onClick={() => navigate("/spaces")} className="btn">
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link className="text-blue-500" to="/login">Log in</Link> 
        </p>
      </div>
    </form>
  )
}