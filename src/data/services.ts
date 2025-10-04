import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    title: 'Redacción de Contenidos y Copywriting',
    description: 'Creación de textos persuasivos y de alta calidad para webs, blogs, dossieres de prensa y comunicación corporativa.',
    formats: [
      'Artículos para blogs y revistas',
      'Contenido para páginas web',
      'Notas de prensa y comunicados',
      'Guiones para vídeo y podcast',
    ],
    pricing: 'Tarifas por proyecto o por palabra.',
  },
  {
    title: 'Consultoría de Comunicación y Estrategia de Medios',
    description: 'Asesoramiento para definir y ejecutar estrategias de comunicación efectivas, mejorar la visibilidad y gestionar la relación con los medios.',
    formats: [
      'Diseño de planes de comunicación',
      'Formación de portavoces (Media Training)',
      'Gestión de crisis de reputación',
      'Relaciones con medios y periodistas',
    ],
    pricing: 'Tarifas por hora o planes mensuales.',
  },
  {
    title: 'Investigación y Documentación',
    description: 'Servicios de investigación exhaustiva para proyectos periodísticos, documentales, libros o informes corporativos.',
    formats: [
      'Búsqueda y verificación de fuentes',
      'Análisis de datos y estadísticas',
      'Elaboración de dosieres temáticos',
      'Entrevistas en profundidad',
    ],
    pricing: 'Tarifas por proyecto.',
  },
  {
    title: 'Moderación de Eventos y Conferencias',
    description: 'Conducción y moderación de mesas redondas, debates, entrevistas y eventos corporativos con profesionalidad y dinamismo.',
    formats: [
      'Moderación de paneles y debates',
      'Presentación de eventos',
      'Entrevistas en directo',
    ],
    pricing: 'Tarifas por evento.',
  },
];
