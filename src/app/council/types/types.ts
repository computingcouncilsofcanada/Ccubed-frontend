export type CouncilSection = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  universities?: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  }[];
  comingSoon?: boolean;
};

export type CouncilCardIconProps = {
  section: CouncilSection;
  hovered: number | null;
  index: number;
};

export type CouncilCardProps = {
  section: CouncilSection;
  index: number;
};

export type CouncilContentProps = {
  section: CouncilSection;
  isComingSoon?: boolean;
};
