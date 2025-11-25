
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, CheckCircle, School, GraduationCap } from 'lucide-react';
import { getAllColegios, GRADOS } from '@/lib/colegios-db';

interface NombreInputProps {
  onComplete: (data: { nombre: string; colegioId: string; grado: string }) => void;
}

const NombreInput: React.FC<NombreInputProps> = ({ onComplete }) => {
  const [nombre, setNombre] = useState('');
  const [colegioId, setColegioId] = useState('');
  const [grado, setGrado] = useState('');
  const [colegios, setColegios] = useState<any[]>([]);
  const [isLoadingColegios, setIsLoadingColegios] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadColegios();
  }, []);

  const loadColegios = async () => {
    try {
      const data = await getAllColegios();
      setColegios(data);
    } catch (error) {
      console.error('Error cargando colegios:', error);
    } finally {
      setIsLoadingColegios(false);
    }
  };

  const handleSubmit = () => {
    if (nombre.trim().length < 3) {
      setError('Por favor ingresa tu nombre (mínimo 3 caracteres)');
      return;
    }
    
    if (!colegioId) {
      setError('Por favor selecciona tu colegio');
      return;
    }

    if (!grado) {
      setError('Por favor selecciona tu grado');
      return;
    }
    
    setError('');
    onComplete({ 
      nombre: nombre.trim(), 
      colegioId, 
      grado 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const isFormValid = nombre.trim().length >= 3 && colegioId && grado;

  return (
    <div className="min-h-screen flex items-center justify-center py-12" style={{ backgroundColor: '#FCFAF5' }}>
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* Icono principal */}
        <div className="mb-8">
          <User className="w-24 h-24 mx-auto" style={{ color: '#134E4A' }} />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-montserrat font-bold mb-6" style={{ color: '#134E4A' }}>
          📝 Antes de empezar…
        </h1>

        {/* Instrucción */}
        <p className="text-xl text-gray-700 font-lato mb-8 leading-relaxed">
          Cuéntanos un poco sobre ti para personalizar tu experiencia
        </p>

        {/* Card con el formulario */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg border-2 border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-6 text-left">
              {/* Nombre */}
              <div className="relative">
                <Label htmlFor="nombre" className="text-lg font-semibold mb-2 block" style={{ color: '#134E4A' }}>
                  <User className="w-5 h-5 inline mr-2" />
                  Tu nombre o apodo
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Ejemplo: Camila Ramos"
                  className="text-lg py-6 px-4 font-lato border-2 border-gray-300 focus:border-senda-primary rounded-xl"
                />
                {nombre.length >= 3 && (
                  <CheckCircle className="absolute right-4 top-12 w-6 h-6 text-green-500" />
                )}
              </div>

              {/* Colegio */}
              <div>
                <Label htmlFor="colegio" className="text-lg font-semibold mb-2 block" style={{ color: '#134E4A' }}>
                  <School className="w-5 h-5 inline mr-2" />
                  Tu colegio
                </Label>
                {isLoadingColegios ? (
                  <div className="text-gray-500">Cargando colegios...</div>
                ) : (
                  <select
                    id="colegio"
                    value={colegioId}
                    onChange={(e) => {
                      setColegioId(e.target.value);
                      if (error) setError('');
                    }}
                    className="w-full text-lg py-3 px-4 font-lato border-2 border-gray-300 focus:border-senda-primary rounded-xl bg-white"
                  >
                    <option value="">Selecciona tu colegio</option>
                    {colegios.map((colegio) => (
                      <option key={colegio.id} value={colegio.id}>
                        {colegio.nombre}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Grado */}
              <div>
                <Label htmlFor="grado" className="text-lg font-semibold mb-2 block" style={{ color: '#134E4A' }}>
                  <GraduationCap className="w-5 h-5 inline mr-2" />
                  Tu grado
                </Label>
                <select
                  id="grado"
                  value={grado}
                  onChange={(e) => {
                    setGrado(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full text-lg py-3 px-4 font-lato border-2 border-gray-300 focus:border-senda-primary rounded-xl bg-white"
                >
                  <option value="">Selecciona tu grado</option>
                  {GRADOS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 font-lato">{error}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botón de acción */}
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="text-xl font-montserrat font-bold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{ backgroundColor: '#134E4A' }}
        >
          ✅ Guardar y comenzar mi Test
        </Button>

        {/* Decoración */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="text-3xl">👤</div>
          <div className="text-3xl">🏫</div>
          <div className="text-3xl">📚</div>
          <div className="text-3xl">🚀</div>
        </div>
      </div>
    </div>
  );
};

export default NombreInput;
