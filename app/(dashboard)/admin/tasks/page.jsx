"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  useEffect(() => {
    let cancelled = false;
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/tasks?page=${pagination.page}&limit=${pagination.limit}`);
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!cancelled) {
          setTasks(json.data || []);
          setPagination((p) => ({ ...p, ...json.pagination }));
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTasks();
    return () => { cancelled = true; };
  }, [pagination.page, pagination.limit]);

  return (
    <div>
      <HomeBredCurbs title="Tasks management" />
      <Card title="Tasks">
        {error && (
          <p className="text-danger text-sm mb-4 flex items-center gap-2">
            <Icon icon="heroicons-outline:exclamation-circle" className="text-lg" />
            {error} — ensure .env has DATABASE_URL and run: npm run db:push
          </p>
        )}
        {loading ? (
          <p className="text-slate-500 dark:text-slate-400 py-4">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-fixed w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Task</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Category</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Status</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Author / Responses</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td colSpan={4} className="py-3 px-4 text-slate-500 dark:text-slate-400 text-sm">
                      No tasks yet. Database is connected; add tasks via your main app or seed script.
                    </td>
                  </tr>
                ) : (
                  tasks.map((t) => (
                    <tr key={t.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white">{t.title}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{t.description}</div>
                      </td>
                      <td className="py-3 px-4 text-sm">{t.category}</td>
                      <td className="py-3 px-4">
                        <span className="badge bg-primary-500/10 text-primary-500">{t.status}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                        {t.user?.fullName} / {t._count?.responses ?? 0} responses
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {!loading && pagination.totalPages > 1 && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </p>
        )}
      </Card>
    </div>
  );
}
