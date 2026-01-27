import { Photo, Service, Testimonial, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Início', path: '/' },
  { label: 'Portfólio', path: '/portfolio' },
  { label: 'Serviços', path: '/services' },
  { label: 'Contato', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com/lumina', id: 'ig' },
  { label: 'Vimeo', url: 'https://vimeo.com/lumina', id: 'vim' },
  { label: 'Pinterest', url: 'https://pinterest.com/lumina', id: 'pin' }
];

export const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/800/1200?random=1', title: 'Votos Eternos', category: 'wedding' },
  { id: '2', url: 'https://picsum.photos/800/800?random=2', title: 'Solidão Urbana', category: 'portrait' },
  { id: '3', url: 'https://picsum.photos/800/1000?random=3', title: 'Essência da Marca', category: 'commercial' },
  { id: '4', url: 'https://picsum.photos/800/1200?random=4', title: 'Hora Dourada', category: 'wedding' },
  { id: '5', url: 'https://picsum.photos/800/600?random=5', title: 'Presença Executiva', category: 'portrait' },
  { id: '6', url: 'https://picsum.photos/800/1200?random=6', title: 'Moda & Conceito', category: 'editorial' },
  { id: '7', url: 'https://picsum.photos/800/800?random=7', title: 'Lançamento de Produto', category: 'commercial' },
  { id: '8', url: 'https://picsum.photos/800/1000?random=8', title: 'Momentos Íntimos', category: 'wedding' },
  { id: '9', url: 'https://picsum.photos/800/1200?random=9', title: 'Sessão em Estúdio', category: 'portrait' },
];

export const SERVICES: Service[] = [
  {
    id: 'wedding',
    title: 'Coleção Casamentos',
    price: 'A partir de R$ 5.000',
    description: 'Documentando sua história de amor com elegância cinematográfica e emoção autêntica.',
    features: ['8+ Horas de Cobertura', 'Segundo Fotógrafo', 'Galeria Online', 'Álbum Fine Art'],
    cta: 'Consultar Disponibilidade'
  },
  {
    id: 'portrait',
    title: 'Sessões de Retrato',
    price: 'A partir de R$ 900',
    description: 'Capturando sua verdadeira essência em estúdio ou locação externa.',
    features: ['Sessão de 1-2 Horas', '2 Trocas de Roupa', '20 Imagens Retocadas', 'Direitos de Impressão'],
    cta: 'Agendar Sessão'
  },
  {
    id: 'commercial',
    title: 'Fotografia de Marca',
    price: 'Sob Medida',
    description: 'Elevando a identidade visual da sua marca para atrair os clientes ideais.',
    features: ['Reunião de Estratégia', 'Diária Completa', 'Direitos de Uso Comercial', 'Cortes para Redes Sociais'],
    cta: 'Solicitar Proposta'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & Tiago',
    role: 'Casamento',
    text: "As fotos ficaram absolutamente deslumbrantes. Eles não capturaram apenas como estávamos, mas como nos sentimos. Toda a experiência foi fluida e profissional."
  },
  {
    id: '2',
    name: 'Elena Rodrigues',
    role: 'Diretora Criativa',
    text: "Um olho incrível para detalhes. A campanha comercial superou nossos KPIs e deu à nossa marca o visual premium que buscávamos."
  },
  {
    id: '3',
    name: 'Miguel Chen',
    role: 'CEO, TechFlow',
    text: "Profissional, eficiente e os resultados falam por si. Os retratos corporativos transformaram completamente a página da nossa equipe."
  }
];

export const CONTACT_INFO = {
  email: 'ola@lumina.studio',
  phone: '+55 (11) 99999-9999',
  location: 'São Paulo, SP & Disponível Globalmente'
};