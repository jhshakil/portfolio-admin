export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export type TProject = {
  id?: string;
  title: string;
  subTitle: string;
  technology: string;
  image?: string;
  description?: string;
};

export type TExperience = {
  id?: string;
  companyName: string;
  duration: string;
  designation: string;
  description: string;
  priority?: number;
};

export type TSkill = {
  id?: string;
  name: string;
  percentage: string;
  color?: string;
};

export type TSocial = {
  id?: string;
  name: string;
  url: string;
  icon?: string;
};
