"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [modo, setModo] = useState<"login" | "signup">("login");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/test-vocacional";

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      if (modo === "signup") {
        const { error } = await supabase.auth.signUp({ email, password: pwd });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
        if (error) throw error;
      }
      router.push(next);
    } catch (e: any) {
      setError(e?.message ?? "Error de autenticación");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f7f7f7',padding:16}}>
      <form onSubmit={enviar} style={{background:'#fff',padding:24,borderRadius:12,width:360,boxShadow:'0 10px 30px rgba(0,0,0,.07)'}}>
        <h2 style={{marginBottom:12,fontWeight:700}}>Acceso</h2>

        <label style={{fontSize:12}}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:8,margin:'6px 0 12px'}}
        />

        <label style={{fontSize:12}}>Contraseña</label>
        <input
          type="password"
          value={pwd}
          onChange={(e)=>setPwd(e.target.value)}
          required
          style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:8,margin:'6px 0 16px'}}
        />

        {error && <div style={{color:'#b91c1c',fontSize:13,marginBottom:8}}>{error}</div>}

        <button
          type="submit"
          disabled={cargando}
          style={{width:'100%',padding:10,borderRadius:8,background:'#134E4A',color:'#fff',fontWeight:600}}
        >
          {cargando ? "Procesando..." : (modo === "login" ? "Entrar" : "Crear cuenta")}
        </button>

        <button
          type="button"
          onClick={()=>setModo(modo === "login" ? "signup" : "login")}
          style={{marginTop:10,width:'100%',padding:8,background:'transparent',border:'none',textDecoration:'underline',color:'#555',cursor:'pointer'}}
        >
          {modo === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </form>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div>Cargando...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
