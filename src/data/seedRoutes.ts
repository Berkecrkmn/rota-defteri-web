import type { RouteCategory, TravelRoute } from '../interfaces/route'

export const categories: RouteCategory[] = [
  'Kültür',
  'Sahil',
  'Fotoğraf',
  'Kahve',
  'Tarih',
  'Doğa',
]

export const routeColors = ['#B65335', '#0E5B4B', '#2D5B7A', '#8A3F61', '#A66A24', '#526B3E']

export const seedRoutes: TravelRoute[] = [
  {
    id: 'kadikoy-tasarim',
    title: 'Kadıköy Tasarım Turu',
    district: 'Kadıköy',
    category: 'Kültür',
    duration: 210,
    distance: 3.6,
    budget: '450-650 TL',
    bestTime: '13.00',
    notes: 'Atölyeler, bağımsız kitapçılar ve ara sokak kafeleriyle yaratıcı bir yürüyüş.',
    color: '#B65335',
  },
  {
    id: 'balat-fotograf',
    title: 'Balat Fotoğraf Rotası',
    district: 'Fatih',
    category: 'Fotoğraf',
    duration: 180,
    distance: 2.8,
    budget: '300-500 TL',
    bestTime: '10.30',
    notes: 'Renkli cepheler, yokuşlar ve küçük molalarla sakin bir fotoğraf planı.',
    color: '#8A3F61',
  },
  {
    id: 'uskudar-aksam',
    title: 'Üsküdar Akşam Rotası',
    district: 'Üsküdar',
    category: 'Sahil',
    duration: 150,
    distance: 2.4,
    budget: '250-420 TL',
    bestTime: '18.00',
    notes: 'Sahil yürüyüşü, kısa çay molası ve gün batımı için pratik bir plan.',
    color: '#0E5B4B',
  },
  {
    id: 'emirgan-sahil',
    title: 'Emirgan Sahil Molası',
    district: 'Sarıyer',
    category: 'Doğa',
    duration: 240,
    distance: 4.2,
    budget: '350-600 TL',
    bestTime: '09.30',
    notes: 'Koru, sahil ve hafif tempolu yürüyüşü birleştiren ferah bir rota.',
    color: '#526B3E',
  },
]
