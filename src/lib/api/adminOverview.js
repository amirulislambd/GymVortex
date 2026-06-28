import { ServerFetch, ServerMutation } from "../core/serverMutation";

export const getAdminStats = () => ServerFetch("admin/stats");

export const getSystemLogs = () => ServerFetch("admin/system-logs");

export const runSecurityScan = () =>
  ServerMutation("admin/commands/run-scan", {});

export const getSystemReport = () =>
  ServerFetch("admin/commands/generate-report");

export const deleteForumPost = (postId) =>
  ServerDelete(`forum/delete/${postId}`);
