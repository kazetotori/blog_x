"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Errors;
(function (Errors) {
    Errors[Errors["UserNotFound"] = 1] = "UserNotFound";
    Errors[Errors["PasswordError"] = 2] = "PasswordError";
    Errors[Errors["UsernameFormatError"] = 3] = "UsernameFormatError";
    Errors[Errors["UsernameExists"] = 4] = "UsernameExists";
    Errors[Errors["PasswordFormatError"] = 5] = "PasswordFormatError";
    Errors[Errors["EmailFormatError"] = 6] = "EmailFormatError";
    Errors[Errors["EmailExists"] = 7] = "EmailExists";
    Errors[Errors["FrequentVerifyCode"] = 8] = "FrequentVerifyCode";
    Errors[Errors["SignUpVerifyCodeNotSend"] = 9] = "SignUpVerifyCodeNotSend";
    Errors[Errors["UncorrectSignUpVerifyCode"] = 10] = "UncorrectSignUpVerifyCode";
    Errors[Errors["SignUpVerifyCodeTimeout"] = 11] = "SignUpVerifyCodeTimeout";
    Errors[Errors["phoneFormatError"] = 12] = "phoneFormatError";
    Errors[Errors["UncorrectSignUpVerifyEmail"] = 13] = "UncorrectSignUpVerifyEmail";
    Errors[Errors["UnknowError"] = 999] = "UnknowError";
})(Errors = exports.Errors || (exports.Errors = {}));
