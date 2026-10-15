const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// The Python backend is deployed separately; keep Metro from crawling and
// watching it (its virtualenv alone holds thousands of files).
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Matches the folder and its contents, as project-relative or absolute paths.
const projectRoot = escapeRegExp(path.resolve(__dirname));
const backendPattern = new RegExp(`^(?:${projectRoot}[\\\\/])?backend(?:[\\\\/].*)?$`);

const defaultBlockList = config.resolver.blockList;
config.resolver.blockList = [
  ...(Array.isArray(defaultBlockList) ? defaultBlockList : [defaultBlockList]).filter(Boolean),
  backendPattern,
];

module.exports = config;
