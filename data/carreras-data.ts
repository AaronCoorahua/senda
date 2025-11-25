// Datos centralizados de carreras
export const carrerasData = [
  {
    id: '1',
    nombre: 'Medicina',
    categoria: 'Salud',
    icono: '⚕️',
    descripcion: 'Diagnosticar, tratar y prevenir enfermedades para salvar vidas y mejorar la salud de las personas.',
    salarioPromedio: 'S/3,000 - S/8,000',
    campoLaboral: 'Hospitales, clínicas, consultorios, centros de salud, investigación médica',
    universidades: ['UNMSM', 'PUCP', 'UPCH', 'USMP', 'UPC'],
    perfiles: ['guía-humanista', 'investigador-curioso']
  },
  {
    id: '2',
    nombre: 'Odontología',
    categoria: 'Salud',
    icono: '🦷',
    descripcion: 'Diagnosticar, tratar y prevenir problemas de salud bucal y dental.',
    salarioPromedio: 'S/2,500 - S/6,000',
    campoLaboral: 'Consultorios dentales, clínicas odontológicas, hospitales, centros de salud',
    universidades: ['UNMSM', 'PUCP', 'UPCH', 'USMP', 'UPC'],
    perfiles: ['guía-humanista', 'constructor-técnico']
  },
  {
    id: '3',
    nombre: 'Enfermería',
    categoria: 'Salud',
    icono: '👩‍⚕️',
    descripcion: 'Brindar cuidado integral a personas en diferentes estados de salud.',
    salarioPromedio: 'S/1,800 - S/4,000',
    campoLaboral: 'Hospitales, clínicas, centros de salud, cuidados domiciliarios, salud pública',
    universidades: ['UNMSM', 'Universidad Peruana Cayetano Heredia', 'UPCH', 'USMP', 'UPC'],
    perfiles: ['guía-humanista']
  },
  {
    id: '4',
    nombre: 'Farmacia y Bioquímica',
    categoria: 'Salud',
    icono: '💊',
    descripcion: 'Preparar medicamentos, realizar análisis clínicos y brindar atención farmacéutica.',
    salarioPromedio: 'S/2,000 - S/5,000',
    campoLaboral: 'Farmacias, laboratorios clínicos, industria farmacéutica, hospitales, investigación',
    universidades: ['UNMSM', 'Universidad Nacional Mayor de San Marcos', 'UPCH', 'USMP', 'UPC'],
    perfiles: ['investigador-curioso', 'guía-humanista']
  },
  {
    id: '5',
    nombre: 'Ingeniería de Sistemas',
    categoria: 'Tecnología',
    icono: '💻',
    descripcion: 'Diseñar, desarrollar e implementar sistemas informáticos y soluciones tecnológicas.',
    salarioPromedio: 'S/2,500 - S/7,000',
    campoLaboral: 'Empresas de tecnología, bancos, consultoras, startups, gobierno, freelance',
    universidades: ['UNI', 'PUCP', 'UTEC', 'UPC', 'USIL', 'ULIMA', 'USMP'],
    perfiles: ['analista-estratégico', 'constructor-técnico', 'investigador-curioso']
  },
  {
    id: '6',
    nombre: 'Ciencias de la Computación',
    categoria: 'Tecnología',
    icono: '🔬',
    descripcion: 'Investigar y desarrollar nuevas tecnologías computacionales y algoritmos avanzados.',
    salarioPromedio: 'S/3,000 - S/8,000',
    campoLaboral: 'Empresas tech, investigación, universidades, startups de IA, empresas internacionales',
    universidades: ['UNI', 'PUCP', 'UTEC'],
    perfiles: ['investigador-curioso', 'analista-estratégico']
  },
  {
    id: '7',
    nombre: 'Educación',
    categoria: 'Ciencias Sociales',
    icono: '👨‍🏫',
    descripcion: 'Formar y guiar a nuevas generaciones, desarrollando estrategias pedagógicas innovadoras.',
    salarioPromedio: 'S/1,800 - S/4,500',
    campoLaboral: 'Colegios, universidades, institutos, educación virtual, desarrollo de contenidos educativos',
    universidades: ['PUCP', 'UPCH', 'UNI', 'USIL', 'UNMSM'],
    perfiles: ['explorador-creativo', 'guía-humanista', 'visionario-social']
  },
  {
    id: '8',
    nombre: 'Psicología',
    categoria: 'Ciencias Sociales',
    icono: '🧠',
    descripcion: 'Comprender el comportamiento humano y ayudar a las personas a mejorar su bienestar emocional.',
    salarioPromedio: 'S/2,000 - S/5,000',
    campoLaboral: 'Consultorios privados, empresas, colegios, hospitales, ONGs, investigación',
    universidades: ['PUCP', 'UPCH', 'USMP', 'UPC', 'URP'],
    perfiles: ['explorador-creativo', 'guía-humanista', 'investigador-curioso']
  },
  {
    id: '9',
    nombre: 'Administración de Empresas',
    categoria: 'Negocios y Economía',
    icono: '💼',
    descripcion: 'Gestionar recursos y liderar equipos para alcanzar objetivos organizacionales.',
    salarioPromedio: 'S/2,500 - S/7,000',
    campoLaboral: 'Empresas privadas, consultoras, emprendimientos, bancos, sector público',
    universidades: ['PUCP', 'UPC', 'ESAN', 'USIL', 'ULIMA'],
    perfiles: ['líder-emprendedor', 'analista-estratégico', 'explorador-creativo']
  },
  {
    id: '10',
    nombre: 'Marketing',
    categoria: 'Negocios y Economía',
    icono: '📊',
    descripcion: 'Crear estrategias para conectar marcas con consumidores y generar valor.',
    salarioPromedio: 'S/2,200 - S/6,000',
    campoLaboral: 'Agencias de publicidad, empresas, consultoras, marketing digital, emprendimientos',
    universidades: ['UPC', 'USIL', 'PUCP', 'UTP', 'ULIMA'],
    perfiles: ['comunicador-influyente', 'explorador-creativo', 'líder-emprendedor']
  },
  {
    id: '11',
    nombre: 'Diseño Gráfico',
    categoria: 'Arquitectura y Diseño',
    icono: '🎨',
    descripcion: 'Crear comunicación visual impactante y soluciones creativas para marcas y productos.',
    salarioPromedio: 'S/1,800 - S/5,000',
    campoLaboral: 'Agencias de diseño, empresas, freelance, estudios creativos, publicidad',
    universidades: ['PUCP', 'UPC', 'Toulouse Lautrec', 'USIL', 'Corriente Alterna'],
    perfiles: ['explorador-creativo', 'comunicador-influyente']
  },
  {
    id: '12',
    nombre: 'Arquitectura',
    categoria: 'Arquitectura y Diseño',
    icono: '🏗️',
    descripcion: 'Diseñar espacios funcionales y estéticos que mejoren la calidad de vida de las personas.',
    salarioPromedio: 'S/2,000 - S/6,000',
    campoLaboral: 'Estudios de arquitectura, constructoras, sector público, proyectos independientes',
    universidades: ['UNI', 'PUCP', 'UPC', 'URP', 'USMP'],
    perfiles: ['explorador-creativo', 'constructor-técnico', 'visionario-social']
  },
  {
    id: '13',
    nombre: 'Comunicación Audiovisual',
    categoria: 'Ciencias Sociales',
    icono: '🎬',
    descripcion: 'Crear contenido visual y narrativo para diferentes medios y plataformas.',
    salarioPromedio: 'S/2,000 - S/5,500',
    campoLaboral: 'Productoras, medios de comunicación, agencias, freelance, plataformas digitales',
    universidades: ['PUCP', 'UPC', 'Universidad de Lima', 'Toulouse Lautrec'],
    perfiles: ['explorador-creativo', 'comunicador-influyente']
  },
  {
    id: '14',
    nombre: 'Periodismo',
    categoria: 'Ciencias Sociales',
    icono: '📰',
    descripcion: 'Investigar, reportar y comunicar noticias e información de interés público.',
    salarioPromedio: 'S/1,800 - S/5,000',
    campoLaboral: 'Medios de comunicación, portales digitales, freelance, comunicación corporativa',
    universidades: ['PUCP', 'Universidad de Lima', 'USMP', 'Jaime Bausate y Meza'],
    perfiles: ['explorador-creativo', 'comunicador-influyente', 'visionario-social']
  },
  {
    id: '15',
    nombre: 'Gestión de Proyectos',
    categoria: 'Negocios y Economía',
    icono: '📋',
    descripcion: 'Planificar, ejecutar y supervisar proyectos para alcanzar objetivos específicos.',
    salarioPromedio: 'S/2,800 - S/7,000',
    campoLaboral: 'Empresas de todos los sectores, consultoras, ONGs, sector público',
    universidades: ['PUCP', 'UPC', 'ESAN', 'USIL'],
    perfiles: ['explorador-creativo', 'analista-estratégico', 'líder-emprendedor']
  },
  {
    id: '16',
    nombre: 'Consultoría',
    categoria: 'Negocios y Economía',
    icono: '💡',
    descripcion: 'Asesorar a organizaciones para mejorar su desempeño y resolver problemas complejos.',
    salarioPromedio: 'S/3,000 - S/9,000',
    campoLaboral: 'Consultoras, empresas de servicios profesionales, freelance',
    universidades: ['PUCP', 'ESAN', 'Universidad de Lima', 'UPC'],
    perfiles: ['explorador-creativo', 'analista-estratégico', 'investigador-curioso']
  },
  {
    id: '17',
    nombre: 'Investigación Social',
    categoria: 'Ciencias Sociales',
    icono: '🔍',
    descripcion: 'Estudiar fenómenos sociales y proponer soluciones basadas en evidencia.',
    salarioPromedio: 'S/2,000 - S/5,500',
    campoLaboral: 'Universidades, ONGs, centros de investigación, organismos internacionales',
    universidades: ['PUCP', 'UNMSM', 'Universidad Antonio Ruiz de Montoya'],
    perfiles: ['explorador-creativo', 'investigador-curioso', 'visionario-social']
  },
  {
    id: '18',
    nombre: 'Desarrollo Organizacional',
    categoria: 'Negocios y Economía',
    icono: '🌱',
    descripcion: 'Mejorar la efectividad organizacional mediante el desarrollo de personas y procesos.',
    salarioPromedio: 'S/2,500 - S/6,500',
    campoLaboral: 'Áreas de RRHH, consultoras, empresas de capacitación',
    universidades: ['PUCP', 'ESAN', 'Universidad de Lima', 'UPC'],
    perfiles: ['explorador-creativo', 'guía-humanista', 'líder-emprendedor']
  },
  {
    id: '19',
    nombre: 'Ingeniería Industrial',
    categoria: 'Ingeniería',
    icono: '⚙️',
    descripcion: 'Optimizar procesos y sistemas para mejorar la productividad y eficiencia.',
    salarioPromedio: 'S/2,500 - S/6,500',
    campoLaboral: 'Manufactura, logística, consultoras, sector servicios',
    universidades: ['UNI', 'PUCP', 'UPC', 'ULIMA', 'USIL'],
    perfiles: ['analista-estratégico', 'constructor-técnico', 'explorador-creativo']
  },
  {
    id: '20',
    nombre: 'Derecho',
    categoria: 'Ciencias Sociales',
    icono: '⚖️',
    descripcion: 'Interpretar y aplicar las leyes para defender derechos y resolver conflictos.',
    salarioPromedio: 'S/2,000 - S/8,000',
    campoLaboral: 'Estudios jurídicos, poder judicial, empresas, sector público',
    universidades: ['PUCP', 'Universidad de Lima', 'UNMSM', 'USMP'],
    perfiles: ['analista-estratégico', 'visionario-social', 'comunicador-influyente']
  }
];

// Función para obtener carreras por perfil
export function getCarrerasByPerfil(perfilId: string): string[] {
  return carrerasData
    .filter(c => c.perfiles.includes(perfilId))
    .map(c => c.nombre)
    .slice(0, 6); // Limitar a 6 carreras principales
}
