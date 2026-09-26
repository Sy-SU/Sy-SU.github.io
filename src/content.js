import profileImage from '../images/profile-web.jpg';

export const profile = {
  name: 'Senyang Su',
  role: "Master's Student",
  field: 'Computer Science',
  affiliation: 'Huazhong University of Science and Technology',
  location: 'Wuhan, China',
  introduction:
    'I am a master\'s student at Huazhong University of Science and Technology and a member of HUST Media Lab. My research focuses on interactive scene generation.',
  image: profileImage,
  imageAlt: 'Portrait of Senyang Su',
};

// Add a URL to make a contact entry appear in the hero.
export const contactLinks = [
  { id: 'email', label: 'Email', href: 'mailto:susenyang@hust.edu.cn' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/Sy-SU' },
  {
    id: 'zhihu',
    label: 'Zhihu',
    href: 'https://www.zhihu.com/people/hong-lou-meng-zhong-57',
  },
  { id: 'bilibili', label: 'Bilibili', href: 'https://space.bilibili.com/85716322' },
  { id: 'scholar', label: 'Scholar', href: null },
  { id: 'cv', label: 'CV', href: null },
];

// Research stays hidden until at least one public item is added.
export const research = [];

export const education = [
  {
    id: 'hust-masters',
    degree: "Master's degree",
    status: 'In progress',
    field: 'Computer Science',
    institution: 'Huazhong University of Science and Technology',
    dates: '2026-Present',
    location: 'Wuhan, China',
  },
  {
    id: 'hzau-bachelors',
    degree: "Bachelor's degree",
    status: null,
    field: 'Information and Computing Science',
    institution: 'Huazhong Agricultural University',
    dates: '2022-2026',
    location: 'Wuhan, China',
  },
];

export const awards = [
  {
    name: 'CCPC National Invitational Contest',
    detail: 'Gold Award',
    context: 'Guizhou (2026)',
  },
  {
    name: 'ICPC Asia Regional Contests',
    detail: 'Bronze Medals',
    context: '50th Nanjing Regional (2025) / 49th Shenyang Regional (2024)',
  },
  {
    name: 'Group Programming Ladder Tournament',
    detail: 'Second Prize',
    context: 'National Final (2025)',
  },
];

export const projects = [
  {
    name: 'VAE vs GAN',
    subtitle: 'Generative Models Reading Report',
    description:
      'A comparative reading report on Gaussian mixture models, VAEs, GANs, and diffusion models, with a controlled VAE–DCGAN experiment on MNIST.',
    websiteUrl: 'https://sy-su.github.io/VAEvsGAN/',
    codeUrl: 'https://github.com/Sy-SU/VAEvsGAN',
  },
  {
    name: '3D Shape Tokenization',
    subtitle: 'Latent Flow Matching Reproduction',
    description:
      'An open-source reproduction of 3D Shape Tokenization via Latent Flow Matching, with reproducible training, evaluation, and reconstruction visualizations.',
    websiteUrl: 'https://sy-su.github.io/3D-Shape-Tokenization/',
    codeUrl: 'https://github.com/Sy-SU/3D-Shape-Tokenization',
  },
];
