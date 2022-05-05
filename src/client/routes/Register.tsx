import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { apiService } from "../services/api-service";
import { UserTable } from "../../server/db/models";
import FormError from "../components/FormError";
import { validEmailRegex } from "../../server/utils/validation";

const UserTableInit: UserTable = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(UserTableInit);
  const [errors, setErrors] = useState(UserTableInit);

  const navigate = useNavigate();

  const validateForm = () => {
    const valid =
      Object.values(formData).every((val) => val.length !== 0) &&
      Object.values(errors).every((val) => val.length === 0);
    return valid;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    let error = "";
    switch (name) {
      case "first_name":
      case "last_name":
        error = value.length === 0 ? "Required" : "";
        break;
      case "email":
        error = !validEmailRegex.test(value) ? "Invalid email" : "";
        break;
      case "password":
        error =
          value.length < 8 ? "Password must be at least 8 characters" : "";
    }

    setErrors((curr) => ({
      ...curr,
      [name]: error,
    }));

    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const token = await apiService("/auth/register", "POST", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", token);
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex h-screen items-center justify-center">
        <div className="xl:w-1/3 lg:w-1/2 w-full px-4">
          <h1 className="text-4xl text-left font-bold tracking-wide">
            Register<span className="text-5xl text-red-500">.</span>
          </h1>
          <div className="border rounded-lg shadow-sm px-8 py-8 mt-8">
            <form action="" className="flex flex-col space-y-8 w-full">
              <div className="flex items-center w-full">
                <label htmlFor="" className="w-1/2 space-y-2 pr-2">
                  <span className="font-medium">First Name</span>
                  <div>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="Tim"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      data-cy="first-name"
                    />
                  </div>
                  <FormError errorMsg={errors.first_name} />
                </label>
                <label htmlFor="" className="w-1/2 space-y-2 pl-2">
                  <span className="font-medium">Last Name</span>
                  <div>
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Apple"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      data-cy="last-name"
                    />
                  </div>
                  <FormError errorMsg={errors.last_name} />
                </label>
              </div>
              <label htmlFor="" className="space-y-2">
                <span className="font-medium">Email</span>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="timapple@gmail.com"
                    className="form-control invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                    onChange={(e) => handleChange(e)}
                    data-cy="email"
                  />
                </div>
                <FormError errorMsg={errors.email} />
              </label>
              <label htmlFor="" className="space-y-2">
                <span className="font-medium">Password</span>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    data-cy="password"
                  />
                </div>
                <FormError errorMsg={errors.password} />
              </label>
            </form>
            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={!validateForm()}
              data-cy="register-submit"
            >
              Submit
            </button>{" "}
            {/* Submit button */}
          </div>
        </div>{" "}
        {/* Heading, form, submit button */}
      </div>
    </div>
  );
};

export default Register;
