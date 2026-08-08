export const scrollToSection = ({
  behavior = 'smooth',
  id,
  offset = 0,
}: {
  behavior?: ScrollBehavior;
  id: string;
  offset?: number;
}) => {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    behavior,
    top,
  });
};
