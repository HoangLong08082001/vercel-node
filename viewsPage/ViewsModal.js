class ServiceRenewPage {
  static renew =
    "UPDATE collaborator SET password_collaborator=? WHERE email_collaborator=?";
}
module.exports = { ServiceRenewPage };
