export type AuthUser = {
  id: number | string;
  name?: string;
  email?: string;
  partnerId?: number | string;
};

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.id) return null;
    return parsed as AuthUser;
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('user');
  window.dispatchEvent(new Event('auth:changed'));
}

