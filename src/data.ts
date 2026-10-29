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
    category: 'Cloud & Infrastructure',
    links: [
      {
        link: 'https://www.ibm.com/think/topics/provisioning',
        title: 'What is Provisioning?',
        short_description:
          'An architectural overview by IBM defining IT provisioning, detailing the difference between provisioning and configuration, and exploring server, network, user identity, and cloud resource provisioning workflows.'
      }
    ]
  },
  {
    category: 'Database Performance',
    links: [
      {
        link: 'https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it',
        title: 'What is the N+1 Query Problem and How to Solve It?',
        short_description:
          'An in-depth guide by PlanetScale explaining the classic N+1 database query anti-pattern, how ORM lazy loading causes severe latency spikes, and practical techniques to resolve it using SQL JOINs, eager loading, and query monitoring.'
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
  },
  {
    category: 'Frontend Development',
    links: [
      {
        link: 'https://medium.com/@rohitkuwar/decoding-the-mystery-a-front-end-developers-guide-to-source-maps-in-react-2675b413673a',
        title: "Decoding the Mystery: A Front-End Developer's Guide to Source Maps in React",
        short_description:
          'A practical guide by Rohit Kuwar explaining how source maps bridge minified production bundles to original source code in React, covering build configurations and production debugging with error monitoring tools.'
      },
      {
        link: 'https://dev.to/griseduardo/husky-and-lint-staged-for-pre-commit-in-react-39nd',
        title: 'Husky and lint-staged for pre-commit in React',
        short_description:
          'A step-by-step tutorial by Eduardo Gris demonstrating how to set up Husky Git hooks and lint-staged in a React application to enforce automated code formatting and linting checks before changes are committed.'
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
    category: 'System Design',
    links: [
      {
        link: 'https://medium.com/@nourhansaeed707/functional-vs-non-functional-requirements-in-system-design-6b1b1a3785da',
        title: 'Functional vs Non-Functional Requirements in System Design',
        short_description:
          'An essential system design guide by Nourhan Saeed contrasting functional requirements (core features and user workflows) with non-functional requirements (scalability, latency, availability, and security).'
      },
      {
        link: 'https://www.geeksforgeeks.org/system-design/unified-modeling-language-uml-sequence-diagrams/',
        title: 'Unified Modeling Language (UML) | Sequence Diagrams',
        short_description:
          'A comprehensive guide from GeeksforGeeks explaining UML sequence diagrams in system design, covering lifelines, synchronous and asynchronous message exchanges, activation bars, and sequential interaction modeling.'
      },
      {
        link: 'https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-sequence-diagram/',
        title: 'What is Sequence Diagram?',
        short_description:
          'A practical reference from Visual Paradigm breaking down UML sequence diagram notation, object lifelines, time-ordered messaging, and combined fragments (alt, opt, loop, and par) to map dynamic system behavior.'
      }
    ]
  }
];
