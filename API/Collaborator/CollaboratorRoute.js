import express from "express";
import {
  codeVerify,
  getAccount,
  loginAccount,
  presenterPhone,
  reNewpassword,
  registerAccount,
  resendCodeVerify,
  signOutAccount,
  updateInformation,
} from "./CollaboratorController";
const router = express.Router();
export default function CollaboratorRoute(app) {
  router.post("/register", registerAccount);
  router.post("/login", loginAccount);
  router.post("/logout", signOutAccount);
  router.post("/verify", codeVerify);
  router.post("/presenter-phone", presenterPhone);
  router.get("/account", getAccount);
  router.put("/update-collaborator", updateInformation);
  router.post("/renew-password", reNewpassword);
  router.post("/resend", resendCodeVerify);
  return app.use("/collaborator", router);
}
