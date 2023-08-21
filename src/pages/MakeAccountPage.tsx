import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import axios from "axios";

type Inputs = {
  username: string;
  first_name: string;
  last_name: string;
};

type APIResponse = {
  message: string;
  auth_id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export default function MakeAccountPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const { authToken } = useContext(AuthContext);
  console.log(authToken);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let response: axios.AxiosResponse<APIResponse> | null = null;
    // console.log("data", data);
    try {
      response = await axios.post("http://127.0.0.1:5000/users", data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
    } catch (e) {
      console.log(e);
    }
    if (response?.status === 409) {
      setError("username", { message: "Username already exists" });
    }
  };

  return (
    <div className="bg-blue-300 login-body">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Create a WorkWind Account
          </label>
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input placeholder="Username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("username", {
            required: true,
            minLength: 4,
            maxLength: 32,
            pattern: /^[a-zA-Z0-9]+$/i,
          })}
        />
        {errors.username && (
          <span>
            Username must be between 4 and 32 characters and contain only
            letters and numbers
          </span>
        )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          First Name
          </label>
        <input placeholder="First Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("first_name", {
            required: true,
            minLength: 1,
            maxLength: 32,
            pattern: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
          })}
        />
        {errors.first_name && (
          <span>
            First name must be between 1 and 32 characters and not contain
            special characters{" "}
          </span>
        )}
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
          Last Name
          </label>
        <input placeholder="Last Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("last_name", {
            required: true,
            minLength: 1,
            maxLength: 32,
            pattern: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
          })}
        />
        </div>
        <div className="flex items-center justify-between">
          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          type="submit" value="Create Account"/>
        </div>
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
      </form>
    </div>
    
    // <div className="flex flex-column justify-center align-center login-body bg-blue-500">
    //   <form className="bg-yellow-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-column justify-center align-center login-body"
    //     onSubmit={handleSubmit(onSubmit)}
    //   >
        // username
        // <input
        //   {...register("username", {
        //     required: true,
        //     minLength: 4,
        //     maxLength: 32,
        //     pattern: /^[a-zA-Z0-9]+$/i,
        //   })}
        // />
        // {errors.username && (
        //   <span>
        //     Username must be between 4 and 32 characters and contain only
        //     letters and numbers
        //   </span>
        // )}
        // first name
        // <input
        //   {...register("first_name", {
        //     required: true,
        //     minLength: 1,
        //     maxLength: 32,
        //     pattern: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
        //   })}
        // />
        // {errors.first_name && (
        //   <span>
        //     First name must be between 1 and 32 characters and not contain
        //     special characters{" "}
        //   </span>
        // )}
        // last name
        // <input
        //   {...register("last_name", {
        //     required: true,
        //     minLength: 1,
        //     maxLength: 32,
        //     pattern: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
        //   })}
        // />
        // <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        // type="submit" />
    //   </form>
    // </div>
  );
}
