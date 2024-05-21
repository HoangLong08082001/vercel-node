import axios from "axios";
import pool from "../../config/database";
import ServiceCollaborator from "./CollaboratorModal";
import bcrypt, { hash } from "bcrypt";
const salt = 10;
const registerAccount = async (req, res) => {
  try {
    //name_collaborator	password_collaborator	email_collaborator	gender	address_collaborator	phone	presenter_phone	status_collaborator
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let gender = req.body.gender;
    let address = req.body.address;
    let phone = req.body.phone;
    let presenter_phone = req.body.presenter_phone;
    let status = req.body.status;
    pool.query(
      "SELECT * FROM collaborator WHERE email_collaborator=? AND phone=?",
      [email, phone],
      (err, result) => {
        if (err) {
          return res.status(200).json({ message: "fails" });
        }
        if (result.length > 0) {
          return res.status(200).json({ message: "account already exits" });
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              return res.status(200).json({ message: "fails to register" });
            }
            pool.query(
              "INSERT INTO collaborator(name_collaborator, password_collaborator, email_collaborator, gender, address_collaborator, phone, presenter_phone, status_collaborator) VALUES(?,?,?,?,?,?,?,?)",
              [name, hash, email, gender, address, phone, presenter_phone, 1],
              (err, result) => {
                if (err) {
                  return res.status(200).json({ message: "failt" });
                }
                if (result) {
                  pool.query(
                    "INSERT INTO payment (total_recived, total_withdrawn, id_collaborator) VALUES (?,?,?)",
                    [0, 0, result.insertId],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      }
                      if (result) {
                        console.log(result);
                        return res
                          .status(200)
                          .json({ message: "success to register" });
                      }
                    }
                  );
                }
              }
            );
          });
        }
      }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

module.exports = { registerAccount };
