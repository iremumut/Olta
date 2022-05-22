import FormInputLabel from "./FormInputLabel";
import "./SignInForm.css";

const SignInForm = () => {
  return (
    <div className="px-8 py-9 flex flex-col mx-16 my-20 font-sans border border-[#878787] border-[0.5px] rounded-lg drop-shadow-md">
      <p className="font-extralight text-2xl py-3">Hoş Geldiniz!</p>
      <p className="signin pb-8">Giriş Yap</p>
      <form>
        <FormInputLabel
          inputId={"name"}
          inputType={"text"}
          label=" Kullanıcı adı"
          placeholder="Kullanıcı adınızı girin"
        />
        <FormInputLabel
          inputId={"password"}
          inputType={"password"}
          label="Şifre"
          placeholder="Şifrenizi girin"
        />
      </form>
    </div>
  );
};

export default SignInForm;
