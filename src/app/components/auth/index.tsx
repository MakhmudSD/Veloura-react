import React, { useState } from "react";
import { styled } from '@mui/system';
import { // ... other imports
  Modal,
  Backdrop,
  Fade,
  Fab,
  Stack,
  TextField,
  Box,
  BoxProps
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Messages } from "../../lib/config";
import { LoginInput, MemberInput } from "../../lib/types/member";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

// Corrected ModalImg definition
const ModalImg = styled('img')({
  width: '50%',
  height: '100%',
  borderRadius: '20px 0 0 20px',
  objectFit: 'cover',
});

const FormContainer = styled(Stack)`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 0 20px 20px 0;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const StyledModalBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  width: '800px',
  height: '450px',
  background: '#fff',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.2)',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

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

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setMemberNick(e.target.value);
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => setMemberPhone(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setMemberPassword(e.target.value);

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          <StyledModalBox>
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
