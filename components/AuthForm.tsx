"use client"

import { EmailOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast";
import { Interface } from "readline";

interface FormData {
  username?: string;
    email: string;
    password: string;
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
    const router = useRouter()
     const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
    type === "register" ? {username:"", email:"", password:""} : {email:"", password:""},
}
  )
   const onSubmit: SubmitHandler<FormData> = async (data) => {
    let res;

    if (type === "register") {
      res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        toast.error("Something went wrong");
      }
    }

    if (type === "login"){
        res = await signIn("credentials", {
            ...data, 
            redirect: false,
        })

        if(res && res.ok){
            router.push("/")
            toast.success("Logged in successfully") 
    
        }else{
            toast.error("Invalid credentials")
        }
    }
  }
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/background.jpg')" }} // 👈 place your bg here
    >
      {/* Dark overlay */}
     <div className="absolute inset-0 bg-black/60" />

      {/* Centered form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="w-1/3 py-7 px-8 max-sm:w-5/6 flex flex-col items-center justify-center gap-6 bg-black bg-opacity-70 shadow-md rounded-lg">
          <form  className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit(onSubmit)}>
            {type === "register" && (
                <>
              <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
                <input
                {...register("username",{required: "username is required",
                    validate: (value: string | undefined)=> {
                        if (!value || value.length < 2){
                            return "Username must be at least 2 characters long"
                        }
                        return true
                     }
                })}
                  type="text"
                  placeholder="Username"
                  className="w-full bg-transparent text-white outline-none placeholder-gray-300"
                />
                <PersonOutline sx={{ color: "white" }} />
              </div>
               {errors.username && (
                  <p className="text-red-500 font-semibold">{errors.username.message}</p>
                )}
                </>
            )}
            <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
              <input  {...register("email",{required: "Email is required",
                  
                })}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-white outline-none placeholder-gray-300"
              />
              <EmailOutlined sx={{ color: "white" }} />
            </div>
             {errors.email && <p className="text-red-500 font-semibold">{errors.email.message}</p>}

            <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
              <input {...register("password",{required: "Password is required",
                    validate: (value: string | undefined)=> {
                        if (!value || value.length < 5 || value.length > 20  ||
                      !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/)){
                            return "Password must be between 5 and 20 characters long with at least one special"
                        }
                        return true
                     }
                })}

                type="password"
                placeholder="Password"
                className="w-full bg-transparent text-white outline-none placeholder-gray-300"
              />
              <LockOutlined sx={{ color: "white" }} />
            </div>
         {errors.password && (
              <p className="text-red-500 font-semibold">{errors.password.message}</p>
            )}
            {/* Netflix red button */}
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded" type="submit">
              {type === "register" ? "Join Free" : "Let's Watch"}
            </button>
          </form>

          {type === "register" ? (
            <Link href="/login">
              <p className="text-sm text-center text-gray-300">
                Already have an account?{" "}
                <span className="text-white hover:underline">Login Here</span>
              </p>
            </Link>
          ) : (
            <Link href="/register">
              <p className="text-sm text-center text-gray-300">
                Don&apos;t have an account?{" "}
                <span className="text-white hover:underline">Register Here</span>
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
