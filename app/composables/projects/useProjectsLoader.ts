export const useProjectsLoader = () => {
  const { getProjects } = useProjectsApi();
  const { setProjects } = useProjectsStore();

  const isLoading = ref(true);

  const { data, error } = useAsyncData("projects", () => getProjects(), {
    server: false,
  });

  watch(
    [data, error],
    ([storedProjects, loadError]) => {
      if (storedProjects) {
        setProjects(storedProjects);
      }

      if (loadError) {
        console.error("Erro ao carregar projetos:", loadError);
      }

      if (storedProjects || loadError) {
        isLoading.value = false;
      }
    },
    { immediate: true },
  );

  return {
    isLoading,
    error,
  };
};
