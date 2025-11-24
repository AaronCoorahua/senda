import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building2, Mail, Phone, Upload, Save, Users, Shield, BookOpen, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OrgSettings() {
  const { toast } = useToast();
  const [orgData, setOrgData] = useState({
    name: 'Colegio Demo',
    email: 'contacto@colegiodemo.edu.pe',
    phone: '+51 999 999 999',
    address: 'Av. Javier Prado 123, San Isidro, Lima',
    description: 'Institución educativa comprometida con la excelencia académica y el desarrollo integral de nuestros estudiantes',
  });

  const users = [
    { id: 1, name: 'Juan Rodríguez', role: 'Psicólogo', email: 'juan.rodriguez@colegio.edu' },
    { id: 2, name: 'María López', role: 'Tutora', email: 'maria.lopez@colegio.edu' },
    { id: 3, name: 'Carlos Mendoza', role: 'Coordinador', email: 'carlos.mendoza@colegio.edu' },
  ];

  const tutoringSuggestions = [
    {
      profile: 'Orientación STEM',
      students: 145,
      activities: ['Talleres de matemáticas avanzadas', 'Club de robótica', 'Olimpiadas de programación'],
    },
    {
      profile: 'Orientación Artística',
      students: 68,
      activities: ['Talleres de diseño', 'Club de teatro', 'Exposiciones de arte'],
    },
    {
      profile: 'Orientación Salud',
      students: 92,
      activities: ['Visitas a hospitales', 'Charlas con médicos', 'Primeros auxilios'],
    },
  ];

  const handleSave = () => {
    toast({
      title: 'Configuración guardada',
      description: 'Los cambios se han guardado exitosamente',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Configuración</h1>
        <p className="text-gray-600">Administra la información de tu institución</p>
      </div>

      {/* Institution Information */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Información del Colegio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Logo de la Institución</Label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-lg bg-[#134E4A] flex items-center justify-center text-white text-3xl font-bold">
                CD
              </div>
              <Button variant="outline" className="border-[#10B981] text-[#10B981] hover:bg-green-50">
                <Upload className="h-4 w-4 mr-2" />
                Subir Logo
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium mb-2 block">
                Nombre de la Institución
              </Label>
              <Input
                id="name"
                value={orgData.name}
                onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Institucional
              </Label>
              <Input
                id="email"
                type="email"
                value={orgData.email}
                onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                <Phone className="h-4 w-4 inline mr-2" />
                Teléfono
              </Label>
              <Input
                id="phone"
                value={orgData.phone}
                onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                className="border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="address" className="text-gray-700 font-medium mb-2 block">
                Dirección
              </Label>
              <Input
                id="address"
                value={orgData.address}
                onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                className="border-gray-300"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium mb-2 block">
              Descripción
            </Label>
            <Textarea
              id="description"
              rows={4}
              value={orgData.description}
              onChange={(e) => setOrgData({ ...orgData, description: e.target.value })}
              className="border-gray-300"
            />
          </div>

          <Button onClick={handleSave} className="bg-[#10B981] hover:bg-[#059669]">
            <Save className="h-4 w-4 mr-2" />
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-[#134E4A] flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Gestión de Usuarios
            </CardTitle>
            <Button className="bg-[#10B981] hover:bg-[#059669]">
              <Users className="h-4 w-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Administra los usuarios con acceso al panel institucional (psicólogos, tutores, coordinadores).
          </p>
          
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.role} • {user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tutoring Plans by Profile */}
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border-2 border-purple-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Planes de Tutoría Según Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-6">
            Sugerencias automáticas de actividades y programas según las orientaciones vocacionales detectadas:
          </p>
          <div className="space-y-4">
            {tutoringSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-900">{suggestion.profile}</h4>
                    <p className="text-sm text-gray-600">{suggestion.students} estudiantes identificados</p>
                  </div>
                  <Button size="sm" className="bg-[#10B981] hover:bg-[#059669]">
                    Asignar Plan
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Actividades sugeridas:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.activities.map((activity, actIdx) => (
                      <Badge key={actIdx} variant="outline" className="border-purple-300 text-purple-700">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-300">
            <p className="text-sm text-gray-900">
              💡 <strong>Consejo:</strong> Implementar estos programas puede aumentar la claridad vocacional 
              y el compromiso de los estudiantes con su futuro profesional.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A] flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Permisos y Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Configura los permisos de acceso y las políticas de privacidad para la institución.
          </p>
          <Button variant="outline" className="border-[#10B981] text-[#10B981] hover:bg-green-50">
            <Shield className="h-4 w-4 mr-2" />
            Configurar Permisos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
