"use client";
import React from "react";

const RecentTasksTable = ({ tasks = [] }) => {
    return (
        <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                    <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                        <thead className=" bg-slate-200 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className=" table-th ">
                                    Task Title
                                </th>
                                <th scope="col" className=" table-th ">
                                    Category
                                </th>
                                <th scope="col" className=" table-th ">
                                    Status
                                </th>
                                <th scope="col" className=" table-th ">
                                    Posted By
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="table-td">
                                        <div className="font-medium text-slate-900 dark:text-slate-300">
                                            {task.title}
                                        </div>
                                    </td>
                                    <td className="table-td">
                                        <span className="text-slate-500 dark:text-slate-400">
                                            {task.category}
                                        </span>
                                    </td>
                                    <td className="table-td">
                                        <span
                                            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${task.status === "COMPLETED"
                                                    ? "text-success-500 bg-success-500"
                                                    : task.status === "IN_PROGRESS"
                                                        ? "text-warning-500 bg-warning-500"
                                                        : task.status === "CANCELLED"
                                                            ? "text-danger-500 bg-danger-500"
                                                            : "text-slate-500 bg-slate-500"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="table-td">
                                        <div className="text-sm text-slate-600 dark:text-slate-300">
                                            {task.user?.fullName}
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {task.user?.email}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tasks.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="table-td text-center">
                                        No recent tasks
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecentTasksTable;
