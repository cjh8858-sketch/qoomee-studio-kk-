
import { Portfolio, SiteSettings } from './types';

export const INITIAL_PORTFOLIOS: Portfolio[] = [
  {
    id: '1',
    title: '시그니처 향수 런칭 브랜드 필름',
    category: '제품 홍보 영상',
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=itFdtlYKtXw',
    summary: '감각적인 비주얼과 사운드 디자인을 결합한 프리미엄 향수 브랜딩 영상입니다.',
    description: '향수의 신비로운 이미지와 고급스러운 패키징을 강조하기 위해 매크로 촬영 기법을 사용하였습니다. 브랜드의 철학인 "보이지 않는 아름다움"을 시각화하는 데 집중했습니다.',
    tags: ['시네마틱', '브랜딩', '고급'],
    projectDate: '2024-01-15',
    isPublic: true
  },
  {
    id: '2',
    title: '미니멀리스트 테크 상세페이지',
    category: '상세페이지',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=1200'
    ],
    summary: '전자기기의 기능성과 심미성을 동시에 강조한 고전환율 상세페이지 디자인입니다.',
    description: '복잡한 기능 설명을 최소화하고 직관적인 인포그래픽과 실물 위주의 감성 사진을 배치하여 신뢰도를 높였습니다. 모바일 최적화 레이아웃으로 설계되었습니다.',
    tags: ['미니멀', '테크', '고전환'],
    projectDate: '2024-02-10',
    isPublic: true
  },
  {
    id: '3',
    title: '3D 마스코트 캐릭터 렌더링',
    category: '기타',
    thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200'
    ],
    summary: '브랜드의 친근함을 더해주는 3D 캐릭터 아이덴티티 구축 프로젝트입니다.',
    description: '브랜드의 가치를 투영한 독창적인 캐릭터를 설계하고, 다양한 매체에서 활용 가능한 고퀄리티 3D 렌더링 이미지를 제작하였습니다.',
    tags: ['3D렌더링', '캐릭터디자인', '아이덴티티'],
    projectDate: '2024-03-12',
    isPublic: true
  },
  {
    id: '4',
    title: '천연 화장품 브랜드 아이덴티티',
    category: '기타',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=1200'
    ],
    summary: '자연의 순수함을 담은 로고 및 패키징 컨설팅 프로젝트입니다.',
    description: '브랜드 로고부터 실제 패키지 제작물까지 일관된 톤앤매너를 구축했습니다. 종이 질감의 패키지와 자연 유래 성분을 강조하는 비주얼 가이드를 제안했습니다.',
    tags: ['브랜딩', '패키지', '컨설팅'],
    projectDate: '2024-03-20',
    isPublic: true
  },
  {
    id: '5',
    title: '프리미엄 헤드폰 홍보 영상',
    category: '제품 홍보 영상',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=itFdtlYKtXw',
    summary: '제품의 질감과 사운드의 깊이를 시각적으로 표현한 하이엔드 영상입니다.',
    description: '금속의 차가운 느낌과 가죽의 부드러움을 대비시키는 조명 연출을 통해 제품의 고급스러움을 극대화했습니다.',
    tags: ['하이엔드', '음향가전', '시네마틱'],
    projectDate: '2024-04-05',
    isPublic: true
  },
  {
    id: '6',
    title: '프리미엄 리빙 브랜드 룩북',
    category: '상세페이지',
    thumbnail: 'https://images.unsplash.com/photo-1616489953149-847d07963d7e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1616489953149-847d07963d7e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=1200'
    ],
    summary: '공간의 가치를 높여주는 가구 브랜드의 웹 매거진 스타일 룩북 상세페이지입니다.',
    description: '단순한 상품 판매를 넘어 라이프스타일을 제안하는 매거진 레이아웃을 채택했습니다. 고감도 인테리어 샷을 중심으로 브랜드 이미지를 프리미엄화했습니다.',
    tags: ['리빙', '가구', '룩북'],
    projectDate: '2024-04-15',
    isPublic: true
  }
];

const createEmbed = (url: string) => `
  <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${url}" data-instgrm-version="14" style=" background:#000; border:0; border-radius:16px; box-shadow:0 0 1px 0 rgba(255,255,255,0.5),0 1px 10px 0 rgba(255,255,255,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%;">
  </blockquote>
`;

export const INITIAL_SETTINGS: SiteSettings = {
  siteName: '꾸미스튜디오',
  primaryColor: '#000000',
  accentColor: '#FFD700',
  fontFamily: 'Pretendard',
  contactEmail: 'cjh8858@gmail.com',
  instagramUrl: 'https://www.instagram.com/qoomee_studio',
  youtubeUrl: 'https://www.youtube.com/watch?v=itFdtlYKtXw',
  instagramEmbeds: [
    createEmbed('https://www.instagram.com/reel/DSoi_3oD3mb/'),
    createEmbed('https://www.instagram.com/reel/DShopPrDySc/'),
    createEmbed('https://www.instagram.com/p/DSSD8l8jwk2/')
  ],
  instagramWidgetId: '' 
};
