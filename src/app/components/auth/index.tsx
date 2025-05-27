import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Fab,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../lib/types/common";
import { Messages } from "../../lib/config";
import { LoginInput, MemberInput } from "../../lib/types/member";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const ModalImg = styled.img`
  width: 50%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  object-fit: cover;
`;

const FormContainer = styled(Stack)`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 0 20px 20px 0;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const StyledModalBox = styled(Box)`
  display: flex;
  width: 800px;
  height: 450px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  const handleUsername = (e: T) => setMemberNick(e.target.value);
  const handlePhone = (e: T) => setMemberPhone(e.target.value);
  const handlePassword = (e: T) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter") {
      signupOpen ? handleSignupRequest() : handleLoginRequest();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPassword !== "" && memberPhone !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick,
        memberPassword,
        memberPhone,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.error("Signup Error:", err);
      handleSignupClose();
      sweetErrorHandling(err);
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = { memberNick, memberPassword };
      await sweetTopSuccessAlert("Logged in", 900);
      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.error("Login Error:", err);
      handleLoginClose();
      sweetErrorHandling(err);
    }
  };

  return (
    <>
      {/* Signup Modal */}
      <Modal
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={signupOpen}>
          <StyledModalBox>
            <ModalImg src="/img/auth.webp" alt="Signup" />
            <FormContainer>
              <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleUsername}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handlePhone}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                variant="extended"
                color="primary"
                sx={{ mt: 4, px: 4, borderRadius: "30px" }}
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </FormContainer>
          </StyledModalBox>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={loginOpen}>
          <StyledModalBox sx={{ width: "700px" }}>
            <ModalImg src="/img/auth.webp" alt="Login" />
            <FormContainer>
              <h2 style={{ marginBottom: "20px" }}>Login</h2>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                onChange={handleUsername}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                variant="extended"
                color="primary"
                sx={{ mt: 4, px: 4, borderRadius: "30px" }}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </FormContainer>
          </StyledModalBox>
        </Fade>
      </Modal>
    </>
  );
}
