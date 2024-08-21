import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "username must be atleast 3 characters long")
        .max(20, "username cannot exceed 20 characters")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password must be 6 characters long")
        .max(30, "Password must not exceed 30 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-white">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              value={formik.values.username}
              onChange={formik.handleChange}
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
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-s">{formik.errors.password}</p>
            ) : null}
          </div>
          <Link
            to="/signup"
            className="text-sm  hover:underline text-white hover:text-blue-600 mt-2 inline-block"
          >
            {"Don't"} have an account?
          </Link>

          <div>
            <button type="submit" className="btn btn-block btn-sm mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
