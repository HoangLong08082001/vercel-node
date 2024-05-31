import express from "express";
import CollaboratorController from "./CollaboratorController.js";
const router = express.Router();
export default function CollaboratorRoute(app) {
  router.post("/register", CollaboratorController.registerAccount);
  router.post("/login", CollaboratorController.loginAccount);
  router.post("/logout", CollaboratorController.signOutAccount);
  router.post("/verify", CollaboratorController.codeVerify);
  router.post("/presenter-phone", CollaboratorController.presenterPhone);
  router.get("/account", CollaboratorController.getAccount);
  router.put("/update-collaborator", CollaboratorController.updateInformation);
  router.post("/renew-password", CollaboratorController.reNewpassword);
  router.post("/resend", CollaboratorController.resendCodeVerify);
  return app.use("/collaborator", router);
}
