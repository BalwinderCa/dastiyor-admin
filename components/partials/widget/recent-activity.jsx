const RecentActivity = ({ users = [] }) => {
  return (
    <div>
      <ul className="list-item space-y-3 h-full overflow-hidden">
        {users.map((user, i) => (
          <li
            className="flex items-center space-x-3 rtl:space-x-reverse border-b border-slate-100 dark:border-slate-700 last:border-b-0 pb-3 last:pb-0"
            key={i}
          >
            <div>
              <div className="w-8 h-8 rounded-[100%] bg-slate-100 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt=""
                    className="w-full h-full rounded-[100%] object-cover"
                  />
                ) : (
                  user.fullName?.charAt(0) || "U"
                )}
              </div>
            </div>
            <div className="text-start overflow-hidden text-ellipsis whitespace-nowrap max-w-[63%]">
              <div className="text-sm text-slate-600 dark:text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
                {user.fullName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {user.email}
              </div>
            </div>
            <div className="flex-1 ltr:text-right rtl:text-left">
              <div className="text-sm font-light text-slate-400 dark:text-slate-400">
                {user.role}
              </div>
            </div>
          </li>
        ))}
        {users.length === 0 && (
          <div className="text-center text-slate-500 py-4">No recent users</div>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
