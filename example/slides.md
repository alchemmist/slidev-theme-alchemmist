---
theme: alchemmist
addons:
  - fancy-arrow
title: Open Source as a Driver of Modern Software Development.
info: |
  The first lecture of course "Engineering Open Source Projects".
  Created by Anton Grishin as part of the CPM and CU 2026 educational project.
drawings:
  persist: false
favicon: "https://cdn.jsdelivr.net/gh/alchemmist/blog@main/site/static/favicon.ico"
duration: 35min
date: January 23th, 2026
remoteAssets: false
layout: intro
themeConfig:
  paginationX: r
  paginationY: t
  paginationPagesDisabled: []
---

# Open Source as a driver of modern software

<p>
  Anton Grishin (<a href="https://t.me/alchemmist"><span class="mono-text">@alchemmist</span></a>)
</p>

<span class="mono-text">English exam, CU, winter 2026</span>

<div class="abs-br m-6 text-xl"> 
  <a href="https://github.com/alchemmist/talks" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

---
layout: center
---

# Table of contents

|                                               |                                           |
| --------------------------------------------- | ----------------------------------------- |
| <code style="color:#FFBF00">context</code>    | What is Open Source & Why It's Everywhere |
| <code style="color:#50C878">advantages</code> | Key Advantages: The "Pluses" of OS        |
| <code style="color:#D22B2B">risks</code>      | Potential Risks: The "Perils" of OS       |
| <code style="color:#5D3FD3">trends</code>     | The Market & Future Trends                |
| <code style="color:#0096FF">qa</code>         | Conclusion and discussion                 |

<Footer />

---
layout: center
---

# It's Not Just Code, It's Infrastructure<MarkerX color="#FFBF00" title="context" />

<Quote
  text="99% of Fortune 500 companies currently use open source software. <...> Over 56 million developers are contributing to open source projects. <...> Due to ever-rising workloads, the Linux
operating systems market is expected to grow at the rate of 7% a year, reaching
$9.7 billion by 2024."
  author="Pranay Ahlawat, Boston Consulting Group"
  source="Why You Need an Open Source Software Strategy"
  sourceUrl="https://web-assets.bcg.com/pdf-src/prod-live/open-source-software-strategy-benefits.pdf"
  year="April 2021"
  avatar="/assets/pranay-ahlawat.png"
  type="Article"
/>

<Footer />

---
layout: center
---

<style scoped>
:deep(.my-auto) {
    max-width: 50%;
}
</style>


# Why Companies Embrace Open Source<MarkerX color="#50C878" title="advantages" />

<ul>
  <li v-click>Cost & Flexibility: Reduces costs, prevents vendor lock-in. Code is modular and customizable.</li>
  <li v-click>Security & Quality: "Many eyes" review code. 15,500+ developers from 1,400 companies contribute to the Linux kernel.</li>
  <li v-click>Talent & Community: Majority of most pupular prjects were born as OS.</li>
  <li v-click>Profile: all what you do, it's save as hitory of your experience.</li>
</ul>

<Footer />

---
layout: center
---

<style scoped>
:deep(.my-auto) {
    max-width: 50%;
}
</style>

# Navigating the Challenges<MarkerX color="#D22B2B" title="risks" />

<ul>
  <li v-click><strong>License Ambiguity:</strong> Unlike commercial software with clear agreements, OSS licenses can be complex.</li>
  <li v-click><strong>The "Copyleft" Trap:</strong> Licenses like <strong>GNU GPL</strong> can force you to open your <em>own</em> proprietary code if you distribute modified versions.</li>
  <li v-click><strong>Liability Void:</strong> No single entity (like a vendor) bears legal responsibility for failures. Companies assume the risk themselves.</li>
  <li v-click><strong>Supply Chain Attacks:</strong> Malicious actors can infiltrate popular projects (like the <strong>log4j</strong> incident) affecting millions.</li>
</ul>

<Footer />

---
layout: center
---

# A Rapidly Expanding Market<MarkerX color="#5D3FD3" title="trends" />

<style scoped>
#trands-cards {
    display: flex;
    gap: 3em;
}
</style>

<div id="trands-cards">
<Card v-click title="Containers & Kubernetes" mono-head color="#5D3FD3">
Orchestrates 50% of global containers, projected 85% by 2024. Market to grow 35% annually to $7.5B.
</Card>

<Card v-click title="Edge Computing" mono-head color="#5D3FD3">
Driven by IoT (20B to 41B connections by 2025). OSS platform segment to grow from $10B to $24.9B (<i>2020-2024</i>).
</Card>

<Card v-click title="The 'Open Core' Model" mono-head color="#5D3FD3">
Mix of free OSS core + paid proprietary features/services (<i>e.g., Red Hat, GitLab</i>).
</Card>
</div>

<Footer />

---
layout: center
---

# Thank you, let's discuss<MarkerX color="#0096FF" title="qa" />
