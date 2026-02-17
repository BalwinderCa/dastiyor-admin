"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Link from "next/link";

export default function AdminModeration() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchModeration() {
      try {
        const res = await fetch("/api/moderation", { credentials: "include" });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchModeration();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div>
        <HomeBredCurbs title="Moderation tools" />
        <div className="p-8 text-center text-slate-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HomeBredCurbs title="Moderation tools" />
        <p className="text-danger flex items-center gap-2">
          <Icon icon="heroicons-outline:exclamation-circle" />
          {error}
        </p>
      </div>
    );
  }

  const { openTasksCount = 0, unverifiedProviders = [], recentOpenTasks = [] } = data || {};

  return (
    <div>
      <HomeBredCurbs title="Moderation tools" />
      <Card title="Content moderation">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          Queue for tasks and profiles that may need review. Open tasks and unverified providers below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/tasks?status=OPEN"
            className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-slate-900 dark:text-white mb-1">Open tasks</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Tasks awaiting provider responses
                </p>
              </div>
              <span className="text-2xl font-bold text-primary-500">{openTasksCount}</span>
            </div>
          </Link>
          <div className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-slate-900 dark:text-white mb-1">Unverified providers</h5>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Providers pending verification
                </p>
              </div>
              <span className="text-2xl font-bold text-warning-500">{unverifiedProviders.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent open tasks" noborder>
            <div className="overflow-x-auto">
              {recentOpenTasks.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No open tasks.</p>
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {recentOpenTasks.slice(0, 10).map((task) => (
                    <li key={task.id} className="py-3 first:pt-0">
                      <Link
                        href={`/admin/tasks`}
                        className="flex justify-between gap-2 text-sm hover:text-primary-500"
                      >
                        <span className="line-clamp-1 text-slate-900 dark:text-white">
                          {task.title}
                        </span>
                        <span className="text-slate-500 shrink-0">
                          {task._count?.responses ?? 0} responses
                        </span>
                      </Link>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {task.user?.fullName} · {task.city}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/admin/tasks"
              className="inline-flex items-center gap-1 text-sm text-primary-500 mt-3"
            >
              View all tasks <Icon icon="heroicons-outline:arrow-right" className="text-lg" />
            </Link>
          </Card>

          <Card title="Unverified providers" noborder>
            <div className="overflow-x-auto">
              {unverifiedProviders.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">No unverified providers.</p>
              ) : (
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {unverifiedProviders.slice(0, 10).map((user) => (
                    <li key={user.id} className="py-3 first:pt-0">
                      <Link
                        href="/admin/users"
                        className="flex flex-col text-sm hover:text-primary-500"
                      >
                        <span className="font-medium text-slate-900 dark:text-white">
                          {user.fullName}
                        </span>
                        <span className="text-xs text-slate-500">{user.email}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/admin/users"
              className="inline-flex items-center gap-1 text-sm text-primary-500 mt-3"
            >
              View all users <Icon icon="heroicons-outline:arrow-right" className="text-lg" />
            </Link>
          </Card>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 flex items-center gap-2">
          <Icon icon="heroicons-outline:information-circle" className="text-lg" />
          Approve or reject from Users and Tasks pages. Add a Report model later for user-reported content.
        </p>
      </Card>
    </div>
  );
}
