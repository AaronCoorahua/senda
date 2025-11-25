"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

function OrgLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Intentar login con Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.session) {
        // Verificar que el usuario sea tipo colegio
        const { data: userData, error: userError } = await supabase
          .from("usuarios")
          .select("tipo_usuario")
          .eq("id", data.session.user.id)
          .single();

        if (userError || !userData || userData.tipo_usuario !== "colegio") {
          await supabase.auth.signOut();
          setError("Esta cuenta no tiene permisos de colegio");
          setIsLoading(false);
          return;
        }

        // Redirigir al dashboard
        const redirect = searchParams.get("redirect") || "/org/dashboard";
        router.push(redirect);
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#134E4A] mb-4">
            <Compass className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Acceso para Colegios</h1>
          <p className="text-gray-600">Ingresa con tu cuenta institucional</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo institucional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="colegio@ejemplo.edu.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
                disabled={isLoading}
              />
            </div>

            {/* Remember me y forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Recordarme
                </label>
              </div>
              <a href="#" className="text-sm text-[#134E4A] hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-[#134E4A] hover:bg-[#0f3e3a] text-white font-semibold py-6"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Ingresar al Portal"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">¿No tienes cuenta?</span>
            </div>
          </div>

          {/* Link to contact */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Contacta con nuestro equipo para obtener acceso
            </p>
            <Button
              variant="outline"
              className="w-full border-[#134E4A] text-[#134E4A] hover:bg-[#134E4A] hover:text-white"
              onClick={() => window.open("mailto:soporte@senda.edu.pe", "_blank")}
            >
              Solicitar Acceso
            </Button>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-[#134E4A]"
            onClick={() => router.push("/")}
          >
            ← Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OrgLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <OrgLoginContent />
    </Suspense>
  );
}
