import type { Article } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(p => p.id === id) || { imageUrl: '', imageHint: '' };

export const articles: Article[] = [
  {
    slug: 'la-crisis-del-agua-una-investigacion-profunda',
    title: 'La Crisis del Agua: Una Investigación Profunda',
    excerpt: 'Un análisis exhaustivo sobre la escasez de agua en las comunidades rurales y las soluciones políticas que se están ignorando.',
    date: '15 de Julio, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Medio Ambiente', 'Política', 'Investigación'],
    heroImageUrl: findImage('article-1').imageUrl,
    heroImageHint: findImage('article-1').imageHint,
    content: `
      <p>La escasez de agua es uno de los desafíos más apremiantes de nuestro tiempo. Este artículo explora las causas subyacentes de la crisis en las comunidades rurales, desde el cambio climático hasta la mala gestión de los recursos hídricos.</p>
      <h2 class="font-headline text-2xl font-bold my-4">Causas Estructurales</h2>
      <p>Analizamos cómo las políticas gubernamentales y los intereses corporativos a menudo exacerban el problema, desviando recursos de quienes más los necesitan. Entrevistas con agricultores locales y expertos en hidrología revelan una imagen compleja y preocupante.</p>
      <blockquote class="border-l-4 border-primary pl-4 my-4 italic">"El agua es un derecho, no una mercancía. Pero aquí, parece que solo cuenta el dinero", lamenta un líder comunitario.</blockquote>
      <p>Se presentan estudios de caso de varias regiones, comparando las estrategias de mitigación y destacando tanto los fracasos como los raros casos de éxito. La conclusión es clara: se necesita un cambio de paradigma en la gestión del agua para evitar una catástrofe humanitaria y ecológica.</p>
    `,
  },
  {
    slug: 'el-auge-de-la-inteligencia-artificial-en-el-arte',
    title: 'El Auge de la Inteligencia Artificial en el Arte',
    excerpt: '¿Son los algoritmos los nuevos artistas? Exploramos el impacto de la IA en el mundo creativo, desde la pintura hasta la música.',
    date: '28 de Junio, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Tecnología', 'Cultura', 'Arte'],
    heroImageUrl: findImage('article-4').imageUrl,
    heroImageHint: findImage('article-4').imageHint,
    content: `
      <p>La inteligencia artificial ha irrumpido en el mundo del arte, generando tanto fascinación como controversia. Herramientas como DALL-E y Midjourney pueden crear imágenes asombrosas a partir de simples descripciones de texto, mientras que otras componen música o escriben poesía.</p>
      <p>Este reportaje se sumerge en el debate: ¿Es esto realmente arte? ¿Cuál es el papel del artista humano en la era de la IA? Hablamos con artistas digitales, programadores y críticos de arte para obtener una visión completa.</p>
    `,
  },
  {
    slug: 'memoria-historica-las-voces-olvidadas',
    title: 'Memoria Histórica: Las Voces Olvidadas de la Transición',
    excerpt: 'Un reportaje que saca a la luz testimonios inéditos de los protagonistas anónimos de un periodo clave en la historia reciente.',
    date: '10 de Junio, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Historia', 'Sociedad', 'Investigación'],
    heroImageUrl: findImage('article-2').imageUrl,
    heroImageHint: findImage('article-2').imageHint,
    content: `
      <p>La historia oficial a menudo deja en la sombra a quienes la vivieron desde la base. Este trabajo recupera las voces de activistas vecinales, sindicalistas y ciudadanos que jugaron un papel crucial, pero anónimo, durante la Transición Española.</p>
      <p>A través de entrevistas y archivos desclasificados, reconstruimos una narrativa más rica y polifónica de aquellos años convulsos y esperanzadores.</p>
    `,
  },
  {
    slug: 'gastronomia-molecular-ciencia-en-la-cocina',
    title: 'Gastronomía Molecular: La Ciencia en la Cocina',
    excerpt: 'Deconstrucciones, espumas y esferificaciones. Un viaje al corazón de la cocina de vanguardia que fusiona ciencia y sabor.',
    date: '22 de Mayo, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Cultura', 'Gastronomía', 'Ciencia'],
    heroImageUrl: findImage('article-3').imageUrl,
    heroImageHint: findImage('article-3').imageHint,
    content: `
      <p>La gastronomía molecular ha revolucionado la forma en que entendemos la comida. Visitamos las cocinas de chefs innovadores que utilizan técnicas de laboratorio para crear experiencias culinarias únicas.</p>
      <p>Explicamos los principios científicos detrás de las técnicas más famosas y debatimos si esta tendencia es una moda pasajera o el futuro de la alta cocina.</p>
    `,
  },
   {
    slug: 'diplomacia-en-la-era-digital',
    title: 'La Diplomacia en la Era Digital: Retos y Oportunidades',
    excerpt: 'Análisis sobre cómo las redes sociales y la comunicación instantánea están redefiniendo las relaciones internacionales y el poder blando.',
    date: '5 de Mayo, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Política', 'Internacional'],
    heroImageUrl: findImage('article-5').imageUrl,
    heroImageHint: findImage('article-5').imageHint,
    content: '<p>Contenido del artículo sobre diplomacia digital...</p>',
  },
  {
    slug: 'el-renacer-de-los-barrios',
    title: 'El Renacer de los Barrios: Iniciativas Comunitarias que Transforman Ciudades',
    excerpt: 'Crónica sobre cómo los movimientos vecinales están revitalizando espacios urbanos abandonados a través del arte y la colaboración.',
    date: '18 de Abril, 2024',
    author: 'Gloria Yolanda Jimenez',
    tags: ['Sociedad', 'Urbanismo', 'Cultura'],
    heroImageUrl: findImage('article-6').imageUrl,
    heroImageHint: findImage('article-6').imageHint,
    content: '<p>Contenido del artículo sobre iniciativas comunitarias...</p>',
  },
];
