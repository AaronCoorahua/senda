
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, CheckCircle } from 'lucide-react';

interface NombreInputProps {
  onComplete: (nombre: string) => void;
}

const NombreInput: React.FC<NombreInputProps> = ({ onComplete }) => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (nombre.trim().length < 3) {
      setError('Necesitamos un nombre para poder iniciar tu test vocacional 😊');
      return;
    }
    
    setError('');
    onComplete(nombre.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FCFAF5' }}>
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
          Queremos personalizar tu experiencia. Por favor, escribe tu nombre o un apodo con el que quieras aparecer en tu Dashboard y Ranking final.
          <br />
          <span className="text-gray-600 text-lg mt-2 block">
            Este nombre será visible solo dentro de la plataforma.
          </span>
        </p>

        {/* Card con el formulario */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg border-2 border-gray-200">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Ejemplo: Camila_Ramos"
                  className="text-lg py-6 px-4 text-center font-lato border-2 border-gray-300 focus:border-senda-primary rounded-xl"
                  style={{ fontSize: '18px' }}
                />
                {nombre.length >= 3 && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-green-500" />
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 font-lato">{error}</p>
                </div>
              )}

              <div className="text-sm text-gray-500 font-lato">
                Mínimo 3 caracteres
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botón de acción */}
        <Button
          onClick={handleSubmit}
          disabled={nombre.trim().length < 3}
          className="text-xl font-montserrat font-bold px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          style={{ backgroundColor: '#134E4A' }}
        >
          ✅ Guardar y comenzar mi Test
        </Button>

        {/* Decoración */}
        <div className="mt-12 flex justify-center space-x-8 opacity-30">
          <div className="text-3xl">👤</div>
          <div className="text-3xl">📝</div>
          <div className="text-3xl">🚀</div>
        </div>
      </div>
    </div>
  );
};

export default NombreInput;
