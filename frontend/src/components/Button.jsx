//object discuturing

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../auth/AuthContext";

export default function GoogleButtonLogin() {
  const { loginWithGoogle } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        console.log("google response", res);
        console.log("google credntial",res.credential);

        loginWithGoogle(res.credential)
      }}
      onError={()=>{
        console.log("google error");
        alert("login with google failed")
      }}
      theme="light"
      shape="pill"
      size="large"
      width={320}
      
    />
  );
}
