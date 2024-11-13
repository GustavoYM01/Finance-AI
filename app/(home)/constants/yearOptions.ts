export const YEAR_OPTIONS = () => {
  const anoAtual = new Date().getFullYear();
  return [
    { value: `${anoAtual}` },
    { value: `${anoAtual + 1}` },
    { value: `${anoAtual + 2}` },
    { value: `${anoAtual + 3}` },
    { value: `${anoAtual + 4}` },
  ];
};