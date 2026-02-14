"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

  useEffect(() => {
    let cancelled = false;
    async function fetchUsers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users?page=${pagination.page}&limit=${pagination.limit}`);
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!cancelled) {
          setUsers(json.data || []);
          setPagination((p) => ({ ...p, ...json.pagination }));
        }
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchUsers();
    return () => { cancelled = true; };
  }, [pagination.page, pagination.limit]);

  return (
    <div>
      <HomeBredCurbs title="Users management" />
      <Card title="Users">
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
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">User</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Role</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Status</th>
                  <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Tasks / Responses</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td colSpan={4} className="py-3 px-4 text-slate-500 dark:text-slate-400 text-sm">
                      No users yet. Database is connected; add users via your main app or seed script.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white">{u.fullName}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge bg-primary-500/10 text-primary-500">{u.role}</span>
                      </td>
                      <td className="py-3 px-4">
                        {u.isVerified ? (
                          <span className="text-success text-sm">Verified</span>
                        ) : (
                          <span className="text-slate-500 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-300">
                        {u._count?.tasks ?? 0} tasks / {u._count?.responses ?? 0} responses
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
