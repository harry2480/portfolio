const fs = require('fs');
const path = require('path');

async function fetchGitHubRepos() {
  try {
    // GitHub APIから全リポを取得
    const response = await fetch('https://api.github.com/users/harry2480/repos?type=public&per_page=100&sort=updated');
    const repos = await response.json();

    // 必要なデータを抽出
    const processedRepos = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      language: repo.language || null,
      topics: repo.topics || [],
      stargazers_count: repo.stargazers_count,
      updated_at: repo.updated_at,
      ogImage: `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`,
    }));

    // public/repos.jsonに保存
    const outputPath = path.join(__dirname, '../public/repos.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedRepos, null, 2));

    console.log(`✓ ${processedRepos.length}個のリポデータを保存しました`);
    console.log(`  保存先: ${outputPath}`);
  } catch (error) {
    console.error('エラー:', error);
    process.exit(1);
  }
}

fetchGitHubRepos();
