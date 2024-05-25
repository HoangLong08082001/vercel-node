class ServicePayment {
  static addpayment =
    "INSERT INTO payment (total_recived, total_withdrawn, id_collaborator) VALUES (?,?,?)";
}

module.exports = ServicePayment;
