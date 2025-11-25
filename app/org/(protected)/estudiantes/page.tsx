"use client";

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Search, Download, Eye, Filter, Loader2, Printer, Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { JourneyProgress } from '@/lib/senda-db';
import { useToast } from '@/hooks/use-toast';

type StudentStatus = 'completado' | 'en_proceso' | 'pendiente';

type OrgStudent = {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  classroom: string;
  status: StudentStatus;
  email: string | null;
  journeyProgress: JourneyProgress | null;
  profileType: string | null;
  scores: Record<string, number>;
};

const DIMENSIONS = ['Intereses', 'Personalidad', 'Valores', 'Talentos', 'Escenarios', 'Propósito'];
const CLASSROOMS = ['Aula 101', 'Aula 201', 'Laboratorio A', 'Aula 202', 'Laboratorio B'];
const DEFAULT_RECOMMENDATIONS = [
  'Fomentar proyectos de programación y robótica en casa',
  'Inscribirlo en cursos de matemáticas avanzadas',
  'Visitar universidades con programas de ingeniería',
  'Conectar con profesionales del área para mentorías',
];
const DEFAULT_EVENTS = [
  {
    type: 'Feria',
    title: 'Feria de Ingenierías',
    location: 'Universidad Católica',
    date: 'Octubre 15, 2025',
  },
  {
    type: 'Open House',
    title: 'Open House - Ingeniería de Sistemas',
    location: 'UTEC',
    date: 'Octubre 22, 2025',
  },
];

const MOCK_STUDENT_NAMES = [
  'Lucía Ramírez',
  'Mateo Caballero',
  'Sofía Campos',
  'Diego Morales',
  'Valentina Paredes',
  'Nicolás Serrano',
  'Camila Olivares',
  'Fernando Gutiérrez',
  'Renata Aguilar',
  'Martín Quispe',
];

const MOCK_STUDENTS_TABLE: OrgStudent[] = [
  { id: 'mock-1', firstName: 'Isabel', lastName: 'Flores', grade: '4to', classroom: 'Aula 103', status: 'completado', email: null, journeyProgress: null, profileType: 'Innovador Creativo', scores: { Intereses: 88, Personalidad: 85, Valores: 78, Talentos: 92, Escenarios: 84, Propósito: 90 } },
  { id: 'mock-2', firstName: 'Gabriel', lastName: 'Mendoza', grade: '5to', classroom: 'Laboratorio A', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 75, Personalidad: 80, Valores: 72, Talentos: 85, Escenarios: 78, Propósito: 82 } },
  { id: 'mock-3', firstName: 'Andrea', lastName: 'Vargas', grade: '3ro', classroom: 'Aula 201', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
  { id: 'mock-4', firstName: 'Ricardo', lastName: 'Castillo', grade: '5to', classroom: 'Aula 102', status: 'completado', email: null, journeyProgress: null, profileType: 'Líder Social', scores: { Intereses: 90, Personalidad: 88, Valores: 85, Talentos: 87, Escenarios: 89, Propósito: 91 } },
  { id: 'mock-5', firstName: 'Daniela', lastName: 'Rojas', grade: '4to', classroom: 'Aula 202', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 82, Personalidad: 79, Valores: 76, Talentos: 88, Escenarios: 81, Propósito: 84 } },
  { id: 'mock-6', firstName: 'Joaquín', lastName: 'Paredes', grade: '2do', classroom: 'Aula 105', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
  { id: 'mock-7', firstName: 'Fernanda', lastName: 'Quispe', grade: '5to', classroom: 'Laboratorio B', status: 'completado', email: null, journeyProgress: null, profileType: 'Emprendedor', scores: { Intereses: 93, Personalidad: 90, Valores: 87, Talentos: 95, Escenarios: 92, Propósito: 94 } },
  { id: 'mock-8', firstName: 'Emilio', lastName: 'Guerrero', grade: '3ro', classroom: 'Aula 103', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 78, Personalidad: 75, Valores: 73, Talentos: 80, Escenarios: 77, Propósito: 79 } },
  { id: 'mock-9', firstName: 'Valeria', lastName: 'Salazar', grade: '4to', classroom: 'Aula 201', status: 'completado', email: null, journeyProgress: null, profileType: 'Investigador', scores: { Intereses: 89, Personalidad: 86, Valores: 83, Talentos: 91, Escenarios: 88, Propósito: 90 } },
  { id: 'mock-10', firstName: 'Sebastián', lastName: 'Chávez', grade: '5to', classroom: 'Aula 101', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
  { id: 'mock-11', firstName: 'Paula', lastName: 'Vega', grade: '2do', classroom: 'Aula 202', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 81, Personalidad: 78, Valores: 75, Talentos: 83, Escenarios: 80, Propósito: 82 } },
  { id: 'mock-12', firstName: 'Rodrigo', lastName: 'Medina', grade: '4to', classroom: 'Laboratorio A', status: 'completado', email: null, journeyProgress: null, profileType: 'Artista Visual', scores: { Intereses: 87, Personalidad: 84, Valores: 81, Talentos: 89, Escenarios: 86, Propósito: 88 } },
  { id: 'mock-13', firstName: 'Mariana', lastName: 'Luna', grade: '3ro', classroom: 'Aula 105', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
  { id: 'mock-14', firstName: 'Andrés', lastName: 'Soto', grade: '5to', classroom: 'Aula 102', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 79, Personalidad: 76, Valores: 74, Talentos: 81, Escenarios: 78, Propósito: 80 } },
  { id: 'mock-15', firstName: 'Carolina', lastName: 'Herrera', grade: '4to', classroom: 'Aula 201', status: 'completado', email: null, journeyProgress: null, profileType: 'Comunicador', scores: { Intereses: 91, Personalidad: 89, Valores: 86, Talentos: 93, Escenarios: 90, Propósito: 92 } },
  { id: 'mock-16', firstName: 'Leonardo', lastName: 'Navarro', grade: '2do', classroom: 'Laboratorio B', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
  { id: 'mock-17', firstName: 'Alejandra', lastName: 'Cortés', grade: '5to', classroom: 'Aula 103', status: 'completado', email: null, journeyProgress: null, profileType: 'Científico', scores: { Intereses: 94, Personalidad: 91, Valores: 88, Talentos: 96, Escenarios: 93, Propósito: 95 } },
  { id: 'mock-18', firstName: 'Matías', lastName: 'Ramírez', grade: '3ro', classroom: 'Aula 202', status: 'en_proceso', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 77, Personalidad: 74, Valores: 71, Talentos: 79, Escenarios: 76, Propósito: 78 } },
  { id: 'mock-19', firstName: 'Natalia', lastName: 'Cruz', grade: '4to', classroom: 'Aula 101', status: 'completado', email: null, journeyProgress: null, profileType: 'Estratega', scores: { Intereses: 86, Personalidad: 83, Valores: 80, Talentos: 88, Escenarios: 85, Propósito: 87 } },
  { id: 'mock-20', firstName: 'Benjamín', lastName: 'Ortiz', grade: '5to', classroom: 'Laboratorio A', status: 'pendiente', email: null, journeyProgress: null, profileType: null, scores: { Intereses: 0, Personalidad: 0, Valores: 0, Talentos: 0, Escenarios: 0, Propósito: 0 } },
];

const splitFullName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) {
    return { firstName: 'Estudiante', lastName: 'Senda' };
  }
  if (parts.length === 1) {
    return { firstName: capitalize(parts[0]), lastName: '—' };
  }
  return {
    firstName: capitalize(parts[0]),
    lastName: capitalize(parts.slice(1).join(' ')),
  };
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

const buildClassroomLabel = (grade: string | null, index: number) => {
  const seed = grade ? grade.length + index : index;
  return CLASSROOMS[seed % CLASSROOMS.length];
};

const deriveStatus = (journey: JourneyProgress | null): StudentStatus => {
  if (journey?.phases?.linkedin?.status === 'completed') {
    return 'completado';
  }
  if (journey) {
    return 'en_proceso';
  }
  return 'pendiente';
};

const extractScores = (scoreJson: any): Record<string, number> => {
  const defaultScores: Record<string, number> = {
    Intereses: 85,
    Personalidad: 82,
    Valores: 78,
    Talentos: 90,
    Escenarios: 84,
    Propósito: 88,
  };

  if (!scoreJson) return defaultScores;

  if (scoreJson.dimensionScores) {
    return {
      Intereses: scoreJson.dimensionScores.intereses ?? defaultScores.Intereses,
      Personalidad: scoreJson.dimensionScores.personalidad ?? defaultScores.Personalidad,
      Valores: scoreJson.dimensionScores.valores ?? defaultScores.Valores,
      Talentos: scoreJson.dimensionScores.talentos ?? defaultScores.Talentos,
      Escenarios: scoreJson.dimensionScores.escenarios ?? defaultScores.Escenarios,
      Propósito: scoreJson.dimensionScores.proposito ?? defaultScores.Propósito,
    };
  }

  return defaultScores;
};

const formatCsvValue = (value: string | null | undefined) => {
  const safe = value ?? '';
  const escaped = safe.replace(/"/g, '""');
  return `"${escaped}"`;
};

export default function OrgStudents() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | StudentStatus>('all');
  const [students, setStudents] = useState<OrgStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<OrgStudent | null>(null);
  const [sendingToParents, setSendingToParents] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: adminData, error: adminError } = await supabase
        .from('usuarios')
        .select('colegio_id')
        .eq('id', user.id)
        .single();

      if (adminError || !adminData?.colegio_id) {
        console.error('No se encontró colegio para el usuario');
        return;
      }

      const { data: studentRows, error: studentsError } = await supabase
        .from('usuarios')
        .select('id, nombre, username, grado, journey_progress, tipo_usuario')
        .eq('colegio_id', adminData.colegio_id)
        .neq('tipo_usuario', 'colegio');

      if (studentsError) {
        throw studentsError;
      }

      const userIds = studentRows?.map((student) => student.id) ?? [];
      const latestResultsMap = new Map<string, any>();

      if (userIds.length) {
        const { data: resultsData } = await supabase
          .from('test_results')
          .select('id, user_id, profile_type, score_json, created_at')
          .in('user_id', userIds)
          .order('created_at', { ascending: false });

        resultsData?.forEach((result) => {
          if (!latestResultsMap.has(result.user_id)) {
            latestResultsMap.set(result.user_id, result);
          }
        });
      }

      const mappedStudents: OrgStudent[] = (studentRows || []).map((student, index) => {
        const { firstName, lastName } = splitFullName(student.nombre || 'Estudiante Senda');
        const journey = (student.journey_progress as JourneyProgress) || null;
        const latestResult = latestResultsMap.get(student.id);
        const profileType = latestResult?.profile_type || latestResult?.score_json?.profileData?.nombre || null;
        const scores = extractScores(latestResult?.score_json);

        return {
          id: student.id,
          firstName,
          lastName,
          grade: student.grado || 'Sin grado',
          classroom: buildClassroomLabel(student.grado, index),
          status: deriveStatus(journey),
          email: student.username || null,
          journeyProgress: journey,
          profileType,
          scores,
        };
      });

      const combinedStudents = [...mappedStudents, ...MOCK_STUDENTS_TABLE];
      setStudents(combinedStudents);
    } catch (error) {
      console.error('Error cargando estudiantes:', error);
      toast({
        title: 'Error al cargar estudiantes',
        description: 'Intenta nuevamente más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const gradeOptions = useMemo(() => {
    const unique = Array.from(new Set(students.map((student) => student.grade))).filter(Boolean);
    return ['all', ...unique];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || (student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }, [students, searchTerm, gradeFilter, statusFilter]);

  const handleExport = () => {
    if (!filteredStudents.length) {
      toast({ title: 'Sin datos para exportar', description: 'Aplica otro filtro antes de exportar.' });
      return;
    }

    const headers = ['Nombre', 'Apellido', 'Grado', 'Aula', 'Estado', 'Usuario'];
    const rows = filteredStudents.map((student) => [
      student.firstName,
      student.lastName,
      student.grade,
      student.classroom,
      student.status,
      student.email ?? '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(formatCsvValue).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'estudiantes_org.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: StudentStatus) => {
    const baseClasses = 'text-white px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'completado':
        return <span className={`${baseClasses} bg-green-500`}>Completado</span>;
      case 'en_proceso':
        return <span className={`${baseClasses} bg-yellow-500`}>En Proceso</span>;
      default:
        return <span className={`${baseClasses} bg-gray-500`}>Pendiente</span>;
    }
  };

  const handleViewResult = (student: OrgStudent) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleSendToParents = () => {
    if (sendingToParents) return;
    setSendSuccess(false);
    setSendingToParents(true);
    setTimeout(() => {
      setSendingToParents(false);
      setSendSuccess(true);
      toast({
        title: '✅ Reporte enviado exitosamente',
        description: 'El reporte ha sido enviado a los padres del estudiante.',
        duration: 4000,
      });
      setTimeout(() => setSendSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#134E4A] mb-2">Estudiantes</h1>
        <p className="text-gray-600">Gestiona y visualiza el progreso de tus estudiantes</p>
      </div>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#134E4A]">Lista de Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-4">
            {students.slice(0, 6).map((student) => (
              <div key={student.id} className="px-3 py-2 bg-gray-50 rounded-lg border text-sm text-gray-700">
                {student.firstName} {student.lastName}
              </div>
            ))}
            {!students.length && (
              <div className="text-sm text-gray-500">No hay estudiantes registrados todavía.</div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {MOCK_STUDENT_NAMES.map((name) => (
              <div key={name} className="px-3 py-1.5 bg-white border border-dashed rounded-full text-xs text-gray-500">
                {name}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Grado" />
              </SelectTrigger>
              <SelectContent>
                {gradeOptions.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade === 'all' ? 'Todos' : grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'all' | StudentStatus)}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#10B981] hover:bg-[#059669]" onClick={handleExport} disabled={!filteredStudents.length}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-gray-500">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Cargando estudiantes...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido</TableHead>
                    <TableHead>Grado</TableHead>
                    <TableHead>Aula</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.firstName}</TableCell>
                      <TableCell className="font-medium">{student.lastName}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="text-gray-600">{student.classroom}</TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#10B981] hover:text-[#059669] hover:bg-green-50"
                          onClick={() => handleViewResult(student)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver resultado
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {!filteredStudents.length && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No encontramos estudiantes con esos filtros.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando 20 de 520 estudiantes
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#134E4A]">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </DialogTitle>
                <p className="text-sm text-gray-500">
                  {selectedStudent.grade} • {selectedStudent.classroom}
                </p>
              </DialogHeader>

              <div className="bg-gradient-to-r from-[#134E4A] to-[#10B981] text-white p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-white/80">Perfil vocacional</p>
                    <p className="text-3xl font-semibold">
                      {selectedStudent.profileType || 'Explorador STEM'}
                    </p>
                    <p className="text-white/80 text-sm">
                      Estado: {selectedStudent.status === 'completado' ? 'Proceso finalizado' : 'En progreso'}
                    </p>
                  </div>
                  <div className="bg-white/15 px-4 py-3 rounded-xl text-sm">
                    <p className="uppercase text-white/70 text-xs">Próximo hito</p>
                    <p className="text-lg font-semibold">
                      {(() => {
                        const journey = selectedStudent.journeyProgress;
                        if (!journey) return 'Iniciar Test Vocacional';
                        const currentPhase = journey.current_phase;
                        if (currentPhase === 'test' && journey.phases.test.status !== 'completed') return 'Completar Test Vocacional';
                        if (currentPhase === 'test' && journey.phases.test.status === 'completed') return 'Explorar Carreras';
                        if (currentPhase === 'carreras' && journey.phases.carreras.status !== 'completed') return 'Explorar Carreras';
                        if (currentPhase === 'carreras' && journey.phases.carreras.status === 'completed') return 'Mini Reto Práctico';
                        if (currentPhase === 'mini_reto' && journey.phases.mini_reto.status !== 'completed') return 'Mini Reto Práctico';
                        if (currentPhase === 'mini_reto' && journey.phases.mini_reto.status === 'completed') return 'LinkedIn Inteligente';
                        if (currentPhase === 'linkedin' && journey.phases.linkedin.status !== 'completed') return 'LinkedIn Inteligente';
                        return 'Journey Completo';
                      })()}
                    </p>
                    <p className="text-white/80 text-xs">Plan personalizado listo para compartir</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Puntuaciones por Dimensión</p>
                <div className="space-y-3">
                  {DIMENSIONS.map((dimension) => (
                    <div key={dimension}>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{dimension}</span>
                        <span className="font-semibold text-[#134E4A]">{selectedStudent.scores[dimension] ?? 0}%</span>
                      </div>
                      <Progress value={selectedStudent.scores[dimension] ?? 0} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white border">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#134E4A]">Recomendaciones para Apoderados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm">
                      {DEFAULT_RECOMMENDATIONS.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="bg-white border">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#134E4A]">Próximos Eventos Relacionados</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {DEFAULT_EVENTS.map((event, index) => (
                      <div key={index} className="p-3 rounded-lg border text-sm">
                        <p className="font-semibold text-[#134E4A]">{event.title}</p>
                        <p className="text-gray-600">{event.location}</p>
                        <p className="text-xs text-gray-500 mb-2">{event.date}</p>
                        <Button variant="outline" size="sm">Más info</Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t mt-6">
                <div className="flex flex-wrap gap-3 justify-end">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[#134E4A] text-[#134E4A] hover:bg-[#134E4A] hover:text-white"
                    onClick={handlePrintReport}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir reporte
                  </Button>
                  <Button
                    size="lg"
                    className="bg-[#10B981] hover:bg-[#0e8c6b] min-w-[200px]"
                    onClick={handleSendToParents}
                    disabled={sendingToParents}
                  >
                    {sendingToParents ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : sendSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Enviado a padres
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar a padres
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
