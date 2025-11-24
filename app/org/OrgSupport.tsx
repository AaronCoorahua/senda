import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare, BookOpen, HelpCircle } from 'lucide-react';

export default function OrgSupport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Soporte y Ayuda</h1>
        <p className="text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card className="bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-[#134E4A] flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Enviar Mensaje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-gray-700 font-medium mb-2 block">
                Asunto
              </Label>
              <Input id="subject" placeholder="¿En qué podemos ayudarte?" />
            </div>

            <div>
              <Label htmlFor="message" className="text-gray-700 font-medium mb-2 block">
                Mensaje
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder="Describe tu consulta o problema..."
              />
            </div>

            <Button className="w-full bg-[#10B981] hover:bg-[#059669]">
              <Mail className="h-4 w-4 mr-2" />
              Enviar Mensaje
            </Button>
          </CardContent>
        </Card>

        {/* Quick Help */}
        <div className="space-y-6">
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-[#134E4A] flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Preguntas Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ¿Cómo restablecer contraseña?
                </h4>
                <p className="text-sm text-gray-600">
                  Ve a la página de inicio de sesión y haz clic en "¿Olvidaste tu contraseña?". 
                  Ingresa tu correo institucional y recibirás un enlace para restablecer tu contraseña.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ¿Cómo exportar reportes?
                </h4>
                <p className="text-sm text-gray-600">
                  En la sección "Reportes", encontrarás el botón "Descargar Consolidado" que te permite 
                  exportar todos los datos en formato Excel o PDF con el logo de tu institución.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ¿Cómo agrego nuevos estudiantes?
                </h4>
                <p className="text-sm text-gray-600">
                  Ve a la sección "Estudiantes" y usa el botón "Agregar Estudiante". Completa el formulario 
                  con los datos del estudiante y este recibirá un correo con su acceso al test.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ¿Puedo personalizar los reportes?
                </h4>
                <p className="text-sm text-gray-600">
                  Sí, en "Configuración" puedes subir el logo de tu institución que aparecerá en todos 
                  los reportes y documentos PDF generados desde la plataforma.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 shadow-md">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-[#134E4A] mb-2">
                Documentación Completa
              </h3>
              <p className="text-gray-700 mb-4">
                Consulta nuestra guía completa para aprovechar al máximo la plataforma Senda.
              </p>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Ver Documentación
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 shadow-md">
            <CardContent className="p-6">
              <Phone className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-[#134E4A] mb-2">
                Contacto Directo
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="font-medium">soporte@senda.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="font-medium">+51 999 999 999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⏰</span>
                  <span className="font-medium">Lun - Vie: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm">
                    Tiempo promedio de respuesta: <strong>24 horas</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
