
import React, { useState, useMemo } from 'react';
import { careers, categories, Career } from '@/data/careers';
import CareerCard from './CareerCard';
import CareerModal from './CareerModal';
import ComparisonBar from './ComparisonBar';
import ComparisonModal from './ComparisonModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Award, Users, TrendingUp, Clock } from 'lucide-react';

// Category configuration with gradients and modern styling
const categoryConfig = {
  "Todos": { 
    icon: "🔍", 
    gradient: "from-gray-100 to-gray-200",
    textColor: "text-gray-700",
    hoverGradient: "hover:from-gray-200 hover:to-gray-300"
  },
  "Salud": { 
    icon: "⚕️", 
    gradient: "from-red-100 to-pink-100",
    textColor: "text-red-700",
    hoverGradient: "hover:from-red-200 hover:to-pink-200"
  },
  "Tecnología": { 
    icon: "💻", 
    gradient: "from-blue-100 to-cyan-100",
    textColor: "text-blue-700",
    hoverGradient: "hover:from-blue-200 hover:to-cyan-200"
  },
  "Ingeniería": { 
    icon: "⚙️", 
    gradient: "from-green-100 to-emerald-100",
    textColor: "text-green-700",
    hoverGradient: "hover:from-green-200 hover:to-emerald-200"
  },
  "Ciencias Sociales": { 
    icon: "📚", 
    gradient: "from-purple-100 to-violet-100",
    textColor: "text-purple-700",
    hoverGradient: "hover:from-purple-200 hover:to-violet-200"
  },
  "Negocios y Economía": { 
    icon: "💼", 
    gradient: "from-yellow-100 to-orange-100",
    textColor: "text-yellow-700",
    hoverGradient: "hover:from-yellow-200 hover:to-orange-200"
  },
  "Arquitectura y Diseño": { 
    icon: "🖌️", 
    gradient: "from-pink-100 to-rose-100",
    textColor: "text-pink-700",
    hoverGradient: "hover:from-pink-200 hover:to-rose-200"
  }
};

const CareerExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exploredCareers, setExploredCareers] = useState<Set<string>>(new Set());
  
  // New state for career comparison
  const [selectedForComparison, setSelectedForComparison] = useState<Set<string>>(new Set());
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const filteredCareers = useMemo(() => {
    let filtered = careers;
    
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(career => career.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(career => 
        career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  const displayedCareers = showAll ? filteredCareers : filteredCareers.slice(0, 6);
  const progressPercentage = (exploredCareers.size / careers.length) * 100;

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
    setExploredCareers(prev => new Set(prev.add(career.id)));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  const handleComparisonToggle = (careerIds: string[]) => {
    setSelectedForComparison(new Set(careerIds));
  };

  const handleRemoveFromComparison = (careerId: string) => {
    const newSelection = new Set(selectedForComparison);
    newSelection.delete(careerId);
    setSelectedForComparison(newSelection);
  };

  const handleCompareClick = () => {
    setIsComparisonModalOpen(true);
  };

  const handleComparisonModalClose = () => {
    setIsComparisonModalOpen(false);
  };

  const getCategoryStats = () => {
    const totalCareers = careers.length;
    const avgSalary = "S/3,500 - S/8,000";
    const topUniversities = ["PUCP", "UNI", "UNMSM", "UP"];
    
    return { totalCareers, avgSalary, topUniversities };
  };

  const stats = getCategoryStats();
  const selectedCareersForComparison = careers.filter(career => 
    selectedForComparison.has(career.id)
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-senda-cream via-white to-blue-50 pb-24">
      {/* Hero Section with Stats */}
      <div className="mb-8 p-8 bg-gradient-to-r from-senda-primary via-senda-secondary to-blue-600 text-white rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-montserrat font-bold mb-4">
                🚀 Explora tu futuro
              </h1>
              <p className="text-xl text-white/90 font-lato mb-4">
                Descubre las {stats.totalCareers} carreras más demandadas en Perú
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.totalCareers}</div>
                <div className="text-sm opacity-90">Carreras</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm opacity-90">Universidades</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Award className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm opacity-90">Empleabilidad</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-90">Años</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="font-montserrat font-medium">Tu progreso de exploración</span>
              <span className="text-xs opacity-75">{exploredCareers.size} de {careers.length} carreras exploradas</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
            {exploredCareers.size > 0 && (
              <div className="mt-2 text-sm opacity-90">
                🎉 ¡Genial! Sigue explorando para descubrir más opciones
              </div>
            )}
          </div>

          {/* Journey Steps */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white text-senda-primary rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <div className="font-semibold">Explora carreras</div>
                <div className="opacity-75">Descubre opciones</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 opacity-60">
              <div className="w-10 h-10 bg-white/20 border-2 border-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <div className="font-semibold">Haz el test</div>
                <div className="opacity-75">Conoce tus fortalezas</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 opacity-60">
              <div className="w-10 h-10 bg-white/20 border-2 border-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <div className="font-semibold">Recomendaciones</div>
                <div className="opacity-75">Recibe tu perfil</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 opacity-60">
              <div className="w-10 h-10 bg-white/20 border-2 border-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <div className="font-semibold">Conecta</div>
                <div className="opacity-75">Habla con profesionales</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="🔍 Busca una carrera..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-senda-primary focus:outline-none bg-white shadow-lg transition-all duration-300"
          />
        </div>

        {/* Category Filters */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-senda-primary" />
            <h3 className="text-lg font-montserrat font-semibold text-senda-primary">
              Filtra por categoría
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const config = categoryConfig[category as keyof typeof categoryConfig];
              const isSelected = selectedCategory === category;
              return (
                <Badge
                  key={category}
                  className={`
                    px-6 py-3 text-sm font-montserrat font-semibold cursor-pointer transition-all duration-300 
                    border-0 rounded-2xl hover:scale-105 hover:shadow-xl transform
                    ${isSelected 
                      ? 'bg-gradient-to-r from-senda-primary to-senda-secondary text-white shadow-lg scale-105' 
                      : `bg-gradient-to-r ${config?.gradient} ${config?.textColor} ${config?.hoverGradient} shadow-md`
                    }
                  `}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="mr-3 text-lg">{config?.icon || "📚"}</span>
                  {category}
                  {isSelected && <span className="ml-2">✨</span>}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-6 py-3 shadow-lg border border-gray-100">
          <span className="text-2xl">🎯</span>
          <p className="text-senda-primary font-montserrat font-semibold">
            {filteredCareers.length === careers.length 
              ? `Explorando todas las ${filteredCareers.length} carreras disponibles` 
              : `${filteredCareers.length} carreras en ${selectedCategory}`
            }
          </p>
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {displayedCareers.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            onClick={() => handleCareerClick(career)}
            isExplored={exploredCareers.has(career.id)}
            isSelectedForComparison={selectedForComparison.has(career.id)}
            onComparisonToggle={(isSelected) => {
              const newSelection = new Set(selectedForComparison);
              if (isSelected && newSelection.size < 3) {
                newSelection.add(career.id);
              } else if (!isSelected) {
                newSelection.delete(career.id);
              }
              setSelectedForComparison(newSelection);
            }}
            comparisonDisabled={!selectedForComparison.has(career.id) && selectedForComparison.size >= 3}
          />
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredCareers.length > 6 && (
        <div className="text-center mb-8">
          <Button
            className="bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white px-8 py-4 rounded-2xl font-montserrat font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "🔼 Ver menos carreras" : `🔽 Ver todas las carreras (${filteredCareers.length})`}
            <span className="ml-2">✨</span>
          </Button>
        </div>
      )}

      {/* Comparison Bar */}
      {selectedForComparison.size > 0 && (
        <ComparisonBar
          selectedCareers={selectedCareersForComparison}
          onCompare={handleCompareClick}
          onRemove={handleRemoveFromComparison}
          compareEnabled={selectedForComparison.size >= 2}
        />
      )}

      {/* Career Modal */}
      <CareerModal
        career={selectedCareer}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        careers={selectedCareersForComparison}
        isOpen={isComparisonModalOpen}
        onClose={handleComparisonModalClose}
      />
    </div>
  );
};

export default CareerExplorer;
