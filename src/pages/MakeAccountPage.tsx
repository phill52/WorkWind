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
    <div className="flex flex-column justify-center align-center login-body">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-between"
      >
        username
        <input
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
        first name
        <input
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
        last name
        <input
          {...register("last_name", {
            required: true,
            minLength: 1,
            maxLength: 32,
            pattern: /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$/i,
          })}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
