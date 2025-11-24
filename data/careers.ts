
// Career interface and types
export interface Career {
  id: string;
  name: string;
  category: string;
  description: string;
  salaryRange: string;
  workField: string;
  universities: string[];
  extendedInfo: {
    activitiesAndSkills: string;
    purposeAndImpact: string;
    testimony: string;
    professionalLifestyle: string;
    realRolesExamples: string;
    commonChallenges: string;
    educationalRoutes: string;
    academicTrajectory: string;
    workAndSalary: string;
    employabilityProjection: string;
    similarCareersComparison: string;
  };
}

// Export categories array
export const categories = [
  "Todos",
  "Salud", 
  "Tecnología",
  "Ingeniería",
  "Ciencias Sociales",
  "Negocios y Economía",
  "Arquitectura y Diseño"
];

// Careers data
export const careers: Career[] = [
  // Salud
  {
    id: "medicina",
    name: "Medicina",
    category: "Salud",
    description: "Diagnosticar, tratar y prevenir enfermedades para salvar vidas y mejorar la salud de las personas.",
    salaryRange: "S/3,000 - S/8,000",
    workField: "Hospitales, clínicas, consultorios, centros de salud, investigación médica",
    universities: ["UNMSM", "PUCP", "Universidad Peruana Cayetano Heredia", "Universidad Nacional de Trujillo", "Universidad San Martín de Porres"],
    extendedInfo: {
      activitiesAndSkills: "Realizarás diagnósticos médicos, tratarás pacientes, realizarás cirugías menores, prescribirás medicamentos y brindarás atención integral de salud. Desarrollarás habilidades clínicas, conocimiento anatómico profundo, capacidad de diagnóstico, manejo de emergencias y comunicación empática con pacientes.",
      purposeAndImpact: "Tu trabajo tendrá un impacto directo en salvar vidas, aliviar el sufrimiento y mejorar la calidad de vida de las personas. Contribuirás al sistema de salud del país y podrás participar en investigación médica para avances científicos.",
      testimony: "Cada día en medicina es diferente. Ver la recuperación de un paciente y saber que contribuiste a su bienestar es la mayor satisfacción profesional que existe.",
      professionalLifestyle: "El trabajo médico es intenso y demandante, con guardias nocturnas y fines de semana. Requiere dedicación completa pero ofrece gran satisfacción personal. Las especialidades varían en intensidad laboral.",
      realRolesExamples: "Médico general, especialista (cardiólogo, pediatra, cirujano), médico de emergencias, investigador médico, docente universitario, consultor médico.",
      commonChallenges: "Largas jornadas de estudio, presión emocional al tratar con pacientes graves, responsabilidad legal, actualización constante de conocimientos médicos, equilibrio vida-trabajo.",
      educationalRoutes: "7 años de pregrado más especialización (3-5 años adicionales). Incluye 2 años de internado y servicio social obligatorio (SERUMS).",
      academicTrajectory: "Años 1-3: ciencias básicas (anatomía, fisiología, bioquímica). Años 4-5: patología y farmacología. Años 6-7: rotaciones clínicas e internado médico.",
      workAndSalary: "Médicos generales ganan entre S/3,000-5,000. Especialistas pueden ganar S/5,000-8,000 o más. Oportunidades en sector público y privado, con posibilidad de consulta particular.",
      employabilityProjection: "Alta demanda laboral, especialmente en especialidades como medicina interna, pediatría y medicina familiar. El envejecimiento poblacional incrementa la necesidad de profesionales médicos.",
      similarCareersComparison: "Enfermería se enfoca más en cuidado directo del paciente. Odontología se especializa en salud bucal. Medicina veterinaria aplica conocimientos similares en animales."
    }
  },
  {
    id: "odontologia",
    name: "Odontología",
    category: "Salud",
    description: "Diagnosticar, tratar y prevenir problemas de salud bucal y dental.",
    salaryRange: "S/2,500 - S/6,000",
    workField: "Consultorios dentales, clínicas odontológicas, hospitales, centros de salud",
    universities: ["UNMSM", "PUCP", "Universidad Peruana Cayetano Heredia", "Universidad Inca Garcilaso de la Vega", "Universidad Alas Peruanas"],
    extendedInfo: {
      activitiesAndSkills: "Realizarás tratamientos dentales, limpiezas, extracciones, rehabilitación oral, ortodoncia y cirugías menores. Desarrollarás destreza manual, conocimiento en anatomía oral, manejo de equipos especializados y técnicas de anestesia local.",
      purposeAndImpact: "Mejorarás la salud bucal y la calidad de vida de las personas, contribuyendo a su bienestar general y autoestima. La salud oral está directamente relacionada con la salud sistémica.",
      testimony: "La odontología combina arte y ciencia. Ver la sonrisa de satisfacción de un paciente después de un tratamiento exitoso es increíblemente gratificante.",
      professionalLifestyle: "Horarios más regulares que otras carreras de salud, con posibilidad de consultorio propio. Requiere precisión y paciencia. Balance vida-trabajo generalmente favorable.",
      realRolesExamples: "Odontólogo general, ortodoncista, cirujano oral, periodoncista, endodoncista, odontopediatra, implantólogo.",
      commonChallenges: "Inversión inicial alta en equipos, manejo de pacientes con fobia dental, problemas posturales por la naturaleza del trabajo, competencia en el mercado privado.",
      educationalRoutes: "6 años de pregrado con fuerte componente práctico desde el tercer año. Incluye prácticas pre-profesionales y servicio social.",
      academicTrajectory: "Años 1-2: ciencias básicas y anatomía. Años 3-4: patología oral y técnicas clínicas. Años 5-6: práctica clínica intensiva y especialización.",
      workAndSalary: "Odontólogos recién graduados ganan S/2,500-3,500. Con experiencia y especialización pueden ganar S/4,000-6,000. Consultorio propio puede generar ingresos superiores.",
      employabilityProjection: "Buena demanda, especialmente en tratamientos estéticos y especializados. Crecimiento del sector salud privado favorece las oportunidades laborales.",
      similarCareersComparison: "Medicina abarca todo el cuerpo humano. Odontología se especializa únicamente en salud oral pero permite mayor independencia profesional y horarios más flexibles."
    }
  },
  {
    id: "enfermeria",
    name: "Enfermería",
    category: "Salud",
    description: "Brindar cuidado integral a personas en diferentes estados de salud.",
    salaryRange: "S/1,800 - S/4,000",
    workField: "Hospitales, clínicas, centros de salud, cuidados domiciliarios, empresas",
    universities: ["UNMSM", "Universidad Peruana Cayetano Heredia", "Universidad Nacional de Trujillo", "Universidad Católica Santo Toribio de Mogrovejo", "Universidad Norbert Wiener"],
    extendedInfo: {
      activitiesAndSkills: "Brindarás cuidado directo a pacientes, administrarás medicamentos, realizarás procedimientos básicos, educarás sobre salud y coordinarás cuidados. Desarrollarás habilidades clínicas, comunicación empática, organización y trabajo en equipo.",
      purposeAndImpact: "Serás el profesional más cercano al paciente, brindando cuidado humanizado y apoyo emocional. Tu trabajo es fundamental en la recuperación y bienestar de las personas.",
      testimony: "Enfermería es vocación de servicio. Estar presente en los momentos más vulnerables de las personas y ayudarlas en su recuperación da un sentido profundo a tu trabajo.",
      professionalLifestyle: "Trabajo por turnos incluyendo noches, fines de semana y feriados. Demanda física y emocional considerable pero con gran satisfacción personal.",
      realRolesExamples: "Enfermero asistencial, enfermero especialista (UCI, quirófano, pediatría), supervisor de enfermería, enfermero docente, enfermero de salud pública.",
      commonChallenges: "Carga laboral intensa, turnos rotativos, exposición a riesgos biológicos, demanda emocional alta, salarios iniciales modestos.",
      educationalRoutes: "5 años de pregrado con fuerte componente práctico. Incluye rotaciones por diferentes servicios hospitalarios y centros de salud.",
      academicTrajectory: "Años 1-2: ciencias básicas y fundamentos de enfermería. Años 3-4: cuidados especializados y prácticas clínicas. Año 5: internado y trabajo de investigación.",
      workAndSalary: "Enfermeros recién graduados ganan S/1,800-2,500. Con experiencia y especialización pueden alcanzar S/3,000-4,000. Oportunidades en sector público y privado.",
      employabilityProjection: "Alta demanda laboral debido al déficit de enfermeros en el país. Envejecimiento poblacional incrementa necesidad de cuidados de salud.",
      similarCareersComparison: "Medicina se enfoca en diagnóstico y tratamiento. Enfermería se especializa en cuidado integral y continuo del paciente, con mayor contacto directo."
    }
  },
  {
    id: "farmacia-bioquimica",
    name: "Farmacia y Bioquímica",
    category: "Salud",
    description: "Preparar medicamentos, realizar análisis clínicos y brindar atención farmacéutica.",
    salaryRange: "S/2,000 - S/5,000",
    workField: "Farmacias, laboratorios clínicos, industria farmacéutica, hospitales, investigación",
    universities: ["UNMSM", "Universidad Nacional de Trujillo", "Universidad Wiener", "Universidad Católica Santa María", "Universidad Continental"],
    extendedInfo: {
      activitiesAndSkills: "Dispensarás medicamentos, realizarás análisis clínicos, prepararás fórmulas magistrales, brindarás consulta farmacéutica y participarás en investigación. Desarrollarás conocimientos en química, farmacología, análisis clínicos y atención al paciente.",
      purposeAndImpact: "Contribuirás a la salud pública asegurando el uso seguro y efectivo de medicamentos. Tu trabajo es clave en el diagnóstico de enfermedades y seguimiento de tratamientos.",
      testimony: "La farmacia combina ciencia y servicio. Ayudar a las personas a entender sus medicamentos y ver cómo mejoran su salud es muy satisfactorio.",
      professionalLifestyle: "Horarios variables según el área de trabajo. Farmacias pueden requerir turnos, laboratorios tienen horarios más regulares. Balance vida-trabajo generalmente bueno.",
      realRolesExamples: "Químico farmacéutico, regente de farmacia, analista clínico, investigador farmacéutico, consultor en industria farmacéutica, docente universitario.",
      commonChallenges: "Responsabilidad legal en dispensación, actualización constante en nuevos medicamentos, manejo de pacientes complejos, competencia en el sector retail.",
      educationalRoutes: "6 años de pregrado con prácticas en farmacias y laboratorios. Incluye internado y servicio social en algunos casos.",
      academicTrajectory: "Años 1-2: química básica y biología. Años 3-4: farmacología y análisis clínicos. Años 5-6: práctica profesional y especialización.",
      workAndSalary: "Farmacéuticos recién graduados ganan S/2,000-3,000. Con experiencia pueden alcanzar S/3,500-5,000. Industria farmacéutica ofrece mejores salarios.",
      employabilityProjection: "Buena demanda en farmacias y laboratorios. Crecimiento del sector salud y envejecimiento poblacional favorecen las oportunidades.",
      similarCareersComparison: "Medicina se enfoca en diagnóstico y tratamiento. Farmacia se especializa en medicamentos y análisis, con menos contacto directo pero mayor componente científico."
    }
  },

  // Tecnología
  {
    id: "ingenieria-sistemas",
    name: "Ingeniería de Sistemas",
    category: "Tecnología",
    description: "Diseñar, desarrollar e implementar sistemas informáticos y soluciones tecnológicas.",
    salaryRange: "S/2,500 - S/7,000",
    workField: "Empresas de tecnología, bancos, consultoras, startups, gobierno, sector privado en general",
    universities: ["UNI", "PUCP", "UPC", "UTEC", "Universidad de Lima", "USIL", "Universidad Continental"],
    extendedInfo: {
      activitiesAndSkills: "Desarrollarás software, diseñarás arquitecturas de sistemas, gestionarás bases de datos, implementarás soluciones tecnológicas y liderarás proyectos. Dominarás lenguajes de programación, metodologías ágiles, bases de datos, cloud computing y gestión de proyectos.",
      purposeAndImpact: "Crearás soluciones tecnológicas que mejoren la eficiencia de empresas y la vida de las personas. Tu trabajo impulsa la transformación digital del país.",
      testimony: "Ingeniería de sistemas te permite crear desde cero. Ver una idea convertirse en una aplicación que miles de personas usan es increíblemente satisfactorio.",
      professionalLifestyle: "Alta flexibilidad horaria, posibilidad de trabajo remoto, ambiente colaborativo. Ritmo de trabajo puede ser intenso durante entregas de proyectos.",
      realRolesExamples: "Desarrollador de software, arquitecto de sistemas, líder técnico, consultor IT, product manager, DevOps engineer, analista de sistemas.",
      commonChallenges: "Tecnología cambia rápidamente, necesidad de aprendizaje continuo, presión por deadlines, síndrome del impostor común en el sector.",
      educationalRoutes: "5 años de pregrado con fuerte componente práctico. Muchas oportunidades de especialización posterior.",
      academicTrajectory: "Años 1-2: programación básica y matemáticas. Años 3-4: desarrollo de software y bases de datos. Año 5: proyecto de tesis y especialización.",
      workAndSalary: "Desarrolladores junior ganan S/2,500-4,000. Con experiencia pueden alcanzar S/5,000-7,000 o más. Sector con mejores salarios en el mercado peruano.",
      employabilityProjection: "Excelente demanda laboral. Transformación digital acelera necesidad de profesionales. Oportunidades tanto locales como remotas internacionales.",
      similarCareersComparison: "Ciencias de la Computación es más teórica. Ingeniería de Sistemas es más práctica y orientada a soluciones empresariales."
    }
  },
  {
    id: "ciencias-computacion",
    name: "Ciencias de la Computación",
    category: "Tecnología",
    description: "Investigar y desarrollar nuevas tecnologías computacionales y algoritmos avanzados.",
    salaryRange: "S/3,000 - S/8,000",
    workField: "Empresas tech, investigación, universidades, startups de IA, consultoras especializadas",
    universities: ["UNI", "PUCP", "UNMSM", "UTEC"],
    extendedInfo: {
      activitiesAndSkills: "Investigarás algoritmos, desarrollarás inteligencia artificial, trabajarás en machine learning, optimizarás sistemas complejos y contribuirás a investigación científica. Dominarás matemáticas avanzadas, algoritmos, IA, análisis de complejidad y metodologías de investigación.",
      purposeAndImpact: "Contribuirás al avance científico y tecnológico, creando innovaciones que pueden cambiar industrias enteras. Tu trabajo puede tener impacto global.",
      testimony: "Ciencias de la computación te permite estar en la frontera del conocimiento. Resolver problemas que nadie ha resuelto antes es emocionante.",
      professionalLifestyle: "Ambiente académico o de investigación, horarios flexibles, trabajo intelectual intenso. Posibilidades de colaboración internacional.",
      realRolesExamples: "Investigador en IA, científico de datos, desarrollador de algoritmos, consultor técnico, profesor universitario, líder técnico en startups.",
      commonChallenges: "Requiere sólida base matemática, competencia internacional alta, necesidad de publicaciones académicas si buscas carrera en investigación.",
      educationalRoutes: "5 años de pregrado muy intensos en matemáticas y teoría. Muchos continúan con maestría o doctorado.",
      academicTrajectory: "Años 1-2: matemáticas y programación fundamental. Años 3-4: algoritmos avanzados y teoría computacional. Año 5: investigación y tesis especializada.",
      workAndSalary: "Científicos de datos junior ganan S/3,000-5,000. Especialistas en IA pueden ganar S/6,000-8,000 o más. Salarios entre los más altos del mercado.",
      employabilityProjection: "Excelente proyección, especialmente en IA y machine learning. Demanda creciente tanto local como internacional.",
      similarCareersComparison: "Ingeniería de Sistemas es más práctica y empresarial. Ciencias de la Computación es más teórica y orientada a investigación e innovación."
    }
  },
  {
    id: "data-science",
    name: "Data Science",
    category: "Tecnología",
    description: "Extraer conocimiento e insights valiosos de grandes volúmenes de datos.",
    salaryRange: "S/3,500 - S/9,000",
    workField: "Bancos, consultoras, retail, e-commerce, gobierno, startups, empresas de todos los sectores",
    universities: ["PUCP", "UPC", "UTEC", "ESAN", "Universidad de Lima"],
    extendedInfo: {
      activitiesAndSkills: "Analizarás grandes volúmenes de datos, crearás modelos predictivos, desarrollarás dashboards, implementarás machine learning y comunicarás insights. Dominarás Python/R, SQL, estadística, machine learning, visualización de datos y storytelling con datos.",
      purposeAndImpact: "Transformarás datos en decisiones estratégicas que pueden cambiar el rumbo de empresas. Tu trabajo impulsa la toma de decisiones basada en evidencia.",
      testimony: "Data Science es como ser detective de datos. Encontrar patrones ocultos que generan valor real para las empresas es fascinante.",
      professionalLifestyle: "Trabajo analítico intenso, colaboración constante con diferentes áreas, balance vida-trabajo generalmente bueno. Alta valoración en las empresas.",
      realRolesExamples: "Data scientist, analista de datos, machine learning engineer, consultor en analytics, product analyst, business intelligence analyst.",
      commonChallenges: "Datos sucios y desorganizados, necesidad de comunicar resultados técnicos a audiencias no técnicas, campo muy competitivo.",
      educationalRoutes: "Pueden venir de diferentes backgrounds: ingeniería, estadística, economía, matemáticas. Muchos toman bootcamps o especializaciones.",
      academicTrajectory: "Formación multidisciplinaria: estadística, programación, negocio. Muchos complementan con cursos online y certificaciones.",
      workAndSalary: "Data scientists junior ganan S/3,500-5,500. Seniors pueden alcanzar S/7,000-9,000. Uno de los campos mejor pagados actualmente.",
      employabilityProjection: "Excelente demanda. Todas las industrias necesitan profesionales de datos. Campo en crecimiento exponencial.",
      similarCareersComparison: "Estadística es más teórica. Data Science combina estadística, programación y negocio. Más práctica y orientada a valor empresarial."
    }
  },
  {
    id: "estadistica",
    name: "Estadística",
    category: "Tecnología",
    description: "Aplicar métodos estadísticos para analizar datos y resolver problemas complejos.",
    salaryRange: "S/2,500 - S/6,000",
    workField: "Investigación, consultoras, bancos, seguros, gobierno, universidades, estudios de mercado",
    universities: ["UNMSM", "UNI", "Universidad Nacional Agraria", "Universidad Ricardo Palma"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás experimentos, analizarás datos, crearás modelos estadísticos, realizarás investigación de mercados y validarás hipótesis. Dominarás métodos estadísticos, software especializado (R, SPSS, SAS), diseño experimental y análisis multivariado.",
      purposeAndImpact: "Proporcionarás rigor científico a la toma de decisiones. Tu trabajo es fundamental en investigación, políticas públicas y estrategias empresariales.",
      testimony: "La estadística te permite encontrar la verdad en los datos. Es satisfactorio ver cómo tu análisis puede cambiar decisiones importantes.",
      professionalLifestyle: "Trabajo analítico profundo, colaboración con investigadores, horarios regulares. Ambiente académico o consultivo.",
      realRolesExamples: "Estadístico investigador, consultor en estudios de mercado, analista de riesgos, bioestadístico, profesor universitario.",
      commonChallenges: "Requiere sólida base matemática, puede ser menos conocida que Data Science, necesidad de explicar conceptos técnicos.",
      educationalRoutes: "5 años de pregrado con fuerte componente matemático. Muchos continúan con especialización en áreas específicas.",
      academicTrajectory: "Años 1-2: matemáticas y estadística básica. Años 3-4: métodos avanzados y aplicaciones. Año 5: investigación aplicada.",
      workAndSalary: "Estadísticos junior ganan S/2,500-3,500. Con especialización pueden alcanzar S/4,500-6,000.",
      employabilityProjection: "Buena demanda en investigación y análisis. Complementa bien con Data Science para mejores oportunidades.",
      similarCareersComparison: "Data Science es más tecnológica y empresarial. Estadística es más rigurosa metodológicamente y orientada a investigación."
    }
  },

  // Ingeniería
  {
    id: "ingenieria-industrial",
    name: "Ingeniería Industrial",
    category: "Ingeniería",
    description: "Optimizar procesos, sistemas y recursos para mejorar la productividad empresarial.",
    salaryRange: "S/2,500 - S/6,500",
    workField: "Manufactura, consultoras, bancos, retail, logística, sector público y privado",
    universities: ["UNI", "PUCP", "UPC", "Universidad de Lima", "USIL", "Universidad Continental"],
    extendedInfo: {
      activitiesAndSkills: "Optimizarás procesos productivos, gestionarás cadenas de suministro, liderarás proyectos de mejora, analizarás costos y implementarás sistemas de calidad. Desarrollarás habilidades en gestión de operaciones, análisis de datos, liderazgo y pensamiento sistémico.",
      purposeAndImpact: "Mejorarás la eficiencia de empresas y organizaciones, reduciendo costos y aumentando productividad. Tu trabajo impulsa la competitividad del sector productivo nacional.",
      testimony: "Ingeniería Industrial te permite ver el panorama completo de una empresa. Optimizar procesos y ver resultados concretos es muy gratificante.",
      professionalLifestyle: "Ambiente empresarial dinámico, trabajo en equipo, viajes frecuentes a plantas. Balance vida-trabajo generalmente bueno.",
      realRolesExamples: "Ingeniero de procesos, consultor, jefe de operaciones, analista de mejora continua, gerente de proyectos, coordinador de calidad.",
      commonChallenges: "Necesidad de adaptarse a diferentes industrias, resistencia al cambio en organizaciones, presión por resultados cuantificables.",
      educationalRoutes: "5 años de pregrado con enfoque empresarial y técnico. Muchas oportunidades de especialización posterior.",
      academicTrajectory: "Años 1-2: matemáticas y ciencias básicas. Años 3-4: procesos y sistemas industriales. Año 5: gestión y proyecto integrador.",
      workAndSalary: "Ingenieros junior ganan S/2,500-4,000. Con experiencia pueden alcanzar S/4,500-6,500. Buenas oportunidades de crecimiento.",
      employabilityProjection: "Excelente empleabilidad en múltiples sectores. Demanda creciente por optimización y eficiencia empresarial.",
      similarCareersComparison: "Administración es más enfocada en gestión. Ingeniería Industrial combina aspectos técnicos con gestión empresarial."
    }
  },
  {
    id: "ingenieria-civil",
    name: "Ingeniería Civil",
    category: "Ingeniería",
    description: "Diseñar, construir y mantener infraestructura como carreteras, puentes y edificaciones.",
    salaryRange: "S/2,200 - S/6,000",
    workField: "Constructoras, consultoras, gobierno, supervisión de obras, diseño estructural",
    universities: ["UNI", "PUCP", "UPC", "Universidad Ricardo Palma", "Universidad César Vallejo"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás estructuras, supervisarás construcciones, calculará cargas y resistencias, gestionarás proyectos de infraestructura y realizarás estudios de suelos. Desarrollarás conocimientos en estructuras, hidráulica, geotecnia, materiales y gestión de proyectos.",
      purposeAndImpact: "Construirás la infraestructura que permite el desarrollo del país. Tu trabajo es fundamental para el crecimiento económico y la calidad de vida de las personas.",
      testimony: "Ver un proyecto desde el diseño hasta la construcción terminada es increíble. Saber que tu trabajo durará décadas es muy satisfactorio.",
      professionalLifestyle: "Trabajo dividido entre oficina y campo, horarios variables según proyectos, viajes frecuentes a obras. Puede ser físicamente demandante.",
      realRolesExamples: "Ingeniero de diseño, supervisor de obra, consultor estructural, inspector técnico, gerente de proyectos, ingeniero municipal.",
      commonChallenges: "Responsabilidad técnica alta, condiciones de trabajo en campo, plazos ajustados, dependencia de factores climáticos.",
      educationalRoutes: "5 años de pregrado con prácticas en obra. Colegiatura obligatoria para ejercer profesionalmente.",
      academicTrajectory: "Años 1-2: matemáticas y física. Años 3-4: estructuras y especialidades. Año 5: proyecto de tesis y especialización.",
      workAndSalary: "Ingenieros junior ganan S/2,200-3,200. Con experiencia pueden alcanzar S/4,000-6,000. Consultores independientes pueden ganar más.",
      employabilityProjection: "Buena demanda por crecimiento de infraestructura. Oportunidades en reconstrucción y proyectos de desarrollo.",
      similarCareersComparison: "Arquitectura se enfoca en diseño y espacios. Ingeniería Civil se concentra en aspectos técnicos y estructurales de la construcción."
    }
  },
  {
    id: "ingenieria-electrica",
    name: "Ingeniería Eléctrica",
    category: "Ingeniería",
    description: "Diseñar, implementar y mantener sistemas eléctricos y de potencia.",
    salaryRange: "S/2,800 - S/7,000",
    workField: "Empresas eléctricas, minería, industria, consultoras, sector energético",
    universities: ["UNI", "PUCP", "UPC", "UNMSM", "Universidad Ricardo Palma"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás instalaciones eléctricas, sistemas de potencia, automatización industrial y energías renovables. Desarrollarás conocimientos en circuitos, máquinas eléctricas, sistemas de control, electrónica de potencia y normativas eléctricas.",
      purposeAndImpact: "Proporcionarás energía eléctrica segura y eficiente para hogares e industrias. Tu trabajo es esencial para el desarrollo energético del país.",
      testimony: "Trabajar con energía es fascinante. Ver cómo tu diseño ilumina una ciudad o hace funcionar una fábrica es increíble.",
      professionalLifestyle: "Trabajo técnico especializado, combinación de oficina y campo, horarios regulares con guardias ocasionales por emergencias.",
      realRolesExamples: "Ingeniero de diseño eléctrico, especialista en subestaciones, ingeniero de mantenimiento, consultor energético, inspector eléctrico.",
      commonChallenges: "Riesgo eléctrico en el trabajo, actualización constante en tecnologías, responsabilidad por seguridad eléctrica.",
      educationalRoutes: "5 años de pregrado con fuerte componente matemático y físico. Colegiatura obligatoria.",
      academicTrajectory: "Años 1-2: matemáticas y física. Años 3-4: circuitos y máquinas eléctricas. Año 5: especialización y proyecto final.",
      workAndSalary: "Ingenieros junior ganan S/2,800-4,000. Con experiencia pueden alcanzar S/5,000-7,000. Minería ofrece los mejores salarios.",
      employabilityProjection: "Buena demanda por crecimiento industrial y energías renovables. Especialización en automatización muy valorada.",
      similarCareersComparison: "Ingeniería Electrónica se enfoca en dispositivos. Ingeniería Eléctrica maneja sistemas de potencia y energía a gran escala."
    }
  },
  {
    id: "ingenieria-mecanica",
    name: "Ingeniería Mecánica",
    category: "Ingeniería",
    description: "Diseñar, fabricar y mantener máquinas, motores y sistemas mecánicos.",
    salaryRange: "S/2,600 - S/6,500",
    workField: "Industria manufacturera, minería, automotriz, energética, consultoras",
    universities: ["UNI", "PUCP", "UPC", "UNMSM", "Universidad Ricardo Palma"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás máquinas y sistemas mecánicos, realizarás análisis de esfuerzos, gestionarás mantenimiento industrial y optimizarás procesos productivos. Desarrollarás conocimientos en termodinámica, mecánica de fluidos, resistencia de materiales y manufactura.",
      purposeAndImpact: "Crearás y mejorarás las máquinas que mueven la industria. Tu trabajo es fundamental para la productividad y competitividad industrial del país.",
      testimony: "Ver funcionar una máquina que diseñaste es increíble. Ingeniería mecánica te permite crear soluciones tangibles a problemas reales.",
      professionalLifestyle: "Trabajo en plantas industriales, combinación de diseño y campo, ambiente técnico colaborativo. Posibles turnos según la industria.",
      realRolesExamples: "Ingeniero de diseño, especialista en mantenimiento, consultor industrial, ingeniero de proyectos, supervisor de producción.",
      commonChallenges: "Ambientes industriales ruidosos, necesidad de actualización tecnológica constante, responsabilidad por seguridad industrial.",
      educationalRoutes: "5 años de pregrado con talleres y laboratorios. Prácticas industriales obligatorias.",
      academicTrajectory: "Años 1-2: matemáticas y física. Años 3-4: termodinámica y diseño mecánico. Año 5: especialización y proyecto integrador.",
      workAndSalary: "Ingenieros junior ganan S/2,600-3,800. Con experiencia pueden alcanzar S/4,500-6,500. Minería y petróleo ofrecen mejores salarios.",
      employabilityProjection: "Buena demanda en manufactura y minería. Automatización y robótica ofrecen nuevas oportunidades.",
      similarCareersComparison: "Ingeniería Industrial se enfoca en procesos. Ingeniería Mecánica se especializa en el diseño y funcionamiento de máquinas."
    }
  },
  {
    id: "ingenieria-minas",
    name: "Ingeniería de Minas",
    category: "Ingeniería",
    description: "Extraer minerales de forma segura, eficiente y sostenible.",
    salaryRange: "S/3,500 - S/12,000",
    workField: "Empresas mineras, consultoras mineras, supervisión ambiental, investigación",
    universities: ["UNI", "PUCP", "Universidad Nacional del Altiplano", "Universidad Nacional San Agustín"],
    extendedInfo: {
      activitiesAndSkills: "Planificarás operaciones mineras, diseñarás métodos de extracción, gestionarás seguridad minera y evaluarás impacto ambiental. Desarrollarás conocimientos en geología, explosivos, maquinaria pesada, ventilación minera y gestión ambiental.",
      purposeAndImpact: "Extraerás los minerales que impulsan la economía peruana. Tu trabajo es clave para uno de los sectores más importantes del país.",
      testimony: "La minería es desafiante pero muy bien remunerada. Ver una operación minera funcionando eficientemente gracias a tu planificación es satisfactorio.",
      professionalLifestyle: "Trabajo en ubicaciones remotas, turnos de 14x7 o similares, ambientes extremos, alta remuneración. Vida social limitada durante guardias.",
      realRolesExamples: "Ingeniero de operaciones minas, especialista en seguridad, planificador minero, consultor ambiental, supervisor de producción.",
      commonChallenges: "Condiciones de trabajo extremas, responsabilidad por seguridad, presión por producción, impacto familiar por ubicaciones remotas.",
      educationalRoutes: "5 años de pregrado con prácticas mineras obligatorias. Especialización posterior común.",
      academicTrajectory: "Años 1-2: matemáticas y geología básica. Años 3-4: métodos mineros y seguridad. Año 5: gestión minera y proyecto final.",
      workAndSalary: "Uno de los campos mejor pagados. Junior S/3,500-5,000. Seniors pueden ganar S/8,000-12,000 o más.",
      employabilityProjection: "Excelente por importancia de minería en Perú. Oportunidades en minería tradicional y nuevos minerales para tecnología.",
      similarCareersComparison: "Geología se enfoca en exploración. Ingeniería de Minas en extracción y operaciones mineras."
    }
  },
  {
    id: "ingenieria-agroindustrial",
    name: "Ingeniería Agroindustrial",
    category: "Ingeniería",
    description: "Transformar productos agrícolas en alimentos procesados y gestionar cadenas productivas.",
    salaryRange: "S/2,200 - S/5,500",
    workField: "Industria alimentaria, agroindustrias, consultoras, control de calidad, investigación",
    universities: ["Universidad Nacional Agraria La Molina", "UNI", "Universidad Nacional de Trujillo", "Universidad César Vallejo"],
    extendedInfo: {
      activitiesAndSkills: "Procesarás alimentos, diseñarás plantas agroindustriales, gestionarás calidad alimentaria y optimizarás cadenas productivas. Desarrollarás conocimientos en tecnología de alimentos, procesos industriales, control de calidad y gestión de la cadena de suministro.",
      purposeAndImpact: "Agregarás valor a productos agrícolas peruanos, contribuyendo a la seguridad alimentaria y competitividad del sector agroexportador.",
      testimony: "Ver cómo se transforma una materia prima agrícola en un producto de exportación es muy gratificante. Contribuyes al desarrollo del agro peruano.",
      professionalLifestyle: "Trabajo en plantas procesadoras, laboratorios y campo. Horarios regulares con picos estacionales. Ambiente técnico y colaborativo.",
      realRolesExamples: "Ingeniero de procesos alimentarios, jefe de control de calidad, consultor agroindustrial, gerente de producción, especialista en inocuidad.",
      commonChallenges: "Estacionalidad de materias primas, exigencias sanitarias estrictas, competencia internacional, necesidad de innovación constante.",
      educationalRoutes: "5 años de pregrado con prácticas en plantas agroindustriales. Enfoque en tecnología de alimentos.",
      academicTrajectory: "Años 1-2: química y biología. Años 3-4: procesos agroindustriales. Año 5: gestión y proyecto integrador.",
      workAndSalary: "Ingenieros junior ganan S/2,200-3,200. Con experiencia pueden alcanzar S/3,800-5,500. Agroexportación ofrece mejores oportunidades.",
      employabilityProjection: "Buena demanda por crecimiento agroexportador. Oportunidades en innovación alimentaria y productos orgánicos.",
      similarCareersComparison: "Ingeniería de Alimentos es más específica. Agroindustrial abarca toda la cadena desde el campo hasta el producto final."
    }
  },
  {
    id: "ingenieria-naval",
    name: "Ingeniería Naval",
    category: "Ingeniería",
    description: "Diseñar, construir y mantener embarcaciones y estructuras marinas.",
    salaryRange: "S/3,000 - S/8,000",
    workField: "Astilleros, marina de guerra, empresas pesqueras, puertos, offshore",
    universities: ["UNI", "Escuela Naval del Perú"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás embarcaciones, gestionarás astilleros, realizarás mantenimiento naval y desarrollarás proyectos marítimos. Desarrollarás conocimientos en hidrodinámica, estructuras navales, propulsión marina y sistemas de navegación.",
      purposeAndImpact: "Desarrollarás la industria naval peruana y contribuirás a la defensa nacional. Tu trabajo es clave para el aprovechamiento de recursos marítimos.",
      testimony: "Diseñar barcos es fascinante. Cada embarcación es un proyecto único con desafíos técnicos complejos.",
      professionalLifestyle: "Trabajo especializado en astilleros y puertos, proyectos de largo plazo, posible trabajo en alta mar. Campo muy específico.",
      realRolesExamples: "Ingeniero naval, diseñador de embarcaciones, inspector naval, consultor marítimo, oficial de marina mercante.",
      commonChallenges: "Campo muy especializado con pocas oportunidades, necesidad de actualización en tecnologías marinas, trabajo en ambientes marítimos.",
      educationalRoutes: "5 años de pregrado muy especializado. Pocas universidades ofrecen la carrera.",
      academicTrajectory: "Años 1-2: matemáticas y física. Años 3-4: hidrodinámica y estructuras navales. Año 5: proyecto naval integrador.",
      workAndSalary: "Ingenieros junior ganan S/3,000-4,500. Especialistas pueden alcanzar S/6,000-8,000. Campo muy especializado y bien remunerado.",
      employabilityProjection: "Limitada por especialización, pero bien remunerada. Oportunidades en industria pesquera y proyectos offshore.",
      similarCareersComparison: "Única en su especialización marítima. Combina aspectos de ingeniería mecánica con conocimientos navales específicos."
    }
  },
  {
    id: "ingenieria-telecomunicaciones",
    name: "Ingeniería de Telecomunicaciones",
    category: "Ingeniería",
    description: "Diseñar e implementar sistemas de comunicación, redes móviles y tecnologías de conectividad.",
    salaryRange: "S/1,300 - S/7,040",
    workField: "Operadoras móviles (Movistar, Claro, Bitel), OSIPTEL, MTC, consultoras TI, empresas de infraestructura",
    universities: [
      "Universidad Nacional Mayor de San Marcos (UNMSM)",
      "Pontificia Universidad Católica del Perú (PUCP)",
      "Universidad Tecnológica del Perú (UTP)",
      "Universidad Nacional de San Agustín (UNSA)",
      "Universidad Ricardo Palma"
    ],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás e implementarás redes móviles, fibra óptica, sistemas satelitales y redes de telecomunicaciones. Supervisarás instalación de torres, optimizarás sistemas de transmisión y gestionarás proyectos de conectividad. Desarrollarás habilidades en redes, sistemas de transmisión, microondas, fibra óptica, protocolos de comunicación y software de monitoreo.",
      purposeAndImpact: "Facilitarás la conectividad confiable de voz, datos y video, impulsando el desarrollo digital, la inclusión tecnológica y el acceso a servicios de telecomunicaciones en todo el país. Tu trabajo es fundamental para reducir la brecha digital.",
      testimony: "Trabajar en telecomunicaciones significa que tu proyecto tiene impacto directo en cómo se conecta una comunidad. La parte técnica es intensa, pero lo más gratificante es ver una torre lista y funcionando tras tu diseño.",
      professionalLifestyle: "Horarios mixtos entre oficina y trabajo de campo (torres, centrales). Posibles turnos por proyectos o emergencias de red. Home office limitado debido a la naturaleza presencial del trabajo en campo y centros de monitoreo. Viajes frecuentes a sitios de instalación o mantenimiento. Ritmo equilibrado con picos durante despliegue y emergencias.",
      realRolesExamples: "Ingeniero de redes móviles, especialista en sistemas inalámbricos, ingeniero de transmisiones, coordinador de proyectos telecom, ingeniero de soporte técnico. Trabajarás en operadoras móviles, consultoras TI, entidades regulatorias como OSIPTEL y MTC, e industrias con redes propias.",
      commonChallenges: "Matemáticas aplicadas complejas, física de señales avanzada, normativas técnicas estrictas, presión en tiempos de despliegue o resolución de fallas de red. Necesidad de adaptabilidad ante tecnologías cambiantes como 5G e IoT.",
      educationalRoutes: "5 años de pregrado con fuerte base en matemáticas, física y telecomunicaciones. Incluye prácticas de campo obligatorias en empresas del sector.",
      academicTrajectory: "Años 1-2: matemática avanzada, física y fundamentos de redes y electricidad. Años 3-4: telecomunicaciones digitales, sistemas inalámbricos, microondas y fibra óptica. Año 5: proyectos integradores, prácticas de campo en la industria y tesis sobre redes o conectividad.",
      workAndSalary: "Recién egresados: S/1,300-1,700. Promedio general: S/2,645. Profesionales con experiencia: hasta S/7,040. Es una de las ingenierías mejor pagadas con fuerte demanda laboral. Oportunidades tanto en empresas de telecomunicaciones como en consultoras especializadas.",
      employabilityProjection: "Empleabilidad alta debido a la importancia de las telecomunicaciones en Perú. Tendencias futuras incluyen despliegue 5G, Internet de las Cosas (IoT), ciudades inteligentes, expansión de fibra a hogares, edge computing y redes definidas por software (SDN/NFV).",
      similarCareersComparison: "Telecomunicaciones vs Ingeniería Electrónica: Telecom se enfoca en comunicaciones y redes; Electrónica en diseño de circuitos y hardware. Telecomunicaciones vs Ingeniería de Sistemas: Sistemas se orienta al software y sistemas TI; Telecom al transporte y transmisión de información."
    }
  },

  // Ciencias Sociales
  {
    id: "derecho",
    name: "Derecho",
    category: "Ciencias Sociales",
    description: "Interpretar y aplicar las leyes para resolver conflictos y defender derechos.",
    salaryRange: "S/2,000 - S/8,000",
    workField: "Estudios jurídicos, poder judicial, ministerio público, empresas, sector público",
    universities: ["PUCP", "Universidad de Lima", "UNMSM", "Universidad San Martín de Porres", "Universidad Ricardo Palma"],
    extendedInfo: {
      activitiesAndSkills: "Asesorarás legalmente, litigarás en tribunales, redactarás contratos, investigarás jurisprudencia y defenderás derechos. Desarrollarás habilidades de argumentación, redacción jurídica, oratoria, análisis de casos y negociación.",
      purposeAndImpact: "Defenderás la justicia y los derechos de las personas. Tu trabajo es fundamental para el estado de derecho y la resolución pacífica de conflictos.",
      testimony: "Derecho te permite defender a quienes más lo necesitan. Ganar un caso difícil y hacer justicia es increíblemente satisfactorio.",
      professionalLifestyle: "Horarios variables según especialización, mucha lectura y preparación de casos, ambiente profesional formal. Posibilidad de consultorio propio.",
      realRolesExamples: "Abogado litigante, asesor legal, fiscal, juez, notario, abogado corporativo, defensor público.",
      commonChallenges: "Mercado muy competitivo, casos pueden ser emocionalmente demandantes, necesidad de actualización legal constante, ingresos iniciales variables.",
      educationalRoutes: "5 años de pregrado más colegiatura obligatoria. Muchos toman especializaciones posteriores.",
      academicTrajectory: "Años 1-2: derecho constitucional y civil. Años 3-4: especialidades como penal, laboral, comercial. Año 5: práctica jurídica y tesis.",
      workAndSalary: "Abogados junior ganan S/2,000-3,500. Con experiencia pueden alcanzar S/5,000-8,000 o más. Ingresos muy variables según especialización.",
      employabilityProjection: "Campo saturado pero siempre con demanda. Especialización en derecho corporativo, tributario o digital ofrece mejores oportunidades.",
      similarCareersComparison: "Ciencias Políticas es más teórica y académica. Derecho es más práctica y orientada a la aplicación de leyes."
    }
  },
  {
    id: "ciencias-politicas",
    name: "Ciencias Políticas",
    category: "Ciencias Sociales",
    description: "Analizar sistemas políticos, políticas públicas y fenómenos sociales.",
    salaryRange: "S/2,200 - S/6,000",
    workField: "Gobierno, ONGs, consultoras, medios de comunicación, organismos internacionales, academia",
    universities: ["PUCP", "Universidad de Lima", "UNMSM", "Universidad Antonio Ruiz de Montoya"],
    extendedInfo: {
      activitiesAndSkills: "Analizarás políticas públicas, investigarás fenómenos políticos, asesorarás en campañas, evaluarás programas sociales y participarás en consultoría política. Desarrollarás pensamiento crítico, análisis de datos, redacción de informes y habilidades de investigación.",
      purposeAndImpact: "Contribuirás al análisis y mejora de la democracia. Tu trabajo puede influir en políticas que afecten a millones de personas.",
      testimony: "Ciencias Políticas te permite entender cómo funciona realmente el poder. Contribuir a políticas que mejoren la vida de las personas es muy gratificante.",
      professionalLifestyle: "Trabajo intelectual intenso, horarios flexibles, mucha lectura e investigación. Ambiente académico y de análisis.",
      realRolesExamples: "Analista político, consultor en políticas públicas, investigador social, asesor gubernamental, periodista político, funcionario de organismos internacionales.",
      commonChallenges: "Campo competitivo, oportunidades pueden depender de contactos, salarios iniciales modestos, necesidad de especialización.",
      educationalRoutes: "5 años de pregrado con enfoque en investigación. Muchos continúan con maestría.",
      academicTrajectory: "Años 1-2: teoría política y metodología. Años 3-4: políticas públicas y análisis político. Año 5: investigación especializada.",
      workAndSalary: "Analistas junior ganan S/2,200-3,500. Con experiencia pueden alcanzar S/4,000-6,000. Consultores independientes pueden ganar más.",
      employabilityProjection: "Demanda estable en gobierno y ONGs. Oportunidades crecientes en consultoría política y análisis de datos.",
      similarCareersComparison: "Derecho es más práctica en aplicación de leyes. Ciencias Políticas es más analítica y orientada a investigación y políticas públicas."
    }
  },

  // Negocios y Economía
  {
    id: "marketing",
    name: "Marketing",
    category: "Negocios y Economía",
    description: "Crear estrategias para promocionar productos y conectar marcas con consumidores.",
    salaryRange: "S/2,000 - S/7,000",
    workField: "Agencias de publicidad, empresas de todos los sectores, consultoras, emprendimiento digital",
    universities: ["PUCP", "UPC", "Universidad de Lima", "ESAN", "USIL", "Universidad San Ignacio de Loyola"],
    extendedInfo: {
      activitiesAndSkills: "Desarrollarás estrategias de marca, gestionarás redes sociales, analizarás mercados, crearás campañas publicitarias y medirás resultados. Dominarás marketing digital, análisis de datos, creatividad, comunicación y gestión de proyectos.",
      purposeAndImpact: "Conectarás productos y servicios con las personas que los necesitan. Tu trabajo impulsa el crecimiento empresarial y la innovación comercial.",
      testimony: "Marketing es muy dinámico y creativo. Ver cómo una campaña que diseñaste genera resultados reales para una empresa es emocionante.",
      professionalLifestyle: "Ambiente creativo y colaborativo, horarios flexibles, trabajo en equipo constante. Ritmo acelerado con deadlines frecuentes.",
      realRolesExamples: "Especialista en marketing digital, community manager, analista de mercados, brand manager, consultor en marketing, coordinador de campañas.",
      commonChallenges: "Campo muy competitivo, necesidad de actualización constante en tendencias digitales, presión por resultados medibles, creatividad bajo presión.",
      educationalRoutes: "5 años de pregrado con enfoque práctico. Muchas certificaciones complementarias en marketing digital.",
      academicTrajectory: "Años 1-2: fundamentos de marketing y negocios. Años 3-4: marketing digital y especialización. Año 5: proyecto integrador y prácticas.",
      workAndSalary: "Especialistas junior ganan S/2,000-3,500. Con experiencia pueden alcanzar S/4,500-7,000. Marketing digital ofrece mejores oportunidades.",
      employabilityProjection: "Excelente demanda por transformación digital. Oportunidades en e-commerce, marketing de contenidos y análisis de datos.",
      similarCareersComparison: "Administración es más general. Marketing se especializa en promoción y ventas, con mayor componente creativo."
    }
  },
  {
    id: "administracion",
    name: "Administración",
    category: "Negocios y Economía",
    description: "Gestionar recursos y procesos para lograr objetivos organizacionales eficientemente.",
    salaryRange: "S/1,800 - S/6,000",
    workField: "Empresas de todos los sectores, consultoras, bancos, sector público, emprendimiento",
    universities: ["PUCP", "Universidad de Lima", "UPC", "ESAN", "Universidad San Martín de Porres", "Universidad Continental"],
    extendedInfo: {
      activitiesAndSkills: "Gestionarás equipos, planificarás estrategias, coordinarás operaciones, analizarás finanzas y liderarás proyectos. Desarrollarás liderazgo, análisis financiero, gestión de personas, planificación estratégica y toma de decisiones.",
      purposeAndImpact: "Optimizarás el funcionamiento de organizaciones para lograr sus objetivos. Tu trabajo es fundamental para el crecimiento empresarial y la generación de empleo.",
      testimony: "Administración te da una visión integral del negocio. Liderar equipos y ver cómo la empresa crece gracias a tu gestión es muy satisfactorio.",
      professionalLifestyle: "Ambiente empresarial dinámico, horarios regulares de oficina, trabajo en equipo, responsabilidades de liderazgo. Balance vida-trabajo generalmente bueno.",
      realRolesExamples: "Asistente de gerencia, coordinador de proyectos, analista de procesos, supervisor de área, consultor empresarial, gerente de operaciones.",
      commonChallenges: "Campo muy amplio puede ser general, competencia alta, necesidad de especialización para diferenciarse, responsabilidad por resultados del equipo.",
      educationalRoutes: "5 años de pregrado con enfoque empresarial. Muchas especializaciones y MBAs posteriores.",
      academicTrajectory: "Años 1-2: fundamentos de administración y economía. Años 3-4: finanzas y marketing. Año 5: gestión estratégica y proyecto integrador.",
      workAndSalary: "Administradores junior ganan S/1,800-2,800. Con experiencia pueden alcanzar S/3,500-6,000. Crecimiento depende de especialización y sector.",
      employabilityProjection: "Demanda estable en todos los sectores. Mejores oportunidades combinando con especialización técnica o digital.",
      similarCareersComparison: "Más generalista que Marketing o Economía. Permite trabajar en cualquier industria pero requiere especialización posterior para destacar."
    }
  },
  {
    id: "economia",
    name: "Economía",
    category: "Negocios y Economía",
    description: "Analizar mercados, políticas económicas y comportamiento de la economía.",
    salaryRange: "S/2,500 - S/8,000",
    workField: "Bancos, consultoras, gobierno, organismos internacionales, investigación, academia",
    universities: ["PUCP", "Universidad de Lima", "UPC", "UNMSM", "Universidad del Pacífico"],
    extendedInfo: {
      activitiesAndSkills: "Analizarás datos económicos, elaborarás proyecciones, evaluarás políticas públicas, investigarás mercados y asesorarás en decisiones de inversión. Desarrollarás análisis cuantitativo, econometría, interpretación de indicadores económicos y modelado financiero.",
      purposeAndImpact: "Contribuirás a la toma de decisiones económicas que afectan a empresas y países. Tu análisis puede influir en políticas que beneficien a millones de personas.",
      testimony: "Economía te permite entender cómo funciona el mundo. Predecir tendencias económicas y ver que tu análisis es correcto es fascinante.",
      professionalLifestyle: "Trabajo analítico intenso, horarios regulares, ambiente profesional. Mucha investigación y análisis de datos.",
      realRolesExamples: "Analista económico, investigador de mercados, consultor financiero, analista de riesgos, economista en sector público, profesor universitario.",
      commonChallenges: "Requiere sólida base matemática, predicciones pueden fallar, necesidad de actualización constante en teorías económicas.",
      educationalRoutes: "5 años de pregrado con fuerte componente matemático. Muchos continúan con maestría.",
      academicTrajectory: "Años 1-2: microeconomía y matemáticas. Años 3-4: macroeconomía y econometría. Año 5: investigación especializada.",
      workAndSalary: "Economistas junior ganan S/2,500-4,000. Con experiencia pueden alcanzar S/5,000-8,000. Sector financiero ofrece mejores salarios.",
      employabilityProjection: "Buena demanda en sector financiero y consultorías. Análisis de datos cada vez más valorado.",
      similarCareersComparison: "Administración es más práctica y operativa. Economía es más analítica y teórica, enfocada en análisis de mercados y políticas."
    }
  },
  {
    id: "economia-finanzas",
    name: "Economía y Finanzas",
    category: "Negocios y Economía",
    description: "Combinar análisis económico con gestión financiera para optimizar decisiones de inversión.",
    salaryRange: "S/3,000 - S/10,000",
    workField: "Bancos de inversión, fondos de inversión, consultoras financieras, corporate finance",
    universities: ["Universidad del Pacífico", "PUCP", "UPC", "ESAN", "Universidad de Lima"],
    extendedInfo: {
      activitiesAndSkills: "Evaluarás proyectos de inversión, gestionarás portafolios, analizarás riesgos financieros, estructurarás operaciones financieras y asesorarás en fusiones y adquisiciones. Dominarás valoración de empresas, análisis de riesgo, productos financieros derivados y modelado financiero avanzado.",
      purposeAndImpact: "Optimizarás decisiones de inversión que pueden generar crecimiento económico y empleo. Tu trabajo es clave para el desarrollo del mercado de capitales.",
      testimony: "Finanzas combina análisis riguroso con impacto real. Estructurar una operación financiera exitosa que beneficie a todas las partes es muy gratificante.",
      professionalLifestyle: "Ambiente corporativo exigente, horarios intensos especialmente en banca de inversión, alta remuneración, trabajo bajo presión.",
      realRolesExamples: "Analista financiero, consultor en fusiones y adquisiciones, gerente de riesgos, trader, gestor de fondos, especialista en corporate finance.",
      commonChallenges: "Ambiente altamente competitivo, horarios muy demandantes, alta responsabilidad por decisiones financieras, estrés por volatilidad de mercados.",
      educationalRoutes: "5 años de pregrado con fuerte componente cuantitativo. Muchos toman MBA o especializaciones en finanzas.",
      academicTrajectory: "Años 1-2: economía y matemáticas financieras. Años 3-4: finanzas corporativas y mercados. Año 5: proyectos financieros avanzados.",
      workAndSalary: "Analistas junior ganan S/3,000-5,000. Con experience pueden alcanzar S/6,000-10,000 o más. Uno de los campos mejor remunerados.",
      employabilityProjection: "Excelente en banca de inversión y gestión de fondos. Mercado de capitales peruano en crecimiento ofrece oportunidades.",
      similarCareersComparison: "Economía pura es más académica. Economía y Finanzas es más práctica y orientada a decisiones de inversión empresarial."
    }
  },

  // Arquitectura y Diseño
  {
    id: "arquitectura",
    name: "Arquitectura",
    category: "Arquitectura y Diseño",
    description: "Diseñar espacios funcionales, estéticos y sostenibles para mejorar la calidad de vida.",
    salaryRange: "S/2,000 - S/6,000",
    workField: "Estudios de arquitectura, consultoras, sector público, desarrollo inmobiliario",
    universities: ["PUCP", "UNI", "Universidad Ricardo Palma", "Universidad de Lima", "UPC"],
    extendedInfo: {
      activitiesAndSkills: "Diseñarás edificios y espacios, crearás planos arquitectónicos, coordinarás con ingenieros, supervisarás construcciones y desarrollarás proyectos urbanos. Dominarás software de diseño (AutoCAD, Revit, SketchUp), composición espacial, sostenibilidad y gestión de proyectos.",
      purposeAndImpact: "Crearás espacios que mejoren la calidad de vida de las personas. Tu trabajo da forma al entorno urbano y contribuye al desarrollo sostenible de las ciudades.",
      testimony: "Arquitectura combina arte, técnica y función. Ver un edificio que diseñaste transformar un espacio urbano es increíblemente satisfactorio.",
      professionalLifestyle: "Trabajo creativo combinado con aspectos técnicos, horarios flexibles con picos intensos por entregas, trabajo colaborativo con diversos profesionales.",
      realRolesExamples: "Arquitecto diseñador, consultor en construcción sostenible, arquitecto de interiores, gestor de proyectos inmobiliarios, funcionario de desarrollo urbano.",
      commonChallenges: "Mercado competitivo, proyectos de largo plazo, necesidad de colegiatura, balancear creatividad con viabilidad técnica y económica.",
      educationalRoutes: "5 años de pregrado con fuerte componente de diseño y práctica. Colegiatura obligatoria para ejercer.",
      academicTrajectory: "Años 1-2: dibujo y diseño básico. Años 3-4: proyectos arquitectónicos complejos. Año 5: proyecto de tesis y prácticas profesionales.",
      workAndSalary: "Arquitectos junior ganan S/2,000-3,200. Con experiencia pueden alcanzar S/4,000-6,000. Arquitectos independientes con clientela establecida pueden ganar más.",
      employabilityProjection: "Demanda estable por crecimiento urbano. Oportunidades en arquitectura sostenible y rehabilitación de espacios urbanos.",
      similarCareersComparison: "Ingeniería Civil se enfoca en aspectos técnicos estructurales. Arquitectura combina diseño, función y estética de espacios habitables."
    }
  },
  {
    id: "diseño-grafico",
    name: "Diseño Gráfico",
    category: "Arquitectura y Diseño",
    description: "Crear soluciones visuales que comuniquen ideas con impacto y conecten con las personas.",
    salaryRange: "S/1,300 - S/4,000",
    workField: "Agencias de publicidad, estudios de diseño, equipos creativos in-house, emprendimientos freelance, medios digitales",
    universities: [
      "Universidad Nacional de Ingeniería (UNI)",
      "IESTP Diseño y Comunicación (IDC)",
      "Pontificia Universidad Católica del Perú (PUCP)",
      "Universidad de Lima",
      "Universidad Peruana de Ciencias Aplicadas (UPC)",
      "Universidad San Ignacio de Loyola (USIL)",
      "Toulouse Lautrec",
      "Instituto Continental",
      "Universidad de Ciencias y Artes de América Latina (UCAL)",
      "Centro de la Imagen"
    ],
    extendedInfo: {
      activitiesAndSkills: "Crearás identidades visuales, diseñarás piezas impresas y digitales, desarrollarás interfaces para aplicaciones, crearás contenidos animados y diseñarás campañas publicitarias. Dominarás Adobe Creative Suite (Illustrator, Photoshop, After Effects), Figma, fundamentos de color y tipografía, branding y principios de diseño UI/UX. Desarrollarás creatividad, pensamiento crítico, empatía visual, atención al detalle y habilidades de comunicación con clientes.",
      purposeAndImpact: "Ayudarás a dar forma a marcas, mensajes y productos que conectan con las personas. Tu trabajo impacta en cómo las personas comprenden ideas, interactúan con aplicaciones o se vinculan emocionalmente con una organización. Desde causas sociales hasta experiencias digitales, el diseño gráfico es comunicación visual poderosa que puede influir en comportamientos y decisiones.",
      testimony: "Convertir conceptos abstractos en piezas visuales que realmente conectan con personas es muy satisfactorio. El diseño hoy es parte clave del marketing, la tecnología y la experiencia de usuario. Es más estratégico de lo que muchos piensan.",
      professionalLifestyle: "Puedes trabajar en estudios de diseño, agencias creativas o desde casa como freelancer. Algunos roles tienen deadlines exigentes durante el lanzamiento de campañas, pero también ofrecen gran flexibilidad horaria. Alta interacción con equipos creativos, clientes de diferentes industrias o desarrolladores en proyectos digitales. Balance vida-trabajo generalmente favorable.",
      realRolesExamples: "Diseñador gráfico general, especialista en branding e identidad visual, diseñador UI/UX para aplicaciones, motion graphics designer, ilustrador digital, director de arte, diseñador editorial, consultor creativo freelance. Sectores principales: publicidad, medios de comunicación, tecnología, educación, e-commerce y consultoría en imagen corporativa.",
      commonChallenges: "Mantenerse actualizado con tendencias visuales y herramientas digitales en constante evolución. Comunicar el valor estratégico del diseño más allá de lo estético. Competencia en el mercado freelance. Equilibrar creatividad personal con requerimientos específicos del cliente. Deadlines ajustados y múltiples proyectos simultáneos.",
      educationalRoutes: "5 años en universidades o 3 años en institutos especializados. Muchos complementan con cursos especializados, workshops y certificaciones en herramientas específicas como Adobe o Figma.",
      academicTrajectory: "Años 1-2: fundamentos de diseño, teoría del color, historia del arte, dibujo básico y software introductorio. Años 3-4: proyectos gráficos aplicados, branding, ilustración digital, diseño web, animación básica y edición multimedia. Año final: especialización (UI/UX, audiovisual, publicitario), desarrollo de portafolio profesional y prácticas en agencias o estudios.",
      workAndSalary: "Diseñadores gráficos recién graduados ganan entre S/1,300 y S/2,500. Profesionales con experiencia en roles especializados como UI/UX o dirección de arte pueden superar los S/4,000. Los sectores mejor remunerados incluyen tecnología, publicidad, medios digitales, educación corporativa y e-commerce.",
      employabilityProjection: "Alta demanda en entornos digitales y transformación digital de empresas. Nuevas oportunidades emergen en experiencia de usuario (UX), inteligencia artificial generativa aplicada al diseño, motion graphics, diseño de accesibilidad visual y contenido para redes sociales. El crecimiento del e-commerce y marketing digital amplía constantemente las oportunidades laborales.",
      similarCareersComparison: "Publicidad se enfoca más en estrategia de campañas y conceptos. Comunicación abarca contenido editorial y medios. Artes visuales es más conceptual y expresivo. Diseño de Producto se orienta a objetos físicos y experiencias tangibles, mientras que Diseño Gráfico se centra en comunicación visual y experiencias digitales."
    }
  }
];
