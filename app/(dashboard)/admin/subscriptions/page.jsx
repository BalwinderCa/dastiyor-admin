"use client";

import React from "react";
import Card from "@/components/ui/Card";
import HomeBredCurbs from "@/components/partials/HomeBredCurbs";
import Icon from "@/components/ui/Icon";

export default function AdminSubscriptions() {
  return (
    <div>
      <HomeBredCurbs title="Subscriptions & payments" />
      <Card title="Subscription plans">
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          Manage Basic, Standard, Premium plans. Set duration, response limits, and pricing.
        </p>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Plan</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Duration</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Price</th>
                <th className="text-start py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 dark:border-slate-700">
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
      </Card>
      <Card title="Payments" className="mt-5">
        <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
          <Icon icon="heroicons-outline:information-circle" className="text-lg" />
          Payment history, manual activation of subscriptions, refunds. Connect payment provider (e.g. Stripe).
        </p>
      </Card>
    </div>
  );
}
