const axios = require("axios");
const pool = require("../../config/database.js");
const bcrypt = require("bcrypt");
const { ServiceCollaborator } = require("./CollaboratorModal.js");
const { createJwtApp } = require("../../middleware/JwtAction.js");
const nodemailer = require("nodemailer");
const salt = 10;
const randomNumberCodeVerfify = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const registerAccount = async (req, res) => {
  try {
    //name_collaborator	password_collaborator	email_collaborator	gender	address_collaborator	phone	presenter_phone	status_collaborator
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;
    if (
      (name !== "" && password !== "" && email !== "" && phone !== "") ||
      (name !== null && password !== null && email !== null && phone !== null)
    ) {
      pool.query(ServiceCollaborator.check, [email, phone], (err, result) => {
        if (err) {
          throw err;
        }
        if (result.length > 0) {
          console.log(result);
          return res
            .status(400)
            .json({ message: "Email hoặc số điện thoại đã tồn tại!" });
        } else {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              throw er;
            }
            if (hash) {
              pool.query(
                ServiceCollaborator.register,
                [
                  name,
                  hash,
                  email,
                  phone,
                  1,
                  1,
                  0,
                  1,
                  randomNumberCodeVerfify(),
                ],
                (err, result) => {
                  if (err) {
                    throw err;
                  }
                  if (result) {
                    pool.query(
                      ServicePayment.addpayment,
                      [0, 0, result.insertId],
                      (err, result) => {
                        if (err) {
                          throw err;
                        }
                        if (result) {
                          console.log(result);
                          return res.status(200).json({ message: "success" });
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "fails" });
  }
};

const loginAccount = (req, res) => {
  try {
    let email = req.body.payload.email;
    let password = req.body.payload.password;
    if (
      (email !== "" && password !== "") ||
      (email !== null && password !== null)
    ) {
      pool.query(ServiceCollaborator.login, [email, email], (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          console.log(data[0]);
          bcrypt.compare(
            password.toString(),
            data[0].password_collaborator,
            (err, response) => {
              if (err) {
                throw err;
              }
              if (response) {
                pool.query(
                  ServiceCollaborator.login,
                  [email, email],
                  (err, data) => {
                    if (err) {
                      throw err;
                    }
                    if (data) {
                      let payload = {
                        data: data,
                      };
                      let token = createJwtApp(payload);
                      if (data && token) {
                        res.cookie("jwt", token, { httpOnly: true });
                      }
                      if (data[0].status_verify === 0) {
                        const transport = nodemailer.createTransport({
                          host: "smtp.gmail.com",
                          port: 587,
                          service: "gmail",
                          secure: false,
                          auth: {
                            user: "longhoang882001@gmail.com",
                            pass: "dyygjdykverudrtb",
                          },
                        });

                        // Thiết lập email options
                        const mailOptions = {
                          from: "longhoang882001@gmail.com", // Địa chỉ email của người gửi
                          to: `${data[0].email_collaborator}`, // Địa chỉ email của người nhận
                          subject: "Ecoop send code verify", // Tiêu đề email
                          text: `Verify code from Ecoop ${data[0].code_verify}`, // Nội dung email
                        };
                        transport.sendMail(mailOptions, (error, info) => {
                          if (error) {
                            throw error;
                          }
                          console.log(
                            "Verify code from Ecoop: " + info.response
                          );
                        });
                      }
                      return res.status(200).json({
                        message: "success",
                        data,
                        access_token: token,
                      });
                    } else {
                      return res
                        .status(400)
                        .json({ message: "Không thể đăng nhập" });
                    }
                  }
                );
              }
              if (!response) {
                return res
                  .status(400)
                  .json({ message: "Sai username hoặc password" });
              }
            }
          );
        } else {
          return res
            .status(400)
            .json({ message: "Sai username hoặc password" });
        }
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
};

const codeVerify = (req, res) => {
  try {
    let code_verify = req.body.code;
    pool.query(ServiceCollaborator.verify, [code_verify], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        pool.query(
          ServiceCollaborator.updateStatusVerify,
          [1, code_verify],
          (err, result) => {
            if (err) {
              throw err;
            }
            if (result) {
              return res.status(200).json({ message: "success" });
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Sai mã xác nhận" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
};

const presenterPhone = (req, res) => {
  let email = req.body.email;
  let phone = req.body.phone;
  console.log(email + phone);
  pool.query(
    ServiceCollaborator.updatePresenter,
    [phone, 2, email],
    (err, data) => {
      if (err) {
        throw err;
      }
      if (data) {
        console.log(data);
        return res.status(200).json({ message: "success" });
      }
    }
  );
};

const getAccount = (req, res) => {
  return res.status(200).json({
    message: "success",
    data: {
      access_token: req.token,
      email: req.user,
    },
  });
};

const signOutAccount = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
};

const updateInformation = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let emailData = req.body.emailData;
  let presenterPhone = req.body.referral;
  console.log(name + " " + email + " " + emailData + presenterPhone);

  if (
    (presenterPhone === "" || presenterPhone === undefined) &&
    emailData !== email
  ) {
    try {
      pool.query(ServiceCollaborator.checkEmail, [email], (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res
            .status(400)
            .json({ message: "Email đã tồn tại! vui lòng nhập email khác" });
        } else {
          pool.query(
            ServiceCollaborator.updateCollaboratorNoPhone,
            [name, email, emailData],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: "fails" });
              }
              if (result) {
                console.log(result);
                return res
                  .status(200)
                  .json({ message: "success", data: result });
              }
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "fails" });
    }
  } else if (
    (presenterPhone === "" || presenterPhone === undefined) &&
    emailData === email
  ) {
    try {
      pool.query(
        ServiceCollaborator.updateCollaboratorNoPhone,
        [name, email, emailData],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "fails" });
          }
          if (result) {
            console.log(result);
            return res.status(200).json({ message: "success", data: result });
          }
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "fails" });
    }
  } else if (
    (presenterPhone !== "" || presenterPhone !== undefined) &&
    email === emailData
  ) {
    try {
      pool.query(
        ServiceCollaborator.updateCollaborator,
        [name, email, presenterPhone, 2, email],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "fails" });
          }
          if (result) {
            console.log(result);
            return res.status(200).json({ message: "success", data: result });
          }
        }
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "fails" });
    }
  } else if (
    (presenterPhone !== "" || presenterPhone !== undefined) &&
    emailData !== email
  ) {
    try {
      pool.query(ServiceCollaborator.checkEmail, [email], (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          return res
            .status(400)
            .json({ message: "Email đã tồn tại! vui lòng nhập email khác" });
        } else {
          pool.query(
            ServiceCollaborator.updateCollaborator,
            [name, email, presenterPhone, 2, emailData],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: "fails" });
              }
              if (result) {
                console.log(result);
                return res
                  .status(200)
                  .json({ message: "success", data: result });
              }
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "fails" });
    }
  }
};

const reNewpassword = (req, res) => {
  let email = req.body.email;
  try {
    pool.query(ServiceCollaborator.checkEmail, [email], (err, data) => {
      if (err) {
        throw err;
      }
      if (data.length > 0) {
        console.log(data[0]);
        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          service: "gmail",
          secure: false,
          auth: {
            user: "longhoang882001@gmail.com",
            pass: "dyygjdykverudrtb",
          },
        });

        // Thiết lập email options
        const mailOptions = {
          from: "ECOOPMART.VN", // Địa chỉ email của người gửi
          to: `${email}`, // Địa chỉ email của người nhận
          subject: "Ecoop send message to renew password", // Tiêu đề email
          text: `To reset your password, you need to log in to the page https://node-vercel-sigma.vercel.app/views/repassword-page. Please enter your registered email and enter the new password to be reset.`, // Nội dung email
        };
        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            throw error;
          }
          if (info) {
            console.log("Verify code from Ecoop: " + info.response);
            return res.status(200).json({ message: "success" });
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: "Không tìm thấy email đã đăng ký" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "fails" });
  }
};
const resendCodeVerify = (req, res) => {
  let email = req.body.email;
  pool.query(ServiceCollaborator.resendCode, [email], (err, result) => {
    if (err) {
      throw err;
    }
    if (result) {
      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        service: "gmail",
        secure: false,
        auth: {
          user: "longhoang882001@gmail.com",
          pass: "dyygjdykverudrtb",
        },
      });

      // Thiết lập email options
      const mailOptions = {
        from: "longhoang882001@gmail.com", // Địa chỉ email của người gửi
        to: `${email}`, // Địa chỉ email của người nhận
        subject: "Ecoop send code verify", // Tiêu đề email
        text: `Verify code from Ecoop ${result[0].code_verify}`, // Nội dung email
      };
      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw error;
        }
        if (info) {
          return res.status(200).json({ message: "success" });
        }
      });
    }
  });
};

module.exports = {
  registerAccount,
  loginAccount,
  codeVerify,
  presenterPhone,
  getAccount,
  signOutAccount,
  updateInformation,
  reNewpassword,
  resendCodeVerify,
};
