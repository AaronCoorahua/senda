
import React from 'react';
import { Career } from '@/data/careers';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, 
  DollarSign, 
  MapPin, 
  GraduationCap, 
  Clock, 
  Heart, 
  Target,
  Users,
  TrendingUp,
  Award,
  Briefcase
} from 'lucide-react';

interface ComparisonModalProps {
  careers: Career[];
  isOpen: boolean;
  onClose: () => void;
}

// Career icons mapping
const careerIcons: { [key: string]: string } = {
  "Medicina": "⚕️",
  "Odontología": "🦷",
  "Enfermería": "👩‍⚕️",
  "Farmacia y Bioquímica": "💊",
  "Ingeniería de Sistemas": "💻",
  "Ciencias de la Computación": "🔬",
  "Data Science": "📊",
  "Estadística": "📈",
  "Ingeniería Industrial": "⚙️",
  "Ingeniería Civil": "🏗️",
  "Ingeniería Eléctrica": "⚡",
  "Ingeniería Mecánica": "🔧",
  "Ingeniería de Minas": "⛏️",
  "Ingeniería Agroindustrial": "🌾",
  "Ingeniería Naval": "⛵",
  "Ingeniería de Telecomunicaciones": "📡",
  "Derecho": "⚖️",
  "Ciencias Políticas": "🏛️",
  "Psicología": "🧠",
  "Marketing": "📢",
  "Administración": "💼",
  "Economía": "💰",
  "Economía y Finanzas": "📈",
  "Arquitectura": "🏛️",
  "Diseño Gráfico": "🎨"
};

// Category colors
const categoryColors: { [key: string]: string } = {
  "Salud": "bg-red-100 text-red-700 border-red-200",
  "Tecnología": "bg-blue-100 text-blue-700 border-blue-200",
  "Ingeniería": "bg-green-100 text-green-700 border-green-200",
  "Ciencias Sociales": "bg-purple-100 text-purple-700 border-purple-200",
  "Negocios y Economía": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Arquitectura y Diseño": "bg-pink-100 text-pink-700 border-pink-200"
};

const ComparisonModal: React.FC<ComparisonModalProps> = ({
  careers,
  isOpen,
  onClose
}) => {
  // Helper function to extract salary range for comparison
  const getSalaryValue = (salaryRange: string): number => {
    const match = salaryRange.match(/S\/(\d+(?:,\d+)*)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ''));
    }
    return 0;
  };

  // Helper function to get star rating component
  const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(maxRating)].map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${
              i < rating ? 'bg-yellow-400' : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">{rating}/{maxRating}</span>
      </div>
    );
  };

  // Helper function to get progress bar component
  const ProgressBar: React.FC<{ value: number; max?: number; color?: string }> = ({ 
    value, 
    max = 100, 
    color = "bg-senda-primary" 
  }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  // Early return if no careers to avoid reduce errors
  if (!careers || careers.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3 text-2xl font-montserrat font-bold text-senda-primary">
              <Scale className="w-8 h-8" />
              <span>Comparación de Carreras</span>
            </DialogTitle>
          </DialogHeader>
          <div className="p-8 text-center">
            <p className="text-lg text-gray-600">No hay carreras seleccionadas para comparar.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-2xl font-montserrat font-bold text-senda-primary">
            <Scale className="w-8 h-8" />
            <span>Comparación de Carreras</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {careers.map((career, index) => {
            const careerIcon = careerIcons[career.name] || "🎓";
            const categoryColor = categoryColors[career.category] || "bg-gray-100 text-gray-700 border-gray-200";
            const salaryValue = getSalaryValue(career.salaryRange);

            return (
              <div 
                key={career.id} 
                className={`
                  bg-white rounded-3xl border-2 shadow-lg hover:shadow-xl transition-all duration-300
                  ${index === 0 ? 'border-senda-primary' : index === 1 ? 'border-senda-secondary' : 'border-gray-300'}
                `}
              >
                {/* Header */}
                <div className={`
                  p-6 rounded-t-3xl text-center
                  ${index === 0 ? 'bg-gradient-to-br from-senda-primary/10 to-senda-primary/5' : 
                    index === 1 ? 'bg-gradient-to-br from-senda-secondary/10 to-senda-secondary/5' : 
                    'bg-gradient-to-br from-gray-100 to-gray-50'}
                `}>
                  <div className="w-16 h-16 bg-gradient-to-br from-senda-primary to-senda-secondary rounded-2xl flex items-center justify-center text-3xl shadow-lg mx-auto mb-4">
                    {careerIcon}
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-senda-primary mb-2">
                    {career.name}
                  </h3>
                  <Badge className={`${categoryColor} rounded-full px-3 py-1 text-xs font-semibold border`}>
                    {career.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-red-500" />
                      Descripción
                    </h4>
                    <p className="text-sm text-gray-600 italic">"{career.description}"</p>
                  </div>

                  {/* Salary with visual comparison */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                      Salario Promedio
                    </h4>
                    <p className="text-sm font-bold text-green-600 mb-2">{career.salaryRange}</p>
                    <ProgressBar 
                      value={salaryValue} 
                      max={15000} 
                      color="bg-gradient-to-r from-green-400 to-green-600" 
                    />
                  </div>

                  {/* Work Field */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      Campo Laboral
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">{career.workField}</p>
                  </div>

                  {/* Top Universities */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-purple-500" />
                      Universidades Top
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {career.universities.slice(0, 3).map((uni, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs px-2 py-1 border-purple-200 text-purple-700 bg-purple-50">
                          {uni.length > 12 ? `${uni.substring(0, 12)}...` : uni}
                        </Badge>
                      ))}
                      {career.universities.length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300 text-gray-500">
                          +{career.universities.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Duration - using a default since it doesn't exist in the current Career type */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      Duración
                    </h4>
                    <p className="text-sm text-gray-600">5 años promedio</p>
                  </div>

                  {/* Professional Lifestyle - treating as string since that's what it is in the current type */}
                  {career.extendedInfo?.professionalLifestyle && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-indigo-500" />
                        Estilo de Vida
                      </h4>
                      <p className="text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-300">
                        {career.extendedInfo.professionalLifestyle}
                      </p>
                    </div>
                  )}

                  {/* Purpose - treating as string since that's what it is in the current type */}
                  {career.extendedInfo?.purposeAndImpact && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-red-500" />
                        Propósito
                      </h4>
                      <p className="text-sm text-gray-600 italic bg-red-50 p-3 rounded-lg border-l-4 border-red-300">
                        "{career.extendedInfo.purposeAndImpact}"
                      </p>
                    </div>
                  )}

                  {/* Employability Score */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      Empleabilidad
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-green-600">Alta demanda</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-senda-cream to-blue-50 rounded-2xl border border-senda-primary/20">
          <h3 className="text-lg font-montserrat font-bold text-senda-primary mb-4 flex items-center">
            <Scale className="w-5 h-5 mr-2" />
            Resumen de Comparación
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {/* Highest Salary */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-green-600 mb-2">💰 Mayor Salario</h4>
              <p className="text-gray-700">
                {careers.length > 0 
                  ? careers.reduce((prev, current) => 
                      getSalaryValue(prev.salaryRange) > getSalaryValue(current.salaryRange) ? prev : current
                    ).name
                  : "N/A"
                }
              </p>
            </div>
            
            {/* Most Universities */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-purple-600 mb-2">🎓 Más Opciones</h4>
              <p className="text-gray-700">
                {careers.length > 0 
                  ? careers.reduce((prev, current) => 
                      prev.universities.length > current.universities.length ? prev : current
                    ).name
                  : "N/A"
                }
              </p>
            </div>

            {/* Most Popular Category */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold text-blue-600 mb-2">🔥 Más Popular</h4>
              <p className="text-gray-700">
                {careers.length > 0 ? careers[0].name : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparisonModal;
