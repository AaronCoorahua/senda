import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Palette, Lightbulb, Monitor, Users, Megaphone, Beaker, Leaf, Heart } from 'lucide-react';

interface InteractiveChallengeProps {
  profileId: string;
  onResponseChange: (response: any) => void;
}

const InteractiveChallenge: React.FC<InteractiveChallengeProps> = ({ profileId, onResponseChange }) => {
  const [responses, setResponses] = useState<any>({});

  const updateResponse = (key: string, value: any) => {
    const newResponses = { ...responses, [key]: value };
    setResponses(newResponses);
    onResponseChange(newResponses);
  };

  const renderExploradorCreativo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          🎯 Elige tu causa
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Medio ambiente', 'Salud mental', 'Educación', 'Igualdad'].map((causa) => (
            <Button
              key={causa}
              variant={responses.causa === causa ? 'default' : 'outline'}
              onClick={() => updateResponse('causa', causa)}
              className="h-12"
            >
              {causa}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          🎨 Selecciona 2 colores representativos
        </label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Verde', color: 'bg-green-500' },
            { name: 'Azul', color: 'bg-blue-500' },
            { name: 'Rojo', color: 'bg-red-500' },
            { name: 'Amarillo', color: 'bg-yellow-500' },
            { name: 'Púrpura', color: 'bg-purple-500' },
            { name: 'Naranja', color: 'bg-orange-500' },
            { name: 'Rosa', color: 'bg-pink-500' },
            { name: 'Turquesa', color: 'bg-teal-500' }
          ].map((color) => (
            <Button
              key={color.name}
              variant={responses.colores?.includes(color.name) ? 'default' : 'outline'}
              onClick={() => {
                const currentColors = responses.colores || [];
                if (currentColors.includes(color.name)) {
                  updateResponse('colores', currentColors.filter((c: string) => c !== color.name));
                } else if (currentColors.length < 2) {
                  updateResponse('colores', [...currentColors, color.name]);
                }
              }}
              className={`h-12 ${color.color} ${responses.colores?.includes(color.name) ? 'ring-2 ring-offset-2 ring-gray-800' : ''}`}
            >
              {color.name}
            </Button>
          ))}
        </div>
        {responses.colores && (
          <p className="text-sm text-gray-600 mt-2">
            {responses.colores.length}/2 colores seleccionados
          </p>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          📍 Canal de difusión
        </label>
        <Select onValueChange={(value: string) => updateResponse('canal', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="redes">Redes sociales</SelectItem>
            <SelectItem value="afiches">Afiches en el colegio</SelectItem>
            <SelectItem value="mural">Mural colaborativo</SelectItem>
            <SelectItem value="video">Video promocional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          💬 Mensaje principal (máx. 100 caracteres)
        </label>
        <Input
          placeholder="Escribe tu mensaje principal..."
          maxLength={100}
          onChange={(e) => updateResponse('mensaje', e.target.value)}
          className="text-lg"
        />
        <p className="text-sm text-gray-600 mt-1">
          {responses.mensaje?.length || 0}/100 caracteres
        </p>
      </div>
    </div>
  );

  const renderAnalistaEstrategico = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-3 text-blue-700">
          📊 Datos escolares disponibles
        </label>
        <div className="space-y-3">
          {['Asistencia', 'Rendimiento académico', 'Uso de biblioteca', 'Participación en talleres'].map((dato) => (
            <div key={dato} className="flex items-center space-x-2">
              <Checkbox
                id={dato}
                checked={responses.datos?.includes(dato)}
                onCheckedChange={(checked: boolean) => {
                  const currentDatos = responses.datos || [];
                  if (checked) {
                    updateResponse('datos', [...currentDatos, dato]);
                  } else {
                    updateResponse('datos', currentDatos.filter((d: string) => d !== dato));
                  }
                }}
              />
              <label htmlFor={dato} className="text-sm font-medium">
                {dato}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-blue-700">
          🧮 Completa tu hipótesis
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">Si</span>
            <Input
              placeholder="causa o variable..."
              onChange={(e) => updateResponse('hipotesis_si', e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">entonces</span>
            <Input
              placeholder="efecto esperado..."
              onChange={(e) => updateResponse('hipotesis_entonces', e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-blue-700">
          🔍 ¿Cómo validarías tu hipótesis?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {['Observación directa', 'Encuesta a estudiantes', 'Entrevistas', 'Análisis de registros'].map((metodo) => (
            <Button
              key={metodo}
              variant={responses.validacion === metodo ? 'default' : 'outline'}
              onClick={() => updateResponse('validacion', metodo)}
            >
              {metodo}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCreadorTecnologico = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-3 text-indigo-700">
          👥 Público objetivo
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Primaria', 'Secundaria', 'Preuniversitarios'].map((publico) => (
            <Button
              key={publico}
              variant={responses.publico === publico ? 'default' : 'outline'}
              onClick={() => updateResponse('publico', publico)}
            >
              {publico}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-indigo-700">
          🧩 Funcionalidades (selecciona hasta 4)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Juegos educativos', icon: '🎮' },
            { name: 'Videos explicativos', icon: '📹' },
            { name: 'Tests y quizzes', icon: '📝' },
            { name: 'Recordatorios', icon: '⏰' },
            { name: 'Chat grupal', icon: '💬' },
            { name: 'Progreso visual', icon: '📊' }
          ].map((func) => (
            <Button
              key={func.name}
              variant={responses.funcionalidades?.includes(func.name) ? 'default' : 'outline'}
              onClick={() => {
                const current = responses.funcionalidades || [];
                if (current.includes(func.name)) {
                  updateResponse('funcionalidades', current.filter((f: string) => f !== func.name));
                } else if (current.length < 4) {
                  updateResponse('funcionalidades', [...current, func.name]);
                }
              }}
              className="h-16 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">{func.icon}</span>
              <span className="text-xs">{func.name}</span>
            </Button>
          ))}
        </div>
        {responses.funcionalidades && (
          <p className="text-sm text-gray-600 mt-2">
            {responses.funcionalidades.length}/4 funcionalidades seleccionadas
          </p>
        )}
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-indigo-700">
          📱 Nombre de tu app (opcional)
        </label>
        <Input
          placeholder="Ej: EduMaster, AprendeYa..."
          onChange={(e) => updateResponse('nombreApp', e.target.value)}
          className="text-lg"
        />
      </div>
    </div>
  );

  const renderComunicadorVisionario = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          🎬 Formato del mensaje
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Reel', icon: '📱' },
            { name: 'Podcast', icon: '🎙️' },
            { name: 'Póster', icon: '🖼️' },
            { name: 'Charla breve', icon: '🎤' }
          ].map((formato) => (
            <Button
              key={formato.name}
              variant={responses.formato === formato.name ? 'default' : 'outline'}
              onClick={() => updateResponse('formato', formato.name)}
              className="h-16 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">{formato.icon}</span>
              <span>{formato.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          🎭 Tono del mensaje
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Inspirador', 'Crítico', 'Humorístico'].map((tono) => (
            <Button
              key={tono}
              variant={responses.tono === tono ? 'default' : 'outline'}
              onClick={() => updateResponse('tono', tono)}
            >
              {tono}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          🎯 Tema central
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['Igualdad', 'Diversidad', 'Educación', 'Medio ambiente'].map((tema) => (
            <Button
              key={tema}
              variant={responses.tema === tema ? 'default' : 'outline'}
              onClick={() => updateResponse('tema', tema)}
            >
              {tema}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-purple-700">
          💫 Frase de cierre
        </label>
        <Select onValueChange={(value: string) => updateResponse('fraseCierre', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Elige una frase inspiradora" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cambio">El cambio empieza contigo</SelectItem>
            <SelectItem value="voz">Tu voz importa, hazla escuchar</SelectItem>
            <SelectItem value="futuro">El futuro se construye hoy</SelectItem>
            <SelectItem value="unidos">Juntos somos más fuertes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderInvestigadorCurioso = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold mb-3 text-teal-700">
          🔬 Área de investigación
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Biología', icon: '🧬' },
            { name: 'Química', icon: '⚗️' },
            { name: 'Psicología', icon: '🧠' },
            { name: 'Física', icon: '⚛️' }
          ].map((area) => (
            <Button
              key={area.name}
              variant={responses.area === area.name ? 'default' : 'outline'}
              onClick={() => updateResponse('area', area.name)}
              className="h-16 flex flex-col items-center justify-center"
            >
              <span className="text-2xl mb-1">{area.icon}</span>
              <span>{area.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-teal-700">
          🧪 Materiales disponibles
        </label>
        <div className="space-y-2">
          {['Microscopio', 'Balanza', 'Termómetro', 'Cronómetro', 'Encuestas', 'Computadora'].map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={responses.materiales?.includes(material)}
                onCheckedChange={(checked: boolean) => {
                  const current = responses.materiales || [];
                  if (checked) {
                    updateResponse('materiales', [...current, material]);
                  } else {
                    updateResponse('materiales', current.filter((m: string) => m !== material));
                  }
                }}
              />
              <label htmlFor={material} className="text-sm font-medium">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-teal-700">
          📊 Tipo de resultado esperado
        </label>
        <div className="space-y-2">
          {['Numérico', 'Cualitativo', 'Observación visual'].map((tipo) => (
            <div key={tipo} className="flex items-center space-x-2">
              <input
                type="radio"
                id={tipo}
                name="tipoResultado"
                checked={responses.tipoResultado === tipo}
                onChange={() => updateResponse('tipoResultado', tipo)}
              />
              <label htmlFor={tipo} className="text-sm font-medium">
                {tipo}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-teal-700">
          🏷️ Nombre del experimento (opcional)
        </label>
        <Input
          placeholder="Ej: Efecto de la música en plantas..."
          onChange={(e) => updateResponse('nombreExperimento', e.target.value)}
          className="text-lg"
        />
      </div>
    </div>
  );

  const challengeComponents = {
    'explorador-creativo': renderExploradorCreativo,
    'analista-estratégico': renderAnalistaEstrategico,
    'creador-tecnológico': renderCreadorTecnologico,
    'comunicador-visionario': renderComunicadorVisionario,
    'investigador-curioso': renderInvestigadorCurioso,
    'guía-humanista': renderComunicadorVisionario, // Similar format
    'líder-emprendedor': renderCreadorTecnologico, // Similar format
    'protector-entorno': renderExploradorCreativo // Similar format
  };

  const renderChallenge = challengeComponents[profileId as keyof typeof challengeComponents] || renderExploradorCreativo;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-8">
        {renderChallenge()}
      </CardContent>
    </Card>
  );
};

export default InteractiveChallenge;
