"use client";

import { useEffect, useState, useRef } from "react";

const KEY_PREFIX = "ayla-admin-order:";

export function Reorderable<T>({
  items,
  itemKey,
  storageKey,
  className = "",
  render,
}: {
  items: T[];
  itemKey: (item: T) => string;
  storageKey: string;
  className?: string;
  render: (item: T, dragHandleProps: { draggable: true; onDragStart: (e: React.DragEvent) => void }) => React.ReactNode;
}) {
  const [order, setOrder] = useState<T[]>(items);
  const dragId = useRef<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY_PREFIX + storageKey);
      if (!saved) {
        setOrder(items);
        return;
      }
      const ids: string[] = JSON.parse(saved);
      const map = new Map(items.map(i => [itemKey(i), i]));
      const sorted: T[] = [];
      ids.forEach(id => { const it = map.get(id); if (it) { sorted.push(it); map.delete(id); } });
      map.forEach(i => sorted.push(i));
      setOrder(sorted);
    } catch {
      setOrder(items);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  function persist(next: T[]) {
    try {
      localStorage.setItem(KEY_PREFIX + storageKey, JSON.stringify(next.map(itemKey)));
    } catch {}
  }

  function onDragStart(id: string) {
    return (_e: React.DragEvent) => { dragId.current = id; };
  }

  function onDragOver(e: React.DragEvent) { e.preventDefault(); }

  function onDrop(targetId: string) {
    return (e: React.DragEvent) => {
      e.preventDefault();
      const fromId = dragId.current;
      if (!fromId || fromId === targetId) return;
      const next = [...order];
      const fromIdx = next.findIndex(i => itemKey(i) === fromId);
      const toIdx = next.findIndex(i => itemKey(i) === targetId);
      if (fromIdx < 0 || toIdx < 0) return;
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      setOrder(next);
      persist(next);
      dragId.current = null;
    };
  }

  return (
    <div className={className}>
      {order.map(item => {
        const id = itemKey(item);
        return (
          <div
            key={id}
            onDragOver={onDragOver}
            onDrop={onDrop(id)}
            className="contents"
          >
            {render(item, { draggable: true, onDragStart: onDragStart(id) })}
          </div>
        );
      })}
    </div>
  );
}
