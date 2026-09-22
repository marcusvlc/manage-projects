const PROJECTS_TERMS_STORAGE_KEY = "projects-search-terms";
const MAX_PROJECTS_TERMS = 5;

export const useProjectsTermsApi = () => {
  const getTerms = (): string[] => {
    if (!import.meta.client) return [];

    const storedTerms = localStorage.getItem(PROJECTS_TERMS_STORAGE_KEY);

    if (!storedTerms) return [];

    try {
      const terms = JSON.parse(storedTerms);
      return Array.isArray(terms)
        ? terms.filter((term) => typeof term === "string")
        : [];
    } catch {
      return [];
    }
  };

  const saveTerm = (term: string) => {
    if (!import.meta.client) return;

    const normalizedTerm = term.trim();

    if (!normalizedTerm) return;

    const terms = getTerms().filter(
      (storedTerm) =>
        storedTerm.toLocaleLowerCase() !== normalizedTerm.toLocaleLowerCase(),
    );

    terms.unshift(normalizedTerm);
    localStorage.setItem(
      PROJECTS_TERMS_STORAGE_KEY,
      JSON.stringify(terms.slice(0, MAX_PROJECTS_TERMS)),
    );
  };

  const removeTerm = (termIndex: number) => {
    if (!import.meta.client) return;

    const terms = getTerms();
    terms.splice(termIndex, 1);
    localStorage.setItem(PROJECTS_TERMS_STORAGE_KEY, JSON.stringify(terms));
  };

  return {
    getTerms,
    saveTerm,
    removeTerm,
  };
};
