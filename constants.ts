import { Photo, Service, Testimonial, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', url: 'https://instagram.com/lumina', id: 'ig' },
  { label: 'Vimeo', url: 'https://vimeo.com/lumina', id: 'vim' },
  { label: 'Pinterest', url: 'https://pinterest.com/lumina', id: 'pin' }
];

export const PHOTOS: Photo[] = [
  { id: '1', url: 'https://picsum.photos/800/1200?random=1', title: 'Eternal Vows', category: 'wedding' },
  { id: '2', url: 'https://picsum.photos/800/800?random=2', title: 'Urban Solitude', category: 'portrait' },
  { id: '3', url: 'https://picsum.photos/800/1000?random=3', title: 'Brand Essence', category: 'commercial' },
  { id: '4', url: 'https://picsum.photos/800/1200?random=4', title: 'Golden Hour', category: 'wedding' },
  { id: '5', url: 'https://picsum.photos/800/600?random=5', title: 'Executive Presence', category: 'portrait' },
  { id: '6', url: 'https://picsum.photos/800/1200?random=6', title: 'Fashion Forward', category: 'editorial' },
  { id: '7', url: 'https://picsum.photos/800/800?random=7', title: 'Product Launch', category: 'commercial' },
  { id: '8', url: 'https://picsum.photos/800/1000?random=8', title: 'Intimate Moments', category: 'wedding' },
  { id: '9', url: 'https://picsum.photos/800/1200?random=9', title: 'Studio Session', category: 'portrait' },
];

export const SERVICES: Service[] = [
  {
    id: 'wedding',
    title: 'Wedding Collections',
    price: 'Starting at $2,500',
    description: 'Documenting your love story with cinematic elegance and authentic emotion.',
    features: ['8+ Hours Coverage', 'Second Shooter', 'Online Gallery', 'Fine Art Album'],
    cta: 'Inquire Availability'
  },
  {
    id: 'portrait',
    title: 'Portrait Sessions',
    price: 'Starting at $450',
    description: 'Capturing your true essence in studio or on location.',
    features: ['1-2 Hours Session', '2 Outfit Changes', '20 Retouched Images', 'Print Release'],
    cta: 'Book Session'
  },
  {
    id: 'commercial',
    title: 'Brand Photography',
    price: 'Custom Quote',
    description: 'Elevating your brand visual identity to attract your ideal clients.',
    features: ['Strategy Call', 'Full Day Shooting', 'Commercial Usage Rights', 'Social Media Cuts'],
    cta: 'Request Proposal'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah & James',
    role: 'Wedding Clients',
    text: "The photos are absolutely breathtaking. They didn't just capture how we looked, but how we felt. The entire experience was seamless and professional."
  },
  {
    id: '2',
    name: 'Elena Rodriguez',
    role: 'Creative Director',
    text: "An incredible eye for detail. The commercial campaign exceeded our KPIs and gave our brand the premium look we were striving for."
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'CEO, TechFlow',
    text: "Professional, efficient, and the results speak for themselves. The headshots have completely transformed our executive team page."
  }
];

export const CONTACT_INFO = {
  email: 'hello@lumina.studio',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY & Available Worldwide'
};