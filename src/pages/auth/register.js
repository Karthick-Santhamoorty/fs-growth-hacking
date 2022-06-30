import DefaultPage from "../../components/layout/defaultPage";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../service/api";
import PulseLoader from "react-spinners/PulseLoader";
import { getUser } from "../../service/getUser";

export default function Register(props) {
    const navigate = useNavigate();
    useEffect(() => {
    const user = getUser();
    if(user?.isLoggedIn && user?.access_token) navigate("/dashboard");
  // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  const [postObj, setPostObj] = useState({
    name:"",
    useremail: "",
    password: "",
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] =  useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  const submit = async() => {
    setLoading(true);
    const response = await addUser(postObj);
    if(response.status === 200){
        setApiResponse({ msg:`${response.Message}Redirecting to Login`, class:"bg-aliceBlue" });
        setLoading(false);
        setPostObj({
            name:"",
            useremail: "",
            password: "",
        });
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }
    else if(response.status === 400){
        setApiResponse({ msg:response.Message, class:"bg-floralWhite" });
        setLoading(false);
    }
    else{
        setApiResponse({ msg:"Something went wrong!!!", class:"bg-floralWhite" });
        setLoading(false);
    }
  }
  const onChangeHandler = (e) => setPostObj({ ...postObj, [e.target.name]: e.target.value });
  const checkInput = postObj.name && !errors.name && postObj.useremail && !errors.useremail && postObj.password && !errors.password;
  return (
    <DefaultPage>
      <div className="grid grid-cols-4">
        <div className="col-span-2 mt-5">
        <div className="mb-3 flex justify-between border-b">
          <h1 className="text-3xl text-primary select-none font-medium mb-2">
            <span className="font-semibold">FS</span> Growth Hacking
          </h1>
        </div>
          <div className="mb-4 px-8">
            <h2 className="font-bold text-primaryBlue text-2xl">Sign up</h2>
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className="border-b px-8">
            <fieldset className="my-5">
                <div className="w-full font-semibold mb-2 text-primaryBlue text-base">
                  {`Name  `}
                  <span className="text-lg text-red-500 font-bold">{"*"}</span>
                </div>
                <input
                  type="text"
                  className={`w-full placeholder-grayDeep rounded text-lg outline-none py-2 px-2 border focus:border-primaryBlue ${
                    errors?.name && "border-red-500"
                  }`}
                  placeholder={`Enter your name`}
                  id="name"
                  name="name"
                  value={postObj?.name}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "* Name is mandatory",
                    },
                    minLength: {
                      value: 2,
                      message: "* Minimum 2 characters required",
                    }
                  })}
                  onChange={(e) => onChangeHandler(e)}
                />
                {errors.name && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors?.name?.message}
                  </span>
                )}
              </fieldset>
              <fieldset className="my-5">
                <div className="w-full font-semibold mb-2 text-primaryBlue text-base">
                  {`Email  `}
                  <span className="text-lg text-red-500 font-bold">{"*"}</span>
                </div>
                <input
                  type="email"
                  className={`w-full placeholder-grayDeep rounded text-lg outline-none py-2 px-2 border focus:border-primaryBlue ${
                    errors?.useremail && "border-red-500"
                  }`}
                  value={postObj?.useremail}
                  placeholder={`Enter your email address`}
                  id="useremail"
                  name="useremail"
                  {...register("useremail", {
                    required: {
                      value: true,
                      message: "* E-mail is mandatory",
                    },
                    maxLength: {
                      value: 300,
                      message: "* Invalid Email Id",
                    },
                    minLength: {
                      value: 6,
                      message: "* Invalid Email Id",
                    },
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "* Invalid email format",
                    },
                  })}
                  onChange={(e) => onChangeHandler(e)}
                />
                {errors.useremail && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors?.useremail?.message}
                  </span>
                )}
              </fieldset>
              <fieldset className="my-5">
                <div className="w-full font-semibold mb-2 text-primaryBlue text-base">
                  {`Password  `}
                  <span className="text-lg text-red-500 font-bold">{"*"}</span>
                </div>
                <input
                  type="password"
                  className={`w-full placeholder-grayDeep rounded text-lg outline-none py-2 px-2 border focus:border-primaryBlue ${
                    errors?.password && "border-red-500"
                  }`}
                  placeholder={`Enter your password`}
                  id="password"
                  name="password"
                  value={postObj?.password}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "* Password is mandatory",
                    },
                    maxLength: {
                      value: 30,
                      message: "* Maximum 30 characters allowed",
                    },
                    minLength: {
                      value: 4,
                      message: "* Minimum 8 characters required",
                    },
                  })}
                  onChange={(e) => onChangeHandler(e)}
                />
                {errors.password && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.password.message}
                  </span>
                )}
              </fieldset>
              {apiResponse && 
                <div className="w-full mt-3">
                <div className={`border border-grayLight p-3 flex items-center mb-2 ${apiResponse?.class}`}>
                  <p className="text-sm text-left text-black font-light">{`${apiResponse?.msg}`}</p>
                </div>
              </div>
              }
              <div className="flex justify-start items-center mt-7">
                <button
                  className={`text-lg  px-3 py-2 w-1/5 rounded ${
                    !checkInput || loading
                      ? "text-textDisabled bg-bgDisabled pointer-events-none"
                      : "bg-primary hover:bg-primaryBlue text-white"
                  }`}
                >
                {loading?
                <PulseLoader
                color="#fff"
                size={10}
                />
                : 
                "Register"
                }
                </button>
              </div>
                <p className="text-black font-medium text-base my-3">Already have account?
                    <Link className="text-primaryBlue font-semibold underline text-base ml-2" to="/">Login</Link>
                </p>
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <img
            src={`${process.env.PUBLIC_URL}/images/growth-hacking-auth-4.jpeg`}
            alt="cover-img"
            className="w-full h-screen object-fill"
          />
        </div>
      </div>
    </DefaultPage>
  );
}
