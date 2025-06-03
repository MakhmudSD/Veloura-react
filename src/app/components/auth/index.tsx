import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Modal,
  Backdrop,
  Fade,
  Fab,
  Stack,
  TextField,
  Box,
  BoxProps,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Messages } from "../../lib/config";
import { LoginInput, MemberInput } from "../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const ModalImg = styled("img")({
  width: "50%",
  height: "100%",
  borderRadius: "20px 0 0 20px",
  objectFit: "cover",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
  },
});

const FormContainer = styled(Stack)`
  background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
  padding: 30px;
  border-radius: 0 20px 20px 0;
  align-items: center;
  justify-content: center;
  width: 50%;
  color: #e0b865;
  box-shadow: inset 0px 0px 15px rgba(224, 184, 101, 0.2);
`;

const StyledModalBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  width: "800px",
  height: "450px",
  background: "#121212",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0px 0px 50px rgba(0, 0, 0, 0.7), 0px 0px 30px #e0b86560",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #e0b86540",
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
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMemberNick(e.target.value);
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMemberPhone(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMemberPassword(e.target.value);

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
      await delay(500);
      await sweetTopSuccessAlert("Signed up successfully", 2000);
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
      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
      await delay(100);
      await sweetTopSuccessAlert("Logged in", 900);
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
            <ModalImg src="/img/signup-auth.png" alt="Luxury Perfume" />
            <FormContainer>
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#e0b865",
                  textShadow: "0 0 5px rgba(224, 184, 101, 0.5)",
                }}
              >
                Sign Up
              </h2>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e0b86550",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b865",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffd700",
                      borderWidth: "2px",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                    color: "#e0b865",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#e0b86580",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700",
                  },
                  input: {
                    WebkitBoxShadow: "0 0 0 1000px #1a1a1a inset !important",
                    WebkitTextFillColor: "#e0b865 !important",
                  },
                }}
                onChange={handleUsername}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e0b86550",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b865",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffd700",
                      borderWidth: "2px",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                    color: "#e0b865",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#e0b86580",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700",
                  },
                  input: {
                    WebkitBoxShadow: "0 0 0 1000px #1a1a1a inset !important",
                    WebkitTextFillColor: "#e0b865 !important",
                  },
                }}
                onChange={handlePhone}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                sx={{
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e0b86550",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b865",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffd700",
                      borderWidth: "2px",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                    color: "#e0b865",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#e0b86580",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700",
                  },
                  input: {
                    WebkitBoxShadow: "0 0 0 1000px #1a1a1a inset !important",
                    WebkitTextFillColor: "#e0b865 !important",
                  },
                }}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                variant="extended"
                sx={{
                  mt: 4,
                  px: 4,
                  borderRadius: "30px",
                  background:
                    "linear-gradient(90deg, #e0b865 0%, #ffd700 100%)",
                  color: "#212121",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 15px rgba(224, 184, 101, 0.4)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #ffd700 0%, #e0b865 100%)",
                    boxShadow: "0px 6px 20px rgba(224, 184, 101, 0.8)",
                    transform: "translateY(-2px) scale(1.02)",
                  },
                  "&:active": {
                    transform: "translateY(0) scale(0.98)",
                    boxShadow: "0px 2px 8px rgba(224, 184, 101, 0.5)",
                  },
                }}
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
            <ModalImg src="/img/login-auth.png" alt="Luxury Perfume" />
            <FormContainer>
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#e0b865",
                  textShadow: "0 0 5px rgba(224, 184, 101, 0.5)",
                }}
              >
                Login
              </h2>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e0b86550",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b865",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffd700",
                      borderWidth: "2px",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                    color: "#e0b865",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#e0b86580",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700",
                  },
                  input: {
                    WebkitBoxShadow: "0 0 0 1000px #1a1a1a inset !important",
                    WebkitTextFillColor: "#e0b865 !important",
                  },
                }}
                onChange={handleUsername}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                sx={{
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1a1a1a",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#e0b86550",
                      transition: "border-color 0.3s ease",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e0b865",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffd700",
                      borderWidth: "2px",
                      boxShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
                    },
                    color: "#e0b865",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#e0b86580",
                    transition: "color 0.3s ease",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700",
                  },
                  input: {
                    WebkitBoxShadow: "0 0 0 1000px #1a1a1a inset !important",
                    WebkitTextFillColor: "#e0b865 !important",
                  },
                }}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                variant="extended"
                sx={{
                  mt: 4,
                  px: 4,
                  borderRadius: "30px",
                  background:
                    "linear-gradient(90deg, #e0b865 0%, #ffd700 100%)",
                  color: "#212121",
                  fontWeight: "bold",
                  boxShadow: "0px 4px 15px rgba(224, 184, 101, 0.4)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #ffd700 0%, #e0b865 100%)",
                    boxShadow: "0px 6px 20px rgba(224, 184, 101, 0.8)",
                    transform: "translateY(-2px) scale(1.02)",
                  },
                  "&:active": {
                    transform: "translateY(0) scale(0.98)",
                    boxShadow: "0px 2px 8px rgba(224, 184, 101, 0.5)",
                  },
                }}
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
