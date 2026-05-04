(function initSignalProductContext(global) {
  const screens = {
    home: {
      label: 'Home',
      purpose: 'Top-level source entry and dashboard for starting from prompt, repo, App Store, or Google Play context.',
      owns: ['source resolution', 'creative systems preview'],
    },
    onboarding: {
      label: 'Onboarding',
      purpose: 'First-time setup flow that must create one app, one tracked app, and one project.',
      owns: ['existing app import', 'idea-based app setup', 'initial recommendation profile'],
    },
    discover: {
      label: 'Discover',
      purpose: 'Broad discovery and opportunity browsing.',
      owns: ['market exploration'],
    },
    search: {
      label: 'Search / Explore',
      purpose: 'Explore apps and market references.',
      owns: ['app exploration'],
    },
    trending: {
      label: 'Trending',
      purpose: 'Browse App Store charts by country/category.',
      owns: ['chart rankings', 'country/category browsing'],
    },
    'market-insights': {
      label: 'Market Insights',
      purpose: 'Benchmark tracked apps against broader category leaders.',
      owns: ['category benchmarking', 'opportunity gaps'],
    },
    'keyword-explorer': {
      label: 'Keyword Explorer',
      purpose: 'Keyword-first research workspace.',
      owns: ['keyword watchlist', 'keyword suggestions', 'ranking lookup', 'keyword history warmup'],
    },
    'app-tracking': {
      label: 'App Tracking',
      purpose: 'App-first keyword tracking workspace.',
      owns: ['tracked app keywords', 'daily refresh', 'trend visualization', 'similar keywords'],
    },
    'aso-analyzer': {
      label: 'ASO Analyzer',
      purpose: 'Analyze one app listing and score its ASO quality.',
      owns: ['ASO score', 'metadata scoring', 'listing recommendations'],
    },
    screenshots: {
      label: 'Screenshots',
      purpose: 'Screenshot-oriented workbench connected to app/project context.',
      owns: ['screenshot inputs', 'screenshot recommendations', 'project linkage'],
    },
    reviews: {
      label: 'Reviews',
      purpose: 'Review monitoring and semantic insights.',
      owns: ['review retrieval', 'sentiment signals', 'reply export'],
    },
    'rank-history': {
      label: 'Rank History',
      purpose: 'Track app rank movement over time.',
      owns: ['rank trend charts', 'country/chart filters'],
    },
    competitors: {
      label: 'Competitors',
      purpose: 'Inspect nearby competitors for the active app.',
      owns: ['competitor landscape', 'threat tiers', 'comparison guidance'],
    },
    'revenue-insights': {
      label: 'Revenue Insights',
      purpose: 'Revenue and monetization context for the market.',
      owns: ['revenue benchmarking'],
    },
    'hot-ideas': {
      label: 'Hot Ideas',
      purpose: 'Explore app opportunities and niche ideas.',
      owns: ['idea exploration'],
    },
    'idea-report': {
      label: 'Idea Report',
      purpose: 'Focused report for one app idea or opportunity.',
      owns: ['opportunity report'],
    },
    'idea-validator': {
      label: 'Idea Validator',
      purpose: 'Validate a not-yet-built app idea before building.',
      owns: ['idea scoring', 'competitor references', 'community signals', 'differentiation guidance'],
    },
    'ai-agents': {
      label: 'AI Agents',
      purpose: 'AI-assisted market research / automation concepts.',
      owns: ['automation concepts'],
    },
    favorites: {
      label: 'Favorites',
      purpose: 'Save interesting apps and references for later.',
      owns: ['saved entities'],
    },
    'my-apps': {
      label: 'My Apps',
      purpose: 'Source-of-truth app management area.',
      owns: ['app records', 'app metadata', 'project creation from app', 'app exports'],
    },
    'my-projects': {
      label: 'My Projects',
      purpose: 'Project management and execution hub.',
      owns: ['project list', 'open project', 'delete project', 'continue work'],
    },
    'new-project': {
      label: 'New Project',
      purpose: 'Create a new project from app/source context.',
      owns: ['project creation'],
    },
    templates: {
      label: 'Templates',
      purpose: 'Browse creative systems and screenshot directions.',
      owns: ['template browsing'],
    },
    assets: {
      label: 'Assets',
      purpose: 'Manage project-linked brand and media assets.',
      owns: ['brand kit', 'media assets', 'reusable screens'],
    },
    exports: {
      label: 'Exports',
      purpose: 'Delivery-oriented hub for ready-to-export projects.',
      owns: ['delivery queue', 'export presets'],
    },
    project: {
      label: 'Project Workspace',
      purpose: 'Detailed workspace for a single project.',
      owns: ['brief', 'generate', 'design', 'localize', 'deliver', 'activity'],
    },
    settings: {
      label: 'Settings',
      purpose: 'System and workspace settings.',
      owns: ['settings'],
    },
  };

  const entities = {
    app: {
      label: 'App',
      description: 'Base product entity in the workspace. Can represent a live app or a pre-launch app idea.',
      requiredFields: ['id', 'name', 'category'],
      responsibilities: ['product identity', 'store metadata', 'recommendation profile', 'project anchor'],
    },
    trackedApp: {
      label: 'Tracked App',
      description: 'Monitoring/intelligence representation used by analysis pages.',
      requiredFields: ['id', 'name', 'category', 'keywords'],
      responsibilities: ['keyword tracking', 'rank history', 'competitors', 'reviews', 'screenshot inputs'],
    },
    project: {
      label: 'Project',
      description: 'Execution workspace built from an app.',
      requiredFields: ['id', 'appId', 'name'],
      responsibilities: ['creative production', 'ASO workstream', 'localization', 'delivery'],
    },
  };

  const backendEndpoints = {
    sourceImport: [
      '/api/connect/app-store-connect',
      '/api/connect/google-play',
      '/api/connect/github',
      '/api/resolve-source',
    ],
    appStoreIntel: [
      '/api/apple/app',
      '/api/apple/search',
      '/api/apple/keyword/suggest',
      '/api/apple/keyword/search',
    ],
    keywordStorage: [
      '/api/keywords/history',
    ],
    ideas: [
      '/api/idea-validator/research',
    ],
  };

  const architecture = {
    frontend: {
      bootstrap: 'main.jsx',
      globalStyles: 'styles.css',
      dataModel: 'components/data.jsx',
      coreScreens: 'components/wrap-screens.jsx',
      projectCreation: 'components/projects.jsx',
      projectWorkspace: 'components/project-screens.jsx',
      utilityScreens: 'components/other-screens.jsx',
      home: 'components/home.jsx',
    },
    backend: {
      server: 'server.mjs',
      purpose: 'Local Node server for metadata fetches, keyword APIs, idea validation, and helper endpoints.',
    },
    persistence: {
      workspaceApi: 'lib/workspace.js',
      mainWorkspaceFields: [
        'apps',
        'trackedApps',
        'projects',
        'generations',
        'exports',
        'favoriteAppIds',
        'wrapJobs',
        'screenshotGenerations',
        'reviewMonitorIds',
        'appProfiles',
        'onboarding',
      ],
    },
  };

  const implementationRules = [
    'Never create a feature that does not attach to an App, Tracked App, or Project.',
    'Prefer extending existing workspace fields over adding new parallel state.',
    'Any page that needs app context must resolve activeApp, activeTrackedApp, and relatedProjects.',
    'Empty states must offer exactly one primary action.',
    'New screens must reuse existing card, sidebar, header, and two-column patterns.',
    'Do not add fake placeholder data if real imported metadata or idea context exists.',
    'Every recommendation must explain why it applies to the selected app and what the user should do next.',
    'Prefer turning insights into actions such as create project, add keywords, open analyzer, or generate screenshots.',
    'Do not create a new screen if the problem can be solved by improving an existing page.',
    'When changing a page inside the main analysis cluster, preserve the shared left-column/right-detail shell.',
    'Any new recommendation or analysis block should derive from existing app context first, not isolated local mock logic.',
    'If a flow creates user value, it should usually end with an app created, tracked app updated, project created, or project opened.',
  ];

  const currentPriority = {
    summary: 'The current priority is not to add more pages. The current priority is to make the existing pages feel like one connected app-growth workspace.',
    focus: [
      'better onboarding',
      'shared app context',
      'consistent two-column shell',
      'actionable recommendations',
      'project creation from every meaningful insight',
    ],
    avoid: [
      'adding isolated dashboards',
      'inventing parallel workflows',
      'decorative pages without stronger product linkage',
    ],
  };

  const decisionHeuristics = {
    whenAddingFeature: [
      'Attach it to App, Tracked App, or Project first.',
      'Reuse active app context before inventing new local state.',
      'Prefer improving an existing page over adding a new route.',
      'Make the output actionable, not just informative.',
    ],
    emptyStateRule: 'Explain why the page is empty, identify the missing object, and offer one clear primary action.',
    recommendationRule: 'Recommendations must be contextual, specific, and actionable.',
  };

  const productContext = {
    productName: 'Signal',
    oneLiner: 'Signal is an app-growth workspace that turns either a live store listing or just an app idea into a structured app, tracked ASO context, and project workflow spanning keywords, competitors, reviews, screenshots, and delivery.',
    positioning: 'Signal should feel like a connected app-growth workspace, not a collection of unrelated dashboard demos.',
    userJourney: [
      'Start from an existing app or from an idea.',
      'Create one app, one tracked app, and one project.',
      'Derive recommendation profile, keyword seeds, ASO guidance, screenshot angle, and competitor direction.',
      'Move through analysis and production pages using the same app context.',
    ],
    mandatoryOnboardingOutcome: {
      app: 1,
      trackedApp: 1,
      project: 1,
    },
    entities,
    screens,
    backendEndpoints,
    architecture,
    implementationRules,
    currentPriority,
    decisionHeuristics,
  };

  global.SIGNAL_PRODUCT_CONTEXT = productContext;
})(window);
