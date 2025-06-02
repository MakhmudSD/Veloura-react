import { Box, Container, Stack } from "@mui/material";
import { Settings } from "./Settings";
import { serverApi } from "../../lib/config";
import { MemberType } from "../../lib/enums/members.enum";
import "../../../css/userpage.css";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();
  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/user-badge.png"
                    }
                    className={"order-user-avatar"}
                    alt=""
                  />
                  <div className={"order-user-icon-box"}>
                    <img
                      src={
                        authMember?.memberType === MemberType.ADMIN
                          ? "/icons/restaurant.svg"
                          : "/icons/user-badge.png"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>
                  {authMember?.memberNick}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberType}
                </span>
                <span className={"order-user-prof"}>
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "No Address"}
                </span>
              </Box>
              <Box
                className={"user-media-box"}
                sx={{ mt: 3, display: "flex", gap: 2 }}
              >
                <img src={"/icons/facebook.svg"} alt="Facebook" />
                <img src={"/icons/twitter.svg"} alt="Twitter" />
                <img src={"/icons/instagram.svg"} alt="Instagram" />
                <img src={"/icons/linkedin.svg"} alt="LinkedIn" />
              </Box>
              <p className={"user-desc"}>
                {authMember?.memberDesc
                  ? authMember.memberDesc
                  : "No description"}
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
