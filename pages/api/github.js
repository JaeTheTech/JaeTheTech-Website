export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.github.com/users/JaeTheTech/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add your GitHub token here if needed
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos = await response.json();

    // Filter and sort repositories
    const filteredRepos = repos
      .filter(repo => !repo.fork) // Exclude forks
      .sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars

    res.status(200).json(filteredRepos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    res.status(500).json({ error: 'Failed to fetch GitHub repositories' });
  }
}