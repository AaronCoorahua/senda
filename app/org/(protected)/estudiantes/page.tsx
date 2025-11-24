import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Search, Download, Eye, Filter } from 'lucide-react';

const students = [
  { id: 1, firstName: 'Juan', lastName: 'Pérez', grade: '5ºA', classroom: 'Aula 101', status: 'completado' },
  { id: 2, firstName: 'Ana', lastName: 'Torres', grade: '4ºB', classroom: 'Aula 202', status: 'pendiente' },
  { id: 3, firstName: 'María', lastName: 'García', grade: '5ºA', classroom: 'Aula 101', status: 'completado' },
  { id: 4, firstName: 'Carlos', lastName: 'López', grade: '5ºB', classroom: 'Aula 102', status: 'en_proceso' },
  { id: 5, firstName: 'Lucía', lastName: 'Martínez', grade: '4ºB', classroom: 'Aula 202', status: 'pendiente' },
  { id: 6, firstName: 'Diego', lastName: 'Rodríguez', grade: '5ºA', classroom: 'Aula 101', status: 'completado' },
  { id: 7, firstName: 'Sofía', lastName: 'Fernández', grade: '4ºA', classroom: 'Aula 201', status: 'completado' },
  { id: 8, firstName: 'Miguel', lastName: 'Sánchez', grade: '5ºB', classroom: 'Aula 102', status: 'en_proceso' },
  { id: 9, firstName: 'Valentina', lastName: 'Romero', grade: '4ºA', classroom: 'Aula 201', status: 'pendiente' },
  { id: 10, firstName: 'Daniel', lastName: 'Castro', grade: '5ºA', classroom: 'Aula 101', status: 'completado' },
];

export default function OrgStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completado':
        return <Badge className="bg-green-500">Completado</Badge>;
      case 'en_proceso':
        return <Badge className="bg-yellow-500">En Proceso</Badge>;
      case 'pendiente':
        return <Badge className="bg-gray-500">Pendiente</Badge>;
      default:
        return null;
    }
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

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
          {/* Filters */}
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
              <SelectTrigger className="w-full md:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Grado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="5ºA">5ºA</SelectItem>
                <SelectItem value="5ºB">5ºB</SelectItem>
                <SelectItem value="4ºA">4ºA</SelectItem>
                <SelectItem value="4ºB">4ºB</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
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

            <Button className="bg-[#10B981] hover:bg-[#059669]">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
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
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver resultado
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredStudents.length} de {students.length} estudiantes
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
