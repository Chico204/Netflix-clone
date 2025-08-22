import { EmailOutlined, LockOutlined, PersonOutline } from "@mui/icons-material";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useForm } from "react-hook-form"
import { Interface } from "readline";

interface FormData {
  username?: string;
    email: string;
    password: string;
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
     const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
    type === "register" ? {username:"", email:"", password:""} : {email:"", password:""},
}
  )
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
          <form action="" className="flex flex-col items-center gap-5 w-full">
            {type === "register" && (
              <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-transparent text-white outline-none placeholder-gray-300"
                />
                <PersonOutline sx={{ color: "white" }} />
              </div>
            )}
            <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-white outline-none placeholder-gray-300"
              />
              <EmailOutlined sx={{ color: "white" }} />
            </div>
            <div className="flex items-center justify-between px-5 py-3 rounded bg-[#333] w-full">
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-transparent text-white outline-none placeholder-gray-300"
              />
              <LockOutlined sx={{ color: "white" }} />
            </div>

            {/* Netflix red button */}
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded">
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
