"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link"
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

import { authenticate } from "@/actions";

export const LoginForm = () => {

  const [state, dispatch, isPending] = useActionState(authenticate, undefined);

  console.log(state);

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/');
    }
  }, [state])
  

  return (
    <form action={ dispatch } className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="email"
        type="email"
      />
      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        name="password"
        type="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === 'CredentialsSignin' && (
          <div className="flex flex-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales no son correctas</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={clsx({
          "btn-primary": !isPending,
          "btn-disabled": isPending
        })}
        disabled={isPending}
      >
        Ingresar
      </button>

      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/signup" 
        className="btn-secondary text-center">
        ¿No tienes cuenta? Crea una
      </Link>

    </form>
  )
}
