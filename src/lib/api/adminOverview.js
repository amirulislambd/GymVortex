import { ServerFetch, ServerMutation } from "../core/serverMutation";

export const getAdminStats = () => ServerFetch("admin/stats");
export const getUserStats = () => ServerFetch("admin/user-stats");

export const getSystemLogs = () => ServerFetch("admin/system-logs");
export const getSystemHealth = () => ServerFetch("admin/system-health");

export const runSecurityScan = () =>
  ServerMutation("admin/commands/run-scan", {});

export const getSystemReport = () =>
  ServerFetch("admin/commands/generate-report");
