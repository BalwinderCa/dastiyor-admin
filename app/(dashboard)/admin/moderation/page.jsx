"use client";

import React from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

export default function AdminModeration() {
  return (
    <div>
      <HomeBredCurbs title="Moderation tools" />
      <Card title="Content moderation">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          Queue for tasks, profiles, and messages that need review. Approve, reject, or request changes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h5 className="font-medium text-slate-900 dark:text-white mb-2">Tasks</h5>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Pending tasks to moderate</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h5 className="font-medium text-slate-900 dark:text-white mb-2">Profiles</h5>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Provider profiles under review</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h5 className="font-medium text-slate-900 dark:text-white mb-2">Reports</h5>
            <p className="text-slate-500 dark:text-slate-400 text-sm">User-reported content</p>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 flex items-center gap-2">
          <Icon icon="heroicons-outline:information-circle" className="text-lg" />
          Moderation tools. Connect your backend to show pending items and actions (approve, reject, ban).
        </p>
      </Card>
    </div>
  );
}
