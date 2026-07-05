export interface AdminNavItem {
  href: string;
  label: string;
  description: string;
}

export type AdminToastState = {
  ok?: string;
  error?: string;
};
