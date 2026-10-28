export interface ReferenceItem {
  link: string;
  title: string;
  short_description: string;
}

export interface CategoryGroup {
  category: string;
  links: ReferenceItem[];
}

export const data: CategoryGroup[] = [
  {
    category: 'Repository Standards',
    links: [
      {
        link: 'https://www.linkedin.com/pulse/essential-files-professional-github-repository-guide-chan-meng-ubunc/',
        title: 'Essential Files for a Professional GitHub Repository: A Comprehensive Guide',
        short_description:
          'A comprehensive breakdown by Chan Meng of the essential files (README, LICENSE, CONTRIBUTING, CHANGELOG, and .github/ templates) needed to turn any codebase into an enterprise-ready, open-source-compliant repository.'
      }
    ]
  },
  {
    category: 'Repository Structure',
    links: [
      {
        link: 'https://medium.com/code-factory-berlin/github-repository-structure-best-practices-248e6effc405',
        title: 'GitHub Repository Structure Best Practices',
        short_description:
          'A standardized architecture blueprint from Code Factory Berlin covering clean directory hierarchies (src/, test/, docs/, .config/, tools/), branch protection rules, and Git hygiene for team maintainability.'
      }
    ]
  },
  {
    category: 'README Resources',
    links: [
      {
        link: 'https://github.com/matiassingers/awesome-readme',
        title: 'Awesome README',
        short_description:
          'A renowned curated list of top-tier GitHub README examples, visual elements, badges, design principles, and automated generator tools to craft engaging repository homepages.'
      }
    ]
  },
  {
    category: 'Documentation',
    links: [
      {
        link: 'https://dev.to/mochafreddo/how-to-manage-documentation-in-a-github-repository-a-guide-for-junior-developers-pgo',
        title: 'How to Manage Documentation in a GitHub Repository: A Guide for Junior Developers',
        short_description:
          'A junior-friendly walkthrough by mochafreddo detailing docs-as-code workflows, structuring the /docs folder, writing clean Markdown, and reviewing documentation alongside code pull requests.'
      }
    ]
  }
];
