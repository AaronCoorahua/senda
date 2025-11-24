import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Compass } from "lucide-react";

export default function OrgLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirigir directamente al dashboard sin validación
    navigate("/org/dashboard");
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
              />
            </div>

            {/* Contraseña */}
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
              />
            </div>

            {/* Recordarme */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Recordarme
              </label>
            </div>

            {/* Botón de iniciar sesión */}
            <Button
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-semibold py-6 rounded-xl transition-colors"
            >
              Iniciar sesión
            </Button>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6 text-center space-y-2">
            <a
              href="#"
              className="text-sm text-[#10B981] hover:text-[#059669] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
            <p className="text-sm text-gray-600">
              ¿Tu colegio no tiene cuenta?{" "}
              <a
                href="#"
                className="text-[#10B981] hover:text-[#059669] font-medium transition-colors"
              >
                Contáctanos
              </a>
            </p>
          </div>
        </div>

        {/* Link para estudiantes */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿Eres estudiante?{" "}
            <a
              href="/"
              className="text-[#10B981] hover:text-[#059669] font-medium transition-colors"
            >
              Ir a la página de estudiantes
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
