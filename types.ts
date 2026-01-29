
export interface Portfolio {
  id: string;
  title: string;
  category: '제품 홍보 영상' | '행사 영상' | '상세페이지' | '기타';
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  summary: string;
  description: string;
  tags: string[];
  projectDate: string;
  isPublic: boolean;
}

export interface SiteSettings {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  contactEmail: string;
  instagramUrl: string;
  youtubeUrl: string;
  instagramEmbeds: string[]; 
  instagramWidgetId?: string;
}

export type AppState = {
  portfolios: Portfolio[];
  settings: SiteSettings;
};
