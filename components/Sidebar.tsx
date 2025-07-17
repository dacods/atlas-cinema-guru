"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import folder from "../public/folder.png";
import clock from "../public/clock.png";
import star from "../public/star.png";

type Activity = {
  id: string;
  activity: "FAVORITED" | "WATCH_LATER";
  title: string;
  timestamp: string;
};

export default function Sidebar({ userEmail }: { userEmail: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadActivities = async () => {
      const res = await fetch(`/api/activities?user=${userEmail}`);
      const data = await res.json();
      setActivities(data.activities || []);
    };
    loadActivities();
  }, [userEmail]);

  return (
    <aside
      className={`transition-all duration-300 bg-teal-500 h-screen ${
        isHovered ? "w-64" : "w-16"
      } flex-shrink-0`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex flex-col items-start gap-4 text-white">
        <Link href="/" className="flex items-center gap-2">
          <Image src={folder} alt="Home" width={20} height={20} />
          {isHovered && <span>Home</span>}
        </Link>
        <Link href="/favorites" className="flex items-center gap-2">
          <Image src={star} alt="Favorites" width={20} height={20} />
          {isHovered && <span>Favorites</span>}
        </Link>
        <Link href="/watch-later" className="flex items-center gap-2">
          <Image src={clock} alt="Watch Later" width={20} height={20} />
          {isHovered && <span>Watch Later</span>}
        </Link>
        {isHovered && (
          <div className="mt-4 w-full bg-teal-100 rounded-xl px-4 py-3 text-black">
            <h3 className="text-sm font-semibold mb-3 text-center">
              Latest Activities
            </h3>
            <ul className="text-xs max-h-[calc(100vh-200px)] overflow-y-auto space-y-3">
              {activities.map((activity) => (
                <li key={activity.id} className="leading-tight">
                  <div className="text-gray-600 text-[10px]">
                    {new Date(activity.timestamp).toLocaleString()}
                  </div>
                  <div>
                    {activity.activity === "FAVORITED" ? (
                      <>Favorited <strong>{activity.title}</strong></>
                    ) : (
                      <>Added <strong>{activity.title}</strong> to watch later</>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
