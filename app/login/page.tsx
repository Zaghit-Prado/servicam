"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { requestLoginCode, verifyLoginCode } from "@/app/actions";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [step, setStep] = useState<"email" | "code" | "google">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const [demoCode, setDemoCode] = useState("");

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await requestLoginCode(email);
      if (res?.error) {
        setError(res.error);
      } else {
        // Simulamos un retraso de red
        setTimeout(() => setStep("code"), 500);
      }
    } catch (err: any) {
      setError("Ocurrió un error inesperado al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await verifyLoginCode(email, code);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        router.push("/perfil");
      }
    } catch (err: any) {
      setError("Error inesperado al verificar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header (Back button) */}
      <header className="px-4 py-4 flex items-center border-b border-gray-100">
        <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 pb-12 max-w-md mx-auto w-full flex flex-col relative">
        <AnimatePresence mode="wait">
          {step === "email" ? (
            <motion.div 
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Te damos la bienvenida a ServiCam
              </h1>
              <p className="text-gray-500 mb-8">
                Inicia sesión o regístrate para continuar
              </p>

              <form onSubmit={handleRequestCode} className="flex flex-col gap-4">
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 pb-2 text-gray-900 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    placeholder=" "
                    required
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 top-4 text-gray-500 text-base transition-all peer-focus:text-xs peer-focus:top-2 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:top-2"
                  >
                    Correo electrónico
                  </label>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#1853db] hover:bg-blue-700 text-white font-semibold py-4 rounded-xl mt-2 transition-colors disabled:opacity-50"
                >
                  {loading ? "Cargando..." : "Continuar"}
                </button>
              </form>

              <div className="relative flex py-6 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">o</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button 
                type="button"
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 text-gray-900 font-semibold py-4 rounded-xl transition-colors mb-4"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar con Google
              </button>
            </motion.div>
          ) : step === "code" ? (
            <motion.div 
              key="code-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full flex flex-col items-center text-center"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Confirma que eres tú
              </h1>
              <p className="text-gray-500 mb-8 max-w-[250px]">
                Te enviamos un código a <span className="font-semibold text-gray-900">{email}</span>.
              </p>

              <form onSubmit={handleVerifyCode} className="flex flex-col gap-6 w-full items-center">
                <input 
                  type="text" 
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="w-full max-w-[280px] border border-gray-900 rounded-xl px-4 py-4 text-center text-2xl font-mono tracking-widest focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all"
                  placeholder="000000"
                  required
                  autoFocus
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button 
                  type="submit" 
                  disabled={loading || code.length < 6}
                  className="w-full bg-[#1853db] hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? "Verificando..." : "Verificar código"}
                </button>
              </form>

              <p className="mt-8 text-sm text-gray-500">
                ¿No lo recibiste? <button type="button" onClick={handleRequestCode} className="text-gray-900 font-bold underline">Enviar un nuevo código</button>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
