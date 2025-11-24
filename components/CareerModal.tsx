
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Career } from '@/data/careers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AcademicProgressBar from './AcademicProgressBar';
import { 
  MapPin, DollarSign, GraduationCap, Bookmark, Share2, X, 
  Clock, Users, Home, Wifi, TrendingUp, Award, CheckCircle,
  Brain, Zap, Heart, Target, Calendar, Building2, Briefcase
} from 'lucide-react';

interface CareerModalProps {
  career: Career | null;
  isOpen: boolean;
  onClose: () => void;
}

const CareerModal: React.FC<CareerModalProps> = ({ career, isOpen, onClose }) => {
  const [readProgress, setReadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  if (!career) return null;

  // Career icons mapping (same as in CareerCard)
  const careerIcons: { [key: string]: string } = {
    "Medicina": "⚕️", "Odontología": "🦷", "Enfermería": "👩‍⚕️", "Farmacia y Bioquímica": "💊",
    "Ingeniería de Sistemas": "💻", "Ciencias de la Computación": "🔬", "Data Science": "📊", "Estadística": "📈",
    "Ingeniería Industrial": "⚙️", "Ingeniería Civil": "🏗️", "Ingeniería Eléctrica": "⚡", "Ingeniería Mecánica": "🔧",
    "Ingeniería de Minas": "⛏️", "Ingeniería Agroindustrial": "🌾", "Ingeniería Naval": "⛵", "Ingeniería de Telecomunicaciones": "📡",
    "Derecho": "⚖️", "Ciencias Políticas": "🏛️",
    "Marketing": "📢", "Administración": "💼", "Economía": "💰", "Economía y Finanzas": "📈",
    "Arquitectura": "🏛️", "Diseño Gráfico": "🎨"
  };

  const careerIcon = careerIcons[career.name] || "🎓";

  // Simulated lifestyle metrics (would be from career data in real app)
  const lifestyleMetrics = {
    workIntensity: 75,
    socialInteraction: 85,
    remoteWork: 60,
    travelFrequency: 40,
    workLifeBalance: 70
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Simulate progress tracking
    setReadProgress(prev => Math.min(prev + 25, 100));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0 bg-white rounded-3xl border-0 shadow-2xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <Progress value={readProgress} className="h-1 bg-gray-200 rounded-none" />
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-senda-primary via-senda-secondary to-blue-600 text-white p-6 rounded-t-3xl">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl backdrop-blur-sm border border-white/30">
                  {careerIcon}
                </div>
                <div>
                  <DialogTitle className="text-3xl sm:text-4xl font-montserrat font-bold mb-3 leading-tight">
                    {career.name}
                  </DialogTitle>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2">
                      {career.category}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-100 border-green-300/30 backdrop-blur-sm text-sm px-4 py-2">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Alta demanda
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full w-12 h-12">
                  <Bookmark className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full w-12 h-12">
                  <Share2 className="w-6 h-6" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full w-12 h-12" onClick={onClose}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-sm opacity-90">Salario Promedio</p>
                    <p className="font-bold text-xl">{career.salaryRange}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-sm opacity-90">Campo Principal</p>
                    <p className="font-bold text-sm">{career.workField.split(',')[0]}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-8 h-8 text-white" />
                  <div>
                    <p className="text-sm opacity-90">Universidades</p>
                    <p className="font-bold text-sm">{career.universities.length} disponibles</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-280px)] p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-2 h-auto">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:text-senda-primary rounded-xl font-montserrat font-bold py-3 px-4 text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <span className="mr-2 text-lg">🏁</span>
                <span className="hidden sm:inline">Vista General</span>
                <span className="sm:hidden">General</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lifestyle" 
                className="data-[state=active]:bg-white data-[state=active]:text-senda-primary rounded-xl font-montserrat font-bold py-3 px-4 text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <span className="mr-2 text-lg">🌐</span>
                <span className="hidden sm:inline">Estilo de Vida</span>
                <span className="sm:hidden">Vida</span>
              </TabsTrigger>
              <TabsTrigger 
                value="academic" 
                className="data-[state=active]:bg-white data-[state=active]:text-senda-primary rounded-xl font-montserrat font-bold py-3 px-4 text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <span className="mr-2 text-lg">🎓</span>
                <span className="hidden sm:inline">Formación</span>
                <span className="sm:hidden">Estudio</span>
              </TabsTrigger>
              <TabsTrigger 
                value="future" 
                className="data-[state=active]:bg-white data-[state=active]:text-senda-primary rounded-xl font-montserrat font-bold py-3 px-4 text-sm transition-all duration-300 data-[state=active]:shadow-lg"
              >
                <span className="mr-2 text-lg">📈</span>
                <span className="hidden sm:inline">Proyección</span>
                <span className="sm:hidden">Futuro</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Hero Description */}
              <Card className="bg-gradient-to-br from-senda-cream to-white border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-senda-primary mr-3" />
                    <h3 className="text-2xl font-montserrat font-bold text-senda-primary">¿Qué harás en esta carrera?</h3>
                  </div>
                  <p className="text-lg text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.activitiesAndSkills}
                  </p>
                </CardContent>
              </Card>

              {/* Impact & Purpose */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-2xl font-montserrat font-bold text-green-700">Tu impacto en el mundo</h3>
                  </div>
                  <p className="text-lg text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.purposeAndImpact}
                  </p>
                </CardContent>
              </Card>

              {/* Testimonial */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Users className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-2xl font-montserrat font-bold text-blue-700">Testimonio real</h3>
                  </div>
                  <blockquote className="text-xl italic text-gray-700 font-lato leading-relaxed relative">
                    <span className="text-6xl text-blue-200 absolute -top-4 -left-2">"</span>
                    <span className="relative z-10">{career.extendedInfo.testimony}</span>
                  </blockquote>
                  <div className="mt-6 flex items-center">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-2xl mr-4">
                      👤
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700">Profesional joven</p>
                      <p className="text-sm text-blue-600">{career.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lifestyle" className="space-y-8">
              {/* Lifestyle Metrics */}
              <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700 text-2xl">
                    <Zap className="mr-3 text-3xl" />
                    Estilo de vida profesional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Lifestyle Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Intensidad del trabajo</span>
                        <span className="text-sm text-gray-600">{lifestyleMetrics.workIntensity}%</span>
                      </div>
                      <Progress value={lifestyleMetrics.workIntensity} className="h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Interacción social</span>
                        <span className="text-sm text-gray-600">{lifestyleMetrics.socialInteraction}%</span>
                      </div>
                      <Progress value={lifestyleMetrics.socialInteraction} className="h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Trabajo remoto</span>
                        <span className="text-sm text-gray-600">{lifestyleMetrics.remoteWork}%</span>
                      </div>
                      <Progress value={lifestyleMetrics.remoteWork} className="h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Balance vida-trabajo</span>
                        <span className="text-sm text-gray-600">{lifestyleMetrics.workLifeBalance}%</span>
                      </div>
                      <Progress value={lifestyleMetrics.workLifeBalance} className="h-3" />
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-gray-700 font-lato leading-relaxed">
                      {career.extendedInfo.professionalLifestyle}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Real Roles */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
                  <CardTitle className="flex items-center text-orange-700 text-2xl">
                    <Briefcase className="mr-3 text-3xl" />
                    Roles y trabajos reales
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.realRolesExamples}
                  </p>
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
                  <CardTitle className="flex items-center text-orange-700 text-2xl">
                    <Award className="mr-3 text-3xl" />
                    Retos y habilidades clave
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.commonChallenges}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-8">
              {/* Educational Routes with Progress Bar */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
                  <CardTitle className="flex items-center text-blue-700 text-2xl">
                    <Calendar className="mr-3 text-3xl" />
                    Tu ruta de estudio
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed mb-6">
                    {career.extendedInfo.educationalRoutes}
                  </p>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <h4 className="font-bold text-blue-700 mb-4">Trayectoria típica:</h4>
                    
                    {/* Academic Progress Bar */}
                    <AcademicProgressBar 
                      academicTrajectory={career.extendedInfo.academicTrajectory}
                      className="mb-4"
                    />
                    
                    <p className="text-gray-700 font-lato leading-relaxed">
                      {career.extendedInfo.academicTrajectory}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Universities */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                  <CardTitle className="flex items-center text-green-700 text-2xl">
                    <Building2 className="mr-3 text-3xl" />
                    Dónde estudiar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {career.universities.map((uni, index) => (
                      <div 
                        key={index}
                        className="bg-white border border-green-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                            <GraduationCap className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm leading-tight">{uni}</p>
                            <p className="text-xs text-green-600 mt-1">Universidad</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="future" className="space-y-8">
              {/* Work and Salary */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
                  <CardTitle className="flex items-center text-green-700 text-2xl">
                    <TrendingUp className="mr-3 text-3xl" />
                    Campo laboral y salarios
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.workAndSalary}
                  </p>
                </CardContent>
              </Card>

              {/* Employability */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-cyan-100">
                  <CardTitle className="flex items-center text-blue-700 text-2xl">
                    <CheckCircle className="mr-3 text-3xl" />
                    Empleabilidad y futuro
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.employabilityProjection}
                  </p>
                </CardContent>
              </Card>

              {/* Similar Careers */}
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <CardTitle className="flex items-center text-purple-700 text-2xl">
                    <Brain className="mr-3 text-3xl" />
                    Carreras similares
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 font-lato leading-relaxed">
                    {career.extendedInfo.similarCareersComparison}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t-2 border-gray-100 p-6 rounded-b-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-senda-primary to-senda-secondary text-white text-sm px-4 py-2 rounded-full border-0">
                {career.category}
              </Badge>
              <div className="text-sm text-gray-600">
                Progreso de lectura: <span className="font-bold">{readProgress}%</span>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button 
                className="flex-1 sm:flex-none bg-gradient-to-r from-senda-primary to-senda-secondary hover:from-senda-secondary hover:to-senda-primary text-white font-montserrat font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => window.open('https://forms.gle/xZxFTL47B9oQGYnL7', '_blank')}
              >
                <Award className="w-5 h-5 mr-2" />
                Más Información
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 sm:flex-none border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-montserrat font-bold px-8 py-3 rounded-xl transition-all duration-300"
                onClick={onClose}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CareerModal;
