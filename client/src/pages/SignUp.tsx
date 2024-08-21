import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSignup from "../hooks/useSignup";

const SignUp = () => {
  const { signup, loading } = useSignup();
  const formik = useFormik({
    initialValues: {
      username: "",
      fullName: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "username must be atleast 3 characters long")
        .max(20, "username cannot exceed 20 characters")
        .matches(
          /^[0-9a-z]*$/,
          "Username can only contain alphanumeric characters"
        )
        .required("Required"),
      fullName: Yup.string()
        .min(3, "fullName must be atleast 3 characters long")
        .max(20, "fullName cannot exceed 20 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .max(30, "Password must not exceed 30 characters")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      signup(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-white">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="FullName"
              name="fullName"
              className="w-full input input-bordered  h-10"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <p className="text-red-600 text-s">{formik.errors.fullName}</p>
            ) : null}
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              name="username"
              className="w-full input input-bordered h-10"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-600 text-s">{formik.errors.username}</p>
            ) : null}
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-s">{formik.errors.password}</p>
            ) : null}
          </div>

          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
          >
            Already have an account?
          </Link>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
