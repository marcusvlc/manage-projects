export const useProjectsStore = () => {
  const projects = useState("projects", () => []);

  return {
    projects,
  };
};
