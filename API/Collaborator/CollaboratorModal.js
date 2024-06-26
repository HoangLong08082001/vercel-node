class ServiceCollaborator {
  static check =
    "SELECT * FROM collaborator WHERE email_collaborator=? OR phone=?";
  static register =
    "INSERT INTO collaborator(name_collaborator, password_collaborator, email_collaborator, phone, status_collaborator, status_leader, status_verify, status_account, code_verify) VALUES(?,?,?,?,?,?,?,?,?)";
  static login =
    "SELECT * FROM collaborator WHERE email_collaborator=? OR phone=?";
  static verify = "SELECT * FROM collaborator WHERE code_verify=?";
  static updateStatusVerify =
    "UPDATE collaborator SET status_verify=? WHERE code_verify=?";
  static addPresenter = "INSERT INTO collaborator (presenter_phone) VALUES (?)";
  static updateStatus =
    "UPDATE collaborator SET status_collaborator=? WHERE email_collaborator=?";
  static updatePresenter =
    "UPDATE collaborator SET presenter_phone=?, status_collaborator=? WHERE email_collaborator=? AND presenter_phone is NULL";
  static updateCollaboratorNoPhone =
    "UPDATE collaborator SET name_collaborator=?, email_collaborator=? WHERE email_collaborator=?";
  static updateCollaborator =
    "UPDATE collaborator SET name_collaborator=?, email_collaborator=?, presenter_phone=?, status_collaborator=? WHERE email_collaborator=? AND presenter_phone is NULL";
  static checkEmail = "SELECT * FROM collaborator WHERE email_collaborator=?";
  static resendCode =
    "SELECT code_verify from collaborator WHERE email_collaborator=?";
}

module.exports = { ServiceCollaborator };
