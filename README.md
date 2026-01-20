# 🎮 WoW Addon TOC Versioner

<div align="center">

```
          █████   ███   █████          █████   ███   █████              
         ░░███   ░███  ░░███          ░░███   ░███  ░░███               
          ░███   ░███   ░███   ██████  ░███   ░███   ░███               
          ░███   ░███   ░███  ███░░███ ░███   ░███   ░███               
          ░░███  █████  ███  ░███ ░███ ░░███  █████  ███                
           ░░░█████░█████░   ░███ ░███  ░░░█████░█████░                 
             ░░███ ░░███     ░░██████     ░░███ ░░███                   
              ░░░   ░░░       ░░░░░░       ░░░   ░░░                    

             ███████████    ███████      █████████                      
            ░█░░░███░░░█  ███░░░░░███   ███░░░░░███                     
            ░   ░███  ░  ███     ░░███ ███     ░░░                      
                ░███    ░███      ░███░███                              
                ░███    ░███      ░███░███                              
                ░███    ░░███     ███ ░░███     ███                     
                █████    ░░░███████░   ░░█████████                      
               ░░░░░       ░░░░░░░      ░░░░░░░░░                       

 █████  █████               █████            █████                      
░░███  ░░███               ░░███            ░░███                       
 ░███   ░███  ████████   ███████   ██████   ███████    ██████  ████████ 
 ░███   ░███ ░░███░░███ ███░░███  ░░░░░███ ░░░███░    ███░░███░░███░░███
 ░███   ░███  ░███ ░███░███ ░███   ███████   ░███    ░███████  ░███ ░░░ 
 ░███   ░███  ░███ ░███░███ ░███  ███░░███   ░███ ███░███░░░   ░███     
 ░░████████   ░███████ ░░████████░░████████  ░░█████ ░░██████  █████    
  ░░░░░░░░    ░███░░░   ░░░░░░░░  ░░░░░░░░    ░░░░░   ░░░░░░  ░░░░░     
              ░███                                                      
              █████                                                     
             ░░░░░                                                      
```

**Automatically keep your World of Warcraft addon's TOC files up to date!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/v/release/jeany55/WowAddonVersioner)](https://github.com/jeany55/WowAddonVersioner/releases)

</div>

---

## ✨ Features

- 🔄 **Automatic Detection** - Scans your addon's `.toc` files and detects outdated interface versions
- 📊 **Multi-TOC Support** - Handles multiple TOC files for different game versions (Retail, Classic, etc.)
- 🤖 **Auto Pull Requests** - Automatically creates PRs with the updated interface numbers
- 📋 **Issue Creation** - Optionally create issues to track when updates are needed
- 🎯 **Flexible Configuration** - Customize behavior with multiple input options
- 🌐 **Up-to-date Sources** - Fetches the latest interface numbers from the official WoW Wiki

## 🎮 Supported Game Types

| Game Type | Prefix | Description |
|-----------|--------|-------------|
| Mainline | `11xxxx`, `12xxxx` | Retail/Current expansion |
| Classic | `6xxxx` | Classic Era |
| Vanilla | `1xxxx` | Vanilla Classic |
| TBC | `2xxxx` | The Burning Crusade |
| Wrath | `3xxxx` | Wrath of the Lich King |
| Cata | `4xxxx` | Cataclysm |
| Mists | `5xxxx` | Mists of Pandaria |

## 🚀 Quick Start

Add this workflow to your repository at `.github/workflows/toc-versioner.yml`:

```yaml
name: Check TOC Versions

on:
  schedule:
    # Run weekly on Mondays at 9am UTC
    - cron: '0 9 * * 1'
  workflow_dispatch: # Allow manual triggers

jobs:
  check-versions:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - name: Check TOC Versions
        uses: jeany55/WowAddonVersioner@v1
```

That's it! The action will automatically check your TOC files and create a PR if updates are available.

## 📖 Usage Examples

### Basic Usage (Auto-PR)

```yaml
- name: Check TOC Versions
  uses: jeany55/WowAddonVersioner@v1
```

### Custom TOC Directory

If your TOC files are not in the repository root:

```yaml
- name: Check TOC Versions
  uses: jeany55/WowAddonVersioner@v1
  with:
    toc-directory: '/src/MyAddon'
```

### Create Issue Instead of PR

```yaml
- name: Check TOC Versions
  uses: jeany55/WowAddonVersioner@v1
  with:
    create-pr: false
    create-issue-if-updates-found: true
```

### Fail Build on Outdated Versions

Useful for CI/CD pipelines where you want to enforce up-to-date TOC files:

```yaml
- name: Check TOC Versions
  uses: jeany55/WowAddonVersioner@v1
  with:
    create-pr: false
    fail-job-when-updates-found: true
```

### Full Configuration

```yaml
- name: Check TOC Versions
  uses: jeany55/WowAddonVersioner@v1
  with:
    wiki-url: 'https://warcraft.wiki.gg/wiki/API_GetBuildInfo'
    toc-directory: '/src/MyAddon'
    create-pr: true
    pr-branch-name: 'auto/update-interface-versions'
    fail-job-when-updates-found: false
    create-issue-if-updates-found: false
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

## ⚙️ Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `wiki-url` | URL of the WoW Wiki page to fetch interface versions from | No | `https://warcraft.wiki.gg/wiki/API_GetBuildInfo` |
| `toc-directory` | Directory containing your TOC files (relative to repo root) | No | Repository root |
| `create-pr` | Create a pull request with version updates | No | `true` |
| `pr-branch-name` | Branch name for the pull request | No | `auto/update-interface-versions` |
| `fail-job-when-updates-found` | Fail the job if outdated versions are found | No | `false` |
| `create-issue-if-updates-found` | Create an issue if updates are found | No | `false` |
| `github-token` | GitHub token for creating PRs/issues | No | `${{ secrets.GITHUB_TOKEN }}` |

## 📤 Outputs

The action sets the following outputs that can be used in subsequent steps:

| Output | Description |
|--------|-------------|
| `tocs-updated` | Number of TOC files that need interface version updates (0 if all are current) |

## 📁 TOC File Format

The action looks for the standard WoW TOC interface directive:

```
## Interface: 110002
## Title: My Awesome Addon
## Notes: This addon does cool things!
## Author: YourName

MyAddon.lua
```

The action will automatically detect the game type based on the interface number prefix and update it to the latest version for that game type.

## 🔐 Permissions

Make sure your workflow has the necessary permissions:

```yaml
permissions:
  contents: write      # Required to push changes
  pull-requests: write # Required to create PRs
  issues: write        # Required if using create-issue-if-updates-found
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💜 Acknowledgments

- Special thanks to **Quetz the Great** for their contributions
- Interface data sourced from [Warcraft Wiki](https://warcraft.wiki.gg)

---

<div align="center">

Made with ❤️ for the WoW addon community

</div>
