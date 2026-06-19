// assets/content-map.js
// Site content partitioning, keyword tagging, and search filtering

const siteContentConfig = {
  baseUrl: "https://webs-lovegame.com",
  primaryTag: "爱游戏",
  sections: [
    {
      id: "home",
      label: "首页",
      tags: ["爱游戏", "精选", "最新"],
      items: [
        { title: "欢迎来到爱游戏", url: "/", tags: ["爱游戏", "首页"] },
        { title: "热门推荐", url: "/popular", tags: ["爱游戏", "热门"] }
      ]
    },
    {
      id: "games",
      label: "游戏库",
      tags: ["爱游戏", "游戏", "分类"],
      items: [
        { title: "动作游戏", url: "/games/action", tags: ["爱游戏", "动作"] },
        { title: "冒险游戏", url: "/games/adventure", tags: ["爱游戏", "冒险"] },
        { title: "策略游戏", url: "/games/strategy", tags: ["爱游戏", "策略"] }
      ]
    },
    {
      id: "news",
      label: "新闻资讯",
      tags: ["爱游戏", "新闻", "更新"],
      items: [
        { title: "游戏更新公告", url: "/news/updates", tags: ["爱游戏", "更新"] },
        { title: "行业动态", url: "/news/industry", tags: ["爱游戏", "行业"] }
      ]
    }
  ],
  extraKeywords: ["爱游戏平台", "在线游戏", "免费游戏"]
};

function flattenAllItems(config) {
  const allItems = [];
  for (const section of config.sections) {
    for (const item of section.items) {
      allItems.push({
        ...item,
        sectionId: section.id,
        sectionLabel: section.label
      });
    }
  }
  return allItems;
}

function filterByTag(items, tag) {
  const lowerTag = tag.toLowerCase();
  return items.filter(item =>
    item.tags.some(t => t.toLowerCase().includes(lowerTag))
  );
}

function searchContent(query) {
  const allItems = flattenAllItems(siteContentConfig);
  const lowerQuery = query.toLowerCase();
  return allItems.filter(item => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery);
    const tagMatch = item.tags.some(t => t.toLowerCase().includes(lowerQuery));
    const sectionMatch = item.sectionLabel.toLowerCase().includes(lowerQuery);
    return titleMatch || tagMatch || sectionMatch;
  });
}

function listAllTags(config) {
  const tagSet = new Set();
  tagSet.add(config.primaryTag);
  for (const keyword of config.extraKeywords) {
    tagSet.add(keyword);
  }
  for (const section of config.sections) {
    for (const tag of section.tags) {
      tagSet.add(tag);
    }
    for (const item of section.items) {
      for (const tag of item.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet);
}

function getSectionByLabel(config, label) {
  const lowerLabel = label.toLowerCase();
  return config.sections.find(s => s.label.toLowerCase() === lowerLabel) || null;
}

function countItemsPerSection(config) {
  const counts = {};
  for (const section of config.sections) {
    counts[section.label] = section.items.length;
  }
  return counts;
}

// Example usage (no side effects)
const allTags = listAllTags(siteContentConfig);
const searchResults = searchContent("爱游戏");
const actionItems = filterByTag(flattenAllItems(siteContentConfig), "动作");