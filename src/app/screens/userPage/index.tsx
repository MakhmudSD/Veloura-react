import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { serverApi } from "../../lib/config";
import { MemberType } from "../../lib/enums/members.enum";
import "../../../css/userpage.css";

export default function UserPage() {
 const authMember = null;
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
                    src={authMember ? `${serverApi}/${authMember}` : "/icons/default-user.svg"}
                    className={"order-user-avatar"}
                    alt=""
                  />
                  <div className={"order-user-icon-box"}>
                    <img src={authMember === MemberType.ADMIN ? "/icons/restaurant.svg" : "/icons/user-badge.svg"} alt="" />
                  </div>
                </div>
                <span className={"order-user-name"}>{authMember}</span>
                <span className={"order-user-prof"}>{authMember}</span>
                <span className={"order-user-prof"}>{authMember ? authMember : "No Address"}</span>
              </Box>
              <Box className={"user-media-box"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>
              <p className={"user-desc"}>{authMember ? authMember : "No description"}</p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
