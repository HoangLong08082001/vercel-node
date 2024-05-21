class ServiceCollaborator {
  static check =
    "SELECT * FROM collaborator WHERE email_collaborator=? AND phone=?";
  static register =
    "INSERT INTO collaborator VALUES(name_collaborator, password_collaborator, email_collaborator, gender, address_collaborator, phone, presenter_phone, status_collaborator)";
}

module.exports = ServiceCollaborator;
