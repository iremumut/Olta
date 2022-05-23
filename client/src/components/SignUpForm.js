import React from 'react';
import {Link} from "react-router-dom";

import FormInputLabel from './FormInputLabel';
import PrimaryButton from './PrimaryButton';

function SignUpForm() {
    return (
    <div className="px-8 py-9 flex flex-col mx-2 sm:mx-16 my-20 lg:mx-0 font-sans border border-[#878787] border-[0.5px] rounded-lg shadow-xl">
      <p className="font-light text-2xl py-9">Hoş Geldiniz!</p>
      <p className="signin pb-8 font-medium text-3xl">Kayıt Ol</p>
      <form>
          <FormInputLabel
          inputId={"email"}
          inputType={"email"}
          label="Email"
          placeholder="Emalinizi girin"
        />
        <FormInputLabel
          inputId={"name"}
          inputType={"text"}
          label="Ad soyad"
          placeholder="Ad ve soyadınızı girin"
        />
        <FormInputLabel
          inputId={"username"}
          inputType={"text"}
          label="Kullanıcı adı"
          placeholder="@ Kullanıcı adınızı girin"
        />
        <FormInputLabel
          inputId={"password"}
          inputType={"password"}
          label="Şifre"
          placeholder="Şifrenizi girin"
        />
        <FormInputLabel
          inputId={"passwordConfirm"}
          inputType={"password"}
          label="Şifreyi Onayla"
          placeholder="Şifrenizi tekrar girin"
        />

        <PrimaryButton text="Kayıt Ol" witdh="w-full"/>
        
        <p className="text-center mt-9 text-slate-500 text-base" >
          Zaten hesabınız var mı?
          <Link to={"/signin"} className="text-black font-bold"> Giriş Yap</Link>
        </p>
      </form>
    </div>
    );
}

export default SignUpForm;