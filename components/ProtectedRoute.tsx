"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "organization";
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          // No hay sesión, redirigir al login correspondiente
          if (requiredRole === "organization") {
            router.push("/org/login");
          } else {
            router.push("/login?redirect=" + pathname);
          }
          return;
        }

        // Verificar el rol si es necesario
        if (requiredRole) {
          const { data: userData, error: userError } = await supabase
            .from("usuarios")
            .select("tipo_usuario")
            .eq("id", session.user.id)
            .single();

          if (userError || !userData) {
            router.push("/login");
            return;
          }

          if (requiredRole === "organization" && userData.tipo_usuario !== "colegio") {
            router.push("/login");
            return;
          }

          if (requiredRole === "student" && userData.tipo_usuario === "colegio") {
            router.push("/org/login");
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Error checking auth:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        if (requiredRole === "organization") {
          router.push("/org/login");
        } else {
          router.push("/login");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname, requiredRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF5]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134E4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}