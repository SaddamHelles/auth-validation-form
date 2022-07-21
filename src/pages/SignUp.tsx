import React, { FormEventHandler } from "react";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
interface IFormInput {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUp: React.FC = (): JSX.Element => {
  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    lastName: Yup.string()
      .required("Last Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    userName: Yup.string()
      .required("User Name is required at least tow letters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .max(40)
      .min(2),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must and should match"),
  });
  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } =
    useForm<IFormInput>(validationOpt);
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const { errors } = formState;

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (data) => {
    console.log(JSON.stringify(data, null, 4));
    return false;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "50%",
        }}
        className="m-4 "
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Sign Up
        </h2>
        <div className="container">
          {/* <label htmlFor="firstName">First Name: </label> */}
          <input
            className="form-control"
            placeholder="First Name"
            type="text"
            id={"firstName"}
            {...register("firstName")}
          />
          <p> {errors.firstName?.message} </p>

          {/* <label htmlFor="lastName">Last Name: </label> */}
          <input
            className="form-control"
            placeholder="Last Name"
            type="text"
            id="lastName"
            {...register("lastName")}
          />
          <p> {errors.lastName?.message} </p>

          {/* <label htmlFor="userName">User Name: </label> */}
          <input
            className="form-control"
            type="text"
            id="userName"
            placeholder="User Name"
            {...register("userName")}
          />
          <p> {errors.userName?.message} </p>

          {/* <label htmlFor="email">Email: </label> */}
          <input
            placeholder="Email"
            id="email"
            type="email"
            className="form-control"
            {...register("email", {
              required: true,
            })}
          />
          <p> {errors.email?.message} </p>
          <div className="form-row">
            <div className="form-group">
              {/* <label>
              <strong>Password</strong>
            </label> */}
              <input
                id={"password"}
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="form-group">
              {/* <label>
              <strong>Confirm Password</strong>
            </label> */}
              <input
                id="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                {...register("passwordConfirm", { required: true })}
                className={`form-control ${
                  errors.passwordConfirm ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.passwordConfirm?.message}
              </div>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark mt-3">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
