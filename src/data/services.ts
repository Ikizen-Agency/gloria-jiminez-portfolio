import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    title: 'Redacción de Artículos y Contenidos',
    description: 'Creación de artículos de todo tipo, reportajes, crónicas y contenido especializado para diversas plataformas y audiencias.',
    formats: [
      'Artículos de investigación',
      'Reportajes en profundidad',
      'Contenido para blogs y webs',
      'Copywriting y textos corporativos',
    ],
    pricing: 'Tarifas por proyecto o por palabra.',
  },
  {
    title: 'Moderación de Eventos y Conferencias',
    description: 'Conducción y moderación de mesas redondas, debates, entrevistas y eventos corporativos con profesionalidad y dinamismo.',
    formats: [
      'Moderación de paneles y debates',
      'Presentación de eventos',
      'Entrevistas en directo',
      'Conducción de conferencias',
    ],
    pricing: 'Tarifas por evento.',
  },
];
