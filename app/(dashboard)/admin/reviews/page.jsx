"use client";

import React from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

export default function AdminReviews() {
  return (
    <div>
      <HomeBredCurbs title="Reviews & complaints" />
      <Card title="Reviews">
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">From</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">To</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Rating</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Comment</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Table content will come from API</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 flex items-center gap-2">
          <Icon icon="heroicons-outline:information-circle" className="text-lg" />
          View and moderate reviews. Handle complaints: hide inappropriate reviews, contact users.
        </p>
      </Card>
    </div>
  );
}
