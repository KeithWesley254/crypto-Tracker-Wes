import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../UserContext";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { user, userProfile, logOut } = UserState();
  
  const {currency, setCurrency} = CryptoState()

  const navigate = useNavigate();
  const location = useLocation();
  
  function handleLogoutClick() {
    logOut();
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="headerLogo" onClick={() => navigate("/")}>
            <p
              style={{
                fontWeight: "bolder",
                fontSize: 14,
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Crypto
              <br />
              <span style={{ color: "gold", cursor: "pointer" }}>
                Tracker
              </span>
            </p>
          </div>

          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "gold" }}
            >
              <MenuIcon />
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              
            >
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/");
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "gold",
                  }}
                  textAlign="center"
                >
                  Home
                </Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/feedback");
                }}
              >
                <Typography
                  sx={{
                    my: 1,
                    display: "block",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "gold",
                  }}
                  textAlign="center"
                >
                  FeedBack
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{
                my: 2,
                textTransform: "none",
                display: "block",
                fontSize: 15,
                fontWeight: 600,
                color: "gold",
              }}
            >
              Home
            </Button>
            &nbsp; &nbsp; &nbsp;
            
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/feedback");
              }}
              sx={{
                my: 2,
                textTransform: "none",
                display: "regular",
                fontSize: 15,
                fontWeight: 600,
                color: "gold",
              }}
            >
              FeedBack
            </Button>
            &nbsp; &nbsp; &nbsp;
            {"error" in user ? (
              <>
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/login", { state: location.pathname });
                }}
                sx={{
                  my: 2,
                  textTransform: "none",
                  display: "block",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "gold",
                }}
              >
                Log In
              </Button>
              &nbsp; &nbsp; &nbsp;
              </>
            ) : (
              " "
            )}
          </Box>
            <Box 
            sx={{
              my: 2,
              textTransform: "none",
              display: "block",
              fontSize: 15,
            }}
            >
            <Select
            variant="outlined"
            style={{
                width: 100,
                height: 40,
                marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"BTC"}>BTC</MenuItem>
            </Select>
            </Box>
            &nbsp; &nbsp; &nbsp;
          <Box sx={{ flexGrow: 0 }}>
            
            <Tooltip title="Open settings">
              
              {"error" in user ? 
              (
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, mr: { md: 7 } }}
                >
                  <Avatar
                    alt={""}
                    src={""}
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, mr: { md: 7 } }}
                >
                  <Avatar
                    alt={userProfile?.full_name || ""}
                    src={userProfile?.image_upload || ""}
                  />
                </IconButton>
              )
              }
                  
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {"id" in user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => navigate(`/user-profiles/${user?.id}`)}
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "gold",
                    }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate("/login", { state: location.pathname });
                  }}
                >
                  <Typography
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "gold",
                    }}
                    textAlign="center"
                  >
                    Log In / Sign Up
                  </Typography>
                </MenuItem>
              )}

              {"id" in user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={handleLogoutClick}
                    sx={{
                      my: 1,
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: "gold",
                    }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              ) : (
                " "
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;