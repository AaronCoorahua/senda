
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Career } from '@/data/careers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, DollarSign, GraduationCap, Star, Sparkles, Scale } from 'lucide-react';

interface CareerCardProps {
  career: Career;
  onClick: () => void;
  isExplored?: boolean;
  isSelectedForComparison?: boolean;
  onComparisonToggle?: (isSelected: boolean) => void;
  comparisonDisabled?: boolean;
}

// Career icons mapping
const careerIcons: { [key: string]: string } = {
  // Salud
  "Medicina": "⚕️",
  "Odontología": "🦷",
  "Enfermería": "👩‍⚕️",
  "Farmacia y Bioquímica": "💊",
  
  // Tecnología
  "Ingeniería de Sistemas": "💻",
  "Ciencias de la Computación": "🔬",
  "Data Science": "📊",
  "Estadística": "📈",
  
  // Ingeniería
  "Ingeniería Industrial": "⚙️",
  "Ingeniería Civil": "🏗️",
  "Ingeniería Eléctrica": "⚡",
  "Ingeniería Mecánica": "🔧",
  "Ingeniería de Minas": "⛏️",
  "Ingeniería Agroindustrial": "🌾",
  "Ingeniería Naval": "⛵",
  "Ingeniería de Telecomunicaciones": "📡",
  
  // Ciencias Sociales
  "Derecho": "⚖️",
  "Ciencias Políticas": "🏛️",
  "Psicología": "🧠",
  
  // Negocios y Economía
  "Marketing": "📢",
  "Administración": "💼",
  "Economía": "💰",
  "Economía y Finanzas": "📈",
  
  // Arquitectura y Diseño
  "Arquitectura": "🏛️",
  "Diseño Gráfico": "🎨"
};

// Category gradients
const categoryGradients: { [key: string]: string } = {
  "Salud": "from-red-100 via-pink-50 to-rose-100",
  "Tecnología": "from-blue-100 via-cyan-50 to-indigo-100",
  "Ingeniería": "from-green-100 via-emerald-50 to-teal-100",
  "Ciencias Sociales": "from-purple-100 via-violet-50 to-purple-100",
  "Negocios y Economía": "from-yellow-100 via-amber-50 to-orange-100",
  "Arquitectura y Diseño": "from-pink-100 via-rose-50 to-pink-100"
};

const CareerCard: React.FC<CareerCardProps> = ({ 
  career, 
  onClick, 
  isExplored = false,
  isSelectedForComparison = false,
  onComparisonToggle,
  comparisonDisabled = false
}) => {
  const careerIcon = careerIcons[career.name] || "🎓";
  const categoryGradient = categoryGradients[career.category] || "from-gray-100 to-gray-200";
  const topUniversities = career.universities.slice(0, 2);

  const handleComparisonChange = (checked: boolean) => {
    if (onComparisonToggle) {
      onComparisonToggle(checked);
    }
  };

  return (
    <Card 
      className={`
        group relative overflow-hidden cursor-pointer transition-all duration-500 transform
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-senda-primary/20
        ${isExplored ? 'ring-2 ring-senda-secondary ring-offset-2' : ''}
        ${isSelectedForComparison ? 'ring-2 ring-senda-primary ring-offset-2' : ''}
        bg-white border-0 shadow-lg rounded-3xl h-full
      `}
      onClick={onClick}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryGradient} opacity-50`}></div>
      
      {/* Comparison Checkbox */}
      <div className="absolute top-4 left-4 z-20">
        <div 
          className={`
            flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-md
            ${comparisonDisabled ? 'opacity-50' : 'hover:bg-white'}
            transition-all duration-200
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelectedForComparison}
            onCheckedChange={handleComparisonChange}
            disabled={comparisonDisabled}
            className="data-[state=checked]:bg-senda-primary data-[state=checked]:border-senda-primary"
          />
          <Scale className="w-3 h-3 text-senda-primary" />
          <span className="text-xs font-medium text-senda-primary">Comparar</span>
        </div>
      </div>
      
      {/* Explored Badge */}
      {isExplored && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-senda-secondary text-white border-0 rounded-full px-3 py-1 text-xs font-bold">
            <Star className="w-3 h-3 mr-1" />
            Explorada
          </Badge>
        </div>
      )}

      <CardContent className="relative z-10 p-6 h-full flex flex-col">
        {/* Header with Large Icon */}
        <div className="text-center mb-6 mt-8">
          <div className="w-20 h-20 bg-gradient-to-br from-senda-primary to-senda-secondary rounded-2xl flex items-center justify-center text-4xl shadow-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
            {careerIcon}
          </div>
          <h3 className="text-xl font-montserrat font-bold text-senda-primary leading-tight mb-2">
            {career.name}
          </h3>
          <Badge className="bg-white/80 backdrop-blur-sm text-senda-primary text-xs px-3 py-1 rounded-full border border-senda-primary/20">
            {career.category}
          </Badge>
        </div>

        {/* Pitch Line */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/50">
          <p className="text-gray-700 font-lato text-sm leading-relaxed text-center italic">
            "{career.description}"
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="space-y-3 mb-6 flex-grow">
          {/* Salary */}
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 font-medium">Salario promedio</div>
              <div className="text-sm font-bold text-gray-800">{career.salaryRange}</div>
            </div>
          </div>
          
          {/* Work Field - Truncated */}
          <div className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-0.5">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 font-medium">Campo laboral</div>
              <div className="text-sm text-gray-800 line-clamp-2">
                {career.workField.length > 60 
                  ? `${career.workField.substring(0, 60)}...` 
                  : career.workField
                }
              </div>
            </div>
          </div>
          
          {/* Top Universities */}
          <div className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-0.5">
              <GraduationCap className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-600 font-medium">Universidades top</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {topUniversities.map((uni, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs px-2 py-0.5 border-purple-200 text-purple-700 bg-purple-50"
                  >
                    {uni.length > 15 ? `${uni.substring(0, 15)}...` : uni}
                  </Badge>
                ))}
                {career.universities.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 border-gray-300 text-gray-500 bg-gray-50"
                  >
                    +{career.universities.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white font-montserrat font-bold py-4 rounded-2xl transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <Search className="w-5 h-5 mr-2" />
          Explorar carrera
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CareerCard;
