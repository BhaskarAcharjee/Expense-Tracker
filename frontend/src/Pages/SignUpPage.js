import React, { useState } from "react";
import styled from "styled-components";
import coverImage from "../Images/coverimage2.jpg";
import LoginPage from "./LoginPage";
import axios from "axios";
import { useGlobalContext } from "../context/globalContext";

const SignUpPage = ({setPasswordCorrect}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setErrorMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:5000/api/v1/signup", {
        fullName,
        email,
        password,
      });

      if (response.data.message === "Signup successful") {
        setPasswordCorrect(true);
      } else {
        setErrorMessage("User already exists");
      }
    } catch (error) {
      setErrorMessage("Server error");
    }
  };

  return (
    <SignUpPageContainer>
      <CoverImage src={coverImage} alt="Cover" />
      <SignUpFormContainer>
        {!signIn ? (
          <SignUpForm>
            <h2>Create an Account</h2>
            <p>Sign up to start tracking your net worth</p>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={handleFullNameChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <SignUpButton onClick={handleSignUp}>Sign Up</SignUpButton>
            {/* <p>{error && <p className="error">{error}</p>}</p> */}
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <SignInLink>
              Already have an account?{" "}
              <a href="#" onClick={() => setSignIn(true)}>
                Sign in here
              </a>
            </SignInLink>
          </SignUpForm>
        ) : (
          <LoginPage setPasswordCorrect={setPasswordCorrect}/>
        )}
      </SignUpFormContainer>
    </SignUpPageContainer>
  );
};

const SignUpPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
`;

const CoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const SignUpFormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 400px;
`;

const SignUpForm = styled.form`
  h2 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: #555;
    font-size: 1.1rem;
  }

  input {
    width: 100%;
    padding: 0.7rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* ... rest of the styling */
`;

const SignUpButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const SignInLink = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 0.5rem;
`;

export default SignUpPage;
